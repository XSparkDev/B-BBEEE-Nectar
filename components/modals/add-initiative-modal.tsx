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
import { Textarea } from "@/components/ui/textarea"

interface AddInitiativeModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (initiative: {
    name: string
    category: "Education" | "Healthcare" | "Technology" | "Skills Development"
    beneficiaries: string
    duration: string
    annualBudget: number
    status: "Active" | "Planning" | "Completed"
    description: string
    impact: string
    contactPerson: string
  }) => void
}

export function AddInitiativeModal({ isOpen, onClose, onAdd }: AddInitiativeModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Education" as "Education" | "Healthcare" | "Technology" | "Skills Development",
    beneficiaries: "",
    duration: "",
    annualBudget: 0,
    status: "Planning" as "Active" | "Planning" | "Completed",
    description: "",
    impact: "",
    contactPerson: "",
  })

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({
      name: "",
      category: "Education",
      beneficiaries: "",
      duration: "",
      annualBudget: 0,
      status: "Planning",
      description: "",
      impact: "",
      contactPerson: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Initiative</DialogTitle>
          <DialogDescription>Enter the details of the new socio-economic development initiative.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Initiative Name
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
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger id="category" className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Skills Development">Skills Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="beneficiaries" className="text-right">
                Beneficiaries
              </Label>
              <Input
                id="beneficiaries"
                value={formData.beneficiaries}
                onChange={(e) => handleChange("beneficiaries", e.target.value)}
                placeholder="e.g. 250 Students"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                placeholder="e.g. 3 years"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="annualBudget" className="text-right">
                Annual Budget (R)
              </Label>
              <Input
                id="annualBudget"
                type="number"
                min="0"
                value={formData.annualBudget}
                onChange={(e) => handleChange("annualBudget", Number.parseFloat(e.target.value))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="col-span-3"
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="impact" className="text-right pt-2">
                Impact
              </Label>
              <Textarea
                id="impact"
                value={formData.impact}
                onChange={(e) => handleChange("impact", e.target.value)}
                className="col-span-3"
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contactPerson" className="text-right">
                Contact Person
              </Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => handleChange("contactPerson", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger id="status" className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Initiative</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
