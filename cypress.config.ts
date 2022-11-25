import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "a859in",

  e2e: {
    baseUrl: 'http://localhost:3000' 
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
