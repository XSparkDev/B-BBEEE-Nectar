"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Upload,
  Building,
  DollarSign,
  Trash2,
  FileText,
  BarChart3,
  Download,
  PieChart,
  Users,
  TrendingUp,
  Award,
  Target,
  Briefcase,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AddBeneficiaryModal } from "@/components/modals/add-beneficiary-modal"
import {
  enterpriseScoreData,
  beneficiariesData,
  beneficiarySpendItemsData,
  beneficiaryDocumentsData,
  supportDistributionData,
  impactMetricsData,
} from "@/lib/models/enterprise"
import { useToast } from "@/hooks/use-toast"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"
import { BeneficiarySpendModal } from "@/components/modals/beneficiary-spend-modal"
import type { Beneficiary, SpendItem, BeneficiaryDocument } from "@/lib/models/enterprise"
import { Progress } from "@/components/ui/progress"

export default function EnterpriseDevelopmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [beneficiaries, setBeneficiaries] = useState(beneficiariesData)
  const [score, setScore] = useState(enterpriseScoreData)
  const { toast } = useToast()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [beneficiaryToDelete, setBeneficiaryToDelete] = useState<{ id: string; name: string } | null>(null)

  // State for spend modal
  const [spendModalOpen, setSpendModalOpen] = useState(false)
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null)
  const [spendItems, setSpendItems] = useState(beneficiarySpendItemsData)
  const [documents, setDocuments] = useState(beneficiaryDocumentsData)

  const handleAddBeneficiary = (beneficiary: {
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
  }) => {
    const newBeneficiary = {
      id: `${beneficiaries.length + 1}`,
      startDate: new Date(),
      ...beneficiary,
    }
    setBeneficiaries([...beneficiaries, newBeneficiary])

    // Initialize empty spend items and documents for the new beneficiary
    setSpendItems({
      ...spendItems,
      [newBeneficiary.id]: [],
    })

    setDocuments({
      ...documents,
      [newBeneficiary.id]: [],
    })

    // Show success toast
    toast({
      title: "Beneficiary Added",
      description: `${beneficiary.companyName} has been successfully added as an enterprise development beneficiary.`,
      variant: "success",
      duration: 3000,
    })
  }

  const handleDeleteClick = (id: string, name: string) => {
    setBeneficiaryToDelete({ id, name })
    setDeleteDialogOpen(true)
  }

  const handleDeleteBeneficiary = () => {
    if (beneficiaryToDelete) {
      const updatedBeneficiaries = beneficiaries.filter((beneficiary) => beneficiary.id !== beneficiaryToDelete.id)
      setBeneficiaries(updatedBeneficiaries)

      // Show success toast
      toast({
        title: "Beneficiary Deleted",
        description: `${beneficiaryToDelete.name} has been successfully removed.`,
        variant: "success",
        duration: 3000,
      })
    }
  }

  const handleRowClick = (beneficiary: Beneficiary) => {
    setSelectedBeneficiary(beneficiary)
    setSpendModalOpen(true)
  }

  const handleAddSpendItem = (item: Omit<SpendItem, "id" | "beneficiaryId">) => {
    if (!selectedBeneficiary) return

    const beneficiaryId = selectedBeneficiary.id
    const newItem: SpendItem = {
      id: `${beneficiaryId}-${Date.now()}`,
      beneficiaryId,
      ...item,
    }

    setSpendItems((prev) => ({
      ...prev,
      [beneficiaryId]: [...(prev[beneficiaryId] || []), newItem],
    }))
  }

  const handleAddDocument = (document: { name: string; type: string }) => {
    if (!selectedBeneficiary) return

    const beneficiaryId = selectedBeneficiary.id
    const newDocument: BeneficiaryDocument = {
      id: `${beneficiaryId}-${Date.now()}`,
      beneficiaryId,
      name: document.name,
      type: document.type,
      uploadDate: new Date(),
      status: "Pending",
      url: `/documents/${document.name.toLowerCase().replace(/\s+/g, "-")}`,
    }

    setDocuments((prev) => ({
      ...prev,
      [beneficiaryId]: [...(prev[beneficiaryId] || []), newDocument],
    }))
  }

  const calculateTotalSpent = () => {
    let total = 0
    Object.values(beneficiarySpendItemsData).forEach((items) => {
      items.forEach((item) => {
        total += item.amount
      })
    })
    return total
  }

  // Get all documents across all beneficiaries
  const getAllDocuments = () => {
    const allDocs: (BeneficiaryDocument & { beneficiaryName: string })[] = []

    Object.entries(documents).forEach(([beneficiaryId, docs]) => {
      const beneficiary = beneficiaries.find((b) => b.id === beneficiaryId)
      if (beneficiary) {
        docs.forEach((doc) => {
          allDocs.push({
            ...doc,
            beneficiaryName: beneficiary.companyName,
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
        <h1 className="text-3xl font-bold tracking-tight gradient-heading">Enterprise Development</h1>
        <p className="text-muted-foreground">Track and manage your enterprise and supplier development initiatives</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4 flex-wrap">
          <Card className="w-full md:w-auto gradient-card">
            <CardContent className="flex flex-row items-center gap-4 p-4">
              <div className="rounded-full bg-purple-100 p-3">
                <Building className="h-6 w-6 text-purple-500" />
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
            Add Beneficiary
          </Button>
        </div>
      </div>

      <Tabs defaultValue="beneficiaries" className="space-y-4">
        <TabsList className="bg-card-gradient">
          <TabsTrigger
            value="beneficiaries"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Beneficiaries
          </TabsTrigger>
          <TabsTrigger
            value="expenditure"
            className="data-[state=active]:bg-purple-gold-gradient data-[state=active]:text-white data-[state=active]:font-medium"
          >
            Expenditure
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

        <TabsContent value="beneficiaries" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Enterprise Development Beneficiaries</CardTitle>
              <CardDescription>Companies supported through enterprise development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                      <th className="pb-2">Company Name</th>
                      <th className="pb-2">Industry</th>
                      <th className="pb-2">Ownership</th>
                      <th className="pb-2">Support Type</th>
                      <th className="pb-2">Annual Value</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beneficiaries.map((beneficiary) => (
                      <tr
                        key={beneficiary.id}
                        className="border-b cursor-pointer hover:bg-muted/50"
                        onClick={() => handleRowClick(beneficiary)}
                      >
                        <td className="py-3">{beneficiary.companyName}</td>
                        <td className="py-3">{beneficiary.industry}</td>
                        <td className="py-3">{beneficiary.ownership}</td>
                        <td className="py-3">{beneficiary.supportType}</td>
                        <td className="py-3">R{beneficiary.annualValue.toLocaleString()}</td>
                        <td className="py-3">
                          <Badge
                            className={
                              beneficiary.status === "Pending"
                                ? "border-amber-500 text-amber-500"
                                : "bg-purple-gold-gradient"
                            }
                          >
                            {beneficiary.status}
                          </Badge>
                        </td>
                        <td className="py-3" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteClick(beneficiary.id, beneficiary.companyName)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete {beneficiary.companyName}</span>
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

        <TabsContent value="expenditure" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Enterprise Development Expenditure</CardTitle>
              <CardDescription>Overview of enterprise development spending</CardDescription>
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

                    {beneficiaries.map((beneficiary) => {
                      const beneficiarySpent = (spendItems[beneficiary.id] || []).reduce(
                        (sum, item) => sum + item.amount,
                        0,
                      )
                      const percentage = Math.round((beneficiarySpent / beneficiary.annualValue) * 100)

                      return (
                        <div key={beneficiary.id}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{beneficiary.companyName}</span>
                            <span className="text-sm font-medium">{percentage}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                            <span>R{beneficiarySpent.toLocaleString()} spent</span>
                            <span>R{beneficiary.annualValue.toLocaleString()} allocated</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Support Type Distribution</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Financial</span>
                          <span className="text-lg font-bold">{supportDistributionData.financial}%</span>
                        </div>
                        <Progress value={supportDistributionData.financial} className="h-2 mt-2" />
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Mentorship</span>
                          <span className="text-lg font-bold">{supportDistributionData.mentorship}%</span>
                        </div>
                        <Progress value={supportDistributionData.mentorship} className="h-2 mt-2" />
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Equipment</span>
                          <span className="text-lg font-bold">{supportDistributionData.equipmentResources}%</span>
                        </div>
                        <Progress value={supportDistributionData.equipmentResources} className="h-2 mt-2" />
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Market Access</span>
                          <span className="text-lg font-bold">{supportDistributionData.marketAccess}%</span>
                        </div>
                        <Progress value={supportDistributionData.marketAccess} className="h-2 mt-2" />
                      </Card>
                    </div>

                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Recent Expenditures</h4>
                      <div className="space-y-2">
                        {Object.entries(spendItems)
                          .flatMap(([beneficiaryId, items]) =>
                            items.map((item) => ({
                              ...item,
                              beneficiaryName: beneficiaries.find((b) => b.id === beneficiaryId)?.companyName || "",
                            })),
                          )
                          .sort((a, b) => b.date.getTime() - a.date.getTime())
                          .slice(0, 5)
                          .map((item) => (
                            <div key={item.id} className="flex justify-between border-b pb-2">
                              <div>
                                <p className="text-sm font-medium">{item.description}</p>
                                <p className="text-xs text-muted-foreground">
                                  {item.beneficiaryName} - {formatDate(item.date)}
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

        <TabsContent value="impact" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Impact Assessment</CardTitle>
              <CardDescription>Measuring the impact of enterprise development initiatives</CardDescription>
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
                            <TrendingUp className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">Revenue Growth</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">
                          +{impactMetricsData.revenueGrowth.overall}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Average revenue growth of beneficiary companies over the past year
                      </p>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-100 p-2">
                            <Users className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">Jobs Created</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">
                          +{impactMetricsData.jobsCreated.overall}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        New jobs created by beneficiary companies as a result of enterprise development support
                      </p>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-100 p-2">
                            <Briefcase className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">Market Expansion</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">
                          {impactMetricsData.marketExpansion.overall}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">New markets accessed by beneficiary companies</p>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-100 p-2">
                            <PieChart className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium">ROI</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">{impactMetricsData.roi.overall}x</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Return on investment for enterprise development initiatives
                      </p>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Beneficiary Impact</h3>
                  <div className="space-y-4">
                    {beneficiaries.map((beneficiary) => (
                      <Card key={beneficiary.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{beneficiary.companyName}</h4>
                          <Badge
                            className={
                              beneficiary.status === "Active"
                                ? "bg-purple-gold-gradient"
                                : "border-amber-500 text-amber-500"
                            }
                          >
                            {beneficiary.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {beneficiary.ownership} • {beneficiary.industry}
                        </p>

                        <div className="space-y-2 mt-3">
                          <div className="flex justify-between text-xs">
                            <span>Revenue Growth</span>
                            <span>+{impactMetricsData.revenueGrowth.byBeneficiary[beneficiary.id] || 0}%</span>
                          </div>
                          <Progress
                            value={impactMetricsData.revenueGrowth.byBeneficiary[beneficiary.id] || 0}
                            className="h-1.5"
                          />

                          <div className="flex justify-between text-xs">
                            <span>Jobs Created</span>
                            <span>{impactMetricsData.jobsCreated.byBeneficiary[beneficiary.id] || 0}</span>
                          </div>
                          <Progress
                            value={(impactMetricsData.jobsCreated.byBeneficiary[beneficiary.id] || 0) * 4}
                            className="h-1.5"
                          />

                          <div className="flex justify-between text-xs">
                            <span>Sustainability Score</span>
                            <span>{impactMetricsData.sustainabilityScore.byBeneficiary[beneficiary.id] || 0}%</span>
                          </div>
                          <Progress
                            value={impactMetricsData.sustainabilityScore.byBeneficiary[beneficiary.id] || 0}
                            className="h-1.5"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="text-center p-2 bg-muted/50 rounded-md">
                            <p className="text-xs text-muted-foreground">Support Value</p>
                            <p className="font-medium">R{beneficiary.annualValue.toLocaleString()}</p>
                          </div>
                          <div className="text-center p-2 bg-muted/50 rounded-md">
                            <p className="text-xs text-muted-foreground">Support Type</p>
                            <p className="font-medium">{beneficiary.supportType}</p>
                          </div>
                        </div>

                        <Button
                          variant="subtle"
                          size="sm"
                          className="w-full mt-3"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRowClick(beneficiary)
                          }}
                        >
                          View Details
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Impact Trends</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rounded-full bg-purple-100 p-2">
                        <Target className="h-4 w-4 text-purple-500" />
                      </div>
                      <h4 className="font-medium">Sustainability</h4>
                    </div>
                    <p className="text-2xl font-bold">{impactMetricsData.sustainabilityScore.overall}%</p>
                    <p className="text-sm text-muted-foreground">Average sustainability score of beneficiaries</p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rounded-full bg-purple-100 p-2">
                        <Award className="h-4 w-4 text-purple-500" />
                      </div>
                      <h4 className="font-medium">Quality of Support</h4>
                    </div>
                    <p className="text-2xl font-bold">4.2/5</p>
                    <p className="text-sm text-muted-foreground">Beneficiary satisfaction rating</p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rounded-full bg-purple-100 p-2">
                        <BarChart3 className="h-4 w-4 text-purple-500" />
                      </div>
                      <h4 className="font-medium">Long-term Impact</h4>
                    </div>
                    <p className="text-2xl font-bold">High</p>
                    <p className="text-sm text-muted-foreground">Projected long-term sustainability</p>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Enterprise Development Documentation</CardTitle>
              <CardDescription>Manage and track all enterprise development related documents</CardDescription>
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
                                {doc.beneficiaryName} • {formatDate(doc.uploadDate)}
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
                        <h4 className="font-medium">Agreements</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Enterprise development agreements and contracts
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

                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-purple-100 p-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="font-medium">Reports</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Progress and impact assessment reports</p>
                      <Button variant="subtle" size="sm" className="w-full">
                        View All
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-purple-100 p-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="font-medium">Plans</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Strategic and implementation plans</p>
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

      <AddBeneficiaryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddBeneficiary} />

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteBeneficiary}
        title="Delete Beneficiary"
        description="Are you sure you want to delete {itemName}? This action cannot be undone."
        itemName={beneficiaryToDelete?.name || ""}
      />

      {selectedBeneficiary && (
        <BeneficiarySpendModal
          isOpen={spendModalOpen}
          onClose={() => setSpendModalOpen(false)}
          beneficiary={selectedBeneficiary}
          spendItems={spendItems[selectedBeneficiary.id] || []}
          documents={documents[selectedBeneficiary.id] || []}
          onAddSpendItem={handleAddSpendItem}
          onAddDocument={handleAddDocument}
        />
      )}
    </div>
  )
}
