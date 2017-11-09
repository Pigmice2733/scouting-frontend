import { h, Component } from 'preact'
import style from './style'
import * as api from '../../api'

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      matches: [],
      event_name: null,
      tracked_team_name: null,
      tracked_team_rank: 0,
      total_teams: 0
    }
  }

  componentDidMount() {
    console.log(JSON.stringify(api));
    api.getEvent(this.props.event_id).then((json) => {
      console.log(json);
      var month_names = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      var event_date = new Date(json.event.date);
      this.setState({ "loaded": true,
                      "event_matches": json.matches,
                      "event_name": json.event.name,
                      "event_date": month_names[event_date.getMonth()]
                                    + " " + event_date.getDate() + ", "
                                    + event_date.getFullYear(),
                      "tracked_team_name": "Pigmice"});
      this.state.event_matches.push({
        "id": 0,
        "predictedStart": "2017-04-05T18:30:00Z",
        "winnerId": 0,
        "winningAlliance": "Red",
        "winnerScore": 3,
        "loserScore": 2
      });
      this.state.event_matches.push({
        "id": 1,
        "predictedStart": "2017-04-05T21:00:00Z",
        "winnerId": 0,
        "winninAlliance": null,
        "winnerScore": 0,
        "loserScore": 0
      });
      this.state.event_matches.sort(function(a, b) {
        return b.id - a.id;
      });
    });
  }

  render() {
    if (this.state.loaded === false) {
      return (
        <h1 style="text-align:center;">{"Loading " + this.props.event_id}</h1>
      )
    }
    return (
      <div class={style['event']}>
        <h1>{this.state.event_name}</h1>
        <p>{this.state.event_date}</p>
        <div class={style['match_container']}>
          <span style="float: left;">{this.state.tracked_team_name}</span>
          <span style="float: right;">{"Rank: " + this.state.tracked_team_rank + "/" + this.state.total_teams}</span>
          <div style="clear:both;" />
          {this.state.event_matches
            .map((e) => {
              var date = new Date(e.predictedStart);
              var hours;
              var ampm;
              if (date.getHours() <= 12) {
                hours = date.getHours();
                ampm = "AM";
              } else {
                hours = date.getHours() - 12;
                ampm = "PM";
              }
              var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
              return (
                <a href={"/event/" + this.props.event_id + "/" + e.id}>
                  <div class={style['match']}>
                    <div>{"#" + e.id}</div>
                    <div class={style.score}>{ e.winningAlliance != null ? e.winningAlliance + " won (" + e.winnerScore + ":" + e.loserScore + ")" : "TBD"}</div>
                    <div>{hours + ":" + minutes + " " + ampm}</div>
                  </div>
                </a>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Event
