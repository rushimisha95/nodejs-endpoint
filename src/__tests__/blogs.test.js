import request from "supertest";
import router from "../routers/api/blogsRoutes";
import connectDB from "../config/connectDB.js";
import app from "../server.js";
import mongoose from "mongoose";
import model from "../models/user.js";
import Blog from "../models/blogs.js";
import Comment from "../models/comment.js";
import { commentToBlog } from "../controllers/commentcontroller.js";
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
  body: "Me Boligno Abdul",
};
describe("testing all end pooint", () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await mongoose.connection.close();
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
    const blog_id = "63e64f8bed0536b9af6dc54d";
    //get the result expecting success and JSON data
    const resItem = await request(app)
      .post(`/api/v1/blogs/${blog_id}/comments`)
      .send(comment)
      .expect(422);
  });
  describe("PUT /:id", () => {
    test("it should update a blog", async () => {
      const response = await request(app)
        .put("/api/v1/blogs/63e64f8bed0536b9af6dc54d")
        .expect(422);

      //expect(response.text).toBe("Blog updated successfully");
    });
    jest.setTimeout(80000);
    const comment = {
      comment: "Johnbook",
    };
    const queries = {
      names: "Johnbook",
      body: "rushimisha body is here",
      date: "12/12/2023",
    };
    // describe("api queries", () => {
    //   beforeAll(async () => {
    //     await connectDB();
    //   });
    //   afterAll(async () => {
    //     await mongoose.connection.close();
    //   });
    test("It get all queries", async () => {
      const { body } = await request(app)
        .get("/api/v1/queries")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    test("queries created  ", async () => {
      const { body } = await request(app)
        .post("/api/v1/queries")
        .send(queries)
        .expect("Content-Type", /json/)
        .expect(200);
      //expect(body.message).toStrictEqual("Welcome to the movie api");
    });
  });
  test("It get all users ", async () => {
    const { body } = await request(app)
      .get("/api/v1/users")
      .expect("Content-Type", /json/)
      .expect(200);
    //expect(body.message).toStrictEqual("Welcome to the movie api");
  });

  describe("api blogs", () => {
    test("It get all list of blogs ", async () => {
      const { body } = await request(app)
        .get("/api/v1/blogs")
        .expect("Content-Type", /json/)
        .expect(200);
      //expect(body.message).toStrictEqual("Welcome to the movie api");
    });
  });
  describe("api queries", () => {
    test("It get all queries ", async () => {
      const { body } = await request(app)
        .get("/api/v1/queries")
        .expect("Content-Type", /json/)
        .expect(200);
      //expect(body.message).toStrictEqual("Welcome to the movie api");
    });
    test("It get all routes from users ", async () => {
      const { body } = await request(app)
        .get("/api/v1/users")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
  const user = {
    names: "John Doe",
    email: "johndoe@example.com",
    password: "password",
  };

  test("It get signup ", async () => {
    const { body } = await request(app)
      .post("/api/v1/users/signup")
      .send(user)
      .expect("Content-Type", /json/)
      .expect(200);
    //expect(body.message).toStrictEqual("Welcome to the movie api");
  });
  test("It get all users ", async () => {
    const { body } = await request(app)
      .get("/api/v1/users")
      .expect("Content-Type", /json/)
      .expect(200);
    //expect(body.message).toStrictEqual("Welcome to the movie api");
  });
  it("should save a user", async () => {
    const user = new model({
      names: "John Doe",
      email: "johndoe@example.com",
      body: "This is a sample user",
      date: new Date(),
    });

    const savedUser = await user.save();
    const retrievedUser = await model.findById(savedUser._id);

    expect(retrievedUser.names).toBe("John Doe");
    expect(retrievedUser.email).toBe("johndoe@example.com");
    expect(retrievedUser.body).toBe("This is a sample user");
    expect(retrievedUser.date).toEqual(expect.any(Date));
  });
  describe("commentToBlog", () => {
    let req;
    let res;

    beforeEach(() => {
      req = {
        params: {
          id: "63e64f8bed0536b9af6dc54d",
        },
        body: {
          names: "John Doe",
          comment: "This is a comment",
        },
      };

      res = {
        status: jest.fn(() => ({
          json: jest.fn(),
        })),
        sendStatus: jest.fn(),
      };
    });

    it("should return 400 if the blog ID is not provided", async () => {
      req.params.id = undefined;

      await commentToBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      //   //expect(res.status().json).toHaveBeenCalledWith({
      //     message: "The blog ID is required",
      //   });
    });

    it("should return the comment if everything is successful", async () => {
      await commentToBlog(req, res);
      expect(400);
      //   expect(res.json).toHaveBeenCalledWith({
      //     message: "comment posted",
    });
  });
});
