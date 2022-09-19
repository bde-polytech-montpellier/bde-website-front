export interface IClubFormData {
  name: string;
  pic: File | undefined;
  imgChanged: boolean;
  short_description: string;
  description: string;
  fb: string;
  ig: string;
}

export interface IEventFormData {
  name: string;
  short_description: string;
  imgChanged: boolean;
  pic: File | undefined;
  description: string;
  date: string;
  time: string;
  place: string;
  datetime: string;
  price: number | undefined;
  follower_price: number | undefined;
  club_id: string;
  club_name: string;
}

export interface IGoodieFormData {
  name: string;
  pic: File | undefined;
  imgChanged: boolean;
  description: string;
  price: number | undefined;
}

export interface IPartnerFormData {
  name: string;
  pic: File | undefined;
  imgChanged: boolean;
  short_description: string;
  description: string;
  mail: string;
  website: string;
}
