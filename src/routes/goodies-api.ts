import { goodies } from "./roots";

export const getGoodie = (id: string) => goodies + id;
export const getGoodieFromName = (name: string) => goodies + "name/" + name;
