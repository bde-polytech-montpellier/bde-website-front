import { clubs } from "./roots";

export const getClub = (id: string) => clubs + id;
export const getClubsFromName = (name: string) => clubs + "name/" + name;
export const getDescriptionForClub = (id: string) =>
  clubs + id + "/description";
