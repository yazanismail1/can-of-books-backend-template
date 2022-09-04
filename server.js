'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());


//----- mongoose configs -----//

mongoose.connect('mongodb://localhost:27017/Books', {useNewUrlParser: true, useUnifiedTopology: true});

const booksSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String
});

const book = mongoose.model('books', booksSchema);
 
// Seed data
async function seedData() {
  const firstBook = new book({
    title: "Atomic Habits",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
    status:"Available"
  })

  const secondBook = new book({
    title: "The leader who had no title",
    description: "A Modern Fable on Real Success in Business and in Life.",
    status:"Available"
  })
  
  const thirdBook = new book({
    title: "Make Your Bed",
    description: "Little Things That Can Change Your Life...and Maybe the World.",
    status:"Available"
  })
  
   const fourthBook = new book({
    title: "The 5AM Club",
    description: "Own Your Morning. Elevate Your Life.",
    status:"Available"
  })

  await firstBook.save();
  await secondBook.save();
  await thirdBook.save();
  await fourthBook.save();
}

// seedData();

const PORT = process.env.PORT;

app.get('/', homeRouteHandler)

function homeRouteHandler(req,res){
  res.send('Welcome to the home route') 
}

app.get('/books', booksRouteHandler)

function booksRouteHandler(req,res){
  book.find({},(err,result) =>{
    if(err){
      console.log(err)
    }
    else 
    {
      res.send(result)
    }
  })
}

app.get('/test', (req,res) => {

  res.send('test request received')

})

app.get('*', errorRouteHandler)

function errorRouteHandler(req,res){
  res.send('404 PAGE NOT FOUND!') 
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
