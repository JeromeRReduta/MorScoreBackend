import app from "./app.js";
// import db from "#db/client";

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
