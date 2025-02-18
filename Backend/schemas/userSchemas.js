const {z} = require('zod');

const userSchema = z.object({
  fullName: z.string().min(3).max(256).nonempty().trim(),
  username: z.string().min(6).max(32).nonempty().trim(),
  email: z.string().email().nonempty().trim(),
  password: z.string().min(6).max(32).nonempty().trim(),
  cpf: z.string().min(11).max(11).nonempty().trim()
}).strict();

const userUpdateSchema = userSchema.pick({
  fullName: true,
  username: false,
  email: true,
  password: true,
  cpf: false
}).partial();

module.exports = {userSchema, userUpdateSchema};