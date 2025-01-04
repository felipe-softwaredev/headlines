import dotenv from 'dotenv';

import NewsAPI from 'newsapi';

import { Server } from 'socket.io';

import { createServer } from 'http';

import express from 'express';

import path from 'path';

const app = express();

dotenv.config();

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const server = createServer(app);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route for React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const io = new Server(server, {
  path: '/server.headlines',
  cors: { credentials: true, origin: true },
});

const categories = {
  business: null,
  entertainment: null,
  general: null,
  health: null,
  science: null,
  sports: null,
  technology: null,
};

const categoryIndices = {
  business: 0,
  entertainment: 0,
  general: 0,
  health: 0,
  science: 0,
  sports: 0,
  technology: 0,
};

const PORT = process.env.PORT || 4000;

async function getNews(category: string) {
  try {
    const { articles } = await newsapi.v2.topHeadlines({
      language: 'en',
      pageSize: 100,
      country: 'us',
      sortBy: 'relevancy',
      category,
    });

    return articles;
  } catch (err) {
    throw Error(err);
  }
}

async function fetchNewsForCategories() {
  try {
    for (const category in categories) {
      const articles = await getNews(category);

      categories[category] = articles;
      console.log(category, categories[category].length);
    }

    return categories;
  } catch (err) {
    console.log(err);
    return categories;
  }
}

async function filterNewsByCategory(config) {
  const categoriesObj = {};

  config.settings.forEach((setting) => {
    const category = setting.category;
    const index = categoryIndices[category];

    if (!(category in categoriesObj)) {
      setting.data = categories[category][index];

      categoriesObj[category] = index;
    } else {
      const updatedIndex = ++categoriesObj[category];

      setting.data = categories[category][updatedIndex];
      categoriesObj[category] = updatedIndex;
    }
  });

  return config;
}

function updateIndices() {
  for (const category in categoryIndices) {
    const index = categoryIndices[category];
    categoryIndices[category] = (index + 1) % categories[category].length;
  }
}

// setInterval(async () => {
//   await fetchNewsForCategories();
// }, 900000);

setInterval(async () => {
  updateIndices();
}, 300000);

io.on('connection', (socket) => {
  socket.on('assignId', async (config) => {
    socket.join(config.userId);

    let updatedConfig = await filterNewsByCategory(config);

    io.to(config.userId).emit('news', updatedConfig);
  });
});

server.listen(PORT, async () => {
  console.log('Server connected on port: ' + PORT);
  // await fetchNewsForCategories();
});
