import React from "react";
import Card from "../Card/Card";
import { v4 as uuidv4 } from "uuid";

const CardList = ({ profiles }) => {
  return (
    <div>
      {profiles.map((user, i) => {
        return (
          <Card
            key={uuidv4()}
            id={profiles[i].id}
            name={profiles[i].login}
            page={profiles[i].html_url}
            image={profiles[i].avatar_url}
          />
        );
      })}
    </div>
  );
};

export default CardList;
