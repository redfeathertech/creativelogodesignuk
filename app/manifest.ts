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
    /* The .ico stays first for anything that still asks for one; the two PNGs
       are what an Android install prompt and the app switcher actually use, and
       a manifest without a 192 and a 512 fails Lighthouse's installability
       check. `app/icon.png` and `app/apple-icon.png` cover the tab and iOS
       home screen through the file convention, so they are not repeated here. */
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
