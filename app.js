import express from 'express';
import 'dotenv/config';
import logMiddleware from './middlewares/log.middleware.js';
import admins from './routes/admins.route.js';
import atlasConnection from './database/mongo-connection.js';
import notes from './routes/notes.route.js'
//import bcrypt from 'bcrypt'

await atlasConnection();
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(logMiddleware);
app.use(admins);
app.use(notes);


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

export default app;
