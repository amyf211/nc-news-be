const db = require('../db/connection')
const app=require('../app')
const request = require('supertest')
const data=require('../db/data/test-data/index')
const seed = require('../db/seeds/seed')
const endpoints = require('../endpoints.json')

beforeEach(()=>{
    return seed(data)
  })
  afterAll(()=>
  {
      db.end()
  })
  
  describe('GET /api/topics', () => {
    test('should return a status code of 200 and returns an array of topic objects with a slug and description', () => {
        return request(app)
        .get('/api/topics')
        .expect(200).then((topics) => {
            expect(Array.isArray(topics.body)).toBe(true)
            topics.body.forEach((topic) => {
                expect(topic).toMatchObject({
                    description: expect.any(String),
                    slug: expect.any(String)
                });
            })
        })
    });
  });
  
  describe('GET /api', () => {
    test('should return a status code of 200', () => {
        return request(app)
        .get('/api')
        .expect(200)
        })
        test('should return an object', () => {
            return request(app)
            .get('/api')
            .expect(200).then((response) => {
                expect(typeof response).toBe('object')
            })
            });
        test('should return the contents of endpoints.json', () => {
            return request(app)
            .get('/api')
            .expect(200)
            .then((response) => {
                const actualOutput = response.body.endpoints
                expect(actualOutput).toEqual(endpoints)
            });
        });
    });

    describe('GET /api/articles/:article_id', () => {
            test('should return 200 and the object that corresponds to that article id', () => {
                return request(app)
                .get('/api/articles/1')
                .expect(200).then((article) => {
                    expect(typeof article.body).toBe('object')
                    expect(article.body).toMatchObject({
                        article_id: 1,
                        title: 'Living in the shadow of a great man',
                        topic: 'mitch',
                        author: 'butter_bridge',
                        body: 'I find this existence challenging',
                        created_at: '2020-07-09T20:11:00.000Z',
                        votes: 100,
                        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
                    });
                })
            });
        test('should respond with a status code of 400 and a message when given an invalid id', () => {
            return request(app)
            .get('/api/articles/forklift')
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('Bad Request')
            })
        });
        test('should respond with a status code of 404 and a message when given an valid id that is non-existent', () => {
            return request(app)
            .get('/api/articles/1000')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual('Not Found')  
            })
        });
    });

    describe('GET /api/articles', () => {
        test('should return a status code of 200 and returns an array of objects with the article properties', () => {
            return request(app)
            .get('/api/articles')
            .expect(200).then((articles) => {
                expect(Array.isArray(articles.body)).toBe(true)
                articles.body.forEach((article) => {
                    expect(article).toMatchObject({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: expect.any(Number),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    });
                })
            })
        });
        // test('should be sorted by date created in descending order', () => {
        //     return request(app)
        //     .get('/api/articles')
        //     .expect(200).then((response) => {
                
        //     })
        // });
      });

    describe('GET /api/articles/:article_id/comments', () => {
        test('should return an array of comments with the correct properties and given article ID', () => {
            return request(app)
            .get('/api/articles/1/comments')
            .expect(200).then((comments) => {
                expect(Array.isArray(comments.body)).toBe(true)
                comments.body.forEach((comment) => {
                    expect(comment).toMatchObject({
                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        article_id: 1
                    });
                })
            })
        });
        test('should respond with a status code of 400 and a message when given an invalid id', () => {
            return request(app)
            .get('/api/articles/forklift/comments')
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('Bad Request')
            })
        });
        test('should respond with a status code of 404 and a message when given an valid id that is non-existent', () => {
            return request(app)
            .get('/api/articles/1000/comments')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual('Not Found')  
            })
        });
    });

      

