"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const database_1 = require("./config/database");
app_1.app.listen(database_1.env.port, () => {
    console.log(`Server running on port ${database_1.env.port}`);
});
