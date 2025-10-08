export default function requireBody(...fields) {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).send("Missing request body");
    }
    const missing = fields.filter((field) => !(field in req.body));
    if (missing.length > 0) {
      console.log("wtf we got misssing", missing);
      return res.status(400).send(`Missing fields: ${missing.join(", ")}`);
    }
    next();
  };
}
