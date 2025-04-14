"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Upload, Heart, DollarSign, Trash2, FileText, Download, Users, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AddInitiativeModal } from "@/components/modals/add-initiative-modal"
import {
  socioEconomicScoreData,
  initiativesData,
  initiativeSpendItemsData,
  initiativeDocumentsData,
  initiativeDistributionData,
} from "@/lib/models/socio-economic"
import { useToast } from "@/hooks/use-toast"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"
import { Progress } from "@/components/ui/progress"

export default function SocioEconomicPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initiatives, setInitiatives] = useState(initiativesData)
  const [score, setScore] = useState(socioEconomicScoreData)
  const { toast } = useToast()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [initiativeToDelete, setInitiativeToDelete] = useState<{ id: string; name: string } | null>(null)

  const handleAddInitiative = (initiative: {
    name: string
    category: "Education" | "Healthcare" | "Technology" | "Skills Development"
    beneficiaries: string
    duration: string
    annualBudget: number
    status: "Active" | "Planning" | "Completed"
    description: string
    impact: string
    contactPerson: string
  }) => {
    const newInitiative = {
      id: `${initiatives.length + 1}`,
      startDate: new Date(),
      ...initiative,
    }
    setInitiatives([...initiatives, newInitiative])

    // Show success toast
    toast({
      title: "Initiative Added",
      description: `${initiative.name} has been successfully added to your socio-economic development initiatives.`,
      variant: "success",
      duration: 3000,
    })
  }

  const handleDeleteClick = (id: string, name: string) => {
    setInitiativeToDelete({ id, name })
    setDeleteDialogOpen(true)
  }

  const handleDeleteInitiative = () => {
    if (initiativeToDelete) {
      const updatedInitiatives = initiatives.filter((initiative) => initiative.id !== initiativeToDelete.id)
      setInitiatives(updatedInitiatives)

      // Show success toast
      toast({
        title: "Initiative Deleted",
        description: `${initiativeToDelete.name} has been successfully removed.`,
        variant: "success",
        duration: 3000,
      })
    }
  }

  const calculateTotalSpent = () => {
    let total = 0
    Object.values(initiativeSpendItemsData).forEach((items) => {
      items.forEach((item) => {
        total += item.amount
      })
    })
    return total
  }

  // Get all documents across all initiatives
  const getAllDocuments = () => {
    const allDocs: {
      id: string
      name: string
      type: string
      uploadDate: Date
      status: string
      initiativeName: string
    }[] = []

    Object.entries(initiativeDocumentsData).forEach(([initiativeId, docs]) => {
      const initiative = initiatives.find((i) => i.id === initiativeId)
      if (initiative) {
        docs.forEach((doc) => {
          allDocs.push({
            ...doc,
            initiativeName: initiative.name,
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
        <h1 className="text-3xl font-bold tracking-tight gradient-heading">Socio-Economic Development</h1>
        <p className="text-muted-foreground">Track and manage your socio-economic development initiatives</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4 flex-wrap">
          <Card className="w-full md:w-auto gradient-card">
            <CardContent className="flex flex-row items-center gap-4 p-4">
              <div className="rounded-full bg-purple-100 p-3">
                <Heart className="h-6 w-6 text-purple-500" />
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
            Add Initiative
          </Button>
        </div>
      </div>

      <Tabs defaultValue="initiatives" className="space-y-4">
        <TabsList className="bg-card-gradient">
          <TabsTrigger
            value="initiatives"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Initiatives
          </TabsTrigger>
          <TabsTrigger
            value="beneficiaries"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Beneficiaries
          </TabsTrigger>
          <TabsTrigger
            value="impact"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Impact Assessment
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="initiatives" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Active SED Initiatives</CardTitle>
              <CardDescription>Current socio-economic development projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                      <th className="pb-2">Initiative Name</th>
                      <th className="pb-2">Category</th>
                      <th className="pb-2">Beneficiaries</th>
                      <th className="pb-2">Duration</th>
                      <th className="pb-2">Annual Budget</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {initiatives.map((initiative) => (
                      <tr key={initiative.id} className="border-b">
                        <td className="py-3">{initiative.name}</td>
                        <td className="py-3">{initiative.category}</td>
                        <td className="py-3">{initiative.beneficiaries}</td>
                        <td className="py-3">{initiative.duration}</td>
                        <td className="py-3">R{initiative.annualBudget.toLocaleString()}</td>
                        <td className="py-3">
                          <Badge
                            className={
                              initiative.status === "Planning"
                                ? "border-amber-500 text-amber-500"
                                : "bg-purple-gold-gradient"
                            }
                          >
                            {initiative.status}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDeleteClick(initiative.id, initiative.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete {initiative.name}</span>
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

        <TabsContent value="beneficiaries" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Beneficiary Overview</CardTitle>
              <CardDescription>Communities and individuals benefiting from SED initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Beneficiary Categories</h3>
                  <div className="space-y-4">
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-100 p-2">
                            <Users className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">Education</span>
                        </div>
                        <span className="text-lg font-bold">250+</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Students benefiting from educational initiatives</p>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-100 p-2">
                            <Users className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">Healthcare</span>
                        </div>
                        <span className="text-lg font-bold">5,000+</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Community members with access to healthcare services
                      </p>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-100 p-2">
                            <Users className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">Technology</span>
                        </div>
                        <span className="text-lg font-bold">5</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Rural communities with improved digital access</p>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-100 p-2">
                            <Users className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">Skills Development</span>
                        </div>
                        <span className="text-lg font-bold">100</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Youth receiving skills development training</p>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Geographic Distribution</h3>
                  <div className="space-y-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Beneficiary Locations</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Soweto</span>
                            <span className="text-sm font-medium">40%</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Alexandra</span>
                            <span className="text-sm font-medium">30%</span>
                          </div>
                          <Progress value={30} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Rural Limpopo</span>
                            <span className="text-sm font-medium">20%</span>
                          </div>
                          <Progress value={20} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Other</span>
                            <span className="text-sm font-medium">10%</span>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Demographic Breakdown</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Youth (Under 25)</span>
                            <span className="text-sm font-medium">65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Women</span>
                            <span className="text-sm font-medium">55%</span>
                          </div>
                          <Progress value={55} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">People with Disabilities</span>
                            <span className="text-sm font-medium">8%</span>
                          </div>
                          <Progress value={8} className="h-2" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Initiative Distribution</h4>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-muted/50 rounded-md">
                          <p className="text-xs text-muted-foreground">Education</p>
                          <p className="font-medium">{initiativeDistributionData.education}%</p>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-md">
                          <p className="text-xs text-muted-foreground">Healthcare</p>
                          <p className="font-medium">{initiativeDistributionData.healthcare}%</p>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-md">
                          <p className="text-xs text-muted-foreground">Technology</p>
                          <p className="font-medium">{initiativeDistributionData.technology}%</p>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-md">
                          <p className="text-xs text-muted-foreground">Skills Dev</p>
                          <p className="font-medium">{initiativeDistributionData.skillsDevelopment}%</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Impact Assessment</CardTitle>
              <CardDescription>Measuring the impact of socio-economic development initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Key Performance Indicators</h3>
                  <div className="space-y-4">
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-100 p-2">
                            <Users className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">Beneficiaries Reached</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">5,350+</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Total number of individuals benefiting from SED initiatives
                      </p>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-100 p-2">
                            <BarChart3 className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">Education Improvement</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">+28%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Average improvement in academic performance</p>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-100 p-2">
                            <BarChart3 className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">Healthcare Access</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">+65%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Increase in healthcare access in supported communities
                      </p>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-100 p-2">
                            <BarChart3 className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">Digital Literacy</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">+45%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Improvement in digital literacy in rural communities
                      </p>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Initiative Impact</h3>
                  <div className="space-y-4">
                    {initiatives.map((initiative) => (
                      <Card key={initiative.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{initiative.name}</h4>
                          <Badge
                            className={
                              initiative.status === "Active"
                                ? "bg-purple-gold-gradient"
                                : "border-amber-500 text-amber-500"
                            }
                          >
                            {initiative.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {initiative.category} • {initiative.beneficiaries}
                        </p>

                        <div className="mt-2 text-sm">
                          <p className="font-medium">Impact:</p>
                          <p className="text-muted-foreground">{initiative.impact}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="text-center p-2 bg-muted/50 rounded-md">
                            <p className="text-xs text-muted-foreground">Budget</p>
                            <p className="font-medium">R{initiative.annualBudget.toLocaleString()}</p>
                          </div>
                          <div className="text-center p-2 bg-muted/50 rounded-md">
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="font-medium">{initiative.duration}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Socio-Economic Development Documentation</CardTitle>
              <CardDescription>Manage and track all SED related documents</CardDescription>
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
                                {doc.initiativeName} • {formatDate(doc.uploadDate)}
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
                        <h4 className="font-medium">Frameworks</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Initiative frameworks and plans</p>
                      <Button variant="subtle" size="sm" className="w-full">
                        View All
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-purple-100 p-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="font-medium">Agreements</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">MOUs and partnership agreements</p>
                      <Button variant="subtle" size="sm" className="w-full">
                        View All
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-purple-100 p-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="font-medium">Reports</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Impact assessment reports</p>
                      <Button variant="subtle" size="sm" className="w-full">
                        View All
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-purple-100 p-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="font-medium">Financials</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Financial records and invoices</p>
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

      <AddInitiativeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddInitiative} />

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteInitiative}
        title="Delete Initiative"
        description="Are you sure you want to delete {itemName}? This action cannot be undone."
        itemName={initiativeToDelete?.name || ""}
      />
    </div>
  )
}
