const baseURL = "/";
const bannerURL = "banner.png";
const githubDev = process.env.NEXT_PUBLIC_GITHUB_DEV ?? "#0";
const targetExternalLink = "_blank";
const relExternalLink = "noreferrer noopener";

const routes = {
  "/": true,
  "/wrapped": true,
  "/tier-list": true
};

export {
  routes,
  baseURL,
  bannerURL,
  githubDev,
  
  targetExternalLink,
  relExternalLink
};
