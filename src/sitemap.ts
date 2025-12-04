import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap() {
  // @ts-ignore
  const activeRoutes = Object.keys(routesConfig).filter((route:string) => routesConfig[route]);

  const routes = activeRoutes.map((route) => ({
    url: `https://${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
