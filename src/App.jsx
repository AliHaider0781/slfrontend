import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const createLink = async (url) => {
      try {
        const res = await fetch('http://127.0.0.1:8001/links', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: url })
        })
        if (!res.ok) {
          throw new Error(`Http Error: ${res.status}`)
        }
        const responseData = await res.json()
        setData(responseData)
      } catch (err) {
        setError(err.message)
      }
    }

    createLink('https://react.com')
  }, [])

  return (
    <>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data ? <p>Success: {JSON.stringify(data)}</p> : <p>Loading...</p>}
    </>
  )
}

export default App