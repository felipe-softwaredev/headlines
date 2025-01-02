import express from 'express';
import dotenv from 'dotenv';
import expressWs from 'express-ws';
import NewsAPI from 'newsapi';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const expressWsInstance = expressWs(app);
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
app.use(cors({}));

const buildPath = path.join(process.cwd(), 'client/build');
app.use(express.static(buildPath));
app.use(cors({ credentials: true, origin: true }));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { credentials: true, origin: true },
});

const categories = {
  business: [],
  entertainment: [],
  general: [],
  health: [],
  science: [],
  sports: [],
  technology: [],
};

let pageCounter = 1;
const PORT = process.env.PORT || 4000;

const getNews = async (category: string) => {
  // lastResponse = categories;

  try {
    const { articles } = await newsapi.v2.topHeadlines({
      language: 'en',
      pageSize: 100,
      country: 'us',
      // page: pageCounter,
      sortBy: 'relevancy',
      category,
    });

    return articles;
  } catch (err) {
    // pageCounter = 0;
    // console.log(err);
    // return lastResponse;
    throw Error(err);
  }
};

const fetchNewsForCategories = async () => {
  // const newsByCategory = {};

  try {
    for (const category in categories) {
      const articles = await getNews(category);
      // newsByCategory[category] = articles;
      categories[category] = articles;
      console.log(category, categories[category].length);
    }
    // pageCounter++;
    return categories;
  } catch (err) {
    // pageCounter = 0;
    console.log(err);
    return categories;
  }
};

const filterNewsByCategory = async (config: any) => {
  // const object = {};
  // c.forEach((category) => {
  //   if (!object[category]) {
  //     object[category] = [res[category][0]];
  //   } else {
  //     const nextIndex = object[category].length;
  //     object[category].push(res[category][nextIndex]);
  //   }
  // });
  // return object;

  const categoriesObj = {};

  config.settings.forEach((setting) => {
    if (!categoriesObj[setting.category]) {
      setting.data = categories[setting.category][0];
      categoriesObj[setting.category] = 1;
    } else {
      let idx = categoriesObj[setting.category];
      setting.data = categories[setting.category][idx];
      categoriesObj[setting.category] = ++idx;
    }
  });

  // config.settings.forEach((setting) => {
  //   // const categoryArray = categories[setting.category];
  //   // console.log(setting.category, categoryArray);
  //   setting.data = categories[setting.category].splice(0, 1);
  //   // categoryArray.splice(0, 1);
  //   // console.log(setting.category, categoryArray);
  //   // categoriesObj[setting.category] = 1;
  // });

  // config.settings.forEach((setting) => {
  //   if (!categoriesObj[setting.category]) {
  //     setting.data = 1;
  //     categoriesObj[setting.category] = setting.data;
  //   } else {
  //     let idx = ++categoriesObj[setting.category];
  //     setting.data = idx;
  //     categoriesObj[setting.category] = idx;
  //   }
  // });

  return config;

  // return config;

  // usersCategories.forEach((category, index) => {
  //   console.log(category, index);
  //   categories[category] ? console.log(true) : console.log(false);
  // });
};

// setInterval(async () => {
//   await fetchNewsForCategories();
// }, 900000);
// setInterval(async () => {
//   // res = await getNews();
//   console.log('hello');
// }, 2000);

// io.on('connection', async (socket) => {
//   // console.log(socket.handshake.auth.defaultColors[0]);
//   // res = await getNews();
//   socket.join('some room');

//   console.log('hi');
//   socket.on('news', (uid) => {
//     console.log(uid);
//     io.emit('news', uid);
//   });

//   setInterval(async () => {
//     socket.emit('news', res);
//   }, 15000);
// });

const userIntervals = {}; // Object to track intervals by userId

io.on('connection', (socket) => {
  socket.on('assignId', async (config) => {
    console.log(`Received userId from client: ${config.userId}`);

    // Join the user to their room
    socket.join(config.userId);

    // Clear any existing interval for this user
    // if (userIntervals[config.userId]) {
    //   clearInterval(userIntervals[config.userId]);
    //   delete userIntervals[config.userId];
    // }

    let updatedConfig = await filterNewsByCategory(config);

    io.to(config.userId).emit('news', updatedConfig);

    // const intervalId = setInterval(async () => {
    //   console.log(config);
    //   updatedConfig = await filterNewsByCategory(config);
    //   io.to(config.userId).emit('news', updatedConfig);
    // }, 5000);

    // userIntervals[config.userId] = intervalId;

    // Clean up when the socket disconnects
    // socket.on('disconnect', () => {
    //   if (userIntervals[config.userId]) {
    //     clearInterval(userIntervals[config.userId]);
    //     delete userIntervals[config.userId];
    //   }
    // });
  });
});

server.listen(PORT, async () => {
  console.log('Server connected on port: ' + PORT);
  await fetchNewsForCategories();
  // console.log(res);
});

// server.listen(PORT, async () => {
//   console.log('Server connected on port: ' + PORT);
//   res = await getNews();
//   console.log(res);
// });
