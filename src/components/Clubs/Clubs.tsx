import { useState, useEffect } from "react";
import axios from "axios";
import { clubs } from "../../routes/roots";
import * as React from "react";
import ClubTile from "./ClubTile";
import { ClubResponse } from "../../models/club";
import CardContainer from "../templates/CardContainer";

export default function Clubs() {
  const [clubList, setClubs] = useState<ClubResponse[]>([]);

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
      cards={clubList.map((club: ClubResponse) => (
        <ClubTile key={club.club_id} club={club} />
      ))}
    />
  );
}
