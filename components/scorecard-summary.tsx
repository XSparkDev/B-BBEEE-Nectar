"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { BarChart3, Calendar, Users, AlertCircle, TrendingUp, TrendingDown, InfoIcon, ArrowRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { type BbbeeScorecard, getBbbeeLevel } from "@/lib/models/scorecard"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { AnimatedCounter } from "@/components/animated-counter"

interface ScorecardSummaryProps {
  scorecard: BbbeeScorecard
  previousScore?: number
  showTrendsAlert?: boolean
}

export function ScorecardSummary({ scorecard, previousScore, showTrendsAlert = true }: ScorecardSummaryProps) {
  const changeAmount = previousScore ? scorecard.totalScore - previousScore : 0
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Set visible after component mounts to trigger animations
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div
          className={`transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "0ms" }}
        >
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current B-BBEE Level</CardTitle>
              <div className="rounded-full bg-purple-100 p-1">
                <Users className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-purple-gold-gradient">
                Level <AnimatedCounter value={Number.parseInt(scorecard.levelText.replace("Level ", ""))} delay={300} />
                {scorecard.isDiscounted && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center ml-2">
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Level discounted from {getBbbeeLevel(scorecard.levelBeforeDiscount || 0).levelText} due to not
                          meeting priority element sub-minimums.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Valid until {scorecard.validUntil ? new Date(scorecard.validUntil).toLocaleDateString() : "N/A"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div
          className={`transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "100ms" }}
        >
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Score</CardTitle>
              <div className="rounded-full bg-purple-100 p-1">
                <BarChart3 className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-purple-gold-gradient">
                  <AnimatedCounter value={scorecard.totalScore} decimals={1} delay={400} /> / 109
                </div>

                {changeAmount !== 0 && (
                  <div className={`ml-2 flex items-center ${changeAmount > 0 ? "text-green-500" : "text-red-500"}`}>
                    {changeAmount > 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-sm font-medium">
                      <AnimatedCounter value={Math.abs(changeAmount)} decimals={1} delay={800} /> pts
                    </span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {previousScore ? `Previous score: ${previousScore.toFixed(1)}` : "No previous score available"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div
          className={`transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Black Ownership</CardTitle>
              <div className="rounded-full bg-purple-100 p-1">
                <Users className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-purple-gold-gradient">
                <AnimatedCounter value={scorecard.blackOwnership} suffix="%" delay={500} />
                {scorecard.blackOwnership >= 51 && (
                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    51% Black
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                <AnimatedCounter value={scorecard.blackWomenOwnership} suffix="%" delay={600} /> Black Women Owned
              </p>
            </CardContent>
          </Card>
        </div>

        <div
          className={`transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "300ms" }}
        >
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Verification</CardTitle>
              <div className="rounded-full bg-purple-100 p-1">
                <Calendar className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-purple-gold-gradient">
                <AnimatedCounter value={scorecard.daysRemaining} suffix=" Days" delay={600} />
              </div>
              <p className="text-xs text-muted-foreground">
                Verification due on {scorecard.validUntil ? new Date(scorecard.validUntil).toLocaleDateString() : "N/A"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {showTrendsAlert && scorecard.daysRemaining && scorecard.daysRemaining <= 120 && (
        <div
          className={`transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "400ms" }}
        >
          <Alert variant="default" className="gradient-border alert-gradient">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <AlertTitle className="font-semibold text-foreground">Verification Expiry Warning</AlertTitle>
            <AlertDescription className="text-foreground">
              Your B-BBEE certificate will expire in {scorecard.daysRemaining} days. Please start the verification
              process soon.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div
        className={`transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transitionDelay: "500ms" }}
      >
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Element Breakdown</CardTitle>
            <CardDescription>Performance across B-BBEE scorecard elements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scorecard.elements.map((element, index) => {
                const percentage = Math.round((element.current / element.target) * 100)
                const subMinimum = element.isPriority ? element.subMinimum || element.target * 0.4 : undefined
                const isSubMinimumMet = subMinimum ? element.current >= subMinimum : true

                return (
                  <div
                    key={index}
                    className={`transition-all duration-300 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{element.name}</span>
                        {element.isPriority && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="ml-2 inline-flex items-center">
                                  <InfoIcon className="h-4 w-4 text-amber-500" />
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Priority Element - requires at least {Math.round((subMinimum || 0) * 10) / 10} points
                                  (40% of target)
                                </p>
                                {!isSubMinimumMet && (
                                  <p className="text-xs font-medium text-red-500 mt-1">
                                    Not meeting the minimum requirement. This will discount your overall B-BBEE level.
                                  </p>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">
                          <AnimatedCounter value={element.current} delay={700 + index * 100} /> / {element.target}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          <AnimatedCounter value={percentage} suffix="%" delay={800 + index * 100} />
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={isVisible ? percentage : 0}
                      className={`h-2 ${!isSubMinimumMet ? "bg-red-100" : ""}`}
                    />
                    {element.isPriority && subMinimum && (
                      <div className="relative mt-1">
                        <div
                          className="absolute h-3 w-px bg-amber-500"
                          style={{ left: `${(subMinimum / element.target) * 100}%`, top: "-8px" }}
                        ></div>
                        <div
                          className="absolute text-xs text-amber-600"
                          style={{ left: `${(subMinimum / element.target) * 100 - 2}%`, top: "-22px" }}
                        >
                          Min
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex justify-end mt-6">
              <Button variant="subtle" size="sm">
                <Link href="#" className="flex items-center">
                  View Detailed Analysis
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
