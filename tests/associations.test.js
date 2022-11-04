const test_seed = require("./test_seed");
const { User, Cheese, Board } = require("../models");
const db = require("../db/db");

beforeEach(async () => {
  await db.sync({ force: true });
  await test_seed();
});
afterEach(async () => {
  await db.sync({ force: true });
});

describe("Checks the association between Users and Boards", () => {
  // Multiple Boards can be added to a User.
  test("should add one board to the a user", async () => {
    const boards = await Board.findAll();
    const bruce = await User.findOne({
      where: { name: "Bruce" },
      include: Board,
    });
    bruce.addBoards(boards[0]);
    expect((await bruce.getBoards()).length).toBe(1);
  });

  test("should add two boards to the a user", async () => {
    const boards = await Board.findAll();
    const bruce = await User.findOne({
      where: { name: "Bruce" },
      include: Board,
    });
    bruce.addBoards([boards[0], boards[3]]);
    expect((await bruce.getBoards()).length).toBe(2);
  });
});
