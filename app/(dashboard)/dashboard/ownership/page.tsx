"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Plus, Upload, Users, Trash2, FileText, Download, PieChart } from "lucide-react"
import { AddShareholderModal } from "@/components/modals/add-shareholder-modal"
import { shareholdersData, ownershipScoreData } from "@/lib/models/ownership"
import type { Race, Gender, VerificationStatus } from "@/lib/models"
import { useToast } from "@/hooks/use-toast"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"
import { Progress } from "@/components/ui/progress"

export default function OwnershipPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shareholders, setShareholders] = useState(shareholdersData)
  const [score, setScore] = useState(ownershipScoreData)
  const { toast } = useToast()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [shareholderToDelete, setShareholderToDelete] = useState<{ id: string; name: string } | null>(null)

  const handleAddShareholder = (shareholder: {
    name: string
    type: string
    race: Race
    gender: Gender
    ownershipPercentage: number
    votingRightsPercentage: number
    status: VerificationStatus
  }) => {
    const newShareholder = {
      id: `${shareholders.length + 1}`,
      ...shareholder,
    }
    setShareholders([...shareholders, newShareholder])

    // Show success toast
    toast({
      title: "Shareholder Added",
      description: `${shareholder.name} has been successfully added as a shareholder.`,
      variant: "success",
      duration: 3000,
    })
  }

  const handleDeleteClick = (id: string, name: string) => {
    setShareholderToDelete({ id, name })
    setDeleteDialogOpen(true)
  }

  const handleDeleteShareholder = () => {
    if (shareholderToDelete) {
      const updatedShareholders = shareholders.filter((shareholder) => shareholder.id !== shareholderToDelete.id)
      setShareholders(updatedShareholders)

      // Show success toast
      toast({
        title: "Shareholder Deleted",
        description: `${shareholderToDelete.name} has been successfully removed.`,
        variant: "success",
        duration: 3000,
      })
    }
  }

  // Mock documents for the Documents tab
  const documents = [
    {
      id: "1",
      name: "Shareholder Agreement.pdf",
      type: "Agreement",
      uploadDate: new Date("2024-12-10"),
      status: "Valid",
    },
    {
      id: "2",
      name: "Share Certificate - Thabo Mabena.pdf",
      type: "Certificate",
      uploadDate: new Date("2024-12-15"),
      status: "Valid",
    },
    {
      id: "3",
      name: "Share Certificate - Nomsa Dlamini.pdf",
      type: "Certificate",
      uploadDate: new Date("2024-12-15"),
      status: "Valid",
    },
    {
      id: "4",
      name: "Empowerment Trust Deed.pdf",
      type: "Trust Deed",
      uploadDate: new Date("2024-11-20"),
      status: "Valid",
    },
    {
      id: "5",
      name: "Ownership Verification Documents.pdf",
      type: "Verification",
      uploadDate: new Date("2025-01-15"),
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
        <h1 className="text-3xl font-bold tracking-tight gradient-heading">Ownership</h1>
        <p className="text-muted-foreground">Manage and track your company's ownership structure</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Card className="w-full md:w-auto">
            <CardContent className="flex flex-row items-center gap-4 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Score</p>
                <p className="text-2xl font-bold">
                  {score.current} / {score.total}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full md:w-auto">
            <CardContent className="flex flex-row items-center gap-4 p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Black Ownership</p>
                <p className="text-2xl font-bold">{score.blackOwnership}%</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex gap-2">
          <Button variant="outlineGradient" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Documents
          </Button>
          <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Shareholder
          </Button>
        </div>
      </div>

      <Tabs defaultValue="shareholders" className="space-y-4">
        <TabsList>
          <TabsTrigger
            value="shareholders"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Shareholders
          </TabsTrigger>
          <TabsTrigger
            value="voting"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Voting Rights
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Documents
          </TabsTrigger>
        </TabsList>
        <TabsContent value="shareholders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shareholder Structure</CardTitle>
              <CardDescription>Manage your company's shareholders and their ownership percentages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Type</th>
                      <th className="pb-2">Race</th>
                      <th className="pb-2">Gender</th>
                      <th className="pb-2">Ownership %</th>
                      <th className="pb-2">Voting Rights %</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shareholders.map((shareholder) => (
                      <tr key={shareholder.id} className="border-b">
                        <td className="py-3">{shareholder.name}</td>
                        <td className="py-3">{shareholder.type}</td>
                        <td className="py-3">{shareholder.race}</td>
                        <td className="py-3">{shareholder.gender}</td>
                        <td className="py-3">{shareholder.ownershipPercentage}%</td>
                        <td className="py-3">{shareholder.votingRightsPercentage}%</td>
                        <td className="py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              shareholder.status === "Verified"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                            }`}
                          >
                            {shareholder.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDeleteClick(shareholder.id, shareholder.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete {shareholder.name}</span>
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

        <TabsContent value="voting" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Voting Rights Distribution</CardTitle>
              <CardDescription>Analysis of voting rights by race and gender</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Voting Rights by Race</h3>
                  <div className="space-y-4">
                    {["Black", "White", "Coloured", "Indian", "N/A"].map((race) => {
                      const totalVotingRights = shareholders
                        .filter((s) => s.race === race)
                        .reduce((sum, s) => sum + s.votingRightsPercentage, 0)

                      return (
                        <div key={race}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{race}</span>
                            <span className="text-sm font-medium">{totalVotingRights}%</span>
                          </div>
                          <Progress value={totalVotingRights} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Voting Rights by Gender</h3>
                  <div className="space-y-4">
                    {["Male", "Female", "N/A"].map((gender) => {
                      const totalVotingRights = shareholders
                        .filter((s) => s.gender === gender)
                        .reduce((sum, s) => sum + s.votingRightsPercentage, 0)

                      return (
                        <div key={gender}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{gender}</span>
                            <span className="text-sm font-medium">{totalVotingRights}%</span>
                          </div>
                          <Progress value={totalVotingRights} className="h-2" />
                        </div>
                      )
                    })}
                  </div>

                  <h3 className="text-lg font-medium mt-6 mb-4">Voting Rights by Type</h3>
                  <div className="space-y-4">
                    {["Individual", "Company", "Trust"].map((type) => {
                      const totalVotingRights = shareholders
                        .filter((s) => s.type === type)
                        .reduce((sum, s) => sum + s.votingRightsPercentage, 0)

                      return (
                        <div key={type}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{type}</span>
                            <span className="text-sm font-medium">{totalVotingRights}%</span>
                          </div>
                          <Progress value={totalVotingRights} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Key Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rounded-full bg-purple-100 p-2">
                        <PieChart className="h-4 w-4 text-purple-500" />
                      </div>
                      <h4 className="font-medium">Black Ownership</h4>
                    </div>
                    <p className="text-2xl font-bold">{score.blackOwnership}%</p>
                    <p className="text-sm text-muted-foreground">Total black ownership percentage</p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rounded-full bg-purple-100 p-2">
                        <PieChart className="h-4 w-4 text-purple-500" />
                      </div>
                      <h4 className="font-medium">Black Women Owned</h4>
                    </div>
                    <p className="text-2xl font-bold">{score.blackWomenOwnership}%</p>
                    <p className="text-sm text-muted-foreground">Black women ownership percentage</p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rounded-full bg-purple-100 p-2">
                        <PieChart className="h-4 w-4 text-purple-500" />
                      </div>
                      <h4 className="font-medium">Voting Control</h4>
                    </div>
                    <p className="text-2xl font-bold">
                      {shareholders
                        .filter((s) => s.race === "Black")
                        .reduce((sum, s) => sum + s.votingRightsPercentage, 0)}
                      %
                    </p>
                    <p className="text-sm text-muted-foreground">Black voting rights percentage</p>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Ownership Documentation</CardTitle>
              <CardDescription>Manage and track all ownership related documents</CardDescription>
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
                        <h4 className="font-medium">Agreements</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Shareholder agreements and contracts</p>
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
                      <p className="text-sm text-muted-foreground mb-2">Share certificates and ownership proof</p>
                      <Button variant="subtle" size="sm" className="w-full">
                        View All
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-purple-100 p-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="font-medium">Trust Deeds</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Trust deeds and related documents</p>
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

      <AddShareholderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddShareholder} />

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteShareholder}
        title="Delete Shareholder"
        description="Are you sure you want to delete {itemName}? This action cannot be undone."
        itemName={shareholderToDelete?.name || ""}
      />
    </div>
  )
}
