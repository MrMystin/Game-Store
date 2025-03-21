const {z} = require('zod');

const photoSchema = z.object({
  photo: z.string().nonempty().trim(),
  type: z.enum(["banner", "thumbnail", "photos", "descriptionPhoto"])
}).strict();

const languageSchema = z.object({
  language: z.string().nonempty().trim(),
}).strict();

const minimumRequirementsSchema = z.object({
  OS: z.string().min(6).max(32).nonempty().trim(),
  processor: z.string().min(6).max(32).nonempty().trim(),
  memory: z.number().nonnegative(),
  graphics: z.string().min(6).max(32).nonempty().trim(),
  directX: z.number().nonnegative(),
  storage: z.number().nonnegative(),
}).strict();

const colorsSchema = z.object({
  first: z.string().min(6).max(6).nonempty().trim(),
  second: z.string().min(6).max(6).nonempty().trim(), 
  third: z.string().min(6).max(6).nonempty().trim(), 
  fourth: z.string().min(6).max(6).nonempty().trim(), 
  fifth: z.string().min(6).max(6).nonempty().trim(), 
  sixth: z.string().min(6).max(6).nonempty().trim(), 
  title: z.string().min(6).max(6).nonempty().trim(), 
  background1: z.string().min(6).max(6).nonempty().trim(), 
  background2: z.string().min(6).max(6).nonempty().trim(), 
}).strict();

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
  minimumRequirements: minimumRequirementsSchema,
  colors: colorsSchema
}).strict();

const productUpdateSchema = productSchema.pick({
  fullName: true,
  username: false,
  email: true,
  password: true,
  cpf: false
}).partial();

module.exports = {productSchema, productUpdateSchema};