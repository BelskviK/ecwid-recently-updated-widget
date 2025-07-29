import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { ecwidClient } from "./ecwidClient";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());

// --- API: recently updated products ---
app.get("/api/products", async (req, res) => {
  try {
    const { limit = 6, offset = 0, sortBy = "UPDATED_TIME_DESC" } = req.query;

    // Call Ecwid API
    const { data } = await ecwidClient.get("/products", {
      params: { limit, offset, sortBy },
    });

    res.json(data);
  } catch (e) {
    console.error("Ecwid API Error:", e);
    res.status(500).json({ message: "Failed to fetch products from Ecwid" });
  }
});

// --- Serve front-end build ---
app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")));
app.get("*", (_req, res) =>
  res.sendFile(path.join(__dirname, "..", "..", "client", "dist", "index.html"))
);

app.listen(PORT, () =>
  console.log(`✅ Server ready → http://localhost:${PORT}`)
);
