"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Upload, GraduationCap, DollarSign, Trash2, FileText, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AddTrainingProgramModal } from "@/components/modals/add-training-program-modal"
import {
  skillsScoreData,
  trainingProgramsData,
  programAttendeesData,
  programSpendItemsData,
  programDocumentsData,
  learnerDemographicsData,
} from "@/lib/models/skills"
import { useToast } from "@/hooks/use-toast"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"
import { ProgramAttendeesModal } from "@/components/modals/program-attendees-modal"
import { ItemizeSpendModal } from "@/components/modals/itemize-spend-modal"
import type { TrainingProgram } from "@/lib/models/skills"
import { Progress } from "@/components/ui/progress"

export default function SkillsDevelopmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [programs, setPrograms] = useState(trainingProgramsData)
  const [score, setScore] = useState(skillsScoreData)
  const { toast } = useToast()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [programToDelete, setProgramToDelete] = useState<{ id: string; name: string } | null>(null)

  // State for attendees modal
  const [attendeesModalOpen, setAttendeesModalOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null)

  // State for itemize spend modal
  const [spendModalOpen, setSpendModalOpen] = useState(false)

  const handleAddProgram = (program: {
    name: string
    type: "Management Training" | "Technical Training" | "Internship" | "Short Course"
    participants: number
    duration: string
    budget: number
    status: "In Progress" | "Completed" | "Planned"
    startDate: Date
    endDate: Date
  }) => {
    const newProgram = {
      id: `${programs.length + 1}`,
      ...program,
    }
    setPrograms([...programs, newProgram])

    // Show success toast
    toast({
      title: "Training Program Added",
      description: `${program.name} has been successfully added to your skills development initiatives.`,
      variant: "success",
      duration: 3000,
    })
  }

  const handleDeleteClick = (id: string, name: string) => {
    setProgramToDelete({ id, name })
    setDeleteDialogOpen(true)
  }

  const handleDeleteProgram = () => {
    if (programToDelete) {
      const updatedPrograms = programs.filter((program) => program.id !== programToDelete.id)
      setPrograms(updatedPrograms)

      // Show success toast
      toast({
        title: "Training Program Deleted",
        description: `${programToDelete.name} has been successfully removed.`,
        variant: "success",
        duration: 3000,
      })
    }
  }

  const handleRowClick = (program: TrainingProgram) => {
    setSelectedProgram(program)
    setAttendeesModalOpen(true)
  }

  const handleItemizeSpend = (e: React.MouseEvent, program: TrainingProgram) => {
    e.stopPropagation()
    setSelectedProgram(program)
    setSpendModalOpen(true)
  }

  const calculateTotalSpent = () => {
    let total = 0
    Object.values(programSpendItemsData).forEach((items) => {
      items.forEach((item) => {
        total += item.amount
      })
    })
    return total
  }

  // Get all documents across all programs
  const getAllDocuments = () => {
    const allDocs: { id: string; name: string; type: string; uploadDate: Date; status: string; programName: string }[] =
      []

    Object.entries(programDocumentsData).forEach(([programId, docs]) => {
      const program = programs.find((p) => p.id === programId)
      if (program) {
        docs.forEach((doc) => {
          allDocs.push({
            ...doc,
            programName: program.name,
          })
        })
      }
    })

    return allDocs.sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime())
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight gradient-heading">Skills Development</h1>
        <p className="text-muted-foreground">Track and manage your company's skills development initiatives</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4 flex-wrap">
          <Card className="w-full md:w-auto gradient-card">
            <CardContent className="flex flex-row items-center gap-4 p-4">
              <div className="rounded-full bg-purple-100 p-3">
                <GraduationCap className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Score</p>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-purple-gold-gradient">
                  {score.current} / {score.total}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full md:w-auto gradient-card">
            <CardContent className="flex flex-row items-center gap-4 p-4">
              <div className="rounded-full bg-purple-100 p-3">
                <DollarSign className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Annual Budget</p>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-purple-gold-gradient">
                  R{(score.annualBudget / 1000000).toFixed(1)}M
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full md:w-auto gradient-card">
            <CardContent className="flex flex-row items-center gap-4 p-4">
              <div className="rounded-full bg-green-100 p-3">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Spent to Date</p>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-purple-gold-gradient">
                  R{(calculateTotalSpent() / 1000000).toFixed(1)}M
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex gap-2">
          <Button variant="gradientOutline" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Documents
          </Button>
          <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Program
          </Button>
        </div>
      </div>

      <Tabs defaultValue="programs" className="space-y-4">
        <TabsList className="bg-card-gradient">
          <TabsTrigger
            value="programs"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Training Programs
          </TabsTrigger>
          <TabsTrigger
            value="learners"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Learners
          </TabsTrigger>
          <TabsTrigger
            value="expenditure"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Expenditure
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Active Training Programs</CardTitle>
              <CardDescription>Current skills development initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                      <th className="pb-2">Program Name</th>
                      <th className="pb-2">Type</th>
                      <th className="pb-2">Participants</th>
                      <th className="pb-2">Duration</th>
                      <th className="pb-2">Budget</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.map((program) => (
                      <tr
                        key={program.id}
                        className="border-b cursor-pointer hover:bg-muted/50"
                        onClick={() => handleRowClick(program)}
                      >
                        <td className="py-3">{program.name}</td>
                        <td className="py-3">{program.type}</td>
                        <td className="py-3">{program.participants}</td>
                        <td className="py-3">{program.duration}</td>
                        <td className="py-3 cursor-pointer" onClick={(e) => handleItemizeSpend(e, program)}>
                          <span className="underline text-purple-500 hover:text-purple-700">
                            R{program.budget.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-3">
                          <Badge
                            className={
                              program.status === "Planned"
                                ? "border-amber-500 text-amber-500"
                                : "bg-purple-gold-gradient"
                            }
                          >
                            {program.status}
                          </Badge>
                        </td>
                        <td className="py-3" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteClick(program.id, program.name)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete {program.name}</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learners" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Learner Demographics</CardTitle>
              <CardDescription>Overview of learner participation in skills development programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Race Distribution</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Black</span>
                        <span className="text-sm font-medium">{learnerDemographicsData.race.black}%</span>
                      </div>
                      <Progress value={learnerDemographicsData.race.black} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Coloured</span>
                        <span className="text-sm font-medium">{learnerDemographicsData.race.coloured}%</span>
                      </div>
                      <Progress value={learnerDemographicsData.race.coloured} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Indian</span>
                        <span className="text-sm font-medium">{learnerDemographicsData.race.indian}%</span>
                      </div>
                      <Progress value={learnerDemographicsData.race.indian} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">White</span>
                        <span className="text-sm font-medium">{learnerDemographicsData.race.white}%</span>
                      </div>
                      <Progress value={learnerDemographicsData.race.white} className="h-2" />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mt-6 mb-4">Gender Distribution</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Female</span>
                        <span className="text-sm font-medium">{learnerDemographicsData.gender.female}%</span>
                      </div>
                      <Progress value={learnerDemographicsData.gender.female} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Male</span>
                        <span className="text-sm font-medium">{learnerDemographicsData.gender.male}%</span>
                      </div>
                      <Progress value={learnerDemographicsData.gender.male} className="h-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Program Participation</h3>
                  <div className="space-y-4">
                    {programs.map((program) => {
                      const attendees = programAttendeesData[program.id] || []
                      const blackAttendees = attendees.filter((a) => a.race === "Black").length
                      const femaleAttendees = attendees.filter((a) => a.gender === "Female").length
                      const blackPercentage =
                        attendees.length > 0 ? Math.round((blackAttendees / attendees.length) * 100) : 0
                      const femalePercentage =
                        attendees.length > 0 ? Math.round((femaleAttendees / attendees.length) * 100) : 0

                      return (
                        <Card key={program.id} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{program.name}</h4>
                            <Badge
                              className={
                                program.status === "Planned"
                                  ? "border-amber-500 text-amber-500"
                                  : "bg-purple-gold-gradient"
                              }
                            >
                              {program.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {program.type} • {program.participants} participants
                          </p>

                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-xs">
                                <span>Black Participants</span>
                                <span>{blackPercentage}%</span>
                              </div>
                              <Progress value={blackPercentage} className="h-1.5" />
                            </div>
                            <div>
                              <div className="flex justify-between text-xs">
                                <span>Female Participants</span>
                                <span>{femalePercentage}%</span>
                              </div>
                              <Progress value={femalePercentage} className="h-1.5" />
                            </div>
                          </div>

                          <Button
                            variant="subtle"
                            size="sm"
                            className="w-full mt-3"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRowClick(program)
                            }}
                          >
                            View Attendees
                          </Button>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenditure" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Skills Development Expenditure</CardTitle>
              <CardDescription>Overview of skills development spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Budget Utilization</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Overall Budget</span>
                        <span className="text-sm font-medium">
                          {Math.round((calculateTotalSpent() / score.annualBudget) * 100)}%
                        </span>
                      </div>
                      <Progress value={(calculateTotalSpent() / score.annualBudget) * 100} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>R{calculateTotalSpent().toLocaleString()} spent</span>
                        <span>R{score.annualBudget.toLocaleString()} budget</span>
                      </div>
                    </div>

                    {programs.map((program) => {
                      const programSpent = (programSpendItemsData[program.id] || []).reduce(
                        (sum, item) => sum + item.amount,
                        0,
                      )
                      const percentage = Math.round((programSpent / program.budget) * 100)

                      return (
                        <div key={program.id}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{program.name}</span>
                            <span className="text-sm font-medium">{percentage}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                            <span>R{programSpent.toLocaleString()} spent</span>
                            <span>R{program.budget.toLocaleString()} allocated</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Expenditure Breakdown</h3>
                  <div className="space-y-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Expenditure by Category</h4>
                      <div className="space-y-3">
                        {["Training", "Materials", "Facilities", "Equipment", "Other"].map((category) => {
                          // Calculate total spent in this category
                          const categoryTotal = Object.values(programSpendItemsData)
                            .flat()
                            .filter((item) => item.category === category)
                            .reduce((sum, item) => sum + item.amount, 0)

                          const percentage = Math.round((categoryTotal / calculateTotalSpent()) * 100) || 0

                          return (
                            <div key={category}>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">{category}</span>
                                <span className="text-sm font-medium">R{categoryTotal.toLocaleString()}</span>
                              </div>
                              <Progress value={percentage} className="h-2" />
                              <div className="flex justify-end mt-1 text-xs text-muted-foreground">
                                <span>{percentage}% of total</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Recent Expenditures</h4>
                      <div className="space-y-2">
                        {Object.entries(programSpendItemsData)
                          .flatMap(([programId, items]) =>
                            items.map((item) => ({
                              ...item,
                              programName: programs.find((p) => p.id === programId)?.name || "",
                            })),
                          )
                          .sort((a, b) => b.date.getTime() - a.date.getTime())
                          .slice(0, 5)
                          .map((item) => (
                            <div key={item.id} className="flex justify-between border-b pb-2">
                              <div>
                                <p className="text-sm font-medium">{item.description}</p>
                                <p className="text-xs text-muted-foreground">
                                  {item.programName} - {formatDate(item.date)}
                                </p>
                              </div>
                              <p className="text-sm font-medium">R{item.amount.toLocaleString()}</p>
                            </div>
                          ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Skills Development Documentation</CardTitle>
              <CardDescription>Manage and track all skills development related documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Documents</h3>
                  <div className="space-y-2">
                    {getAllDocuments()
                      .slice(0, 8)
                      .map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="rounded-full bg-purple-100 p-2">
                              <FileText className="h-4 w-4 text-purple-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {doc.programName} • {formatDate(doc.uploadDate)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                doc.status === "Valid"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : doc.status === "Pending"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                              }
                            >
                              {doc.status}
                            </Badge>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Document Categories</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-purple-100 p-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="font-medium">Curricula</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Training program curricula and outlines</p>
                      <Button variant="subtle" size="sm" className="w-full">
                        View All
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-purple-100 p-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="font-medium">Certificates</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Completion certificates and qualifications</p>
                      <Button variant="subtle" size="sm" className="w-full">
                        View All
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-purple-100 p-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="font-medium">Attendance</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Attendance registers and participation records
                      </p>
                      <Button variant="subtle" size="sm" className="w-full">
                        View All
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-purple-100 p-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="font-medium">Invoices</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Payment records and financial documentation</p>
                      <Button variant="subtle" size="sm" className="w-full">
                        View All
                      </Button>
                    </Card>
                  </div>

                  <div className="mt-6">
                    <Card className="p-4 border-dashed">
                      <div className="flex flex-col items-center justify-center text-center p-4">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <h4 className="font-medium mb-1">Upload New Document</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Drag and drop files here, or click to select files
                        </p>
                        <Button>Upload Document</Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddTrainingProgramModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddProgram} />

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteProgram}
        title="Delete Training Program"
        description="Are you sure you want to delete {itemName}? This action cannot be undone."
        itemName={programToDelete?.name || ""}
      />

      {selectedProgram && (
        <>
          <ProgramAttendeesModal
            isOpen={attendeesModalOpen}
            onClose={() => setAttendeesModalOpen(false)}
            programName={selectedProgram.name}
            programType={selectedProgram.type}
            attendees={programAttendeesData[selectedProgram.id] || []}
          />

          <ItemizeSpendModal
            isOpen={spendModalOpen}
            onClose={() => setSpendModalOpen(false)}
            entityName={selectedProgram.name}
            entityType="program"
            totalBudget={selectedProgram.budget}
            spendItems={programSpendItemsData[selectedProgram.id] || []}
            documents={programDocumentsData[selectedProgram.id] || []}
          />
        </>
      )}
    </div>
  )
}
