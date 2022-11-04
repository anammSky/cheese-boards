const test_seed = require("./test_seed");
const { User, Cheese, Board } = require("../models");
const db = require("../db/db");

beforeEach(async () => {
  //empties the db
  await db.sync({ force: true });
  // adds data to the db
  await test_seed();
});
// afterEach(async () => {
//   await db.sync({ force: true });
// });

describe("Checks the association between Users and Boards", () => {
  let boards, bruce;
  beforeEach(async () => {
    boards = await Board.findAll();
    bruce = await User.findOne({
      where: { name: "Bruce" },
      include: Board,
    });
  });
  // Multiple Boards can be added to a User.
  test("should add one board to the a user", async () => {
    bruce.addBoard(boards[0]);
    expect(await bruce.countBoards()).toBe(1);
  });

  test("should add two boards to the a user", async () => {
    bruce.addBoards([boards[0], boards[3]]);
    expect(await bruce.countBoards()).toBe(2);
  });

  test("should remove a board", async () => {
    bruce.addBoards([boards[0], boards[3]]);
    bruce.removeBoard(boards[0]);
    expect(await bruce.countBoards()).toBe(1);
  });

  test("should remove multiple board", async () => {
    bruce.addBoards([boards[0], boards[3]]);
    bruce.removeBoards([boards[0], boards[3]]);
    expect(await bruce.countBoards()).toBe(0);
  });
});

describe("Checks the association between Board and Cheeses", () => {
  let cheeses, board1, board2, board3;
  beforeEach(async () => {
    cheeses = await Cheese.findAll({ include: Board });
    board1 = await Board.findOne({ where: { id: 1 }, include: Cheese });
    board2 = await Board.findOne({ where: { id: 2 }, include: Cheese });
    board3 = await Board.findOne({ where: { id: 3 }, include: Cheese });

    await board1.addCheeses([cheeses[0], cheeses[3], cheeses[5]]);
    await board2.addCheeses([
      cheeses[0],
      cheeses[2],
      cheeses[3],
      cheeses[10],
      cheeses[18],
    ]);
    await board3.addCheeses([cheeses[3], cheeses[5], cheeses[10], cheeses[19]]);
  });
  test("should add multiple cheese to one board", async () => {
    expect(await board1.countCheeses()).toBe(3);
  });

  test("should check a cheese can be on many boards", async () => {
    expect(await cheeses[0].countBoards()).toBe(2);
  });

  //remove the cheese from one board check is still on the other board
  test("should check a cheese can be removed form only one board", async () => {
    board1.removeCheese(cheeses[0]);
    expect(await board1.hasCheese(cheeses[0])).toBeFalsy();
    expect(await board2.hasCheese(cheeses[0])).toBeTruthy();
  });
  //delete cheese -- removes from board

  //test if error when cheese added twice
});
