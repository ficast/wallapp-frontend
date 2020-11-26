import Api from "../../src/services/Api";

describe("Testing createUser method", () => {
  it("throw error while creating user without params", async () => {
    try {
      await Api.createUser();
    } catch (e) {
      expect(e.response.data).toStrictEqual([
        {
          message: "Name should contain minimum of 3 characters",
        },
        {
          message: "Invalid email",
        },
        {
          message: "Password must contain minimum of 6 characters",
        },
      ]);
    }
  });
});

describe("Testing authUser method", () => {
  it("auth user correctly", async () => {
    try {
      const response = await Api.authUser({
        email: "filipeyoga@gmail.com",
        password: 123456789,
      });
      expect(response.data).toStrictEqual({
        email: "filipeyoga@gmail.com",
        name: "Filipe Oliveira",
        id: "5f94cd241edffe34020cb923",
      });
    } catch (e) {
      console.log(e);
    }
  });
});

describe("Testing getPosts method", () => {
  it("return first 10 results", async () => {
    try {
      const response = await Api.getPosts(0);
      expect(response.items.length).toBe(10);
      expect(response.items[0]._id).toBeDefined();
      expect(response.items[0].title).toBeDefined();
      expect(response.items[0].body).toBeDefined();
    } catch (e) {
      console.log(e);
    }
  });
});

describe("Testing createPòst method", () => {
  it("throw error while creating post without params", async () => {
    try {
      await Api.createPost({
        title: "test",
        body: "test message",
      });
    } catch (e) {
      expect(e.response.data.message).toBe("Restricted Access");
    }
  });
});
