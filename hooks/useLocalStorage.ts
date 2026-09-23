import { useCallback, useMemo, useSyncExternalStore } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const storedValue = useSyncExternalStore(
    (onChange) => {
      const handleStorageChange = () => onChange()
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('local-storage', handleStorageChange)
      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('local-storage', handleStorageChange)
      }
    },
    () => window.localStorage.getItem(key),
    () => null,
  )

  const value = useMemo(() => {
    if (storedValue === null) {
      return initialValue
    }

    try {
      return JSON.parse(storedValue) as T
    } catch (error) {
      console.error(`useLocalStorage: Failed to load ${key}`, error)
      return initialValue
    }
  }, [initialValue, key, storedValue])

  const setValue = useCallback(
    (nextValue: T | ((currentValue: T) => T)) => {
      const resolvedValue =
        typeof nextValue === 'function'
          ? (nextValue as (currentValue: T) => T)(value)
          : nextValue

      try {
        window.localStorage.setItem(key, JSON.stringify(resolvedValue))
        window.dispatchEvent(new Event('local-storage'))
      } catch (error) {
        console.error(`useLocalStorage: Failed to save ${key}`, error)
      }
    },
    [key, value],
  )

  return [value, setValue] as const
}
