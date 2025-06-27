import { PrismaClient } from '@prisma/client';
import { transactionSchema } from '../schemas/transactionSchemas.js';
import { authenticateToken } from '../middlewares/auth.js';

const prisma = new PrismaClient();

export async function getTransactions(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        transactionItems: true,
      },
      orderBy: {
        transactionDate: 'desc'
      }
    });

    res.status(200).json({ transactions });
  } catch (err) {
    next(err);
  }
}

export async function getTransactionById(req, res, next) {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
      include: { transactionItems: true }
    });

    if (!transaction || transaction.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }

    res.status(200).json({ transaction });
  } catch (err) {
    next(err);
  }
}

export async function createTransaction(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const parsed = transactionSchema.parse(req.body);

    const transaction = await prisma.transaction.create({
      data: {
        invoiceId: parsed.invoiceId,
        orderId: parsed.orderId,
        paymentType: parsed.paymentType,
        source: parsed.source,
        total: parsed.total,
        userId: userId,
        transactionItems: {
          create: parsed.transactionItems.map(item => ({
            productId: item.productId,
            productName: item.productName,
            publisherName: item.publisherName,
            productValue: item.productValue,
            discount: item.discount || 0,
            finalPrice: item.finalPrice,
          }))
        }
      },
      include: {
        transactionItems: true,
      }
    });

    res.status(201).json({ message: 'Transaction created', transaction });
  } catch (err) {
    next(err);
  }
}