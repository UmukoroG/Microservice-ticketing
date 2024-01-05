import request from "supertest";
import { app } from "../../app";


it("responds with details about the current user", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "12345",
        })
        .expect(200);
    
    
    const cookie = await global.signin();

    const response = await request(app)
        .get("/api/users/currentuser")
        .set("Cookie", cookie)
        .send({
            email: "test@test.com",
            password: "12345",
        })
        .expect(200);

    // console.log(response.body);
    
});

it("responds with null if not authenticated", async () => {
    const response = await request(app)
        .get("/api/users/currentuser")
        .send({})
        .expect(200);

    expect(response.body.currentUser).toEqual(null);
})