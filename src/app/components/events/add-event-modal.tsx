"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AddEventForm, type EventFormValues } from "./add-event-form"

interface AddEventModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: EventFormValues) => void
}

export function AddEventModal({ isOpen, onClose, onSubmit }: AddEventModalProps) {
  const handleSubmit = (values: EventFormValues) => {
    onSubmit(values)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#1d1d1f] border-white/10 rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-white">Create New Event</DialogTitle>
          <DialogDescription className="text-zinc-400 font-light">
            Fill in the details for your new event. Only name and type are required.
          </DialogDescription>
        </DialogHeader>
        <AddEventForm onSubmit={handleSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  )
} 