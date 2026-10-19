import app from "../server.mjs";

export default function handler(req, res) {
  req.url = "/api/ask";
  return app(req, res);
}
