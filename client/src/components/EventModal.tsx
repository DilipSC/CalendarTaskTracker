import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CalendarEvent } from '@/types/event'

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | null
  events: CalendarEvent[]
  onAddEvent: (event: CalendarEvent) => void
  onUpdateEvent: (event: CalendarEvent) => void
  onDeleteEvent: (eventId: string) => void
  editingEvent: CalendarEvent | null
}

export default function EventModal({
  isOpen,
  onClose,
  selectedDate,
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  editingEvent
}: EventModalProps) {
  const [title, setTitle] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [description, setDescription] = useState('')
  const [timeError, setTimeError] = useState('')

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title)
      setStartTime(editingEvent.startTime)
      setEndTime(editingEvent.endTime)
      setDescription(editingEvent.description)
    } else {
      setTitle('')
      setStartTime('')
      setEndTime('')
      setDescription('')
    }
    setTimeError('')
  }, [editingEvent])

  const validateTime = (start: string, end: string) => {
    if (!start || !end) return true
    return start < end
  }

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value
    setStartTime(newStartTime)
    
    if (endTime && !validateTime(newStartTime, endTime)) {
      setTimeError('Start time must be before end time')
    } else {
      setTimeError('')
    }
  }

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = e.target.value
    setEndTime(newEndTime)
    
    if (startTime && !validateTime(startTime, newEndTime)) {
      setTimeError('End time must be after start time')
    } else {
      setTimeError('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateTime(startTime, endTime)) {
      setTimeError('Start time must be before end time')
      return
    }

    const event: CalendarEvent = {
      id: editingEvent ? editingEvent.id : Date.now().toString(),
      title,
      date: selectedDate!,
      startTime,
      endTime,
      description
    }
    
    if (editingEvent) {
      onUpdateEvent(event)
    } else {
      onAddEvent(event)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
              required
            />
          </div>
          {timeError && (
            <div className="text-sm text-red-500">
              {timeError}
            </div>
          )}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <Button type="submit" disabled={!!timeError}>
              {editingEvent ? 'Update' : 'Add'} Event
            </Button>
            {editingEvent && (
              <Button 
                type="button" 
                variant="destructive"
                onClick={() => onDeleteEvent(editingEvent.id)}
              >
                Delete Event
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

