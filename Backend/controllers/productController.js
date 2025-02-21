import {productSchema, productUpdateSchema} from '../schemas/productSchemas.js';
import {PrismaClient} from '@prisma/client'
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
    if (req.body.releaseDate) {
      req.body.releaseDate = new Date(req.body.releaseDate)
    }
    const parseData = productSchema.parse(req.body);


    const { photos, languages, minimumRequirements, ...data } = parseData;

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