import { useState, useEffect, useRef } from 'react'
import './preview.css'

interface PreviewProps {
  code: string
  err: string
}

const html = `
<html>
<head>
<style>
  html { background-color: white}
</style>
</head>
<body>
<div id="root">
</div>
<script>
  const handleError = (err) => {
    const root = document.getElementById('root')
    root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>'+err+'</div>'
    console.error(err)
  }

  window.addEventListener('error',(event) => {
    event.preventDefault( )
    handleError(event.error)
  })

  window.addEventListener('message', (e) => {
    try {
      eval(e.data)
    } catch (err) {
      handleError(err)
    }
  }, false)
</script>
</body>
</html>
`

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<any>()

  useEffect(() => {
    // reset de la frame au cas ou ...
    iframeRef.current.srcdoc = html

    // setCode(result.outputFiles[0].text)
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*')
    }, 50)
  }, [code])

  return (
    <div className='preview-wrapper'>
      <iframe
        srcDoc={html}
        sandbox='allow-scripts'
        ref={iframeRef}
        title='preview'
      />
      {err && <div className='preview-error'>{err}</div>}
    </div>
  )
}

export default Preview
