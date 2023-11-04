import {Client} from "@apperate/iexjs"
import { GqlResolvers, GqlTimeframe } from "../generated/resolvers-types";
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
        lookup: async (_, {symbol}) =>{
            const quote = await getQuote(symbol)
            return { 
                symbol,
                companyName: quote.companyName,
                logoUrl: "some-logo.png"
            }
        }
    },

    Lookup: {
        quote: async ({symbol}) => {
            const quote = await getQuote(symbol)
            return {
                ...quote,
                peRatioTtm: quote.peRatio
            }
        },
        revenue: async (lookup, {resolutions}) => {
            const result =  await client.timeSeries({ 
                id: 'INCOME', 
                key: lookup.symbol, 
                limit: 100, 
                range: '5y', 
                subkey: resolutions
            })
            return result.map((point: any) => ({
                date: point.fiscalDate,
                value: point.totalRevenue
            }))
        },

        snapshot: async (_, {timeframe}) => {
            switch(timeframe) {
                case GqlTimeframe.Today:
                case GqlTimeframe.Year1:
                case GqlTimeframe.Ytd:
                    return {
                        changePercent:0.25
                    }
                case GqlTimeframe.Year5:
                case GqlTimeframe.Year10:
                case GqlTimeframe.Max:
                    return {
                        changePercent:250,
                        cagrPercent:30
                    }
            }
        },

        historicalTotalReturn:async (_, {timeframe}) => {
            return {
                changePercent: 997,
                data: [
                    {
                    date: new Date("2020-01-01"),
                    value: 100
                },
                {
                    date: new Date('2020-01-02'),
                    value: 101
                }
                ]
            }
        },

        // Following was neither generated nor added as part of any previous 
        // work despite being stated so at 31.23 in vid 7.
        // I manually added it to align my code with vid.
        stats: async ({symbol}) => {
            return {
                marketCap: 2_300_000_000_000,
                peRatioFwd: 25.6,
                peRatioTtm: 23.1,
                profitMarginPercent: 25,
                freeCashFlowYield: 4.06,
                dividendYield: 0.6
            }
        }
    }
}

export default resolvers