import { Sequelize } from "sequelize";
 
const db = new Sequelize('melochord', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;