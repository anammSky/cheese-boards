import { Sequelize } from "sequelize";
import { join } from "path";
import * as url from "url";

const _dirname = url.fileURLToPath(new URL(".", import.meta.url));

const db = new Sequelize({
  dialect: "sqlite",
  storage: join(_dirname, "theCheeses.sqlite"),
  logging: false,
});

export default db;
