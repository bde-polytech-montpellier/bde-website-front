// import { InputError } from "../models/index";
// function isNameInvalid(name: string) {
//   if (!name) return false;
//   if (name.length === 0 || name.length > 255) return false;
//   return true;
// }

// function isShortDescInvalid(short_desc: string) {
//   if (!short_desc) return false;
//   if (short_desc.length === 0 || short_desc.length > 500) return false;
//   return true;
// }

// async function isPicvalide(pic: string) {
//   const res = await fetch(pic);
//   return res.ok;
// }

// function isEmailInvalid(email: string) {
//   return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

// function isWebsiteURLInvalid(websiteURL: string) {
//   return !/^(http|https):\/\/[^\s]+$/.test(websiteURL);
// }

// function isFacebookURLInvalid(facebookURL: string) {
//   return !/^(http|https):\/\/www.facebook.com\/[^\s]+$/.test(facebookURL);
// }

// function isInstagramURLInvalid(instagramURL: string) {
//   return !/^(http|https):\/\/www.instagram.com\/[^\s]+$/.test(instagramURL);
// }

// export function validateClubInputs({ name, pic, short_desc, fb, ig }) {
//   const errors = {};
//   if (isNameInvalid(name)) errors.name = "Le nom est invalide";
//   if (isPicvalide(pic))
//     errors.pic = "L'url de la photo ne renvoie à aucune ressource";
//   if (isShortDescInvalid(short_desc))
//     errors.short_desc = "La description est invalide";
//   if (isFacebookURLInvalid(fb)) errors.fb = "L'url facebook est invalide";
//   if (isInstagramURLInvalid(ig)) errors.ig = "L'url instagram est invalide";
//   return errors;
// }

// export function validatePartnerInputs(
//   name: string,
//   pic: string,
//   short_desc: string,
//   desc: string,
//   mail: string,
//   website: string
// ) {
//   const errors: InputError[] = [];
//   if (isNameInvalid(name))
//     errors.push({ component: "name", error: "Le nom est invalide" });
//   if (isPicvalide(pic))
//     errors.pic = "L'url de la photo ne renvoie à aucune ressource";
//   if (isShortDescInvalid(short_desc))
//     errors.short_desc = "La description est invalide";
//   if (isEmailInvalid(mail)) errors.mail = "L'email est invalide";
//   if (isWebsiteURLInvalid(website))
//     errors.website = "L'url du site web est invalide";
//   return errors;
// }

// export function validateEventInputs({ name, pic, short_desc }) {
//   const errors = {};
//   if (isNameInvalid(name)) errors.name = "Le nom est invalide";
//   if (isPicvalide(pic))
//     errors.pic = "L'url de la photo ne renvoie à aucune ressource";
//   if (isShortDescInvalid(short_desc))
//     errors.short_desc = "La description est invalide";
//   return errors;
// }
