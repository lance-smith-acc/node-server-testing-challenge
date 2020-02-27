const request = require("supertest");

const server = require('../server');

describe("router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("GET /api/users", function() {
    it("should return 200", function() {
      return request(server)
        .get("/api/users")
        .then(res => {
          expect(res.status).toBe(200);
        });
  
    });

    it("should return users as an array", function() {
      return request(server)
        .get("/api/users")
        .then(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
    
  })

  describe("POST /api/login", function() {
    it("should return 500 for no credentials", function() {
      return request(server)
        .post("/api/login")
        .then(res => {
          expect(res.status).toBe(500);
        }); 
    });

    it("should return 200", function() {
      return request(server)
        .post("/api/login")
        .send({username:'test', password:'test', })
        .set('Accept', 'application/json')
        .then(res => {
          expect(res.status).toBe(200);
        }); 
    });
    
    it("should return 401", function() {
      return request(server)
        .post("/api/login")
        .send({username:'test', password:'test1', })
        .set('Accept', 'application/json')
        .then(res => {
          expect(res.status).toBe(401);
        }); 
    });

  })
})