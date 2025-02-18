const {z} = require('zod');

const productSchema = z.object({
  name: z.string().min(6).max(256).nonempty().trim(),
  value: z.float().nonempty().trim(),
  description: z.string().nonempty().trim(),
  languages: z.array(z.string().nonempty().trim()),
  indicativeRating: z.enum(["rL", "r10", "r12", "r14", "r16", "r18"]),
  rating: z.number(),
  releaseDate: z.date(),
  minimumRequirements: z.string(),
  fileSize: z.number(),
  banner: z.string(),
  photos: z.array(z.string()),
  descriptionPhoto: z.string()
}).strict();

const productUpdateSchema = productSchema.pick({
  fullName: true,
  username: false,
  email: true,
  password: true,
  cpf: false
}).partial();

module.exports = {productSchema, productUpdateSchema};