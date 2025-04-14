"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Attendee {
  id: string
  name: string
  position: string
  company: string
  race: string
  gender: string
  contactEmail?: string
  completionStatus: "In Progress" | "Completed" | "Not Started"
}

interface ProgramAttendeesModalProps {
  isOpen: boolean
  onClose: () => void
  programName: string
  programType: string
  attendees: Attendee[]
}

export function ProgramAttendeesModal({
  isOpen,
  onClose,
  programName,
  programType,
  attendees,
}: ProgramAttendeesModalProps) {
  const [activeTab, setActiveTab] = useState("attendees")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{programName}</DialogTitle>
          <DialogDescription>
            {programType} - {attendees.length} participants
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="attendees" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
          </TabsList>

          <TabsContent value="attendees" className="mt-4">
            <div className="overflow-auto max-h-[400px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-background">
                  <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Position</th>
                    <th className="pb-2">Company</th>
                    <th className="pb-2">Demographics</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((attendee) => (
                    <tr key={attendee.id} className="border-b">
                      <td className="py-3">{attendee.name}</td>
                      <td className="py-3">{attendee.position}</td>
                      <td className="py-3">{attendee.company}</td>
                      <td className="py-3">
                        {attendee.race}, {attendee.gender}
                      </td>
                      <td className="py-3">
                        <Badge
                          className={
                            attendee.completionStatus === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : attendee.completionStatus === "In Progress"
                                ? "bg-purple-gold-gradient"
                                : "border-amber-500 text-amber-500"
                          }
                        >
                          {attendee.completionStatus}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="companies" className="mt-4">
            <div className="overflow-auto max-h-[400px]">
              {/* Group attendees by company and count */}
              {Object.entries(
                attendees.reduce(
                  (acc, attendee) => {
                    if (!acc[attendee.company]) {
                      acc[attendee.company] = { count: 0, attendees: [] }
                    }
                    acc[attendee.company].count += 1
                    acc[attendee.company].attendees.push(attendee)
                    return acc
                  },
                  {} as Record<string, { count: number; attendees: Attendee[] }>,
                ),
              ).map(([company, data]) => (
                <div key={company} className="mb-4 p-4 border rounded-lg gradient-card">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-lg">{company}</h3>
                    <Badge className="bg-purple-gold-gradient">{data.count} Attendees</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      Demographics: {data.attendees.filter((a) => a.race === "Black").length} Black,{" "}
                      {data.attendees.filter((a) => a.gender === "Female").length} Female
                    </p>
                    <p className="mt-1">
                      Completion: {data.attendees.filter((a) => a.completionStatus === "Completed").length} Completed,{" "}
                      {data.attendees.filter((a) => a.completionStatus === "In Progress").length} In Progress
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
