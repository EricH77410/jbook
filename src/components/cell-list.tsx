import { UseTypedSelector } from '../hooks/use-typed-selector'
import { Fragment } from 'react'
import CellListItem from './cell-list-item'
import AddCell from './add-cell'

const CellList: React.FC = () => {
  const cells = UseTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id]
    })
  })

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ))

  return (
    <div>
      {renderedCells}
      <AddCell nextCellId={null} forceVisible={cells.length === 0}/>
    </div>
  )
}

export default CellList
