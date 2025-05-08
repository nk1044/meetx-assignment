import 'dotenv/config';
import {app} from './app';
import {connectDB} from './config/db';

const port = process.env.PORT || 8002;


connectDB()
  .then(()=>{
    app.listen(port, () => {
      console.log(`Server running on PORT:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });
