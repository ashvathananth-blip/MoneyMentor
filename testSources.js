import { selectSources } from "./src/utils/selectSources.js";

const results = selectSources("Investing");

results.forEach((source) => {
  console.log(source.name);
});