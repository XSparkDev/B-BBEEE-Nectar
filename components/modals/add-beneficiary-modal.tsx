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
import { industries } from "@/lib/constants/industries"

interface AddBeneficiaryModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (beneficiary: {
    companyName: string
    industry: string
    ownership: string
    supportType:
      | "Financial"
      | "Mentorship"
      | "Financial & Mentorship"
      | "Financial & Equipment"
      | "Mentorship & Equipment"
    annualValue: number
    status: "Active" | "Pending" | "Completed"
    contactPerson: string
    contactEmail: string
    contactPhone: string
  }) => void
}

export function AddBeneficiaryModal({ isOpen, onClose, onAdd }: AddBeneficiaryModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    ownership: "",
    supportType: "Financial" as
      | "Financial"
      | "Mentorship"
      | "Financial & Mentorship"
      | "Financial & Equipment"
      | "Mentorship & Equipment",
    annualValue: 0,
    status: "Pending" as "Active" | "Pending" | "Completed",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
  })

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({
      companyName: "",
      industry: "",
      ownership: "",
      supportType: "Financial",
      annualValue: 0,
      status: "Pending",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Beneficiary</DialogTitle>
          <DialogDescription>
            Enter the details of the new beneficiary to add to your enterprise development initiatives.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyName" className="text-right">
                Company Name
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ownership" className="text-right">
                Ownership
              </Label>
              <Input
                id="ownership"
                value={formData.ownership}
                onChange={(e) => handleChange("ownership", e.target.value)}
                placeholder="e.g. 100% Black Owned"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supportType" className="text-right">
                Support Type
              </Label>
              <Select value={formData.supportType} onValueChange={(value) => handleChange("supportType", value)}>
                <SelectTrigger id="supportType" className="col-span-3">
                  <SelectValue placeholder="Select support type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Mentorship">Mentorship</SelectItem>
                  <SelectItem value="Financial & Mentorship">Financial & Mentorship</SelectItem>
                  <SelectItem value="Financial & Equipment">Financial & Equipment</SelectItem>
                  <SelectItem value="Mentorship & Equipment">Mentorship & Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="annualValue" className="text-right">
                Annual Value (R)
              </Label>
              <Input
                id="annualValue"
                type="number"
                min="0"
                value={formData.annualValue}
                onChange={(e) => handleChange("annualValue", Number.parseFloat(e.target.value))}
                className="col-span-3"
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
              <Label htmlFor="contactEmail" className="text-right">
                Contact Email
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contactPhone" className="text-right">
                Contact Phone
              </Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
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
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Beneficiary</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
