import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "12345",
    })
    .expect(201);
})

it("returns a 400 with an invalid email", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
          email: "testtest.com",
          password: "12345",
      })
      .expect(400);
})

it("returns a 400 with an invalid password", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
            email: "testsdfstest.com",
            password: "p" //this is an invalid since it is less than 4 characters
        })
        .expect(400);
})

it("returns a 400 with missing email and password", async () => {
    await request(app)//await or return can be used here
      .post("/api/users/signup")
      .send({}) //no email and password
        .expect(400);
})

it("disallows duplicate emails", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
            email: "test@test.com",
            password: "12345",
        })
        .expect(201);
    
    // await request(app)
    //   .post("/api/users/signup")
    //   .send({
    //         email: "test@test.com",
    //         password: "12345",
    //     })
    //     .expect(400);
})

it("sets a cookie after successful signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
            email: "test@test.com",
            password: "12345",
        })
        .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
    //.get is used to get the headers from the response
})