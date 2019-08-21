const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const { createTestArticles } = require('./articles.fixtures');

const iknex = knex(
  {
    client: 'pg',
    connection: process.env.TEST_DB_URL,
  }
)

app.set('db', iknex);

const testArticles = createTestArticles(); //imported this function from articles.fixture which returns an array of testArticles


/*************************************************************** end of setup */

describe.only('MASTER_TestSuite: Articles Endpoints', ()=> {

  //for good measure, wipe any data that might be leftover in blogful_articles table
  before('wipe table for good measure', ()=> iknex('blogful_articles').truncate() );

  //after all below tests hav run, destroy knex-practice-TEST database connection so it doesn't hang.  ...(This is because we have an open database connection and the Node process thinks the script will want to stay running whilst the connection is open!)
  after('sever iknex connection from "blogful-test" database', ()=> iknex.destroy() );

/*-------------------------TESTING BEGINS------------------------------------ */ 

  describe('TestSuite#1: Endpoint: "GET /articles"', ()=> {
    
    context(`case#1: Given no articles are in database table...`, () => {
      it(`spec#1: responds with 200 and an empty array`, () => {
        return supertest(app)
          .get('/articles')
          .expect(200, [])
      })
    })
    
    
    context('case#2: WITH articles in database...',()=> {
      //inject test data into table
      beforeEach('seed fresh testdata before each case', ()=> iknex.insert(testArticles).into('blogful_articles') );
      //wipe test data from table
      afterEach('wipe clean after each case', ()=> iknex('blogful_articles').truncate() );

      //test1
      it('spec#1: responds with 200 and ALL articles', ()=> {
        return supertest(app)
        .get('/articles')
        .expect(200, testArticles);
      })
    })
    
  })

  describe('TestSuite#2: Endpoint: "GET /articles/:articleId"', ()=> {

    //test1
    context('case#1: Given "articleId" does not exist...', ()=> {

      it('spec#1: should respond with status 404', ()=> {
        const articleId = 12345678;
        return supertest(app)
          .get(`/articles/${articleId}`)
          .expect(404, { error: { message: `Article doesn't exist` } })
      })
    })


    //test2
    context('case#2: WITH articles in database...', ()=> {
      //inject test data into table
      beforeEach('seed fresh testdata before each case', ()=> iknex.insert(testArticles).into('blogful_articles') );
      //wipe test data from table
      afterEach('wipe clean after each case', ()=> iknex('blogful_articles').truncate() );
      
      it('spec#1: responds with 200 and specified article', ()=> {
        const articleId = 3;
        const expectedArticle = testArticles[articleId - 1];

        return supertest(app)
        .get(`/articles/${articleId}`)
        .expect(200, expectedArticle)
      })
    
    })


  })





/*-------------------------TESTING ENDS------------------------------------ */ 

});  //end of MASTER_TestSuite