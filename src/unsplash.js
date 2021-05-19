const express = require("express");
const router = express.Router();
const fetch = require('node-fetch').default;

const {createApi} = require('unsplash-js');

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch
});

router.get('/', (req, res) => {
   res.send({
     status: 200,
     message: "Success"
   })
});

router.get('/photos', (req, res) => {
  console.log("hello");
  const {per_page, page} = req.query;

  unsplash.photos.list({
    page,
    perPage: per_page,
  })
    .then(result => {
      if (result.errors) {
        console.log("Something went wrong: ", result.errors[0]);
        res.send(result)
      } else {
        res.send(result);
      }
    })
});

router.get('/photos/random', (req, res) => {
  const {count, query} = req.query;

  unsplash.photos.getRandom({
    query,
    count
  }).then(result => {
    if (result.errors) {
      console.log("Something went wrong: ", result.errors[0]);
      res.send(result)
    } else {
      res.send(result);
    }
  })
    .catch(err => {
      console.log(err.message)
      res.send("Error")
    })
});

router.get('/photos/:photoId', (req, res) => {
  const {photoId} = req.params;

  unsplash.photos.get({
    photoId
  })
    .then(result => {
      if (result.erros) {
        console.log(result.errors);
        res.send(result)
      } else {
        res.send(result)
      }
    })
    .catch(err => {
      console.log(err);
    })
});

router.get('/search/photos', (req, res) => {
  const {query, per_page, page} = req.query;

  unsplash.search.getPhotos({
    query,
    perPage: per_page,
    page
  })
    .then(result => {
      if (result.errors) {
        console.log("Something went wrong: ", result.errors[0]);
        res.send(result)
      } else {
        res.send(result)
      }
    })
})

module.exports = router;