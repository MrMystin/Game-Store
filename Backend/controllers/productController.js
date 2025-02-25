import {productSchema, productUpdateSchema} from '../schemas/productSchemas.js';
import {PrismaClient} from '@prisma/client'
import fs from 'fs';
import path from 'path'
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
    console.log(req.body.photos[0].photo);
    const base64Image = req.body.photos[0].photo;
    if (!base64Image) {
      return res.status(400).send('Nenhuma imagem Base64 foi enviada');
    }
  
    const matches = base64Image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).send('Formato de imagem Base64 inválido');
    }
  
    const buffer = Buffer.from(matches[2], 'base64');
    const filePath = path.join('upload', `image-${Date.now()}.png`);

    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.log(err)
        return res.status(500).send('Erro ao salvar a imagem');
      }
      res.send('Imagem salva com sucesso');
    });
    return
    if (req.body.releaseDate) {
      req.body.releaseDate = new Date(req.body.releaseDate)
    }
    const parseData = productSchema.parse(req.body);


    const { photos, languages, minimumRequirements, colors, ...data } = parseData;

    await prisma.product.create({
      data: {
        ...data,
        photos: {
          create: photos.map(photo => ({
            photo: photo.photo,
            type: photo.type
          }))
        },
        languages: {
          connectOrCreate: languages.map(language => ({
            where: { language: language.language },
            create: { language: language.language }
          }))
        },
        minimumRequirements: {
          create: minimumRequirements.map(minimum => ({
            OS: minimum.OS,
            Processor: minimum.Processor,
            Memory: minimum.Memory,
            Graphics: minimum.Graphics,
            DirectX: minimum.DirectX,
            Storage: minimum.Storage
          }))
        },
        colors: {
          create: colors.map(colors => ({
            first: colors.first,
            second: colors.second,
            third: colors.third,
            fourth: colors.fourth,
            fifth: colors.fifth,
            sixth: colors.sixth,
            title: colors.title,
            background1: colors.background1,
            background2: colors.background2
          }))
        }
      },
    });

    res.status(200).json({message: 'Product created successfully'})
  } catch (err) {console.log(err)}
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