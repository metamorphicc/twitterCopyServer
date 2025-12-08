import express from "express";
import router from "./src/api/posts/route.js";

const app = express();

async function main() {
  app.use(express.json());
  app.use("/api/", router)
  app.listen(8089, () => {
    console.log(`Сервер запущен на порте 8080`);
  });
}

main();
