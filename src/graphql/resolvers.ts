import {Client} from "@apperate/iexjs"
import { GqlResolvers } from "../generated/resolvers-types";
import { BigIntResolver, DateResolver, JSONResolver } from 'graphql-scalars'

const client = new Client({api_token: process.env.IEX_API_TOKEN, version: "v1"});
const getQuote = (symbol: string) => {
    return client.quote({symbol})
    // Do not use the new api yet. It will throw error: 
    // Cannot return null for non-nullable field
}

const resolvers: GqlResolvers = {
    BigInt: BigIntResolver,
    JSON: JSONResolver,
    Date: DateResolver,
    Query: {
        lookup: (_, {symbol}) =>{
            return { symbol }
            /* return {
                symbol,
                revenue: [{
                    date: '2023-01-17',
                    value: 12345678
                }]
            } */
        }
    },
    Mutation: {
        quote: (_: any, {symbol}) => {
            return getQuote(symbol)
        }
    },

    Lookup: {
        revenue: async (lookup, {resolutions}) => {
            const result =  await client.timeSeries({ id: 'INCOME', key: lookup.symbol, limit: 100, range: '5y', subkey: resolutions})
            return result.map((point: any) => ({
                date: point.fiscalDate,
                value: point.totalRevenue
            }))
        }
    }
}

export default resolvers