const db = require('../db/connection')
const app=require('../app')
const request = require('supertest')
const data=require('../db/data/test-data/index')
const seed = require('../db/seeds/seed')

beforeEach(()=>{
    return seed(data)
  })
  afterAll(()=>
  {
      db.end()
  })
  
  describe('GET topics', () => {
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
  
  describe('GET api', () => {
    test('should return a status code of 200 and describe all other possible endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200).then((endpoints) => {
            const expectedOutput = JSON.parse(fs.readFile('../endpoints.json'))
            expect(endpoints).toEqual(expectedOutput)
        })
    });
  });
