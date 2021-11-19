// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books= require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  res.render('books/details',{
    title:"Add a book",
    books:books
  });

  
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    let newBook = books({
      'Title':req.body.title,
      'Description':"",
      'Price':req.body.price,
      'Author':req.body.author,
      'Genre':req.body.genre
    });
    books.create(newBook,(err)=>{
      if(err){
        console.log(err);
        res.end(err);
      }
      else{
        res.redirect('/books');
      }
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

   let id = req.params.id;
   books.findById(id,(err,book) => {
     if(err){
       console.log(err);
       res.end(err);
     }
     else{
       res.render('books/details',{
         title:"Edit a book",
         books:book
       });
     }
   });
    
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id;
  let editedBook = books({
    "_id":id,
    'Title':req.body.title,
    'Description':"",
    'Price':req.body.price,
    'Author':req.body.author,
    'Genre':req.body.genre
  });
  books.update({_id:id},editedBook,(err)=>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/books');
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;
  books.remove({_id:id},(err)=>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/books');
    }
  });
});


module.exports = router;
