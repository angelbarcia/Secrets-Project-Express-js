import express from "express";
const app = express();
import bodyParser from "body-parser";
const port = process.env.PORT || 3000;
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
let isUserAuthorized = false;

function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "Iloveprogramming") {
    isUserAuthorized = true;
  }
  next();
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passwordCheck);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  console.log(isUserAuthorized);
  if (isUserAuthorized) {
    res.sendFile(__dirname + "/public/secret.html");
    isUserAuthorized = false;
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
