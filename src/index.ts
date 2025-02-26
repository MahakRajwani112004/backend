import { env } from "./config/env.config";
import connectDB from "./config/db.config";
import app from "./app";

const PORT = env.app.PORT;
connectDB().then(() => {
  app.listen(env.app.PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

})
  .catch((error) => {
    console.log("Error Connecting DB!", error)
  })
