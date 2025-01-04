'use client';

import { io } from 'socket.io-client';

// // Adjust the URL and path as necessary and set the path to same as the path created for the server-side websocket.
// // const socketUrl = 'https://p-c-test-deploy.vercel.app';
export const socket = io(import.meta.env.VITE_APP_URL, {
  path: import.meta.env.VITE_SERVER_PATH,
  // auth: {
  //   id: uuidv4(),
  // },
});

// export const socket = io({
//   path: import.meta.env.VITE_APP_URL,
// });
