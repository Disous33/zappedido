import { appConfig } from "../config/appConfig";

export const setSeo = (title: string, description: string, imageUrl = appConfig.ogImageUrl) => {
  document.title = title;
  const entries: Array<[string, string, "name" | "property"]> = [
    ["description", description, "name"],
    ["og:title", title, "property"],
    ["og:description", description, "property"],
    ["og:image", imageUrl, "property"],
  ];

  entries.forEach(([key, value, attribute]) => {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute, key);
      document.head.appendChild(element);
    }
    element.content = value;
  });
};
