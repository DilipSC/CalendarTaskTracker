import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { CalendarEvent } from '@/types/event'

interface EventSidePanelProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | null
  events: CalendarEvent[]
  onDeleteEvent: (eventId: string) => void
}

export default function EventSidePanel({
  isOpen,
  onClose,
  selectedDate,
  events,
  onDeleteEvent
}: EventSidePanelProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Events for {selectedDate?.toLocaleDateString()}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          {events.length === 0 ? (
            <p>No events for this day.</p>
          ) : (
            events.map(event => (
              <div key={event.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold">{event.title}</h3>
                <p>{event.startTime} - {event.endTime}</p>
                <p className="text-sm text-gray-600">{event.description}</p>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => onDeleteEvent(event.id)}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

