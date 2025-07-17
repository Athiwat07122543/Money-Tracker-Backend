const express = require("express");
const app = express();
const port = 3000;
const { readdirSync } = require("fs");
const cors = require("cors");
app.use(express.json());
app.use(cors())
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
