'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
app.get('/getbook',getbookhandler)



mongoose.connect('mongodb://localhost:27017/books', {useNewUrlParser: true, useUnifiedTopology: true}); // 1 - connect mongoose with DB



const bookSchema=new mongoose.Schema({
  title:String,
  description:String,
  status:String
});


const bookModle = mongoose.model('bookcollection', bookSchema);

async function seedData(){
  const firstBook= new bookModle({
    title:'The Wind in the Willows',
    description:'The story takes place in the countryside, and deals with the adventures of the animals that live on the banks of the river',
    status:'a novel'
  })

  const scundBook= new bookModle({
    title:'The Old Man and the Sea',
    description: 't revolves around the bravery of a Cuban fisherman, who has been struggling to reach shore. This story is a symbolic literature.', 
    status:'short story'
  })



  const thirdBook= new bookModle({
    title:'High Fidelity',
    description: 'The novel revolves around the main character "Rob", the owner of a vinyl store, and lives in North London. Rob suffers from a broken heart after his girlfriend leaves him, and the events unfold at a fast pace and funny dialogue between the characters',
    status:'a novel'
  })
await firstBook.save();
await scundBook.save();
await thirdBook.save();


}
//seedData();






function getbookhandler(req,res){
  bookModle.find({},(err,result)=>{
    if(err){
console.log(err);
    }
else{
  console.log(result);
  res.json(result);
}
  }
  
  )
}

app.get('*', errorRouteHandler)

function errorRouteHandler(req,res){
  res.send('404 PAGE NOT FOUND!') 
}


//http://localhost:3001/test
app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
