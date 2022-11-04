const { User, Cheese, Board } = require("../models");
const db = require("../db/db");

beforeEach(async () => {
  await db.sync({ force: true });
});
afterEach(async () => {
  await db.sync({ force: true });
});

describe("Checks the models are created correctly", () => {
  const models = Object.keys(db.models);

  test("database class should contain User model", () => {
    expect(models).toContain("User");
  });

  test("database class should contain Cheese model", () => {
    expect(models).toContain("Cheese");
  });

  test("database class should contain Board model", () => {
    expect(models).toContain("Board");
  });
});

describe("User Model", () => {
  test("can insert data into table", async () => {
    await User.create({
      name: "Bruce",
      email: "iamthenight@gmail.com",
    });
    const newUser = await User.findAll({ where: { name: "Bruce" } });

    expect(newUser[0].getDataValue("name")).toMatch("Bruce");
  });
});

describe("Cheese Model", () => {
  test("can insert data into table", async () => {
    await Cheese.create({
      title: "Parmesan",
      description:
        "The flavor power of parmesan can take a savory dish from acceptable to amazing with a dusting of this delicious cheese. Lots of words are used to describe parmesan: rich, tangy, nutty, sharp, complex, fruity, and bold to name a few. It has a somewhat gritty texture and a strong umami taste.",
    });
    const newCheese = await Cheese.findAll({ where: { title: "Parmesan" } });
    expect(newCheese[0].getDataValue("title")).toMatch("Parmesan");
  });
});

describe("Board Model", () => {
  test("can insert data into table", async () => {
    await Board.create({
      type: "The French Experience",
      description:
        "A perfectly paired French box, filled with some of the best products we have found along our French food adventures.",
      rating: 5,
    });
    const newBoard = await Board.findAll({
      where: { type: "The French Experience" },
    });
    expect(newBoard[0].getDataValue("type")).toMatch("The French Experience");
  });
});
