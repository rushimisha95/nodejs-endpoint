import request from "supertest";
import router from "../routers/api/blogsRoutes";
import connectDB from "../config/connectDB.js";
import app from "../server.js";

jest.setTimeout(80000);
const comment = {
  comment: "Johnbook",
};
const blog = {
  title: "Johnbook",
  body: "rushimisha body is here",
  author: "rushimisha",
};
const blogWithoutTitle = {
  director: "Me Boligno Abdul",
};
describe("testing if database is connected", () => {
  beforeAll(async () => {
    await connectDB();
  });
  test("blog created  ", async () => {
    const { body } = await request(app)
      .post("/api/v1/blogs")
      .send(blog)
      .expect("Content-Type", /json/)
      .expect(422);
    //expect(body.message).toStrictEqual("Welcome to the movie api");
  });
  test("blog with out title  ", async () => {
    const { body } = await request(app)
      .post("/api/v1/blogs")
      .send(blogWithoutTitle)
      .expect("Content-Type", /json/)
      .expect(422);
    //expect(body.message).toStrictEqual("Welcome to the movie api");
  });
  test("GET single blog", async () => {
    const blog_id = "63e4e79d86bdba507f13c87f";
    //get the result expecting success and JSON data
    const resItem = await request(app)
      .get(`/api/v1/blogs/${blog_id}`)
      .expect(204);
  });

  test("delete single blog", async () => {
    const blog_id = "63e4e79d86bdba507f13c87f";
    //get the result expecting success and JSON data
    const resItem = await request(app)
      .delete(`/api/v1/blogs/${blog_id}`)
      .expect(204);
  });
  test("comment on single blog", async () => {
    const blog_id = "63e64fcded0536b9af6dc551";
    //get the result expecting success and JSON data
    const resItem = await request(app)
      .post(`/api/v1/blogs/${blog_id}/comments`)
      .send(comment)
      .expect(200);
  });
});
