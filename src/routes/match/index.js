import { h } from 'preact'
import wrap from '../../wrap'
import Header from '../../components/header'
import { getEvent, getMatch } from '../../api'
import style from './style'

function teamList (teams) {
  return (
    teams.map(team => {
      return (
        <li>
          <img src="/assets/imgs/example_robot.png" />
          <a href={`/team/${team}`}>
            {team}
          </a>
        </li>
      );
    })
  );
};

const Match = wrap(
  ({ eventId, matchId, data: { event = undefined, match = undefined } }) => {
    const eventName = event !== undefined ? event.name : "Loading...";
    // TODO: Return event name with match, it is currently inefficient
    // TODO: Currently the API does not return the expected match time

    // TODO: Get Brendan to fix alliance info to have a list for teams
    // currently it is merely different elements. I am merging them to a list.
    if (match) {
      if (match.blueAlliance.teams === undefined) {
        let alliance = match.blueAlliance;
        alliance.teams = [alliance.team1, alliance.team2, alliance.team3];
      }
      if (match.redAlliance.teams === undefined) {
        let alliance = match.redAlliance;
        match.redAlliance.teams = [alliance.team1, alliance.team2, alliance.team3];
      }
    }
    return (
      <div class={style.match}>
        <Header title={eventName + " - " + matchId.toUpperCase()} back={"/events/" + eventId} />
        ADD MATCH TIME HERE
        <div class={style.blueAlliance}>
          {teamList(match !== undefined ? match.blueAlliance.teams : [])}
        </div>
        <div class={style.redAlliance}>
          {teamList(match !== undefined ? match.redAlliance.teams : [])}
        </div>
      </div>
    )
  },
  ({ eventId, matchId }) => ({ match: getMatch(eventId, matchId), event: getEvent(eventId) })
)

export default Match
