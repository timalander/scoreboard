import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const List = styled.div`
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ListItem = styled(Link)`
  font-size: 14px;
`;

export const ScoreboardList = () => {
  return (
    <List>
      <ListItem to="/scoreboard/6c974274-4bfc-4af8-a9c4-8b926637ba74">
        Game 1
      </ListItem>
      <ListItem to="/scoreboard/eed38457-db28-4658-ae4f-4d4d38e9e212">
        Game 2
      </ListItem>
    </List>
  );
};
