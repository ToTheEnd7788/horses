import express from "express";
import config from "./index";
import { watch } from "rollup";
import { readFileSync } from "fs";
import { resolve } from "path";

const app = express();
//   watcher = watch(config);

// watcher.on("event", e => {
//   if (e.code === "ERROR") console.error(e.error);
// });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/", (req, res) => {
  let data = readFileSync(resolve(__dirname, "../test/index.html"), "utf8");

  res.end(data);
});

app.get("/api/test", (req, res) => {
  res.json({
    code: 0,
    msg: "Get successfully",
    data: null
  });
}),

app.post("/api/post", (req, res) => {
  res.json({
    code: 0,
    msg: "Post successfully",
    data: [1, 2, 3]
  });
});

app.use("/", express.static(resolve(__dirname, "../")));

app.listen(3000, err => {
  console.error(err);
  console.log("The server is listening at port: 3000...");
})