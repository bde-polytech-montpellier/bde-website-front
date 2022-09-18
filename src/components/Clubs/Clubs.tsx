import { useState, useEffect } from "react";
import axios from "axios";
import { clubs } from "../../routes/roots";
import * as React from "react";
import ClubTile from "./ClubTile";
import { IClub } from "../../models/tiles";
import CardContainer from "../templates/CardContainer";

export default function Clubs() {
  const [clubList, setClubs] = useState<IClub[]>([]);

  function getClubs() {
    axios.get(clubs).then((res) => {
      setClubs(res.data);
    });
  }

  useEffect(() => {
    getClubs();
  }, []);

  return (
    <CardContainer
      title="Les Clubs"
      subtitle="De quoi t'occuper à Polytech !"
      cards={clubList.map((club: IClub) => (
        <ClubTile key={club.club_id} club={club} />
      ))}
    />
  );
}
