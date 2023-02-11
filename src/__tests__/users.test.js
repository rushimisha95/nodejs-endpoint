import request from "supertest";
import router from "../routers/api/userRoutes.js";
import connectDB from "../config/connectDB.js";
import app from "../server.js";

jest.setTimeout(80000);
const user = {
  names: "John Doe",
  email: "johndoe@example.com",
  password: "password",
};
describe("testing if database is connected", () => {
  beforeAll(async () => {
    await connectDB();
  });
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
});
