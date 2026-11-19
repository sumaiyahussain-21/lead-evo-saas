import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import apiRouter from "./server/routes/index.js";
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const args = process.argv.slice(2);
const portIndex = args.indexOf("--port");
const cliPort =
  portIndex !== -1 && args[portIndex + 1]
    ? parseInt(args[portIndex + 1])
    : null;
const PORT = cliPort || (process.env.PORT ? parseInt(process.env.PORT) : 3e3);
async function startServer() {
  const app = express();
  app.get("/health", (_req, res) => {
    res
      .status(200)
      .json({
        status: "ok",
        server: "Lead Evo Fullstack",
        time: /* @__PURE__ */ new Date().toISOString(),
      });
  });
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", apiRouter);
  app.use("/assets", express.static(path.resolve(__dirname, "public/assets")));
  app.use("/public", express.static(path.resolve(__dirname, "public")));
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "dist/index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `[Lead Evo] Fullstack server running on http://0.0.0.0:${PORT}`,
    );
  });
}
startServer().catch((err) => {
  console.error("[Lead Evo] Failed to start server:", err);
  process.exit(1);
});
