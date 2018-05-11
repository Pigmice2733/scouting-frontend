import { h } from 'preact'
import { getReporterStats } from '../../api'
import Header from '../../components/header'
import Spinner from '../../components/spinner'
import Resolver from '../../resolver'
import { sortReporterStats } from '../../utils'
import style from './style.sss'

const Leaderboard = () => (
  <Resolver
    data={{ stats: getReporterStats() }}
    render={({ stats }) => {
      const sortedStats = sortReporterStats(stats) || []
      return (
        <div class={style.leaderboard}>
          <Header title="Leaderboard" back="/" />
          {!sortedStats ? (
            <Spinner />
          ) : (
            <table>
              <tr>
                <th />
                <th>Reporter</th>
                <th>Reports</th>
              </tr>
              {sortedStats.map((stat, i) => (
                <tr key={stat.reporter}>
                  <td class={style.emoji}>
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
