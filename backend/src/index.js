// import dotenv from "dotenv";
// dotenv.config();

// import "dotenv/config";
// import app from "./app.js";

// const port = process.env.PORT || 4000;

// app.listen(port, () => {
//   console.log(`Todo backend listening on http://localhost:${port}`);
// });


import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Todo backend listening on http://localhost:${port}`);
});

