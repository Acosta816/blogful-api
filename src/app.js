require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const ArticlesService = require('./articles-service');

const app = express();

const morganSetting = NODE_ENV === 'production'? 'tiny' : 'dev';

app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());

//--------------------------------------------------------------------------BEGIN ENDPOINTS

//Endpoint#1
app.get('/articles', (req, res, next) => {
  const iknex = req.app.get('db'); //assigning the knex instance that we set onto app in the server.js using app.set() to iknex 
  
  ArticlesService.getAllArticles(iknex)
  .then( data => {
    return res.status(200).json(data)
  })
  .catch(next);

})

//Endpoint#2
app.get('/articles/:articleId',(req,res,next) => {
  const iknex = req.app.get('db');
  const articleId = req.params.articleId;
  console.log("Id selected: ",articleId)
  ArticlesService.getById(iknex, articleId)
    .then(data => {
      if (!data) {
        return res.status(404).json({
          error: { message: `Article doesn't exist` }
        })
      }
      return res.status(200).json(data)
    })
    .catch(next);
})



app.get('/', (req, res)=>{
  res.send("Hello, world!")
});

//--------------------------------------------------------------------------END ENDPOINTS


app.get(function errorHandler(error, req, res, next){
  let response;
  if(NODE_ENV === 'production'){
    response = { error: { message: 'server error, whoops' } }
  }
  else {
    console.error(error);
    response = { message: error.message, error}
  }

  res.status(500).json(response);
})

module.exports = app;