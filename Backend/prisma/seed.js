import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const games = [
    {
      name: "Minecraft",
      discount: 5,
      discountUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      value: 10,
      description: "Explore mundos infinitos e construa de tudo, desde casas simples até castelos grandiosos. Jogue no modo criativo com recursos ilimitados ou cave fundo no mundo no modo de sobrevivência.",
      indicativeRating: "r10",
      rating: 4.8,
      releaseDate: new Date("2011-11-18"),
      file: "minecraft-installer.exe",
      fileSize: 150000,
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
        { language: "Português (Brasil)", audio: false, text: true },
        { language: "Inglês", audio: true, text: true },
        { language: "Espanhol", audio: false, text: true },
        { language: "Alemão", audio: false, text: true },
        { language: "Francês", audio: false, text: true }
      ],
      goodies: [
        { text: "Wallpaper exclusivo" },
        { text: "Trilha sonora digital" },
        { text: "Livro de arte em PDF" }
      ],
      timeToBeats: [15, 30, 100, 40],
      gameFeatures: [
        { name: "Multiplayer Online" },
        { name: "Modo Criativo" },
        { name: "Modo Sobrevivência" },
        { name: "Mods Suportados" },
        { name: "Mundo Aberto" },
        { name: "Crafting" }
      ],
      minimumRequirements: {
        windows: {
          OS: "Windows 10",
          processor: "Intel Core i3-3210",
          memory: 4,
          graphics: "Intel HD Graphics 4000",
          directX: 11,
          storage: 150000
        },
        mac: {
          OS: "macOS Mojave",
          processor: "Intel Core i5",
          memory: 4,
          graphics: "Intel Iris Plus",
          directX: 12,
          storage: 150000
        },
        linux: {
          OS: "Ubuntu 20.04",
          processor: "Intel Core i3",
          memory: 4,
          graphics: "Mesa Intel HD Graphics",
          directX: 11,
          storage: 150000
        }
      },
      workOn: "Windows (7+), Linux (Ubuntu 18.04+), Mac OS X (10.12+)",
      company: "Mojang Studios",
      publisher: "Mojang Studios",
      genres: ["Aventura", "Sobrevivência", "Sandbox", "Criativo", "Mundo Aberto"],
      tags: ["Mundo Aberto", "Construção", "Multiplayer", "Exploração", "Criativo", "Mods", "Pixelado", "Crafting"]
    },
    {
      name: "Minecraft Legends",
      discount: 10,
      discountUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      value: 25,
      description: "Lidere batalhas épicas no universo Minecraft em um jogo de estratégia em tempo real. Reúna aliados, construa defesas e defenda a Overworld da ameaça dos Piglins.",
      indicativeRating: "r10",
      rating: 4.2,
      releaseDate: new Date("2023-04-18"),
      file: "minecraft-legends-installer.exe",
      fileSize: 220000,
      photos: [
        { photo: "banner.png", type: "banner" },
        { photo: "descriptionPhoto1.webp", type: "descriptionPhoto" },
        { photo: "descriptionPhoto2.webp", type: "descriptionPhoto" },
        { photo: "photos1.webp", type: "photos" },
        { photo: "photos2.jpg", type: "photos" },
        { photo: "photos3.webp", type: "photos" },
        { photo: "photos4.webp", type: "photos" },
        { photo: "photos5.webp", type: "photos" }
      ],
      languages: [
        { language: "Português (Brasil)", audio: true, text: true },
        { language: "Inglês", audio: true, text: true },
        { language: "Espanhol", audio: true, text: true },
        { language: "Francês", audio: true, text: true }
      ],
      goodies: [
        { text: "Skin exclusiva de montaria" },
        { text: "Wallpaper temático" }
      ],
      timeToBeats: [10, 15, 25, 13],
      gameFeatures: [
        { name: "Campanha Solo" },
        { name: "Co-op Online" },
        { name: "PvP Competitivo" },
        { name: "Comandos de Unidade" }
      ],
      minimumRequirements: {
        windows: {
          OS: "Windows 10 64-bit",
          processor: "Intel Core i5-4690",
          memory: 8,
          graphics: "GeForce GTX 780",
          directX: 12,
          storage: 220000
        },
        mac: {
          OS: "macOS Ventura",
          processor: "Apple M1",
          memory: 8,
          graphics: "Apple GPU",
          directX: 12,
          storage: 220000
        },
        linux: {
          OS: "Ubuntu 22.04",
          processor: "Ryzen 5 2600",
          memory: 8,
          graphics: "RX 580",
          directX: 12,
          storage: 220000
        }
      },
      workOn: "Windows, Mac (M1+), Linux (via Wine)",
      company: "Mojang Studios",
      publisher: "Xbox Game Studios",
      genres: ["Estratégia em Tempo Real", "Aventura", "Ação"],
      tags: ["RTS", "Minecraft", "Piglins", "Exploração", "Multiplayer", "Tático"]
    },
    {
      name: "Minecraft Dungeons",
      discount: 0,
      discountUntil: null,
      value: 20,
      description: "Embarque em uma nova aventura de ação no universo Minecraft! Lute contra hordas de inimigos em masmorras perigosas, sozinho ou com amigos.",
      indicativeRating: "r10",
      rating: 4.4,
      releaseDate: new Date("2020-05-26"),
      file: "minecraft-dungeons-setup.exe",
      fileSize: 180000,
      photos: [
        { photo: "banner.png", type: "banner" },
        { photo: "descriptionPhoto1.webp", type: "descriptionPhoto" },
        { photo: "descriptionPhoto2.webp", type: "descriptionPhoto" },
        { photo: "photos1.avif", type: "photos" },
        { photo: "photos2.avif", type: "photos" },
        { photo: "photos3.webp", type: "photos" },
        { photo: "photos4.webp", type: "photos" },
        { photo: "photos5.avif", type: "photos" }
      ],
      languages: [
        { language: "Português", audio: true, text: true },
        { language: "Inglês", audio: true, text: true },
        { language: "Francês", audio: true, text: true }
      ],
      goodies: [
        { text: "Capa exclusiva de herói" },
        { text: "Trilha sonora digital" }
      ],
      timeToBeats: [6, 10, 15, 8],
      gameFeatures: [
        { name: "Co-op Local e Online" },
        { name: "Progressão de Personagem" },
        { name: "Itens Lendários" },
        { name: "Chefes Desafiadores" }
      ],
      minimumRequirements: {
        windows: {
          OS: "Windows 10",
          processor: "Intel Core i5-2400",
          memory: 8,
          graphics: "GeForce GTX 660",
          directX: 11,
          storage: 180000
        },
        mac: {
          OS: "macOS Monterey",
          processor: "Intel Core i5",
          memory: 8,
          graphics: "Intel Iris",
          directX: 12,
          storage: 180000
        },
        linux: {
          OS: "Ubuntu 20.04",
          processor: "Ryzen 3 1200",
          memory: 8,
          graphics: "GTX 750 Ti",
          directX: 11,
          storage: 180000
        }
      },
      workOn: "Windows, Mac OS X, Linux (via Wine)",
      company: "Mojang Studios",
      publisher: "Xbox Game Studios",
      genres: ["Ação", "Dungeon Crawler", "RPG"],
      tags: ["Hack and Slash", "Co-op", "Aventura", "Exploração", "Loot", "PvE"]
    },
    {
      name: "Minecraft Education",
      discount: 0,
      discountUntil: null,
      value: 0,
      description: "Versão educacional do Minecraft voltada para o ensino de diversas disciplinas como química, programação, história e matemática, usada por professores em todo o mundo.",
      indicativeRating: "rL",
      rating: 4.7,
      releaseDate: new Date("2016-11-01"),
      file: "minecraft-education.exe",
      fileSize: 140000,
      photos: [
        { photo: "banner.png", type: "banner" },
        { photo: "descriptionPhoto1.avif", type: "descriptionPhoto" },
        { photo: "descriptionPhoto2.avif", type: "descriptionPhoto" },
        { photo: "photos1.avif", type: "photos" },
        { photo: "photos2.avif", type: "photos" },
        { photo: "photos3.avif", type: "photos" },
        { photo: "photos4.avif", type: "photos" },
        { photo: "photos5.avif", type: "photos" }
      ],
      languages: [
        { language: "Português", audio: false, text: true },
        { language: "Inglês", audio: true, text: true },
        { language: "Espanhol", audio: false, text: true }
      ],
      goodies: [
        { text: "Plano de aula de ciências" },
        { text: "Mapa exclusivo de programação" }
      ],
      timeToBeats: [0, 0, 0, 0],
      gameFeatures: [
        { name: "Modo Educacional" },
        { name: "Simulador de Química" },
        { name: "Programação com Blocos" },
        { name: "Multiplayer Educacional" }
      ],
      minimumRequirements: {
        windows: {
          OS: "Windows 10",
          processor: "Intel Core i3",
          memory: 4,
          graphics: "Intel HD Graphics 4000",
          directX: 11,
          storage: 140000
        },
        mac: {
          OS: "macOS High Sierra",
          processor: "Intel Core i3",
          memory: 4,
          graphics: "Intel Iris",
          directX: 11,
          storage: 140000
        },
        linux: {
          OS: "Ubuntu 18.04",
          processor: "Intel Core i3",
          memory: 4,
          graphics: "Intel HD",
          directX: 11,
          storage: 140000
        }
      },
      workOn: "Windows, Mac, Linux (via Wine)",
      company: "Mojang Studios",
      publisher: "Microsoft Education",
      genres: ["Educacional", "Sandbox", "Criativo"],
      tags: ["Educação", "Programação", "STEM", "Simulação", "História", "Matemática"]
    }            
  ]

  for (const game of games) {
    const windowsReq = await prisma.requirement.create({ data: game.minimumRequirements.windows });
    const macReq = await prisma.requirement.create({ data: game.minimumRequirements.mac });
    const linuxReq = await prisma.requirement.create({ data: game.minimumRequirements.linux });

    await prisma.product.create({
      data: {
        name: game.name,
        value: game.value,
        discount: game.discount,
        discountUntil: game.discountUntil,
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

seed();