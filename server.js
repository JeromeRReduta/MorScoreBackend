import app from "./app.js";
import db from "./infrastructure/psql/client.js";
const PORT = process.env.PORT ?? 3000;

await db.connect();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
