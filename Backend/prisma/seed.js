import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

const games = [
  {
    "name": "Minecraft",
    "value": 10,
    "description": "Minecraft",
    "indicativeRating": "r10",
    "rating": 4.6,
    "releaseDate": "2025-02-20",
    "file": "minecraft's file",
    "fileSize": 160000,
    "minimumRequirements": {
      "OS": "Windows 10+",
      "processor": "Intel I5 9400F",
      "memory": 4,
      "graphics": "GTX 3080",
      "directX": 11,
      "storage": 160000
    },
    "languages": [
      {"language": "BR"},
      {"language": "EN"}
    ],
    "colors": {
      "first": "103302",
      "second": "46a4e6",
      "third": "33cc0d",
      "fourth": "7dbdd3",
      "fifth": "331702",
      "sixth": "fff3e2",
      "title": "0b700b",
      "background1": "180b01",
      "background2": "000000"
    },
    "photos": [
      {"photo": "photos1.png", "type": "photos"},
      {"photo": "photos2.png", "type": "photos"},
      {"photo": "photos3.png", "type": "photos"},
      {"photo": "photos4.png", "type": "photos"},
      {"photo": "photos5.png", "type": "photos"},
      {"photo": "banner.png", "type": "banner"},
      {"photo": "thumbnail.png", "type": "thumbnail"},
      {"photo": "descriptionPhoto.png", "type": "descriptionPhoto"}
    ]
  },
  {
    "name": "Minecraft Dungeons",
    "value": 10,
    "description": "Minecraft Dungeons",
    "indicativeRating": "r10",
    "rating": 4.6,
    "releaseDate": "2025-02-20",
    "file": "minecraft-dungeons's file",
    "fileSize": 160000,
    "minimumRequirements": {
      "OS": "Windows 10+",
      "processor": "Intel I5 9400F",
      "memory": 4,
      "graphics": "GTX 3080",
      "directX": 11,
      "storage": 160000
    },
    "languages": [
      {"language": "BR"},
      {"language": "EN"}
    ],
    "colors": {
      "first": "dc622b",
      "second": "6e1d15",
      "third": "1bc7ff",
      "fourth": "15242b",
      "fifth": "140f0e",
      "sixth": "7dbdd3",
      "title": "1bc7ff",
      "background1": "18282e",
      "background2": "3b2121"
    },
    "photos": [
      {"photo": "photos1.png", "type": "photos"},
      {"photo": "photos2.png", "type": "photos"},
      {"photo": "photos3.png", "type": "photos"},
      {"photo": "photos4.png", "type": "photos"},
      {"photo": "photos5.png", "type": "photos"},
      {"photo": "banner.png", "type": "banner"},
      {"photo": "thumbnail.png", "type": "thumbnail"},
      {"photo": "descriptionPhoto.png", "type": "descriptionPhoto"}
    ]
  },
  {
    "name": "Minecraft Legends",
    "value": 10,
    "description": "Minecraft Legends",
    "indicativeRating": "r10",
    "rating": 4.6,
    "releaseDate": "2025-02-20",
    "file": "minecraft-legends's file",
    "fileSize": 160000,
    "minimumRequirements": {
      "OS": "Windows 10+",
      "processor": "Intel I5 9400F",
      "memory": 4,
      "graphics": "GTX 3080",
      "directX": 11,
      "storage": 160000
    },
    "languages": [
      {"language": "BR"},
      {"language": "EN"}
    ],
    "colors": {
      "first": "421c35",
      "second": "ffd33d",
      "third": "e67526",
      "fourth": "7f696e",
      "fifth": "080408",
      "sixth": "d4c8d6",
      "title": "e67526",
      "background1": "241119",
      "background2": "080408"
    },
    "photos": [
      {"photo": "photos1.png", "type": "photos"},
      {"photo": "photos2.png", "type": "photos"},
      {"photo": "photos3.png", "type": "photos"},
      {"photo": "photos4.png", "type": "photos"},
      {"photo": "photos5.png", "type": "photos"},
      {"photo": "banner.png", "type": "banner"},
      {"photo": "thumbnail.png", "type": "thumbnail"},
      {"photo": "descriptionPhoto.png", "type": "descriptionPhoto"}
    ]
  },
  {
    "name": "Minecraft Education",
    "value": 10,
    "description": "Minecraft Education",
    "indicativeRating": "r10",
    "rating": 4.6,
    "releaseDate": "2025-02-20",
    "file": "minecraft-education's file",
    "fileSize": 160000,
    "minimumRequirements": {
      "OS": "Windows 10+",
      "processor": "Intel I5 9400F",
      "memory": 4,
      "graphics": "GTX 3080",
      "directX": 11,
      "storage": 160000
    },
    "languages": [
      {"language": "BR"},
      {"language": "EN"}
    ],
    "colors": {
      "first": "5fa5ef",
      "second": "616467",
      "third": "538121",
      "fourth": "835926",
      "fifth": "8dc6f3",
      "sixth": "1e201f",
      "title": "46a0ca",
      "background1": "e6fffb",
      "background2": "273b21"
    },
    "photos": [
      {"photo": "photos1.png", "type": "photos"},
      {"photo": "photos2.png", "type": "photos"},
      {"photo": "photos3.png", "type": "photos"},
      {"photo": "photos4.png", "type": "photos"},
      {"photo": "photos5.png", "type": "photos"},
      {"photo": "banner.png", "type": "banner"},
      {"photo": "thumbnail.png", "type": "thumbnail"},
      {"photo": "descriptionPhoto.png", "type": "descriptionPhoto"}
    ]
  }
]

for (const game of games) {
  await prisma.product.create({
    data: {
      name: game.name,
      value: game.value,
      description: game.description,
      indicativeRating: game.indicativeRating,
      rating: game.rating,
      releaseDate: new Date(game.releaseDate),
      file: game.file,
      fileSize: game.fileSize,
      photos: {
        create: game.photos.map(photo => ({
          ...photo
        }))
      },
      languages: {
        connectOrCreate: game.languages.map(language => ({
          where: { language: language.language },
          create: { language: language.language }
        }))
      },
      minimumRequirements: {
        create: {
          ...game.minimumRequirements
        }
      },
      colors: {
        create: {
          ...game.colors
        }
      }
    },
  });
}