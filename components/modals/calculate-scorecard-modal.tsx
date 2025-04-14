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
import { calculateScorecard, type BbbeeScorecard } from "@/lib/models/scorecard"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle, InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

interface CalculateScorecardModalProps {
  isOpen: boolean
  onClose: () => void
  onCalculate: (scorecard: BbbeeScorecard) => void
}

export function CalculateScorecardModal({ isOpen, onClose, onCalculate }: CalculateScorecardModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    ownership: 23,
    management: 15,
    skills: 12,
    enterprise: 18,
    socioEconomic: 10.5,
    blackOwnership: 51,
    blackWomenOwnership: 25,
    verificationDate: new Date(new Date().getFullYear() + 1, 5, 15).toISOString().split("T")[0],
    verificationAgency: "BEE Verification Solutions"
  })
  
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate calculation with delay
    setTimeout(() => {
      // Create a custom scorecard based on form inputs
      const scorecard = calculateScorecard();
      
      // Override with form values
      const elements = scorecard.elements;
      elements[0].current = Number(formData.ownership);
      elements[1].current = Number(formData.management);
      elements[2].current = Number(formData.skills);
      elements[3].current = Number(formData.enterprise);
      elements[4].current = Number(formData.socioEconomic);
      
      // Recalculate total score
      const totalScore = elements.reduce((sum, element) => sum + element.current, 0);
      
      // Create updated scorecard
      const updatedScorecard: BbbeeScorecard = {
        ...scorecard,
        elements,
        totalScore,
        blackOwnership: Number(formData.blackOwnership),
        blackWomenOwnership: Number(formData.blackWomenOwnership),
        validUntil: new Date(formData.verificationDate),
        daysRemaining: Math.ceil((new Date(formData.verificationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
        verificationAgency: formData.verificationAgency
      };
      
      onCalculate(updatedScorecard);
      setIsLoading(false);
      onClose();
      
      toast({
        title: "Scorecard Calculated",
        description: `Your B-BBEE scorecard has been calculated. You are now ${updatedScorecard.levelText}.`,
        variant: "success",
        duration: 3000,
      })
    }, 1500)
  }

  const R50M = 50000000; // Declared R50M variable
  const p = "Priority Element"; // Declared p variable

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Calculate B-BBEE Scorecard</DialogTitle>
          <DialogDescription>
            Enter your scores for each element to calculate your B-BBEE level.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Element Scores</h3>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ownership" className="col-span-2 flex items-center gap-2">
                  Ownership
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Measures Black ownership including percentage held by Black women. Target: 25 pts</p>
                        <p className="text-xs font-medium text-amber-500 mt-1">Priority Element (40% minimum)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="col-span-1">
                  <Input
                    id="ownership"
                    type="number"
                    min="0"
                    max="25"
                    step="0.5"
                    value={formData.ownership}
                    onChange={(e) => handleChange("ownership", Number(e.target.value))}
                    required
                  />
                </div>
                <div className="col-span-1 text-muted-foreground text-sm text-right">
                  / 25
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="management" className="col-span-2 flex items-center gap-2">
                  Management Control
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Includes board and executive representation. Target: 19 pts</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="col-span-1">
                  <Input
                    id="management"
                    type="number"
                    min="0"
                    max="19"
                    step="0.5"
                    value={formData.management}
                    onChange={(e) => handleChange("management", Number(e.target.value))}
                    required
                  />
                </div>
                <div className="col-span-1 text-muted-foreground text-sm text-right">
                  / 19
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="col-span-2 flex items-center gap-2">
                  Skills Development
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Spend on learning initiatives for Black people. Target: 20 pts</p>
                        <p className="text-xs font-medium text-amber-500 mt-1">Priority Element (40% minimum)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="col-span-1">
                  <Input
                    id="skills"
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={formData.skills}
                    onChange={(e) => handleChange("skills", Number(e.target.value))}
                    required
                  />
                </div>
                <div className="col-span-1 text-muted-foreground text-sm text-right">
                  / 20
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="enterprise" className="col-span-2 flex items-center gap-2">
                  Enterprise Development
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Includes procurement, supplier & enterprise development. Target: 40 pts</p>
                        <p className="text-xs font-medium text-amber-500 mt-1">Priority Element (40% minimum)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="col-span-1">
                  <Input
                    id="enterprise"
                    type="number"
                    min="0"
                    max="40"
                    step="0.5"
                    value={formData.enterprise}
                    onChange={(e) => handleChange("enterprise", Number(e.target.value))}
                    required
                  />
                </div>
                <div className="col-span-1 text-muted-foreground text-sm text-right">
                  / 40
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="socioEconomic" className="col-span-2 flex items-center gap-2">
                  Socio-Economic Development
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Donations/initiatives benefiting &gt;75% Black beneficiaries. Target: 5 pts</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="col-span-1">
                  <Input
                    id="socioEconomic"
                    type="number"
                    min="0"
                    max="5"
                    step="0.5"
                    value={formData.socioEconomic}
                    onChange={(e) => handleChange("socioEconomic", Number(e.target.value))}
                    required
                  />
                </div>
                <div className="col-span-1 text-muted-foreground text-sm text-right">
                  / 5
                </div>
              </div>
              
              <div className="mt-2">
                <Label className="text-muted-foreground text-sm">
                  Total Score: {Number(formData.ownership) + Number(formData.management) + Number(formData.skills) + Number(formData.enterprise) + Number(formData.socioEconomic)} / 109
                </Label>
                <Progress value={((Number(formData.ownership) + Number(formData.management) + Number(formData.skills) + Number(formData.enterprise) + Number(formData.socioEconomic)) / 109) * 100} className="h-2 mt-1" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Ownership Details</h3>
              
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="blackOwnership" className="col-span-1 flex items-center gap-2">
                  Black Ownership %
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>\
                        <p>51% Black Owned means automatic Level 2 QSE if turnover is R50M</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="col-span-2">
                  <Input
                    id="blackOwnership"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.blackOwnership}
                    onChange={(e) => handleChange("blackOwnership", Number(e.target.value))}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="blackWomenOwnership" className="col-span-1 flex items-center gap-2">
                  Black Women Ownership %
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>30% Black Women Owned means automatic Level 1 QSE if turnover is R50M</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="col-span-2">
                  <Input
                    id="blackWomenOwnership"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.blackWomenOwnership}
                    onChange={(e) => handleChange("blackWomenOwnership", Number(e.target.value))}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Verification Details</h3>
              
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="verificationDate" className="col-span-1">
                  Verification Expiry Date
                </Label>
                <div className="col-span-2">
                  <Input
                    id="verificationDate"
                    type="date"
                    value={formData.verificationDate}
                    onChange={(e) => handleChange("verificationDate", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="verificationAgency" className="col-span-1">
                  Verification Agency
                </Label>
                <div className="col-span-2">
                  <Input
                    id="verificationAgency"
                    value={formData.verificationAgency}
                    onChange={(e) => handleChange("verificationAgency", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800 font-medium">
                  Priority Elements Sub-Minimum Warning
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  Ownership, Skills Development, and Enterprise Development are priority elements. 
                  If you score less than 40% on any of these elements, your B-BBEE level will be discounted by one level.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Calculating..." : "Calculate Scorecard"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
