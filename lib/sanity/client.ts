import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // The CDN serves cached, slightly-stale content and is faster/cheaper.
  // Fine for a public blog; flip to false if you need instant updates.
  useCdn: true,
});
