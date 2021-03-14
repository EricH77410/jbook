import { useState, useEffect } from 'react'
import bundle from '../bundler/'
import { Cell } from '../state'
import { useActions } from '../hooks/useActions'
import CodeEditor from './code-editor'
import Preview from './preview'
import Resizable from './resizable'

interface CodeCellProps {
  cell: Cell
}

// const initReactCode = `
// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';

// const App = () => {
//   const [counter, setCounter] = useState(0);

//   const add = () => {
//     setCounter(counter + 1);
//   };

//   const sous = () => {
//     setCounter(counter - 1);
//   };

//   return (
//     <div>
//       <h3>Hello</h3>
//       <h4>{counter}</h4>
//       <button onClick={add}>+</button>
//       <button onClick={sous}>-</button>
//     </div>
//   );
// };

// ReactDOM.render(<App />, document.getElementById('root'));
// `

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')
  const { updateCell } = useActions()

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content)
      setCode(output.code)
      setErr(output.err)
    }, 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [cell.content])

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>

        <Preview code={code} err={err} />
      </div>
    </Resizable>
  )
}

export default CodeCell
