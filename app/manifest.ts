import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Creative Logo Design — Digital Marketing & Web Design Agency",
    short_name: "Creative Logo Design",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0d031c",
    theme_color: "#0d031c",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
