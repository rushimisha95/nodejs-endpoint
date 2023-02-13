// import request from "supertest";
// import router from "../routers/api/userRoutes.js";
// //import server from "../server.js";
// import connectDB from "../config/connectDB.js";
// import app from "../server.js";
// jest.setTimeout(80000);

// test("It get all users ", async () => {
//   const { body } = await request(app)
//     .get("/api/v1/users")
//     .expect("Content-Type", /json/)
//     .expect(200);
//   //expect(body.message).toStrictEqual("Welcome to the movie api");
// });

// describe("api blogs", () => {
//   test("It get all list of blogs ", async () => {
//     const { body } = await request(app)
//       .get("/api/v1/blogs")
//       .expect("Content-Type", /json/)
//       .expect(200);
//     //expect(body.message).toStrictEqual("Welcome to the movie api");
//   });
// });
// describe("api queries", () => {
//   test("It get all queries ", async () => {
//     const { body } = await request(app)
//       .get("/api/v1/queries")
//       .expect("Content-Type", /json/)
//       .expect(200);
//     //expect(body.message).toStrictEqual("Welcome to the movie api");
//   });
//   test("It get all routes from users ", async () => {
//     const { body } = await request(app)
//       .get("/api/v1/users")
//       .expect("Content-Type", /json/)
//       .expect(200);
//   });
// });
