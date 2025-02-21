const {z} = require('zod');

const photoSchema = z.object({
  photo: z.string().nonempty().trim(),
  type: z.enum(["banner", "thumbnail", "photos", "descriptionPhoto"])
});

const languageSchema = z.object({
  language: z.string().nonempty().trim(),
});

const minimumRequirementsSchema = z.object({
  OS: z.string().min(6).max(32).nonempty().trim(),
  Processor: z.string().min(6).max(32).nonempty().trim(),
  Memory: z.number().nonnegative(),
  Graphics: z.string().min(6).max(32).nonempty().trim(),
  DirectX: z.number().nonnegative(),
  Storage: z.number().nonnegative(),
});

const productSchema = z.object({
  name: z.string().min(6).max(256).nonempty().trim(),
  value: z.number().nonnegative().min(0),
  description: z.string().nonempty().trim(),
  indicativeRating: z.enum(["rL", "r10", "r12", "r14", "r16", "r18"]),
  rating: z.number().min(0).max(5),
  releaseDate: z.date(),
  file: z.string(),
  fileSize: z.number(),
  discount: z.number().optional(),
  photos: z.array(photoSchema),
  languages: z.array(languageSchema),
  minimumRequirements: z.array(minimumRequirementsSchema)
}).strict();

const productUpdateSchema = productSchema.pick({
  fullName: true,
  username: false,
  email: true,
  password: true,
  cpf: false
}).partial();

module.exports = {productSchema, productUpdateSchema};