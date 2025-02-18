import {userSchema, userUpdateSchema} from '../schemas/userSchemas.js';
import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    if (!users) return res.status(400).json({message: "We don't have users yet :("});
    res.status(200).send({users})
  } catch (err) {next(err)}
}

export async function getOneUser(req, res) {
  try {
    const {cpf} = req.params;
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
      if (users.cpf === parseData.cpf) check.push('cpfMatch');
      if (users.username === parseData.username) check.push('usernameMatch');
      if (users.email === parseData.email) check.push('emailMatch');
      return check;
    }, []);

    if (checkResults.length > 0) {
      return res.status(400).json({
        errorCode: 1,
        errors: checkResults
      });
    }

    const hashedPassword = await bcrypt.hash(parseData.password, 10);
    parseData.password = hashedPassword;

    await prisma.user.create({
      data: {
        ...parseData
      },
    });

    res.status(200).json({message: 'User created successfully'})
  } catch (err) {next(err)}
}

export async function updateUser(req, res) {
  try {
    const {cpf} = req.params;
    const user = await prisma.user.findUnique({where: {cpf: cpf}});
    if (!user) return res.status(400).json({message: 'User Not Found'});
    
    const newData = userUpdateSchema.parse(req.body);
    if (newData.password) newData.password = await bcrypt.hash(newData.password, 10);
    
    if (newData.email) {
      const emailMatch = await prisma.user.findUnique({where: {email: newData.email}})
      if (emailMatch) res.status(400).json({message: 'Email already used'})
    }
    
    await prisma.user.update({
      where: { cpf: cpf },
      data: { ...newData }
    });
    res.status(200).json({message: 'User updated successfully'});
  } catch (error) {next(err)}
}

export async function deleteUser(req, res) {
  try {
    const {cpf} = req.params;
    const user = await prisma.user.findUnique({where: { cpf: cpf } });
    if (!user) return res.status(400).json({message: 'User Not Found'});
    await prisma.user.delete({where: {cpf: cpf}});
    res.status(200).json({message: 'User deleted successfully'})
  } catch (err) {next(err)}
}