import { events } from "./roots";

export const getEvent = (id: string) => events + id;
export const getEventsFromName = (name: string) => events + "name/" + name;
export const getDescriptionForEvent = (id: string) =>
  events + id + "/description";
