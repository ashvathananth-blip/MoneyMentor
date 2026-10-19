import app from "../server.mjs";

export default function handler(req, res) {
  req.url = "/api/scenario";
  return app(req, res);
}