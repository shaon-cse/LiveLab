import { useEffect, useState } from 'react'

const PREFIX = 'codepen-clone-'

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key

  const [value, setValue] = useState(() => {
    try {
      const jsonValue = localStorage.getItem(prefixedKey)
      if (jsonValue != null) return JSON.parse(jsonValue)

      if (typeof initialValue === 'function') {
        return initialValue()
      } else {
        return initialValue
      }
    } catch (error) {
      console.error('Error accessing localStorage', error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(prefixedKey, JSON.stringify(value))
    } catch (error) {
      console.error('Error setting localStorage', error)
    }
  }, [prefixedKey, value])

  return [value, setValue]
}