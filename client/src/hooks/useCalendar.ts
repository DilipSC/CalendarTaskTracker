import { useState } from 'react'

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const goToNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))
  }

  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))
  }

  return { currentDate, goToNextMonth, goToPreviousMonth }
}

