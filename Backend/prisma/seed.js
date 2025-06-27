import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const games = [
    {
      name: "Minecraft",
      discount: 5,
      value: 10,
      description: "Minecraft",
      indicativeRating: "r10",
      rating: 4.6,
      releaseDate: new Date("2025-02-20"),
      file: "minecraft's file",
      fileSize: 160000,
      photos: [
        { photo: "banner.png", type: "banner" },
        { photo: "descriptionPhoto1.jpg", type: "descriptionPhoto" },
        { photo: "descriptionPhoto2.gif", type: "descriptionPhoto" },
        { photo: "photos1.png", type: "photos" },
        { photo: "photos2.png", type: "photos" },
        { photo: "photos3.jpg", type: "photos" },
        { photo: "photos4.jpg", type: "photos" },
        { photo: "photos5.png", type: "photos" }
      ],
      languages: [
        { language: "Português", audio: false, text: true },
        { language: "Português de Portugal", audio: false, text: true },
        { language: "Inglês", audio: false, text: true }
      ],
      goodies: [
        { text: "Exclusive wallpaper" },
        { text: "Digital map" }
      ],
      timeToBeats: [14.5, 22.5, 38, 23],
      gameFeatures: [
        { name: "Multiplayer" },
        { name: "Cross-platform" },
        { name: "Creative Mode" }
      ],
      minimumRequirements: {
        windows: {
          OS: "Windows 10+",
          processor: "Intel I5 9400F",
          memory: 4,
          graphics: "GTX 3080",
          directX: 11,
          storage: 160000
        },
        mac: {
          OS: "macOS Big Sur",
          processor: "Apple M1",
          memory: 4,
          graphics: "Integrated M1 GPU",
          directX: 12,
          storage: 160000
        },
        linux: {
          OS: "Ubuntu 20.04",
          processor: "Ryzen 5 3600",
          memory: 4,
          graphics: "RX 570",
          directX: 12,
          storage: 160000
        }
      },
      workOn: "Windows (7, 8, 10, 11), Linux (Ubuntu 14.04, Ubuntu 16.04, Ubuntu 18.04), Mac OS X (10.9+)",
      company: "Mojang",
      publisher: "Mojang",
      genres: ["Action", "Sandbox", "Adventure"],
      tags: ["Adventure", "Action", "Indie", "Fantasy", "Sandbox", "FPS"]
    },
  ];

  for (const game of games) {
    const windowsReq = await prisma.requirement.create({ data: game.minimumRequirements.windows });
    const macReq = await prisma.requirement.create({ data: game.minimumRequirements.mac });
    const linuxReq = await prisma.requirement.create({ data: game.minimumRequirements.linux });

    await prisma.product.create({
      data: {
        name: game.name,
        value: game.value,
        discount: game.discount,
        description: game.description,
        indicativeRating: game.indicativeRating,
        rating: game.rating,
        releaseDate: game.releaseDate,
        file: game.file,
        fileSize: game.fileSize,
        workOn: game.workOn,
        photos: {
          create: game.photos.map(p => ({ photo: p.photo, type: p.type }))
        },
        languages: {
          create: game.languages.map(lang => ({
            language: lang.language,
            audio: lang.audio,
            text: lang.text
          }))
        },
        goodies: {
          create: game.goodies.map(g => ({ text: g.text }))
        },
        timeToBeats: {
          create: game.timeToBeats.map(value => ({ value }))
        },
        gameFeatures: {
          create: game.gameFeatures.map(gf => ({ name: gf.name }))
        },
        requirements: {
          create: {
            windowsId: windowsReq.id,
            macId: macReq.id,
            linuxId: linuxReq.id
          }
        },
        genres: {
          connectOrCreate: game.genres.map(name => ({
            where: { name },
            create: { name }
          }))
        },
        tags: {
          connectOrCreate: game.tags.map(name => ({
            where: { name },
            create: { name }
          }))
        },
        company: {
          connectOrCreate: {
            where: { name: game.company },
            create: { name: game.company }
          }
        },
        publisher: {
          connectOrCreate: {
            where: { name: game.publisher },
            create: { name: game.publisher }
          }
        }
      }
    });
  }

  console.log('Seed finalizado!');
}

seed()