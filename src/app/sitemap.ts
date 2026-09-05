import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://calculadoras-financieras-lemon.vercel.app";

    return [
    { url: base, lastModified: new Date() },
    { url: `${base}/calculadoras/interes-compuesto`, lastModified: new Date() },
    { url: `${base}/calculadoras/hipoteca`, lastModified: new Date() },
    { url: `${base}/calculadoras/sueldo-neto`, lastModified: new Date() },
    { url: `${base}/calculadoras/ahorro`, lastModified: new Date() },
    { url: `${base}/aviso-legal`, lastModified: new Date() },
    { url: `${base}/privacidad`, lastModified: new Date() },
    { url: `${base}/cookies`, lastModified: new Date() },
  ];
}