import {productSchema, productUpdateSchema} from '../schemas/productSchemas.js';
import {PrismaClient} from '@prisma/client';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));
const prisma = new PrismaClient();

export async function getProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      include: {
        photos: true,
        languages: true,
        minimumRequirements: true
      }
    });
    if (!products) return res.status(400).json({message: "We don't have products yet :("});
    res.status(200).send({products})
  } catch (err) {next(err)}
}

export async function getOneProduct(req, res) {
  try {
    const {id} = req.params;
    const product = await prisma.product.findUnique({where: {id: id } });
    if (!product) return res.status(400).json({message: 'Product Not Found'});
    res.status(200).send({product})
  } catch (err) {next(err)}
}

export async function newProduct(req, res) {
  try {
    req.body.releaseDate = new Date(req.body.releaseDate);
    req.body.value = parseInt(req.body.value);
    req.body.rating = parseInt(req.body.rating);
    req.body.fileSize = parseInt(req.body.fileSize);
    req.body.minimumRequirements.memory = parseInt(req.body.minimumRequirements.memory);
    req.body.minimumRequirements.directX = parseInt(req.body.minimumRequirements.directX);
    req.body.minimumRequirements.storage = parseInt(req.body.minimumRequirements.storage);

    const parseData = productSchema.parse(req.body);
    const { photos, languages, minimumRequirements, colors, ...data } = parseData;

    const product = await prisma.product.create({
      data: {
        ...data,
        photos: {
          create: photos.map(photo => ({
            ...photo
          }))
        },
        languages: {
          connectOrCreate: languages.map(language => ({
            where: { language: language.language },
            create: { language: language.language }
          }))
        },
        minimumRequirements: {
          create: {
            ...minimumRequirements
          }
        },
        colors: {
          create: {
            ...colors
          }
        }
      },
    });

    for (const field of Object.keys(req.files)) {
      var movedSuccessfully = [];
      var counter = 1;
      const folderPath = path.join(__dirname, `public/images/${product.id}`);
      await fs.mkdir(folderPath, { recursive: true });

      for (const file of req.files[field]) {
        const extension = file.filename.split('.').pop();
        const source = path.join(__dirname, 'temp', `${file.filename}`);
        const destination = path.join(__dirname, `public/images/${product.id}`, `${file.fieldname}${req.files[field].length > 1 ? counter++ : ''}.${extension}`);

        try {
          await fs.rename(source, destination);
          movedSuccessfully.push(destination);
        } catch (err) {
          await fs.rm(folderPath, { recursive: true, force: true });

          for (const file of req.files[field]) {
            const filePath = path.join(__dirname, 'temp', `${file.filename}`);
            await fs.rm(filePath, { recursive: true, force: true });
          }

          await prisma.product.delete({where: {id: product.id}});
          next(err)
        }
      } 
    };

    res.status(200).json({message: 'Product created successfully'})
  } catch (err) {next(err)}
}

export async function updateProduct(req, res) {
  try {
    const {id} = req.params;
    const product = await prisma.product.findUnique({where: { id: id } });
    if (!product) return res.status(400).json({message: 'Product Not Found'});

    const newData = productUpdateSchema.parse(req.body);

    if (newData.name) {
      const nameMatch = await prisma.product.findUnique({where: {name: newData.name}})
      if (nameMatch) res.status(400).json({message: 'Name already used'})
    }

    await prisma.product.update({
      where: { id: id },
      data: { ...newData }
    });
    res.status(200).json({message: 'Product updated successfully'});
  } catch (error) {next(err)}
}

export async function deleteProduct(req, res) {
  try {
    const {id} = req.params;
    const product = await prisma.product.findUnique({where: { id: id } });
    if (!product) return res.status(400).json({message: 'Product Not Found'});
    await prisma.product.delete({where: {id: id}});
    res.status(200).json({message: 'Product deleted successfully'})
  } catch (err) {next(err)}
}