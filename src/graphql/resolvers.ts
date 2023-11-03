import GraphQLJSON from "graphql-type-json";
import {Client} from "@apperate/iexjs"
import { Resolvers } from "../generated/resolvers-types";

const client = new Client({api_token: process.env.IEX_API_TOKEN, version: "v1"});
const getQuote = (symbol: string) => {
    return client.quote({symbol})
    // Do not use the new api yet. It will throw error: 
    // Cannot return null for non-nullable field
}

const resolvers: Resolvers = {
    JSON: GraphQLJSON,

    Query: {
        hello:() => 'world'
    },

    Mutation: {
        quote: (_: any, {symbol}) => {
            return getQuote(symbol)
        }
    }
}

export default resolvers