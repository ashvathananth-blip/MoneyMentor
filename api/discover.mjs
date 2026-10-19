import app from "../server.mjs";

export default function handler(req, res) {
  req.url = "/api/discover";
  return app(req, res);
}
