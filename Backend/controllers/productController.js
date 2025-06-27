import {productSchema, productUpdateSchema} from '../schemas/productSchemas.js';
import {PrismaClient} from '@prisma/client';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));
const prisma = new PrismaClient();

export async function getProducts(req, res, next) {
  try {
    const products = await prisma.product.findMany({
      include: {
        photos: true,
      }
    });

    if (!products || products.length === 0) 
      return res.status(400).json({message: "We don't have products yet :("});

    res.status(200).send({products});
  } catch (err) {
    next(err);
  }
}

export async function getOneProduct(req, res, next) {
  try {
    const {id} = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        photos: true,
        languages: true,
        goodies: true,
        gameFeatures: true,
        timeToBeats: true,
        requirements: {
          include: {
            windows: true,
            mac: true,
            linux: true
          }
        },
        genres: true,
        tags: true,
        company: true,
        publisher: true
      }
    });
    if (!product) return res.status(400).json({message: 'Product Not Found'});
    res.status(200).send({product})
  } catch (err) {next(err)}
}

export async function newProduct(req, res, next) {
  try {
    req.body.releaseDate = new Date(req.body.releaseDate);
    req.body.value = parseFloat(req.body.value);
    req.body.rating = parseFloat(req.body.rating);
    req.body.fileSize = parseFloat(req.body.fileSize);
    req.body.timeToBeats = (req.body.timeToBeats || []).map(Number);

    for (const os in req.body.minimumRequirements) {
      const reqs = req.body.minimumRequirements[os];
      reqs.memory = parseInt(reqs.memory);
      reqs.directX = parseInt(reqs.directX);
      reqs.storage = parseInt(reqs.storage);
    }

    const windowsReq = await prisma.requirement.create({ data: req.body.minimumRequirements.windows });
    const macReq = await prisma.requirement.create({ data: req.body.minimumRequirements.mac });
    const linuxReq = await prisma.requirement.create({ data: req.body.minimumRequirements.linux });

    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        value: req.body.value,
        discount: req.body.discount,
        description: req.body.description,
        indicativeRating: req.body.indicativeRating,
        rating: req.body.rating,
        releaseDate: req.body.releaseDate,
        file: req.body.file,
        fileSize: req.body.fileSize,
        workOn: req.body.workOn,
        photos: {
          create: req.body.photos.map(p => ({ photo: p.photo, type: p.type }))
        },
        languages: {
          create: req.body.languages.map(lang => ({
            language: lang.language,
            audio: lang.audio,
            text: lang.text
          }))
        },
        goodies: {
          create: req.body.goodies.map(g => ({ text: g.text }))
        },
        timeToBeats: {
          create: req.body.timeToBeats.map(value => ({ value }))
        },
        gameFeatures: {
          create: req.body.gameFeatures.map(gf => ({ name: gf.name }))
        },
        requirements: {
          create: {
            windowsId: windowsReq.id,
            macId: macReq.id,
            linuxId: linuxReq.id
          }
        },
        genres: {
          connectOrCreate: req.body.genres.map(name => ({
            where: { name },
            create: { name }
          }))
        },
        tags: {
          connectOrCreate: req.body.tags.map(name => ({
            where: { name },
            create: { name }
          }))
        },
        company: {
          connectOrCreate: {
            where: { name: req.body.company },
            create: { name: req.body.company }
          }
        },
        publisher: {
          connectOrCreate: {
            where: { name: req.body.publisher },
            create: { name: req.body.publisher }
          }
        }
      }
    });

    for (const field of Object.keys(req.files)) {
      let counter = 1;
      const folderPath = path.join(__dirname, `public/images/${product.id}`);
      await fs.mkdir(folderPath, { recursive: true });

      for (const file of req.files[field]) {
        const extension = file.filename.split('.').pop();
        const source = path.join(__dirname, 'temp', file.filename);
        const destination = path.join(folderPath, `${file.fieldname}${req.files[field].length > 1 ? counter++ : ''}.${extension}`);

        try {
          await fs.rename(source, destination);
        } catch (err) {
          await fs.rm(folderPath, { recursive: true, force: true });
          for (const field of Object.keys(req.files)) {
            for (const file of req.files[field]) {
              await fs.rm(path.join(__dirname, 'temp', file.filename), { force: true });
            }
          }
          await prisma.product.delete({ where: { id: product.id } });
          return next(err);
        }
      }
    }

    res.status(200).json({ message: 'Product created successfully' });
  } catch (err) {
    next(err);
  }
}

export async function updateProduct(req, res, next) {
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

export async function deleteProduct(req, res, next) {
  try {
    const {id} = req.params;
    const product = await prisma.product.findUnique({where: { id: id } });
    if (!product) return res.status(400).json({message: 'Product Not Found'});
    await prisma.product.delete({where: {id: id}});
    res.status(200).json({message: 'Product deleted successfully'})
  } catch (err) {next(err)}
}