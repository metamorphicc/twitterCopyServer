import express from "express";
import router from "./src/api/profileId/route.js";
import { postRouterPosts } from "./src/api/posts/route.js";
import cors from "cors"
import routerReg from "./src/api/regProfile/route.js";
import { routerGetProfiles } from "./src/api/profiles/route.js"; 
const app = express();

async function main() {
  app.get("/", (req, res) => {
      res.json({
        "A twitter parody": "a twitter parody server"
      })
  })
  app.use(express.json());
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }))
  app.use("/api/profiles", routerGetProfiles)
  app.use("/api/profileId", router)
  app.use("/api/posts", postRouterPosts)
  app.use("/api/regProfile", routerReg)
  app.listen(8089, () => {
    console.log(`Сервер запущен на порте 8089`);
  });
}

main();