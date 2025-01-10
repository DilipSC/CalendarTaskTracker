import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CalendarEvent } from '@/types/event'

interface AddEventModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | null
  onAddEvent: (event: CalendarEvent) => void
}

export default function AddEventModal({
  isOpen,
  onClose,
  selectedDate,
  onAddEvent
}: AddEventModalProps) {
  const [title, setTitle] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [description, setDescription] = useState('')
  const [timeError, setTimeError] = useState('')

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
      id: Date.now().toString(),
      title,
      date: selectedDate!,
      startTime,
      endTime,
      description
    }
    onAddEvent(event)
    onClose()
    // Reset form
    setTitle('')
    setStartTime('')
    setEndTime('')
    setDescription('')
    setTimeError('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Event for {selectedDate?.toLocaleDateString()}</DialogTitle>
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
          <Button type="submit" disabled={!!timeError}>Add Event</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

