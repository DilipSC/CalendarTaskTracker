import { useState } from 'react'
import { CalendarEvent } from '@/types/event'

export const useEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([])

  const addEvent = (event: CalendarEvent) => {
    setEvents(prev => [...prev, event])
  }

  const updateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ))
  }

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId))
  }

  return { events, addEvent, updateEvent, deleteEvent }
}

