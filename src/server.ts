import app from './app';
import * as https from 'https';
import * as fs from 'fs';
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})
