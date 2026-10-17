
import { trustedSources } from "../data/sources.js";

export function selectSources(topic) {
  const matchingSources = trustedSources.filter((source) => {
    return source.approved === true &&
           source.topics.includes(topic);
  });

  return matchingSources;
}
