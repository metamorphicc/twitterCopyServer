import express from "express";
import router from "./src/api/profileId/route.js";
import { postRouterPosts } from "./src/api/posts/route.js";
import cors from "cors"

const app = express();

async function main() {
  app.use(express.json());
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }))
  app.use("/api/profileId", router)
  app.use("/api/posts", postRouterPosts)
  app.listen(8089, () => {
    console.log(`Сервер запущен на порте 8089`);
  });
}

main();