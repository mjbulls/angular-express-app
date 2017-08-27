const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
var db = mongojs('mongodb://dbuser:dbuser@ds159013.mlab.com:59013/mytasklist_richard', ['boards']);

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res, next) => {
  res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.get('/boards', (req, res, next) => {

  db.boards.find((err, boards) => {
    if (err) {
      res.send(err);
    } else {
      res.json(boards)
    }
  });

});

router.get('/board/:id', (req, res, next) => {

  db.boards.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, board) => {
    if(err){
        res.send(err);
    }
    res.json(board);
  });

});

router.post('/board', (req, res, next) => {
  const board = req.body;
  if (!board.title || !board.content) {
    res.status(400).send('잘못된 요청');
  } else {
    db.boards.save(board, (err, board) => {
      if(err){
          res.send(err);
      }
      res.json(board);
    });
  }
});

router.put('/board/:id', (req, res, next) => {
  const board = req.body;
  const updBoard = {};

  if (board.title) {
    updBoard.title = title;
  }

  if (board.content) {
    updBoard.content = board.content;
  }

  if (!board) {
    res.status(400).send('잘못된 요청');
  } else {
    db.boards.update({_id: mongojs.ObjectId(req.params.id)}, updBoard, {}, (err, board) => {
      if(err){
          res.send(err);
      }
      res.json(board);
    });
  }
});

router.delete('/board/:id', (req, res, next) => {

  db.boards.removee({_id: mongojs.ObjectId(req.params.id)}, function(err, board){
    if(err){
        res.send(err);
    }
    res.json(board);
  });
  res.status(200).send('board-detailt' + req.params.id);
});

module.exports = router;
