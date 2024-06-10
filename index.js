import express from "express";
import { productRouter } from "./routes/productRoutes.js";
import { connectionToDatabase } from "./database/db.js";
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running");
});
app.use("/api/v1", productRouter);

connectionToDatabase()
  .then(() => {
    app.listen(port, () => console.log(`server running on port:${port}`));
  })
  .catch((error) => {
    console.log(error);
    process.exit();
  });
