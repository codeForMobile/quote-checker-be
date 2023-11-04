import type { CodegenConfig } from '@graphql-codegen/cli';
 
const config: CodegenConfig = {
  schema: 'src/graphql/schema.graphql',
  generates: {
    './src/generated/resolvers-types.ts': {
      config: {
        useIndexSignature: true,
        typesPrefix: 'Gql',
        mappers: {
            Lookup: '../graphql/types#Lookup'
        }
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};
export default config;