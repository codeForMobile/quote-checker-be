import GraphQLJSON from "graphql-type-json";
import {Client} from "@apperate/iexjs"
import { Resolvers } from "../generated/resolvers-types";
import { DateResolver } from 'graphql-scalars'

const client = new Client({api_token: process.env.IEX_API_TOKEN, version: "v1"});
const getQuote = (symbol: string) => {
    return client.quote({symbol})
    // Do not use the new api yet. It will throw error: 
    // Cannot return null for non-nullable field
}

const resolvers: Resolvers = {
    JSON: GraphQLJSON,
    Date: DateResolver,
    Query: {
        lookup: (_, {symbol}) =>{
            return {
                symbol,
                revenue: [{
                    date: '2023-01-17',
                    value: 12345678
                }]
            }
        }
    },
    Mutation: {
        quote: (_: any, {symbol}) => {
            return getQuote(symbol)
        }
    }
}

export default resolvers