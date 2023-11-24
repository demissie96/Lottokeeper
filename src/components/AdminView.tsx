import React from "react";
import Card from "./Card";

function AdminView() {
  return (
    <div className="div_for_cards">
      <Card
        heading="Fogadás (Szimuláció)"
        onClickCard={() => {
          console.log("Fogadás (Szimuláció) clicked");
        }}
      ></Card>
      <Card
        heading="Szelvények"
        onClickCard={() => {
          console.log("Szelvények clicked");
        }}
      ></Card>
      <Card
        heading="Sorsolás"
        onClickCard={() => {
          console.log("Sorsolás clicked");
        }}
      ></Card>
      <Card
        heading="Új kör"
        onClickCard={() => {
          console.log("Új kör clicked");
        }}
      ></Card>
      <Card
        heading="Új játék"
        onClickCard={() => {
          console.log("Új játék clicked");
        }}
      ></Card>
    </div>
  );
}

export default AdminView;
