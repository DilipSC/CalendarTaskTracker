'use client'

import { useState } from 'react'
import Calendar from '@/components/Calendar'
import EventSidePanel from '@/components/EventSidePanel'
import AddEventModal from '@/components/AddEventModal'
import DateOverlay from '@/components/DateOverlay'
import { Button } from '@/components/ui/button'
import { useEvents } from '@/hooks/useEvents'
import { useCalendar } from '@/hooks/useCalendar'
import { CalendarEvent } from '@/types/event'

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { events, addEvent, updateEvent, deleteEvent } = useEvents()
  const { currentDate, goToNextMonth, goToPreviousMonth } = useCalendar()

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
    setIsOverlayOpen(true)
  }

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false)
  }

  const handleViewEvents = () => {
    setIsSidePanelOpen(true)
    setIsOverlayOpen(false)
  }

  const handleAddEvent = () => {
    setIsAddModalOpen(true)
    setIsOverlayOpen(false)
  }

  const handleDeleteAllEvents = () => {
    const eventsToDelete = events.filter(
      event => event.date.toDateString() === selectedDate?.toDateString()
    )
    eventsToDelete.forEach(event => deleteEvent(event.id))
    setIsOverlayOpen(false)
  }

  const handleAddNewEvent = (event: CalendarEvent) => {
    addEvent(event)
    setIsAddModalOpen(false)
  }

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Calendar Task Tracker</h1>
      <div className="flex justify-between mb-4">
        <Button onClick={goToPreviousMonth}>Previous</Button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <Button onClick={goToNextMonth}>Next</Button>
      </div>
      <Calendar
        currentDate={currentDate}
        events={events}
        onDayClick={handleDayClick}
        selectedDate={selectedDate}
      />
      <DateOverlay
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
        onViewEvents={handleViewEvents}
        onAddEvent={handleAddEvent}
        onDeleteAllEvents={handleDeleteAllEvents}
        selectedDate={selectedDate}
      />
      <EventSidePanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
        selectedDate={selectedDate}
        events={events.filter(event => event.date.toDateString() === selectedDate?.toDateString())}
        onDeleteEvent={handleDeleteEvent}
      />
      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        selectedDate={selectedDate}
        onAddEvent={handleAddNewEvent}
      />
    </div>
  )
}

