import "./config/env.config";
import { AppDataSource } from "./config/db.config";
import { env } from "./config/env.config";
import app from "./app";

const PORT = env.app.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(env.app.PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("❌ MongoDB connection error:", error));
