"use client"

import type React from "react"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Race, Gender, VerificationStatus } from "@/lib/models"

interface AddBoardMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (boardMember: {
    name: string
    position: string
    race: Race
    gender: Gender
    votingRights: number
    status: VerificationStatus
  }) => void
}

export function AddBoardMemberModal({ isOpen, onClose, onAdd }: AddBoardMemberModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    race: "Black" as Race,
    gender: "Male" as Gender,
    votingRights: 0,
    status: "Pending Verification" as VerificationStatus,
  })

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({
      name: "",
      position: "",
      race: "Black" as Race,
      gender: "Male" as Gender,
      votingRights: 0,
      status: "Pending Verification" as VerificationStatus,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Board Member</DialogTitle>
          <DialogDescription>
            Enter the details of the new board member to add to your board of directors.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Select value={formData.position} onValueChange={(value) => handleChange("position", value)}>
                <SelectTrigger id="position" className="col-span-3">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chairperson">Chairperson</SelectItem>
                  <SelectItem value="Non-Executive Director">Non-Executive Director</SelectItem>
                  <SelectItem value="Executive Director">Executive Director</SelectItem>
                  <SelectItem value="Independent Director">Independent Director</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="race" className="text-right">
                Race
              </Label>
              <Select value={formData.race} onValueChange={(value) => handleChange("race", value as Race)}>
                <SelectTrigger id="race" className="col-span-3">
                  <SelectValue placeholder="Select race" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Coloured">Coloured</SelectItem>
                  <SelectItem value="Indian">Indian</SelectItem>
                  <SelectItem value="N/A">N/A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value as Gender)}>
                <SelectTrigger id="gender" className="col-span-3">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="N/A">N/A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="votingRights" className="text-right">
                Voting Rights %
              </Label>
              <Input
                id="votingRights"
                type="number"
                min="0"
                max="100"
                value={formData.votingRights}
                onChange={(e) => handleChange("votingRights", Number.parseFloat(e.target.value))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value as VerificationStatus)}
              >
                <SelectTrigger id="status" className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Verified">Verified</SelectItem>
                  <SelectItem value="Pending Verification">Pending Verification</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Board Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
