"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, ArrowRight, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { industries } from "@/lib/constants/industries"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [companyData, setCompanyData] = useState({
    registrationNumber: "",
    industry: "",
    financialYearEnd: "",
    sectorCode: "generic",
    turnoverClassification: "eme",
  })
  const router = useRouter()

  const handleChange = (field: string, value: string) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span>B-BBEE Nectar</span>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Set up your company profile</h1>
              <p className="text-muted-foreground">Complete the following steps to set up your B-BBEE dashboard</p>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "border border-muted-foreground text-muted-foreground"}`}
                  >
                    {step > 1 ? <CheckCircle2 className="h-5 w-5" /> : 1}
                  </div>
                  <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>Company Details</span>
                </div>
                <div className="h-px w-12 bg-muted"></div>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "border border-muted-foreground text-muted-foreground"}`}
                  >
                    {step > 2 ? <CheckCircle2 className="h-5 w-5" /> : 2}
                  </div>
                  <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>B-BBEE Classification</span>
                </div>
                <div className="h-px w-12 bg-muted"></div>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "border border-muted-foreground text-muted-foreground"}`}
                  >
                    3
                  </div>
                  <span className={step >= 3 ? "font-medium" : "text-muted-foreground"}>Confirmation</span>
                </div>
              </div>
            </div>

            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Company Details</CardTitle>
                  <CardDescription>Enter your company registration information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Company Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      placeholder="2023/123456/07"
                      value={companyData.registrationNumber}
                      onChange={(e) => handleChange("registrationNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={companyData.industry} onValueChange={(value) => handleChange("industry", value)}>
                      <SelectTrigger id="industry">
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
                  <div className="space-y-2">
                    <Label htmlFor="financialYearEnd">Financial Year End</Label>
                    <Input
                      id="financialYearEnd"
                      type="month"
                      value={companyData.financialYearEnd}
                      onChange={(e) => handleChange("financialYearEnd", e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => router.push("/")}>
                    Cancel
                  </Button>
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>B-BBEE Classification</CardTitle>
                  <CardDescription>Select your sector code and turnover classification</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="sectorCode">Sector Code</Label>
                    <Select value={companyData.sectorCode} onValueChange={(value) => handleChange("sectorCode", value)}>
                      <SelectTrigger id="sectorCode">
                        <SelectValue placeholder="Select sector code" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="generic">Generic</SelectItem>
                        <SelectItem value="ict">ICT</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="financial">Financial Services</SelectItem>
                        <SelectItem value="tourism">Tourism</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="property">Property</SelectItem>
                        <SelectItem value="forestry">Forestry</SelectItem>
                        <SelectItem value="agriculture">Agriculture</SelectItem>
                        <SelectItem value="mining">Mining</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label>Turnover Classification</Label>
                    <RadioGroup
                      value={companyData.turnoverClassification}
                      onValueChange={(value) => handleChange("turnoverClassification", value)}
                    >
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="eme" id="eme" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="eme" className="font-medium">
                            EME (Exempted Micro Enterprise)
                          </Label>
                          <p className="text-sm text-muted-foreground">Annual turnover less than R10 million</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="qse" id="qse" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="qse" className="font-medium">
                            QSE (Qualifying Small Enterprise)
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Annual turnover between R10 million and R50 million
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="generic" id="generic" />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor="generic" className="font-medium">
                            Generic
                          </Label>
                          <p className="text-sm text-muted-foreground">Annual turnover above R50 million</p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Confirmation</CardTitle>
                  <CardDescription>Review your company information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Registration Number</h3>
                        <p>{companyData.registrationNumber || "Not provided"}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Industry</h3>
                        <p>{industries.find((i) => i.value === companyData.industry)?.label || "Not selected"}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Financial Year End</h3>
                        <p>{companyData.financialYearEnd || "Not provided"}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Sector Code</h3>
                        <p className="capitalize">{companyData.sectorCode}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Turnover Classification</h3>
                        <p className="uppercase">{companyData.turnoverClassification}</p>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-4 text-sm">
                      <p>
                        By proceeding, you confirm that the information provided is accurate. You can update these
                        details at any time from your company profile settings.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    Complete Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
