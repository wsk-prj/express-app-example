import express from "express";

const app = express();

// configuration
const SERVER_PORT = 4000;
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

// routers
const router = express.Router();
app.use('/api', router)

router.get("/", (_req, res) => {
  res.send("Hello World");
});
