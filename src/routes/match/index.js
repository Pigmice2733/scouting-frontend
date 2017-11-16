import { h } from 'preact'
import wrap from '../../wrap'
import Header from '../../components/header'
import { getEvent, getMatch } from '../../api'
import style from './style'

// TODO: Add this back once we get "/assets/*" working
//          <img src="/assets/imgs/example_robot.png" />
function teamList (teams) {
  return (
    teams.map(team => {
      return (
        <li>
          <a href={`/team/${team}`}>
            <div class={style.teamImgContainer}>
              <img src="http://rjwagner49.com/Robotics/Kalani/2012/FRC/SanDiegoRegional/CADModel01.jpg" />
            </div>
            <div>{team}</div>
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
        <br />
        <div class={style.redAlliance}>
          <h3 style="text-align:center;padding:0;margin:0;">
            {"Score: " + (match !== undefined ? match.redAlliance.score : "?")}
          </h3>
          <div class={style.teamContainer}>
            {teamList(match !== undefined ? match.redAlliance.teams : [])}
          </div>
        </div>
        <div class={style.blueAlliance}>
          <h3 style="text-align:center;padding:0;margin:0;">
            {"Score: " + (match !== undefined ? match.blueAlliance.score : "?")}
          </h3>
          <div class={style.teamContainer}>
            {teamList(match !== undefined ? match.blueAlliance.teams : [])}
          </div>
        </div>
      </div>
    )
  },
  ({ eventId, matchId }) => ({ match: getMatch(eventId, matchId), event: getEvent(eventId) })
)

export default Match
