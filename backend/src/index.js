import dotenv from "dotenv";
import connectDB from "./db/connect.db.js";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });

connectDB()
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`SERVER IS RUNNING AT PORT::${process.env.PORT}`);
    })
  )
  .catch((err) => console.error("MONGODB connection faild", err));
