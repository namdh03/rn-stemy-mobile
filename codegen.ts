import type { CodegenConfig } from '@graphql-codegen/cli';

/*
 * Please remove file schema.graphql (/schema.graphql)
 * and folder graphql (/src/graphql)
 * when change the schema url
 */

const config: CodegenConfig = {
  schema: 'https://graphqlzero.almansi.me/api',
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
  watch: true,
};

export default config;
