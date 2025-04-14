"use client"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, Plus, FileText, Calendar, User, Mail, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Beneficiary, SpendItem, BeneficiaryDocument } from "@/lib/models/enterprise"

interface BeneficiarySpendModalProps {
  isOpen: boolean
  onClose: () => void
  beneficiary: Beneficiary
  spendItems: SpendItem[]
  documents: BeneficiaryDocument[]
  onAddSpendItem: (item: Omit<SpendItem, "id" | "beneficiaryId">) => void
  onAddDocument: (document: { name: string; type: string }) => void
}

export function BeneficiarySpendModal({
  isOpen,
  onClose,
  beneficiary,
  spendItems,
  documents,
  onAddSpendItem,
  onAddDocument,
}: BeneficiarySpendModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [newSpendItem, setNewSpendItem] = useState({
    description: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    category: "Equipment",
  })
  const [documentName, setDocumentName] = useState("")
  const [documentType, setDocumentType] = useState("Invoice")
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)

  const totalSpent = spendItems.reduce((sum, item) => sum + item.amount, 0)
  const spendPercentage = Math.min(100, Math.round((totalSpent / beneficiary.annualValue) * 100))
  const remainingBudget = beneficiary.annualValue - totalSpent

  const handleAddSpendItem = () => {
    onAddSpendItem({
      description: newSpendItem.description,
      amount: newSpendItem.amount,
      date: new Date(newSpendItem.date),
      category: newSpendItem.category,
    })

    toast({
      title: "Spend Item Added",
      description: `${newSpendItem.description} has been added to ${beneficiary.companyName}.`,
      variant: "success",
      duration: 3000,
    })

    setNewSpendItem({
      description: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      category: "Equipment",
    })
  }

  const handleUploadDocument = () => {
    if (!documentName.trim()) {
      toast({
        title: "Document Name Required",
        description: "Please enter a document name before uploading.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)

      onAddDocument({
        name: documentName,
        type: documentType,
      })

      toast({
        title: "Document Uploaded",
        description: `${documentName} has been successfully uploaded.`,
        variant: "success",
        duration: 3000,
      })

      setDocumentName("")
    }, 1500)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{beneficiary.companyName}</DialogTitle>
          <DialogDescription>
            {beneficiary.industry} | {beneficiary.ownership}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="spend">Itemize Spend</TabsTrigger>
            <TabsTrigger value="documents">Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Budget Utilization</CardTitle>
                  <CardDescription>
                    R{totalSpent.toLocaleString()} of R{beneficiary.annualValue.toLocaleString()} ({spendPercentage}%)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={spendPercentage} className="h-2" />
                  <div className="mt-2 flex justify-between text-sm">
                    <p className="text-muted-foreground">
                      <span className="font-medium text-green-600">Spent: </span>R{totalSpent.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium text-amber-600">Remaining: </span>R{remainingBudget.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Support Details</CardTitle>
                  <CardDescription>{beneficiary.supportType}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Started: {formatDate(beneficiary.startDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Contact: {beneficiary.contactPerson}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{beneficiary.contactPerson}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{beneficiary.contactEmail}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{beneficiary.contactPhone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...spendItems]
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .slice(0, 3)
                    .map((item) => (
                      <div key={item.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{item.description}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
                        </div>
                        <p className="font-medium">R{item.amount.toLocaleString()}</p>
                      </div>
                    ))}

                  {spendItems.length === 0 && (
                    <p className="text-sm text-muted-foreground">No spend items recorded yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spend" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Budget Utilization</CardTitle>
                <CardDescription>
                  R{totalSpent.toLocaleString()} of R{beneficiary.annualValue.toLocaleString()} ({spendPercentage}%)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={spendPercentage} className="h-2" />
                <p className="mt-2 text-sm text-muted-foreground">Remaining: R{remainingBudget.toLocaleString()}</p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Spend Items</h3>

              <div className="overflow-auto max-h-[200px] border rounded-md">
                <table className="w-full">
                  <thead className="sticky top-0 bg-background">
                    <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                      <th className="p-2">Description</th>
                      <th className="p-2">Category</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spendItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-2">{item.description}</td>
                        <td className="p-2">{item.category}</td>
                        <td className="p-2">{formatDate(item.date)}</td>
                        <td className="p-2">R{item.amount.toLocaleString()}</td>
                      </tr>
                    ))}

                    {spendItems.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-muted-foreground">
                          No spend items recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <h4 className="font-medium">Add New Spend Item</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newSpendItem.description}
                      onChange={(e) => setNewSpendItem({ ...newSpendItem, description: e.target.value })}
                      placeholder="e.g. Equipment Purchase"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newSpendItem.category}
                      onChange={(e) => setNewSpendItem({ ...newSpendItem, category: e.target.value })}
                    >
                      <option value="Equipment">Equipment</option>
                      <option value="Training">Training</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Software">Software</option>
                      <option value="Materials">Materials</option>
                      <option value="Mentorship">Mentorship</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newSpendItem.date}
                      onChange={(e) => setNewSpendItem({ ...newSpendItem, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (R)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newSpendItem.amount}
                      onChange={(e) => setNewSpendItem({ ...newSpendItem, amount: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAddSpendItem}
                  className="w-full"
                  disabled={!newSpendItem.description || newSpendItem.amount <= 0}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Spend Item
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-4 space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Documentation</h3>

              <div className="overflow-auto max-h-[200px] border rounded-md">
                <table className="w-full">
                  <thead className="sticky top-0 bg-background">
                    <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                      <th className="p-2">Document Name</th>
                      <th className="p-2">Type</th>
                      <th className="p-2">Upload Date</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id} className="border-b">
                        <td className="p-2 flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                          {doc.name}
                        </td>
                        <td className="p-2">{doc.type}</td>
                        <td className="p-2">{formatDate(doc.uploadDate)}</td>
                        <td className="p-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              doc.status === "Valid"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : doc.status === "Pending"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            }`}
                          >
                            {doc.status}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {documents.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-muted-foreground">
                          No documents uploaded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <h4 className="font-medium">Upload Documentation</h4>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Drag and drop files here, or click to select files
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, DOCX, XLSX, JPG, PNG (max 10MB)
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => {}} disabled={isUploading}>
                    {isUploading ? <>Uploading...</> : <>Select Files</>}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="documentName">Document Name</Label>
                    <Input
                      id="documentName"
                      value={documentName}
                      onChange={(e) => setDocumentName(e.target.value)}
                      placeholder="e.g. Invoice for Equipment"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="docType">Document Type</Label>
                    <select
                      id="docType"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                    >
                      <option value="Invoice">Invoice</option>
                      <option value="Receipt">Receipt</option>
                      <option value="Agreement">Agreement</option>
                      <option value="Contract">Contract</option>
                      <option value="Report">Report</option>
                      <option value="Plan">Plan</option>
                      <option value="Certificate">Certificate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={handleUploadDocument}
                  disabled={isUploading || !documentName.trim()}
                >
                  {isUploading ? (
                    <>Uploading...</>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" /> Upload Documentation
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
