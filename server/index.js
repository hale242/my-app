// 'use strict';

// const app = require('./app');

// const PORT = process.env.PORT || 9000;

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });

const express = require("express");
const http = require('http');

const app = express();
const server = http.createServer(app);

// const path = require("path");
// const fs = require("fs"); 
// const { getPostById } = require("./stub/posts");

// const PORT = process.env.REACT_APP_PORT || "3000";
// const indexPath  = path.resolve(__dirname, '..', 'build', 'index.html');


// app.use(
//   express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
// );
// // app.get("/*", (req, res, next) => {
// app.get('/post', (req, res) => {

//     // res.send('Hello from /post route!');
//   fs.readFile(indexPath, 'utf8', (err, htmlData) => {
//       if (err) {
//           console.error('Error during file reading', err);
//           return res.status(404).end()
//       }
//       // get post info
//       const postId = req.query.id;
//       const post = getPostById(postId);
//       if(!post) return res.status(404).send("Post not found");
//       // inject meta tags
//       htmlData = htmlData.replace(
//           "<title>React App</title>",
//           `<title>${post.title}</title>`
//       )
//       .replace('__META_OG_TITLE__', post.title)
//       .replace('__META_OG_DESCRIPTION__', post.description)
//       .replace('__META_DESCRIPTION__', post.description)
//       .replace('__META_OG_IMAGE__', post.thumbnail)
//       return res.send(htmlData);
//   });
// });

// app.listen(PORT, (error) => {
//   if (error) {
//     return console.log("Error during app startup", error);
//   }
//   console.log("listening on " + PORT + "...");
// });


const PORT = 3001; // Your desired port number
const RETRY_DELAY = 1000; // Delay in milliseconds before retrying

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Retrying in ${RETRY_DELAY / 1000} seconds...`);
    setTimeout(() => {
      server.close();
      server.listen(PORT);
    }, RETRY_DELAY);
  } else {
    console.error('An error occurred:', error);
  }
});