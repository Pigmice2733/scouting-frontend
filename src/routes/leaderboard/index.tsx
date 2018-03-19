import { h } from 'preact'
import { getReporterStats } from '../../api'
import Header from '../../components/header'
import Spinner from '../../components/spinner'
import Resolver from '../../resolver'
import { sortReporterStats } from '../../utils'
import {
  emoji as emojiClass,
  leaderboard as leaderboardClass
} from './style.sss'

const Leaderboard = () => (
  <Resolver
    data={{ stats: getReporterStats() }}
    render={({ stats }) => {
      const sortedStats = sortReporterStats(stats) || []
      return (
        <div>
          <Header title="Leaderboard" back="/" />
          {!sortedStats ? (
            <Spinner />
          ) : (
            <table class={leaderboardClass}>
              <tr>
                <th />
                <th>Reporter</th>
                <th>Reports</th>
              </tr>
              {sortedStats.map((stat, i) => (
                <tr>
                  <td class={emojiClass}>
                    {i === 0 ? '👑' : ''}
                    {i === stats.length - 1 && stats.length !== 1 ? '🙁' : ''}
                  </td>
                  <td>{stat.reporter}</td>
                  <td>{stat.reports}</td>
                </tr>
              ))}
            </table>
          )}
        </div>
      )
    }}
  />
)

export default Leaderboard
