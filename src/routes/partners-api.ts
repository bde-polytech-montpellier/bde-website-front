import { partners } from "./roots";

export const getPartner = (id: string) => partners + id;
export const getPartnersFromName = (name: string) => partners + "name/" + name;
export const getDescriptionForPartner = (id: string) =>
  partners + id + "/description";
