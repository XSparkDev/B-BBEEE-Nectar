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
import { industries } from "@/lib/constants/industries"

interface AddShareholderModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (shareholder: {
    name: string
    type: string
    race: Race
    gender: Gender
    ownershipPercentage: number
    votingRightsPercentage: number
    status: VerificationStatus
    industry?: string
  }) => void
}

export function AddShareholderModal({ isOpen, onClose, onAdd }: AddShareholderModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "Individual",
    race: "Black" as Race,
    gender: "Male" as Gender,
    ownershipPercentage: 0,
    votingRightsPercentage: 0,
    status: "Pending Verification" as VerificationStatus,
    industry: "",
  })

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({
      name: "",
      type: "Individual",
      race: "Black" as Race,
      gender: "Male" as Gender,
      ownershipPercentage: 0,
      votingRightsPercentage: 0,
      status: "Pending Verification" as VerificationStatus,
      industry: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Shareholder</DialogTitle>
          <DialogDescription>
            Enter the details of the new shareholder to add to your company's ownership structure.
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
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger id="type" className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                  <SelectItem value="Trust">Trust</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.type === "Company" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="industry" className="text-right">
                  Industry
                </Label>
                <Select value={formData.industry} onValueChange={(value) => handleChange("industry", value)}>
                  <SelectTrigger id="industry" className="col-span-3">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
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
              <Label htmlFor="ownershipPercentage" className="text-right">
                Ownership %
              </Label>
              <Input
                id="ownershipPercentage"
                type="number"
                min="0"
                max="100"
                value={formData.ownershipPercentage}
                onChange={(e) => handleChange("ownershipPercentage", Number.parseFloat(e.target.value))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="votingRightsPercentage" className="text-right">
                Voting Rights %
              </Label>
              <Input
                id="votingRightsPercentage"
                type="number"
                min="0"
                max="100"
                value={formData.votingRightsPercentage}
                onChange={(e) => handleChange("votingRightsPercentage", Number.parseFloat(e.target.value))}
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
            <Button type="submit">Add Shareholder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
