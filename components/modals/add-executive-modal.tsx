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

interface AddExecutiveModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (executive: {
    name: string
    position: string
    race: Race
    gender: Gender
    yearsOfService: number
    status: VerificationStatus
  }) => void
}

export function AddExecutiveModal({ isOpen, onClose, onAdd }: AddExecutiveModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    race: "Black" as Race,
    gender: "Male" as Gender,
    yearsOfService: 0,
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
      yearsOfService: 0,
      status: "Pending Verification" as VerificationStatus,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Executive</DialogTitle>
          <DialogDescription>Enter the details of the new executive to add to your management team.</DialogDescription>
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
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleChange("position", e.target.value)}
                className="col-span-3"
                required
              />
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
              <Label htmlFor="yearsOfService" className="text-right">
                Years of Service
              </Label>
              <Input
                id="yearsOfService"
                type="number"
                min="0"
                value={formData.yearsOfService}
                onChange={(e) => handleChange("yearsOfService", Number.parseInt(e.target.value))}
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
            <Button type="submit">Add Executive</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
