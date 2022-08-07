import {promos} from "./roots"

export const getPromo = (id) => promos + id
export const getPromosFromName = (name) => promos + "name/" + name
export const getDescriptionForPromo = (id) => promos + id + "/description"
