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
  
  describe('GET /topics', () => {
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

