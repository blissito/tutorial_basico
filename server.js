import { serve } from "bun";
import { readFile } from "fs/promises";
import { join, extname } from "path";

const port = process.env.PORT || 8080;

// MIME types for different file extensions
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
};

// Default to index.html for root path
const getFilePath = (url) => {
  if (url === "/") return "./index.html";

  // Handle components directory
  if (url.startsWith("/components/")) {
    return "." + url;
  }

  return "." + url;
};

// Get MIME type based on file extension
const getMimeType = (filePath) => {
  const ext = extname(filePath).toLowerCase();
  return mimeTypes[ext] || "text/plain";
};

const server = serve({
  port,
  fetch: async (req) => {
    const url = new URL(req.url);
    const filePath = getFilePath(url.pathname);

    try {
      const file = await readFile(filePath);
      const mimeType = getMimeType(filePath);

      return new Response(file, {
        headers: {
          "Content-Type": mimeType,
          "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        },
      });
    } catch (error) {
      // If file not found, return 404
      if (error.code === "ENOENT") {
        console.error(`File not found: ${filePath}`);
        return new Response("Not Found", { status: 404 });
      }

      // For other errors, return 500
      console.error("Server error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
});

console.log(`🚀 Phi-4 server running on http://localhost:${port}`);
console.log(`📁 Components available at http://localhost:${port}/components/`);
