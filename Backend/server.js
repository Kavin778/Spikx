import express from 'express';
const app = express();
const port = 3000;
import userRoutes from './src/routes/user.routes.js';
import roomRoutes from './src/routes/room.routes.js';
import errorHandler from './src/middleware/errorHandler.js';

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});