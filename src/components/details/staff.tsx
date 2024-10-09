"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Paperclip, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type Attachment = {
    name: string
    type: string
    size: string
    url: string
}

type Event = {
    date: string
    title: string
    description: string
    attachments: Attachment[]
}

const initialEvents: Event[] = [
    {
        date: "2023-10-15",
        title: "Annual Check-up",
        description: "Routine physical examination. All vitals normal.",
        attachments: [
            { name: "Vitals Report.pdf", type: "PDF", size: "156 KB", url: "/files/vitals-report.pdf" },
            { name: "Blood Work Results.pdf", type: "PDF", size: "2.1 MB", url: "/files/blood-work-results.pdf" }
        ]
    },
    {
        date: "2023-09-01",
        title: "Flu Vaccination",
        description: "Seasonal influenza vaccine administered.",
        attachments: [
            { name: "Vaccination Record.pdf", type: "PDF", size: "89 KB", url: "/files/vaccination-record.pdf" }
        ]
    },
    {
        date: "2023-07-20",
        title: "Blood Test Results",
        description: "Cholesterol levels slightly elevated. Recommended dietary changes.",
        attachments: [
            { name: "Lipid Panel.pdf", type: "PDF", size: "1.2 MB", url: "/files/lipid-panel.pdf" },
            { name: "Diet Recommendations.docx", type: "DOCX", size: "45 KB", url: "/files/diet-recommendations.docx" },
            { name: "Follow-up Schedule.pdf", type: "PDF", size: "78 KB", url: "/files/follow-up-schedule.pdf" }
        ]
    },
    {
        date: "2023-05-10",
        title: "Prescribed Medication",
        description: "Started on low-dose aspirin for heart health.",
        attachments: [
            { name: "Prescription.pdf", type: "PDF", size: "102 KB", url: "/files/prescription.pdf" }
        ]
    },
    {
        date: "2023-03-05",
        title: "Diagnosed with Hypertension",
        description: "Mild hypertension detected. Lifestyle changes recommended.",
        attachments: [
            { name: "Diagnosis Report.pdf", type: "PDF", size: "1.8 MB", url: "/files/diagnosis-report.pdf" },
            { name: "Treatment Plan.docx", type: "DOCX", size: "67 KB", url: "/files/treatment-plan.docx" }
        ]
    }
]

function AttachmentsList({ attachments }: { attachments: Attachment[] }) {
    return (
        <ul className="divide-y divide-gray-200">
            {attachments.map((attachment, index) => (
                <li key={index} className="py-3">
                    <a
                        href={attachment.url}
                        className="flex justify-between items-center hover:bg-accent rounded-md transition-colors duration-200 p-2"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="flex items-center">
                            <Paperclip className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-sm font-medium text-primary">{attachment.name}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm text-muted-foreground mr-4">{attachment.type}</span>
                            <span className="text-sm text-muted-foreground">{attachment.size}</span>
                        </div>
                    </a>
                </li>
            ))}
        </ul>
    )
}

function AddEventForm({ onAddEvent, onClose }: { onAddEvent: (event: Event) => void; onClose: () => void }) {
    const [newEvent, setNewEvent] = useState<Omit<Event, 'attachments'>>({
        date: '',
        title: '',
        description: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onAddEvent({ ...newEvent, attachments: [] })
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="date">Date</Label>
                <Input
                    id="date"
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
            </div>
            <div>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    required
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    required
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
            </div>
            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                <Button type="submit">Add Event</Button>
            </div>
        </form>
    )
}

export default function DoctorDetails() {
    const [events, setEvents] = useState<Event[]>(initialEvents)
    const [openDialog, setOpenDialog] = useState<number | null>(null)
    const [isAddEventOpen, setIsAddEventOpen] = useState(false)

    const handleAddEvent = (newEvent: Event) => {
        setEvents([newEvent, ...events])
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Treatment History</h2>
            <ul className="space-y-4">
                {events.map((event, index) => (
                    <li key={index} className="bg-card text-card-foreground rounded-lg shadow-md p-4">
                        <div className="flex justify-between items-center mb-2">
                            <time className="text-sm font-medium text-muted-foreground">
                                {event.date}
                            </time>
                            <Dialog open={openDialog === index} onOpenChange={(isOpen) => setOpenDialog(isOpen ? index : null)}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                                        <Paperclip className="h-4 w-4" />
                                        Attachments ({event.attachments.length})
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Attachments for {event.title}</DialogTitle>
                                    </DialogHeader>
                                    <AttachmentsList attachments={event.attachments} />
                                </DialogContent>
                            </Dialog>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">
                            {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {event.description}
                        </p>
                    </li>
                ))}
            </ul>
            <div className="mt-6">
                <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full" size="lg">
                            <Plus className="mr-2 h-4 w-4" /> Add New Event
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Event</DialogTitle>
                        </DialogHeader>
                        <AddEventForm onAddEvent={handleAddEvent} onClose={() => setIsAddEventOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}