const { z } = require('zod');

const transactionItemSchema = z.object({
  productId: z.number().int().positive(),
}).strict();

const transactionSchema = z.object({
  paymentType: z.enum(["credit_card", "debit_card", "pix"]),
  transactionItems: z.array(transactionItemSchema).min(1),
}).strict();


module.exports = {
  transactionSchema,
  transactionItemSchema
};
 