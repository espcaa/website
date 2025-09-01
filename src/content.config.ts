import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
  }),
});

const places = defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
});

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    date: z.string(),
  }),
});

export const collections = { projects, places, blog };
