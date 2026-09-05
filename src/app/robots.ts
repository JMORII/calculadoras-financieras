import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap:
      "https://calculadoras-financieras-lemon.vercel.app/sitemap.xml",
  };
}