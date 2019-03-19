/*******************************************************************************
 * All Routes
 ******************************************************************************/
import * as path from "path";
import * as fs from "fs";

const routes = (app: express.Application ) => {
    fs.readdirSync(__dirname).filter((file) => {
        return path.join(__dirname, file) != __filename;
    }).forEach((file) => {
        require('./' + path.basename(file))(app);
    });
};

module.exports = routes;
