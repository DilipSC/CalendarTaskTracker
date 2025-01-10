import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DateOverlayProps {
  isOpen: boolean
  onClose: () => void
  onViewEvents: () => void
  onAddEvent: () => void
  onDeleteAllEvents: () => void
  selectedDate: Date | null
}

export default function DateOverlay({
  isOpen,
  onClose,
  onViewEvents,
  onAddEvent,
  onDeleteAllEvents,
  selectedDate
}: DateOverlayProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Options for {selectedDate?.toLocaleDateString()}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={onViewEvents}>View Events</Button>
          <Button onClick={onAddEvent}>Add Event</Button>
          <Button variant="destructive" onClick={onDeleteAllEvents}>Delete All Events</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

