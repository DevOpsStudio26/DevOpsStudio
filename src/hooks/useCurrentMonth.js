import { useEffect, useState } from 'react'

const MAX_TIMEOUT = 2 ** 31 - 1 // setTimeout's limit (~24.8 days)

function currentMonthName(now = new Date()) {
  return now.toLocaleString('en-US', { month: 'long' })
}

// The current month's name, kept live: it switches over at midnight when a new month starts.
export function useCurrentMonth() {
  const [month, setMonth] = useState(currentMonthName)

  useEffect(() => {
    let timer
    function schedule() {
      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      timer = setTimeout(() => {
        setMonth(currentMonthName())
        schedule()
      }, Math.min(monthStart - now + 1000, MAX_TIMEOUT))
    }
    schedule()

    // Timers pause while a laptop sleeps, so re-check whenever the tab is shown again
    const recheck = () => {
      if (document.visibilityState === 'visible') setMonth(currentMonthName())
    }
    document.addEventListener('visibilitychange', recheck)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', recheck)
    }
  }, [])

  return month
}
