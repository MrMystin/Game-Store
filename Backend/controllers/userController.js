import {userSchema, userUpdateSchema} from '../schemas/userSchemas.js';
import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ZodError } from "zod";
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'seu_segredo_super_secreto';

export async function getUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany();
    if (!users) return res.status(400).json({message: "We don't have users yet :("});
    res.status(200).send({users})
  } catch (err) {next(err)}
}

export async function getOneUser(req, res, next) {
  try {
    const {cpf} = req.params;
    if (req.user.cpf !== cpf) {
      return res.status(403).json({ message: "Access denied." });
    }
    const user = await prisma.user.findUnique({where: {cpf: cpf } });
    if (!user) return res.status(400).json({message: 'User Not Found'});
    res.status(200).send({user})
  } catch (err) {next(err)}
}

export async function registerUser(req, res) {
  try {
    const parseData = userSchema.parse(req.body);

    const usersExists = await prisma.user.findMany({
      where: {
        OR: [
          { cpf: parseData.cpf },
          { username: parseData.username },
          { email: parseData.email },
        ],
      },
    });

    const checkResults = usersExists.reduce((check, users) => {
      if (users.cpf === parseData.cpf) check.push("cpfMatch");
      if (users.username === parseData.username) check.push("usernameMatch");
      if (users.email === parseData.email) check.push("emailMatch");
      return check;
    }, []);

    if (checkResults.length > 0) {
      return res.status(400).json({
        errorCode: 1,
        errors: checkResults,
      });
    }

    const hashedPassword = await bcrypt.hash(parseData.password, 10);
    parseData.password = hashedPassword;

    await prisma.user.create({
      data: {
        ...parseData,
      },
    });

    return res.status(200).json({ message: "User created successfully" });

  } catch (err) {

    if (err instanceof ZodError || (err.errors && Array.isArray(err.errors))) {
      return res.status(400).json({
        errorCode: 2,
        errors: err.errors.map((e) => ({
          path: e.path,
          message: e.message,
        })),
      });
    }

    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function updateUser(req, res, next) {
  try {
    const { cpf } = req.params;
    if (req.user.cpf !== cpf) {
      return res.status(403).json({ message: "Access denied." });
    }

    const user = await prisma.user.findUnique({ where: { cpf } });
    if (!user) return res.status(400).json({ message: 'User Not Found' });

    const newData = userUpdateSchema.parse(req.body);
    if (Object.keys(newData).length === 0) {
      return res.status(400).json({ message: 'No data to update.' });
    }

    if (newData.password) {
      newData.password = await bcrypt.hash(newData.password, 10);
    }

    if (newData.email) {
      const emailMatch = await prisma.user.findUnique({ where: { email: newData.email } });
      if (emailMatch && emailMatch.cpf !== cpf) {
        return res.status(400).json({ message: 'Email already used' });
      }
    }

    await prisma.user.update({
      where: { cpf },
      data: { ...newData }
    });

    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ message: 'Validation error', errors: err.errors });
    }
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const {cpf} = req.params;
    if (req.user.cpf !== cpf) {
      return res.status(403).json({ message: "Access denied." });
    }
    await prisma.transaction.deleteMany({ where: { userId: Number(cpf) } }); 
    const user = await prisma.user.findUnique({where: { cpf: cpf } });
    if (!user) return res.status(400).json({message: 'User Not Found'});
    await prisma.user.delete({where: {cpf: cpf}});
    res.status(200).json({message: 'User deleted successfully'})
  } catch (err) {next(err)}
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required." });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: user.id, cpf: user.cpf, email: user.email },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    const { password: _, ...userData } = user; // remove senha

    res.status(200).json({ token, user: userData });
  } catch (err) {
    next(err);
  }
}