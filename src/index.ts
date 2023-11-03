require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {Client} from "@apperate/iexjs"
import {gql} from 'graphql-tag'
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

const typeDefs = gql`
    scalar JSON
    type Query {
        hello: String!
    }

    type Mutation {
        quote(symbol: String!): QuoteResult!
    }

    type QuoteResult {
        change: Float!
        changePercent: Float!
        companyName: String!
        peRatio: Float!
        symbol: String!
        delayedPrice: Float!
        previousClose: Float!
    }
`

const resolvers = {
    JSON: GraphQLJSON,

    Query: {
        hello:() => 'world'
    },

    Mutation: {
        quote: (_: any, {symbol}: {symbol: string}) => {
            return getQuote(symbol)
        }
    }
}

const client = new Client({api_token: process.env.IEX_API_TOKEN, version: "v1"});
const getQuote = (symbol: string) => {
    return client.quote({symbol: "AAPL"})
    // Do not use the new api yet. It will throw error: 
    // Cannot return null for non-nullable field
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
  console.log(`🚀  Server ready at: ${url}`);
}
startServer()
 