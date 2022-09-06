'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // 0 - import mongoose
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT||3000; 

//http:localhost:3001/test
app.get('/test', (request, response) => {
response.send('test request received')

})
// step 1
mongoose.connect('mongodb://localhost:27017/Bookstore2', 
{useNewUrlParser: true, useUnifiedTopology: true});

const Book = new mongoose.Schema({ //define the schema (structure)
  title: String,
  description: String,
  status: String
});
const ModelBooks = mongoose.model('Book', Book); //compile the schem into a model           
//step 2
// let seedData=require('./ModelScema');
// app.get('/seedData', seedData);

async function seedData(){
  const firstBook = new ModelBooks({
      title: "The Prophet and Other Writings",
      description: "Part of the Knickerbocker Classics series, a modern design makes this timeless book a perfect travel companion.",
      status: "Available"
  })

  const secondBook = new ModelBooks({
      title: "The Silent Patient",
      description: "The Richard and Judy bookclub pick and Sunday Times Bestseller: The record-breaking, multimillion copy Sunday Times bestselling thriller and Richard & Judy book club pick",
      status: "Not Available"
  })

  const thirdBook = new ModelBooks({
      title: "The Time Keeper",
      description: "From the author who's inspired millions worldwide with books like Tuesdays with Morrie and The Five People You Meet in Heaven comes his most imaginative novel yet, The Time Keeper--a compelling fable about the first man on Earth to count the hours.",
      status: "Avilable"
  })

  await firstBook.save();
  await secondBook.save();
  await thirdBook.save();
}
 
//seedData();
app.get('/test',testHandler);
// http://localhost:3001/addBook
app.post('/addBook',addBookHandler);
//http://localhost:3001/deleteBook/:id
app.delete('/deleteBook/:id',deleteBookHandler);
//http://localhost:3001/books
app.get('/books', getBooksHandler)

function testHandler(req,res) {
  res.status(200).send("You are requesting the test route");
}




function getBooksHandler(req,res) {
  ModelBooks.find({},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          console.log(result);
          res.json(result);
      }
  })
}
 
async function addBookHandler(req,res) {
  console.log(req.body);
  
  const {bookTitle,bookDescription,bookStatus} = req.body; //Destructuring assignment
  await ModelBooks.create({
      title : bookTitle,
      description : bookDescription,
      status:bookStatus
  });

  ModelBooks.find({},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          // console.log(result);
          res.send(result);
      }
  })
}

function deleteBookHandler(req,res) {
  const bookId = req.params.id;
  ModelBooks.deleteOne({_id:bookId},(err,result)=>{
      
    ModelBooks.find({},(err,result)=>{
          if(err)
          {
              console.log(err);
          }
          else
          {
              // console.log(result);
              res.send(result);
          }
      })

    })
  }

app.listen(PORT, () => console.log(`listening on ${PORT}`));
