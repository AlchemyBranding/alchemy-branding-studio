import type { SchemaTypeDefinition } from "sanity";

import { altImage } from "./objects/altImage";
import { blockContent } from "./objects/blockContent";
import { seo } from "./objects/seo";
import { videoEmbed } from "./objects/videoEmbed";

import { blogPost } from "./blogPost";
import { caseStudy } from "./caseStudy";
import { pageSeo } from "./pageSeo";
import { teamMember } from "./teamMember";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  blogPost,
  caseStudy,
  teamMember,
  testimonial,
  pageSeo,
  // Reusable objects
  altImage,
  blockContent,
  seo,
  videoEmbed,
];
