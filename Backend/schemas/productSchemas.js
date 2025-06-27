const { z } = require('zod');

const photoSchema = z.object({
  photo: z.string().nonempty().trim(),
  type: z.enum(["banner", "thumbnail", "photos", "descriptionPhoto"])
}).strict();

const goodiesSchema = z.object({
  text: z.string().nonempty().trim()
});

const languageSchema = z.object({
  language: z.string().nonempty().trim(),
  audio: z.boolean(),
  text: z.boolean(),
}).strict();

const requirementSchema = z.object({
  OS: z.string().min(2).max(32).nonempty().trim(),
  processor: z.string().min(2).max(32).nonempty().trim(),
  memory: z.number().nonnegative(),
  graphics: z.string().min(2).max(32).nonempty().trim(),
  directX: z.number().nonnegative(),
  storage: z.number().nonnegative(),
}).strict();

const productSchema = z.object({
  name: z.string().min(6).max(256).nonempty().trim(),
  value: z.number().nonnegative(),
  description: z.string().nonempty().trim(),
  indicativeRating: z.enum(["rL", "r10", "r12", "r14", "r16", "r18"]),
  rating: z.number().min(0).max(5),
  releaseDate: z.date(),
  file: z.string(),
  fileSize: z.number(),
  discount: z.number().optional(),

  photos: z.array(photoSchema),
  languages: z.array(languageSchema),
  goodies: z.array(goodiesSchema),
  timeToBeats: z.array(z.number()).length(4),
  gameFeatures: z.array(z.object({ name: z.string().nonempty() })),

  minimumRequirements: z.object({
    windows: requirementSchema,
    mac: requirementSchema,
    linux: requirementSchema
  }),

  genres: z.array(z.string().nonempty()),
  tags: z.array(z.string().nonempty()),
  company: z.string().nonempty(),
  publisher: z.string().nonempty(),
  workOn: z.string().nonempty()
}).strict();

const productUpdateSchema = productSchema.partial();

module.exports = { productSchema, productUpdateSchema };
