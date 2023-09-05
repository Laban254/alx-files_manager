import express from 'express';
import routes from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

//middleware to parse JSON request bodies,
app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
