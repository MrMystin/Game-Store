// schemas/transactionSchemas.js
const { z } = require('zod');

const transactionItemSchema = z.object({
  productId: z.number().int().positive(),
  productName: z.string().min(1).max(256).trim(),
  publisherName: z.string().min(1).max(128).trim(),
  productValue: z.number().nonnegative(),
  discount: z.number().nonnegative().optional().default(0),
  finalPrice: z.number().nonnegative(),
}).strict();

const transactionSchema = z.object({
  invoiceId: z.string().min(6).max(32).trim(),
  orderId: z.string().min(6).max(32).trim(),
  paymentType: z.enum(["credit_card", "debit_card", "pix"]),
  source: z.string().min(1).max(64).trim(),           
  total: z.number().nonnegative(),
  transactionItems: z.array(transactionItemSchema).min(1),
}).strict();

module.exports = {
  transactionSchema,
  transactionItemSchema
};
