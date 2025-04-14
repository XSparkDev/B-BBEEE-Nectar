"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ArrowRight, Download, FileText, Package, Sparkles, Users } from "lucide-react"
import Link from "next/link"
import { ScorecardSummary } from "@/components/scorecard-summary"
import { scorecardData, type BbbeeScorecard } from "@/lib/models/scorecard"
import { CalculateScorecardModal } from "@/components/modals/calculate-scorecard-modal"
import {
  elementScoresData,
  recentDocumentsData,
  missingDocumentsData,
  recommendedActionsData,
  scoreCardData,
} from "@/lib/models/dashboard"
import { AnimatedCounter } from "@/components/animated-counter"

export default function DashboardPage() {
  const [scorecard, setScorecard] = useState<BbbeeScorecard>(scorecardData)
  const [isScorecardModalOpen, setIsScorecardModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Set visible after component mounts to trigger animations
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleCalculateScorecard = (newScorecard: BbbeeScorecard) => {
    setScorecard(newScorecard)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight gradient-heading">Dashboard</h1>
          <Button className="gap-2" onClick={() => setIsScorecardModalOpen(true)}>
            <Sparkles className="h-4 w-4" />
            Calculate Scorecard
          </Button>
        </div>
        <p className="text-muted-foreground">Welcome to your B-BBEE compliance dashboard</p>
      </div>

      <ScorecardSummary scorecard={scorecard} previousScore={scoreCardData.previousScore} showTrendsAlert={true} />

      <div
        className={`transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transitionDelay: "300ms" }}
      >
        <Alert variant="default" className="gradient-border alert-gradient">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="font-semibold text-foreground">Action Required</AlertTitle>
          <AlertDescription className="text-foreground">
            Your Skills Development documentation needs to be updated before your next verification.
          </AlertDescription>
        </Alert>
      </div>

      <div
        className={`transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transitionDelay: "400ms" }}
      >
        <Tabs defaultValue="scorecard" className="space-y-4">
          <TabsList className="bg-card-gradient">
            <TabsTrigger
              value="scorecard"
              className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
            >
              Scorecard
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="actions"
              className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
            >
              Recommended Actions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="scorecard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {elementScoresData.map((element, index) => (
                <div
                  key={element.element}
                  className={`transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <Card className="gradient-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">{element.element}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">
                          <AnimatedCounter value={element.current} delay={600 + index * 100} /> / {element.total}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <AnimatedCounter value={element.percentage} suffix="%" delay={700 + index * 100} />
                        </div>
                      </div>
                      <Progress value={isVisible ? element.percentage : 0} className="mt-2" />
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <Link
                          href={`/dashboard/${element.element.toLowerCase().replace(/\s+/g, "-")}`}
                          className="flex items-center hover:underline text-purple-500"
                        >
                          View details
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                        <span>
                          Last updated:{" "}
                          {element.lastUpdated.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="documents" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div
                className={`transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "500ms" }}
              >
                <Card className="gradient-card">
                  <CardHeader>
                    <CardTitle>Recent Documents</CardTitle>
                    <CardDescription>Recently uploaded or updated documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentDocumentsData.map((doc, index) => (
                        <div
                          key={doc.id}
                          className={`flex items-center gap-4 transition-all duration-300 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                          style={{ transitionDelay: `${600 + index * 100}ms` }}
                        >
                          <div className="rounded-full bg-purple-100 p-2">
                            <FileText className="h-5 w-5 text-purple-500" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded{" "}
                              {doc.uploadDate.toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div
                className={`transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "600ms" }}
              >
                <Card className="gradient-card">
                  <CardHeader>
                    <CardTitle>Missing Documents</CardTitle>
                    <CardDescription>Documents required for your next verification</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {missingDocumentsData.map((doc, index) => (
                        <div
                          key={doc.id}
                          className={`flex items-center gap-4 transition-all duration-300 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                          style={{ transitionDelay: `${700 + index * 100}ms` }}
                        >
                          <div className="rounded-full bg-amber-100 p-2">
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Required by{" "}
                              {doc.requiredBy.toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <Button variant="gradientOutline" size="sm">
                            Upload
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="actions" className="space-y-4">
            <div
              className={`transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "500ms" }}
            >
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                  <CardDescription>Actions to improve your B-BBEE score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendedActionsData.map((action, index) => (
                      <div
                        key={action.id}
                        className={`rounded-lg border p-4 gradient-border transition-all duration-300 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                        style={{ transitionDelay: `${600 + index * 100}ms` }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-purple-100 p-2">
                            {action.category === "Enterprise" && <Package className="h-4 w-4 text-purple-500" />}
                            {action.category === "Management" && <Users className="h-4 w-4 text-purple-500" />}
                            {action.category === "Skills" && <FileText className="h-4 w-4 text-purple-500" />}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium">{action.title}</p>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                            <div className="pt-2 flex items-center">
                              <Button variant="subtle" size="sm">
                                Simulate Impact
                              </Button>
                              <span className="ml-2 text-sm text-green-500">
                                +
                                <AnimatedCounter
                                  value={action.potentialImpact}
                                  suffix=" pts"
                                  delay={800 + index * 100}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CalculateScorecardModal
        isOpen={isScorecardModalOpen}
        onClose={() => setIsScorecardModalOpen(false)}
        onCalculate={handleCalculateScorecard}
      />
    </div>
  )
}
