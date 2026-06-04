import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/** Fix for __dirname in ES modules **/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = (
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  "https://cosmic.csui.dev"
).replace(/\/$/, "");
const normalizedSiteUrl = /^https?:\/\//.test(siteUrl)
  ? siteUrl
  : `https://${siteUrl}`;

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: normalizedSiteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  additionalPaths: async () => {
    const jsonPath = path.join(__dirname, "modules/fams-data.json");
    const rawData = fs.readFileSync(jsonPath, "utf-8");
    const famsData = JSON.parse(rawData);

    return famsData.data.map((fam) => ({
      loc: `/fams/${fam.id}`,
      lastmod: new Date(famsData["parsed-at"]*1000).toISOString(),
    }));
  },
};

export default config;
