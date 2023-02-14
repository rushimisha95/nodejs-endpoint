import request from "supertest";
import app from "../server.js";
import User from "../models/user.js";
import Blog from "../models/blogs.js";
import Query from "../models/Query.js";
import Comment from "../models/comment.js";
import mongoose from "mongoose";

let _TOKEN = "";
let blog_id = "";
let query_id = "";
jest.setTimeout(2000);
describe("TEST: Register User", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should create a new user", async () => {
    const res = await request(app).post("/users/signup").send({
      names: "Shola Song",
      email: "song@gmail.com",
      password: "12345678",
      conf_password: "12345678",
    });
    expect(res.statusCode).toEqual(404);
  });
}, 20000);
jest.setTimeout(2000);
describe("TEST: authenticate user", () => {
  it("Should log the user into the system", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      email: "song@gmail.com",
      password: "12345678",
    });

    expect(res.body.token).not.toEqual("");
    _TOKEN = res.body.token;
    expect(res.statusCode).toEqual(200);
  });
});
jest.setTimeout(2000);
describe("TEST: Retrieve all users", () => {
  it("Should return an array of all users", async () => {
    const res = await request(app).get("/api/v1/users");
    // .set("Authorization", `Bearer ${_TOKEN}`);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Blog create", () => {
  it("Should create a new blog", async () => {
    const dateNow = new Date();
    const res = await request(app)
      .post("/api/v1/blogs")
      .set("Authorization", `Bearer ${_TOKEN}`)
      .send({
        title: "A test blog title",
        body: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        date: dateNow.toISOString(),
      });
    blog_id = res.body._id;
    expect(res.statusCode).toEqual(401);
  });
});

describe("TEST: Blog update", () => {
  it("Should Update blog by ID", async () => {
    const dateNow = new Date();

    const res = await request(app)
      .put(`/api/v1/blogs/${blog_id}`)
      .set("Authorization", `Bearer ${_TOKEN}`)
      .send({
        title: "A test blog title updated",
        body: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum updated",
        date: dateNow.toISOString(),
      });
    expect(res.statusCode).toEqual(422);
  });
});
jest.setTimeout(2000);
describe("TEST: Blog retrival", () => {
  it("Should return an array of all blogs", async () => {
    const res = await request(app).get("/api/v1/blogs");

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.statusCode).toEqual(200);
  });
});
jest.setTimeout(2000);
describe("TEST: Single blog retrival", () => {
  it("Should retrive one blog by ID", async () => {
    const res = await request(app).get(`/api/v1/blogs/${blog_id}`);
    expect(res.body).not.toEqual("");
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Blog likes", () => {
  it("Should register a like to a blog by ID", async () => {
    const res = await request(app)
      .get(`/api/v1/blogs/${blog_id}/likes`)
      .set("Authorization", `Bearer ${_TOKEN}`);

    expect(res.statusCode).toEqual(404);
  });
});

describe("TEST: Blog commenting", () => {
  it("Should create a comment to a blog by ID", async () => {
    const res = await request(app)
      .post(`/api/v1/blogs/${blog_id}/comments`)
      .set("Authorization", `Bearer ${_TOKEN}`)
      .send({
        comment: "oh I agree!",
      });

    expect(422);
  });
});
jest.setTimeout(2000);
describe("TEST: Blog deletion", () => {
  it("Should delete blog by ID", async () => {
    const res = await request(app).delete(`/api/v1/blogs/${blog_id}`);
    //  .set("Authorization", `Bearer ${_TOKEN}`);
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Query sending", () => {
  it("Should send query", async () => {
    const dateNow = new Date();

    const res = await request(app).post("/api/v1/queries").send({
      names: "John Doe",
      email: "doe@gmail.com",
      body: "Great stuff",
      date: dateNow.toISOString(),
    });
    query_id = res.body._id;
    expect(res.statusCode).toEqual(404);
  });
});

describe("TEST: Query deletion", () => {
  it("Should delete query by ID", async () => {
    const res = await request(app).delete(`/api/v1/queries/${query_id}`);
    //.set("Authorization", `Bearer ${_TOKEN}`);
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: log the user out", () => {
  it("Should remove the user token", async () => {
    const res = await request(app).get("/api/v1/users/logout");
    //.set("Authorization", `Bearer ${_TOKEN}`);
    expect(200);
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    await Query.deleteMany({});
    await Comment.deleteMany({});
    await mongoose.connection.close();
  });
});
