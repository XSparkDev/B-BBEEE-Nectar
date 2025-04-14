"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Plus, Upload, Users, Trash2, FileText, Download, PieChart } from "lucide-react"
import { AddExecutiveModal } from "@/components/modals/add-executive-modal"
import { AddBoardMemberModal } from "@/components/modals/add-board-member-modal"
import {
  boardMembersData,
  executivesData,
  managementScoreData,
  boardDemographicsData,
  executiveDemographicsData,
} from "@/lib/models/management"
import type { Race, Gender, VerificationStatus } from "@/lib/models"
import { useToast } from "@/hooks/use-toast"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"
import { Progress } from "@/components/ui/progress"

export default function ManagementControlPage() {
  const [isExecutiveModalOpen, setIsExecutiveModalOpen] = useState(false)
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("board")
  const [executives, setExecutives] = useState(executivesData)
  const [boardMembers, setBoardMembers] = useState(boardMembersData)
  const [score, setScore] = useState(managementScoreData)
  const { toast } = useToast()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string; type: "executive" | "board" } | null>(
    null,
  )

  const handleAddExecutive = (executive: {
    name: string
    position: string
    race: Race
    gender: Gender
    yearsOfService: number
    status: VerificationStatus
  }) => {
    const newExecutive = {
      id: `${executives.length + 1}`,
      ...executive,
    }
    setExecutives([...executives, newExecutive])

    // Show success toast
    toast({
      title: "Executive Added",
      description: `${executive.name} has been successfully added as ${executive.position}.`,
      variant: "success",
      duration: 3000,
    })
  }

  const handleAddBoardMember = (boardMember: {
    name: string
    position: string
    race: Race
    gender: Gender
    votingRights: number
    status: VerificationStatus
  }) => {
    const newBoardMember = {
      id: `${boardMembers.length + 1}`,
      ...boardMember,
    }
    setBoardMembers([...boardMembers, newBoardMember])

    // Show success toast
    toast({
      title: "Board Member Added",
      description: `${boardMember.name} has been successfully added as ${boardMember.position}.`,
      variant: "success",
      duration: 3000,
    })
  }

  const handleDeleteClick = (id: string, name: string, type: "executive" | "board") => {
    setItemToDelete({ id, name, type })
    setDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (!itemToDelete) return

    if (itemToDelete.type === "executive") {
      const updatedExecutives = executives.filter((executive) => executive.id !== itemToDelete.id)
      setExecutives(updatedExecutives)

      toast({
        title: "Executive Deleted",
        description: `${itemToDelete.name} has been successfully removed.`,
        variant: "success",
        duration: 3000,
      })
    } else {
      const updatedBoardMembers = boardMembers.filter((member) => member.id !== itemToDelete.id)
      setBoardMembers(updatedBoardMembers)

      toast({
        title: "Board Member Deleted",
        description: `${itemToDelete.name} has been successfully removed.`,
        variant: "success",
        duration: 3000,
      })
    }
  }

  // Mock documents for the Documents tab
  const documents = [
    {
      id: "1",
      name: "Board Resolution - Appointment of Directors.pdf",
      type: "Resolution",
      uploadDate: new Date("2025-03-15"),
      status: "Valid",
    },
    {
      id: "2",
      name: "Executive Committee Structure.pdf",
      type: "Structure",
      uploadDate: new Date("2025-02-20"),
      status: "Valid",
    },
    {
      id: "3",
      name: "Board Meeting Minutes - Q1 2025.pdf",
      type: "Minutes",
      uploadDate: new Date("2025-03-10"),
      status: "Valid",
    },
    {
      id: "4",
      name: "Management Control Verification Documents.pdf",
      type: "Verification",
      uploadDate: new Date("2025-01-15"),
      status: "Valid",
    },
    {
      id: "5",
      name: "Executive Appointment Letters.pdf",
      type: "Appointment",
      uploadDate: new Date("2024-12-10"),
      status: "Valid",
    },
    {
      id: "6",
      name: "Board Charter.pdf",
      type: "Charter",
      uploadDate: new Date("2024-11-05"),
      status: "Valid",
    },
  ]

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
        <h1 className="text-3xl font-bold tracking-tight gradient-heading">Management Control</h1>
        <p className="text-muted-foreground">Track and optimize your company's management structure</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Card className="w-full md:w-auto gradient-card">
            <CardContent className="flex flex-row items-center gap-4 p-4">
              <div className="rounded-full bg-purple-100 p-3">
                <Users className="h-6 w-6 text-purple-500" />
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
                <BarChart3 className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Black Executives</p>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-purple-gold-gradient">
                  {score.blackExecutives}%
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
          <Button
            className="gap-2"
            onClick={() => (activeTab === "board" ? setIsBoardModalOpen(true) : setIsExecutiveModalOpen(true))}
          >
            <Plus className="h-4 w-4" />
            Add {activeTab === "board" ? "Board Member" : "Executive"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="board" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="bg-card-gradient">
          <TabsTrigger
            value="board"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Board of Directors
          </TabsTrigger>
          <TabsTrigger
            value="executives"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Executive Management
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Documents
          </TabsTrigger>
        </TabsList>
        <TabsContent value="board" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Board Composition</CardTitle>
              <CardDescription>Manage your company's board of directors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Position</th>
                      <th className="pb-2">Race</th>
                      <th className="pb-2">Gender</th>
                      <th className="pb-2">Voting Rights %</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boardMembers.map((member) => (
                      <tr key={member.id} className="border-b">
                        <td className="py-3">{member.name}</td>
                        <td className="py-3">{member.position}</td>
                        <td className="py-3">{member.race}</td>
                        <td className="py-3">{member.gender}</td>
                        <td className="py-3">{member.votingRights}%</td>
                        <td className="py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              member.status === "Verified"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                            }`}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDeleteClick(member.id, member.name, "board")}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete {member.name}</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Board Demographics</CardTitle>
              <CardDescription>Analysis of board composition by race and gender</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Race Distribution</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Black</span>
                        <span className="text-sm font-medium">{boardDemographicsData.race.black}%</span>
                      </div>
                      <Progress value={boardDemographicsData.race.black} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">White</span>
                        <span className="text-sm font-medium">{boardDemographicsData.race.white}%</span>
                      </div>
                      <Progress value={boardDemographicsData.race.white} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Indian</span>
                        <span className="text-sm font-medium">{boardDemographicsData.race.indian}%</span>
                      </div>
                      <Progress value={boardDemographicsData.race.indian} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Coloured</span>
                        <span className="text-sm font-medium">{boardDemographicsData.race.coloured}%</span>
                      </div>
                      <Progress value={boardDemographicsData.race.coloured} className="h-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Gender Distribution</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Male</span>
                        <span className="text-sm font-medium">{boardDemographicsData.gender.male}%</span>
                      </div>
                      <Progress value={boardDemographicsData.gender.male} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Female</span>
                        <span className="text-sm font-medium">{boardDemographicsData.gender.female}%</span>
                      </div>
                      <Progress value={boardDemographicsData.gender.female} className="h-2" />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mt-6 mb-4">Voting Rights Distribution</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Black Directors</span>
                        <span className="text-sm font-medium">
                          {boardMembers.filter((m) => m.race === "Black").reduce((sum, m) => sum + m.votingRights, 0)}%
                        </span>
                      </div>
                      <Progress
                        value={boardMembers
                          .filter((m) => m.race === "Black")
                          .reduce((sum, m) => sum + m.votingRights, 0)}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Female Directors</span>
                        <span className="text-sm font-medium">
                          {boardMembers
                            .filter((m) => m.gender === "Female")
                            .reduce((sum, m) => sum + m.votingRights, 0)}
                          %
                        </span>
                      </div>
                      <Progress
                        value={boardMembers
                          .filter((m) => m.gender === "Female")
                          .reduce((sum, m) => sum + m.votingRights, 0)}
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="executives" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Executive Management</CardTitle>
              <CardDescription>Manage your company's executive team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Position</th>
                      <th className="pb-2">Race</th>
                      <th className="pb-2">Gender</th>
                      <th className="pb-2">Years of Service</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {executives.map((executive) => (
                      <tr key={executive.id} className="border-b">
                        <td className="py-3">{executive.name}</td>
                        <td className="py-3">{executive.position}</td>
                        <td className="py-3">{executive.race}</td>
                        <td className="py-3">{executive.gender}</td>
                        <td className="py-3">{executive.yearsOfService}</td>
                        <td className="py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              executive.status === "Verified"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                            }`}
                          >
                            {executive.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDeleteClick(executive.id, executive.name, "executive")}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete {executive.name}</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Executive Demographics</CardTitle>
              <CardDescription>Analysis of executive team composition by race and gender</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Race Distribution</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Black</span>
                        <span className="text-sm font-medium">{executiveDemographicsData.race.black}%</span>
                      </div>
                      <Progress value={executiveDemographicsData.race.black} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">White</span>
                        <span className="text-sm font-medium">{executiveDemographicsData.race.white}%</span>
                      </div>
                      <Progress value={executiveDemographicsData.race.white} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Indian</span>
                        <span className="text-sm font-medium">{executiveDemographicsData.race.indian}%</span>
                      </div>
                      <Progress value={executiveDemographicsData.race.indian} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Coloured</span>
                        <span className="text-sm font-medium">{executiveDemographicsData.race.coloured}%</span>
                      </div>
                      <Progress value={executiveDemographicsData.race.coloured} className="h-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Gender Distribution</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Male</span>
                        <span className="text-sm font-medium">{executiveDemographicsData.gender.male}%</span>
                      </div>
                      <Progress value={executiveDemographicsData.gender.male} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Female</span>
                        <span className="text-sm font-medium">{executiveDemographicsData.gender.female}%</span>
                      </div>
                      <Progress value={executiveDemographicsData.gender.female} className="h-2" />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mt-6 mb-4">Position Analysis</h3>
                  <div className="space-y-4">
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-100 p-2">
                            <PieChart className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">Key Positions</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">60%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Percentage of key positions held by Black executives
                      </p>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-100 p-2">
                            <Users className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">Female Leadership</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">40%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Percentage of executive positions held by females</p>
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
              <CardTitle>Management Control Documentation</CardTitle>
              <CardDescription>Manage and track all management control related documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Documents</h3>
                  <div className="space-y-2">
                    {documents.map((doc) => (
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
                              {doc.type} • {formatDate(doc.uploadDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
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
                        <h4 className="font-medium">Resolutions</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Board and shareholder resolutions</p>
                      <Button variant="subtle" size="sm" className="w-full">
                        View All
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-purple-100 p-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="font-medium">Minutes</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Meeting minutes and records</p>
                      <Button variant="subtle" size="sm" className="w-full">
                        View All
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-purple-100 p-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="font-medium">Appointments</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Appointment letters and contracts</p>
                      <Button variant="subtle" size="sm" className="w-full">
                        View All
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-purple-100 p-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="font-medium">Verification</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">B-BBEE verification documents</p>
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

      <AddExecutiveModal
        isOpen={isExecutiveModalOpen}
        onClose={() => setIsExecutiveModalOpen(false)}
        onAdd={handleAddExecutive}
      />

      <AddBoardMemberModal
        isOpen={isBoardModalOpen}
        onClose={() => setIsBoardModalOpen(false)}
        onAdd={handleAddBoardMember}
      />

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title={`Delete ${itemToDelete?.type === "executive" ? "Executive" : "Board Member"}`}
        description="Are you sure you want to delete {itemName}? This action cannot be undone."
        itemName={itemToDelete?.name || ""}
      />
    </div>
  )
}
