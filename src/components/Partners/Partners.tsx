import { useState, useEffect } from "react";
import axios from "axios";
import { partners } from "../../routes/roots";
import * as React from "react";
import Tile from "./PartnerTile";
import { PartnerResponse } from "../../models/partner";
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
      subtitle="Sous présentation de la carte étudiante accompagnée de l'intitulé 'Ecole Polytechnique universitaire de Montpellier'"
      cards={partnerships.map((partner: PartnerResponse) => (
        <Tile key={partner.partner_id} partner={partner} />
      ))}
    />
  );
}
