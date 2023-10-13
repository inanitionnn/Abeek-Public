import { CodegenConfig } from "@graphql-codegen/cli";
import { SERVER_URL } from "./src/constants/constants";
const config: CodegenConfig = {
  schema: SERVER_URL + "/graphql",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/graphql/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
