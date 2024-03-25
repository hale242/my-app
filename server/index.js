// 'use strict';

// const app = require('./app');

// const PORT = process.env.PORT || 9000;

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });

const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs"); 
const { getPostById } = require("./stub/posts");

const PORT = process.env.PORT || 3000;
const indexPath  = path.resolve(__dirname, '..', 'build', 'index.html');

// static resources should just be served as they are
app.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

// app.get("/*", (req, res, next) => {
app.get('/post', (req, res) => {

    // res.send('Hello from /post route!');
  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
      if (err) {
          console.error('Error during file reading', err);
          return res.status(404).end()
      }
      // get post info
      const postId = req.query.id;
      const post = getPostById(postId);
      if(!post) return res.status(404).send("Post not found");
      // inject meta tags
      htmlData = htmlData.replace(
          "<title>React App</title>",
          `<title>${post.title}</title>`
      )
      .replace('__META_OG_TITLE__', post.title)
      .replace('__META_OG_DESCRIPTION__', post.description)
      .replace('__META_DESCRIPTION__', post.description)
      .replace('__META_OG_IMAGE__', post.thumbnail)
      return res.send(htmlData);
  });
});

app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});
// app.get('/post', (req, res) => {
//     // Return response here
//     res.send('Hello from /post route!');
//   });

//   // Start the server
//   app.listen(3000, () => {
//     console.log('Server is running on port 3000');
//   });
