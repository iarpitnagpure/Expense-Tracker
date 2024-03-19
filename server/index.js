import 'dotenv/config';
import express from 'express';
import { connectToDatabase } from './utility/db.js';
import { startApolloServer } from './utility/graphql.js';

const port = process.env.PORT || 5000;
const app = express();

startApolloServer(app);

app.listen(port, () => {
    console.log(`Sever connected to port ${port}`);
    connectToDatabase();
});