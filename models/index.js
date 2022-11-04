const Cheese = require("./Cheese.model");
const Board = require("./Board.model");
const User = require("./User.model");

// Users < - > Boards: one-to-many
// multiple Boards can be added to a User
User.hasMany(Board);
Board.belongsTo(User);

// Boards < - > Cheeses: many-to-many
// Board can have many Cheeses
// Cheese can be on many Boards
Board.belongsToMany(Cheese, { through: "Cheeseboard" });
Cheese.belongsToMany(Board, { through: "Cheeseboard" });

module.exports = { Cheese, Board, User };
