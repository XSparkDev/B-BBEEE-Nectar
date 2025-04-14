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
import { Upload, Plus, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SpendItem {
  id: string
  description: string
  amount: number
  date: string
  category: string
}

interface Document {
  id: string
  name: string
  type: string
  uploadDate: string
  status: "Valid" | "Pending" | "Expired"
}

interface ItemizeSpendModalProps {
  isOpen: boolean
  onClose: () => void
  entityName: string
  entityType: "program" | "beneficiary"
  totalBudget: number
  spendItems: SpendItem[]
  documents: Document[]
}

export function ItemizeSpendModal({
  isOpen,
  onClose,
  entityName,
  entityType,
  totalBudget,
  spendItems,
  documents,
}: ItemizeSpendModalProps) {
  const [activeTab, setActiveTab] = useState("spend")
  const [newSpendItem, setNewSpendItem] = useState({
    description: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    category: "Training",
  })
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)

  const totalSpent = spendItems.reduce((sum, item) => sum + item.amount, 0)
  const spendPercentage = Math.min(100, Math.round((totalSpent / totalBudget) * 100))

  const handleAddSpendItem = () => {
    // In a real app, this would call an API to add the item
    toast({
      title: "Spend Item Added",
      description: `${newSpendItem.description} has been added to the spend items.`,
      variant: "success",
      duration: 3000,
    })

    setNewSpendItem({
      description: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      category: "Training",
    })
  }

  const handleUploadDocument = () => {
    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Document Uploaded",
        description: "Your document has been successfully uploaded.",
        variant: "success",
        duration: 3000,
      })
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{entityName}</DialogTitle>
          <DialogDescription>
            {entityType === "program" ? "Training Program" : "Enterprise Development Beneficiary"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="spend" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="spend">Itemize Spend</TabsTrigger>
            <TabsTrigger value="documents">Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="spend" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Budget Utilization</CardTitle>
                <CardDescription>
                  R{totalSpent.toLocaleString()} of R{totalBudget.toLocaleString()} ({spendPercentage}%)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={spendPercentage} className="h-2" />
                <div className="mt-2 flex justify-between text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-medium text-green-600">Spent: </span>R{totalSpent.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-amber-600">Remaining: </span>R
                    {(totalBudget - totalSpent).toLocaleString()}
                  </p>
                </div>
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
                        <td className="p-2">{item.date}</td>
                        <td className="p-2">R{item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <h4 className="font-medium">Add New Spend Item</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newSpendItem.description}
                      onChange={(e) => setNewSpendItem({ ...newSpendItem, description: e.target.value })}
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
                      <option value="Training">Training</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Materials">Materials</option>
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
                    />
                  </div>
                </div>
                <Button onClick={handleAddSpendItem} className="w-full">
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
                        <td className="p-2">{doc.uploadDate}</td>
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
                  <Button variant="outline" className="mt-4" onClick={handleUploadDocument} disabled={isUploading}>
                    {isUploading ? <>Uploading...</> : <>Select Files</>}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="docType">Document Type</Label>
                  <select
                    id="docType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Invoice">Invoice</option>
                    <option value="Receipt">Receipt</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Attendance Register">Attendance Register</option>
                    <option value="Report">Report</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <Button className="w-full" onClick={handleUploadDocument} disabled={isUploading}>
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
