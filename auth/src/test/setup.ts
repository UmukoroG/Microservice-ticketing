import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {app} from '../app';
import request from 'supertest';

declare global {
    var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY='asdf';

    mongo = await MongoMemoryServer.create();;
    const mongoUri = mongo.getUri();//this is the uri to connect to the in memory mongo db
    await mongoose.connect(mongoUri,{});
    //this is to connect to the in memory mongo db
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections) {
        await collection.deleteMany({});
    }
    //this is to delete all the data in the collections before each test
})

afterAll(async () => {
    // run after all the tests are done
    if(mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
    //this is to close the connection to the in memory mongo db
})

global.signin = async () => {
    const email = 'test@test.com';
    const password = '12345';
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email,
            password,
        })
        .expect(201);
    const cookie = response.get("Set-Cookie");
    return cookie;
}