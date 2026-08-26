import type { SchemaTypeDefinition } from "sanity";

import { altImage } from "./objects/altImage";
import { blockContent } from "./objects/blockContent";
import { seo } from "./objects/seo";
import { storiAsset } from "./objects/storiAsset";
import { storiStages } from "./objects/storiStages";
import { videoEmbed } from "./objects/videoEmbed";

import { blogPost } from "./blogPost";
import { caseStudy } from "./caseStudy";
import { pageSeo } from "./pageSeo";
import { storiProject } from "./storiProject";
import { storiTier } from "./storiTier";
import { storiTopic } from "./storiTopic";
import { teamMember } from "./teamMember";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  blogPost,
  caseStudy,
  teamMember,
  testimonial,
  pageSeo,
  storiProject,
  storiTier,
  storiTopic,
  // Reusable objects
  altImage,
  blockContent,
  seo,
  storiAsset,
  storiStages,
  videoEmbed,
];
