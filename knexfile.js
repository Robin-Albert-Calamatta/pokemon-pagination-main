const { resolve, sep } = require("path");

module.exports = {
    client: "sqlite3",
    connection: {
        filename: resolve(`.${sep}pokemon.db`)
    },
    useNullAsDefault: false
};
//process.env.PWD,
