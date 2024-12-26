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

let lastResponse;
let res;
let counter = 0;
const PORT = process.env.PORT || 4000;

const getNews = async () => {
  lastResponse = res;
  counter++;
  try {
    const { articles } = await newsapi.v2.topHeadlines({
      language: 'en',
      pageSize: 6,
      country: 'us',
      page: 1,
      sortBy: 'relevancy',
      category: 'sports',
    });

    return articles;
  } catch (err) {
    counter = 0;
    return lastResponse;
  }
};

setInterval(async () => {
  res = await getNews();
}, 900000);

io.on('connection', (socket) => {
  socket.emit('news', res);
  setInterval(async () => {
    socket.emit('news', res);
  }, 15000);
});

server.listen(PORT, async () => {
  console.log('Server connected on port: ' + PORT);
  res = await getNews();
});
