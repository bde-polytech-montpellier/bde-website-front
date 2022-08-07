import {clubs} from "./roots"

export const getClub = (id) => clubs + id
export const getClubsFromName = (name) => clubs + "name/" + name
export const getDescriptionForClub = (id) => clubs + id + "/description"