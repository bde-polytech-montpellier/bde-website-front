import {partners} from "./roots"

export const getPartner = (id) => partners + id
export const getPartnersFromName = (name) => partners + "name/" + name
export const getDescriptionForPartner = (id) => partners + id +"/description"