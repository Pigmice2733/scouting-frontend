import { PickLists } from 'models/picklist'
import { h } from 'preact'
import { createPickList, getPickListsAtEvent } from '../../api'
import Button from '../../components/button'
import List from '../../components/list'
import Spinner from '../../components/spinner'
import Resolver from '../../resolver'

interface PickListProps {
  eventId: string
}

const PickLists = ({ eventId }: PickListProps) => (
  <Resolver
    data={{ lists: getPickListsAtEvent(eventId) }}
    render={({ lists }: { lists: null | PickLists }) => (
      <div>
        <h1>Pick Lists</h1>
        {lists === undefined ? (
          <Spinner />
        ) : lists === null ? (
          <div>No pick lists</div>
        ) : (
          <List>
            {lists.map(l => (
              <li>
                <a href={`lists/${l.id}`}>
                  {l.name} - {l.eventKey}
                </a>
              </li>
            ))}
          </List>
        )}
        <Button
          onClick={() =>
            createPickList({
              eventKey: eventId,
              name: 'New Pick List',
              list: []
            })
          }
        >
          New Pick List
        </Button>
      </div>
    )}
  />
)

export default PickLists
