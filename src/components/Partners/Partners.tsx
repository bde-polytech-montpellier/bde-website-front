import { useState, useEffect } from "react";
import axios from "axios";
import { partners } from "../../routes/roots";
import * as React from "react";
import Tile from "./PartnerTile";
import { IPartner } from "../../models/tiles";
import CardContainer from "../templates/CardContainer";

export default function Parts() {
  const [partnerships, setParts] = useState([]);

  async function getParts() {
    const parts = await axios.get(partners);
    setParts(parts.data);
  }

  useEffect(() => {
    getParts();
  }, []);

  return (
    <CardContainer
      title="Nos Partenariats"
      subtitle="Des bons plans pour les étudiants"
      cards={partnerships.map((partner: IPartner) => (
        <Tile key={partner.partner_id} partner={partner} />
      ))}
    />
  );
}
