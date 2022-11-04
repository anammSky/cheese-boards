import Cheese from "./Cheese.model";
import Board from "./Board.model";
import User from "./User.model";

// Users < - > Boards: one-to-many
// multiple Boards can be added to a User
User.hasMany(Board);
Board.belongsTo(User);

// Boards < - > Cheeses: many-to-many
// Board can have many Cheeses
// Cheese can be on many Boards
Board.belongsToMany(Cheese, { through: "Cheeseboard" });
Cheese.belongsToMany(Board, { through: "Cheeseboard" });

export { Cheese, Board, User };
