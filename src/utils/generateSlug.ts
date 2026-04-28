export const generateSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const createUniqueSlug = (name: string, existingSlugs: string[]) => {
  const baseSlug = generateSlug(name) || "loja";
  let slug = baseSlug;
  let suffix = 2;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
};
