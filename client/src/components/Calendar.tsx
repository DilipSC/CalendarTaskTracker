import { useMemo } from 'react'
import Day from './Day'
import { CalendarEvent } from '@/types/event'

interface CalendarProps {
  currentDate: Date
  events: CalendarEvent[]
  onDayClick: (date: Date) => void
  selectedDate: Date | null
}

export default function Calendar({ currentDate, events, onDayClick, selectedDate }: CalendarProps) {
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()
    const startingDayOfWeek = firstDayOfMonth.getDay()

    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i))
    }

    return days
  }, [currentDate])

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="text-center font-semibold p-2">{day}</div>
      ))}
      {calendarDays.map((day, index) => (
        <Day
          key={index}
          date={day}
          events={events.filter(event => event.date.toDateString() === day?.toDateString())}
          onClick={() => day && onDayClick(day)}
          isCurrentMonth={day?.getMonth() === currentDate.getMonth()}
          isToday={day?.toDateString() === new Date().toDateString()}
          isSelected={day?.toDateString() === selectedDate?.toDateString()}
        />
      ))}
    </div>
  )
}

