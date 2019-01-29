import React from "react";
import axios from "axios";
import _ from "lodash";
import styled from "styled-components";

const ScoreboardContainer = styled.div`
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const TopRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const BottomRow = styled.div`
  display: flex;
  align-items: center;
`;
const TeamContainer = styled.div`
    padding 10px 30px;
    margin: 10px;
    border: 2px solid #000;
    display: flex;
`;
const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30px;
  padding: 2px;
  align-items: center;
  justify-content: center;
`;

const Team = ({ fullName, totalScore }) => {
  return (
    <TeamContainer>
      <div>{fullName}</div>
      <div style={{ fontWeight: "700", paddingLeft: "10px" }}>{totalScore}</div>
    </TeamContainer>
  );
};

const PeriodLabels = ({ length }) => {
  const labels = new Array(length).fill();
  return (
    <div
      style={{ display: "flex", flexDirection: "row", paddingBottom: "15px" }}
    >
      <ScoreContainer key={0} style={{ paddingRight: "10px" }} />
      {labels.map((_, i) => {
        return (
          <ScoreContainer key={i}>
            <div>{i + 1}</div>
          </ScoreContainer>
        );
      })}
    </div>
  );
};

const Scores = ({ teamAbbreviation, scores }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <ScoreContainer key={0} style={{ paddingRight: "10px" }}>
        <div>{teamAbbreviation}</div>
      </ScoreContainer>
      {scores.map((score, i) => {
        return (
          <ScoreContainer key={i + 1}>
            <div>{score}</div>
          </ScoreContainer>
        );
      })}
    </div>
  );
};

export class Scoreboard extends React.Component {
  state = { data: null };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { scoreboardId } = this.props.match.params;
    const response = await axios.get(
      `http://localhost:8080/api/scoreboards/${scoreboardId}`
    );
    const scoreboardData = _.get(response, "data", null);

    if (scoreboardData) {
      this.setState({ data: scoreboardData });
    }
  }

  render() {
    if (!this.state.data) return null;
    const {
      awayTeam,
      homeTeam,
      awayScores,
      homeScores,
      lastUpdated
    } = this.state.data;
    const [awayTotalScore, homeTotalScore] = [awayScores, homeScores].map(
      scores => {
        return scores.reduce((a, c) => a + c);
      }
    );

    return (
      <ScoreboardContainer>
        <TopRow>
          <PeriodLabels length={awayScores.length} />
          <Scores
            teamAbbreviation={awayTeam.abbreviation}
            scores={awayScores}
          />
          <Scores
            teamAbbreviation={homeTeam.abbreviation}
            scores={homeScores}
          />
        </TopRow>
        <BottomRow>
          <Team {...awayTeam} totalScore={awayTotalScore} />
          <div>vs</div>
          <Team {...homeTeam} totalScore={homeTotalScore} />
        </BottomRow>
        <div style={{ fontSize: "10px" }}>
          Last Updated: {new Date(lastUpdated).toTimeString()}
        </div>
      </ScoreboardContainer>
    );
  }
}
