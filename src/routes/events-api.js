import {events} from "./roots"

export const getEvent = (id) => events + id
export const getEventsFromName = (name) => events + "name/" + name
export const getDescriptionForEvent = (id) => events + id + "/description"