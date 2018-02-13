import { h } from 'preact'
import Resolver from '../../resolver'
import Header from '../../components/header'
import { getReporterStats } from '../../api'
import Spinner from '../../components/spinner'
import {
  leaderboard as leaderboardClass,
  emoji as emojiClass
} from './style.sss'
import { sortReporterStats } from '../../utils'

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
                    {i === stats.length - 1 ? '💩' : ''}
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
