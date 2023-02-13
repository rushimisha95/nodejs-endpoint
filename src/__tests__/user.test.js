import request from "supertest";
import app from "../server.js";

import model from "../models/user.js";
import mongoose from "mongoose";
let blog_id = "63ea6977923675a6ed6318d8";
describe("TEST: Blog likes", () => {
  it("Should register a like to a blog by ID", async () => {
    const res = await request(app).get(`/api/v1/blogs/${blog_id}/likes`);
    //.set("Authorization", `Bearer ${_TOKEN}`);

    expect(res.statusCode).toEqual(404);
  });
});
