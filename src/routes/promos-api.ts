import { promos } from "./roots";

export const getPromo = (id: string) => promos + id;
export const getPromosFromName = (name: string) => promos + "name/" + name;
export const getDescriptionForPromo = (id: string) =>
  promos + id + "/description";
