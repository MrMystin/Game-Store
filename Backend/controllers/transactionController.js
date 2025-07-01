const { PrismaClient } = require('@prisma/client');
const { transactionSchema } = require('../schemas/transactionSchemas');
const prisma = new PrismaClient();

exports.getTransactions = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        transactionItems: {
          include: {
            product: {
              include: {
                photos: true,
              }
            }
          }
        }
      },
      orderBy: {
        transactionDate: 'desc'
      }
    });

    res.status(200).json({ transactions });
  } catch (err) {
    next(err);
  }
};

exports.getTransactionById = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
      include: {
        transactionItems: {
          include: {
            product: {
              include: {
                photos: true,
              }
            }
          }
        }
      }
    });

    if (!transaction || transaction.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }

    res.status(200).json({ transaction });
  } catch (err) {
    next(err);
  }
};

exports.createTransaction = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const parsed = transactionSchema.parse(req.body);

    const invoiceId = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const productIds = parsed.transactionItems.map(item => item.productId);

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: {
        publisher: true
      }
    });

    const alreadyPurchased = await prisma.transactionItem.findFirst({
      where: {
        productId: { in: productIds },
        transaction: {
          userId: userId
        }
      }
    });

    if (alreadyPurchased) {
      return res.status(400).json({ message: 'Você já comprou um ou mais produtos selecionados.' });
    }
    
    if (products.length !== productIds.length) {
      return res.status(400).json({ message: 'Um ou mais produtos não encontrados.' });
    }

    const transactionItemsData = products.map(product => {
      const discount = product.discount || 0;
      const productValue = Number(product.value);

      return {
        productId: product.id,
        productValue: parseFloat(productValue.toFixed(2)),
        discount: parseFloat(discount.toFixed(2)),
      };
    });

    const totalValue = transactionItemsData.reduce(
      (acc, item) => acc + (item.productValue - item.discount),
      0
    );
    const total = totalValue.toFixed(2);
    

    const transaction = await prisma.transaction.create({
      data: {
        invoiceId,
        orderId,
        paymentType: parsed.paymentType,
        total,
        userId,
        transactionItems: {
          create: transactionItemsData
        }
      },
      include: {
        transactionItems: true,
      }
    });

    res.status(201).json({ message: 'Transaction created', transaction });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ message: 'Validation error', errors: err.errors });
    }
    next(err);
  }
};