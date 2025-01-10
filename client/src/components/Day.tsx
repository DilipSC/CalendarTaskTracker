import { Card, CardContent } from '@/components/ui/card'
import { CalendarEvent } from '@/types/event'

interface DayProps {
  date: Date | null
  events: CalendarEvent[]
  onClick: () => void
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
}

export default function Day({ date, events, onClick, isCurrentMonth, isToday, isSelected }: DayProps) {
  if (!date) {
    return <div className="h-24" />
  }

  return (
    <Card 
      className={`h-24 overflow-hidden cursor-pointer ${
        isCurrentMonth ? 'bg-white' : 'bg-gray-100'
      } ${isToday ? 'border-2 border-blue-500' : ''} ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-2">
        <div className={`text-sm font-semibold ${isToday ? 'text-blue-500' : ''}`}>
          {date.getDate()}
        </div>
        <div className="text-xs">
          {events.slice(0, 2).map((event, index) => (
            <div key={index} className="truncate">{event.title}</div>
          ))}
          {events.length > 2 && (
            <div className="text-gray-500">+{events.length - 2} more</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

