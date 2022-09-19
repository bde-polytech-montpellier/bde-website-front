import { useState, useEffect } from "react";
import axios from "axios";
import { goodies } from "../../routes/roots";
import * as React from "react";
import GoodieTile from "./GoodieTile";
import { IGoodie } from "../../models/tiles";
import CardContainer from "../templates/CardContainer";

export default function Goodies() {
  const [goodieList, setGoodies] = useState([]);

  function getGoodies() {
    axios.get(goodies).then((res) => {
      setGoodies(res.data);
    });
  }

  useEffect(() => {
    getGoodies();
  }, []);

  return (
    <CardContainer
      title="Les Goodies"
      subtitle="De petits souvenirs de ton séjour parmi nous !"
      cards={goodieList.map((goodie: IGoodie) => (
        <GoodieTile key={goodie.goodie_id} goodie={goodie} />
      ))}
    />
  );
}
