"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { industries } from "@/lib/constants/industries"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { AlertCircle, Upload, FileText, Calendar, Bell, Shield, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function SettingsPage() {
  const { toast } = useToast()
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your changes have been successfully saved.",
      variant: "success",
      duration: 3000,
    })
  }

  const simulateUpload = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          toast({
            title: "Upload Complete",
            description: "Your certificate has been successfully uploaded.",
            variant: "success",
            duration: 3000,
          })
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight gradient-heading">Settings</h1>
        <p className="text-muted-foreground">Manage your account and B-BBEE preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-card-gradient">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Thabo Mabena" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="thabo.mabena@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" defaultValue="Chief Compliance Officer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+27 82 123 4567" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <img src="/profile-image.jpg" alt="Profile" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="gradientOutline" size="sm">
                    Upload New Image
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Nectar Solutions (Pty) Ltd" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input id="registrationNumber" defaultValue="2018/123456/07" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="ict">
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
                  <Label htmlFor="turnover">Annual Turnover</Label>
                  <Select defaultValue="qse">
                    <SelectTrigger id="turnover">
                      <SelectValue placeholder="Select turnover range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eme">Less than R10 million (EME)</SelectItem>
                      <SelectItem value="qse">R10 million - R50 million (QSE)</SelectItem>
                      <SelectItem value="generic">More than R50 million (Generic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Physical Address</Label>
                  <Input id="address" defaultValue="123 Main Street, Sandton, Johannesburg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://www.nectarsolutions.co.za" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>B-BBEE Classification</CardTitle>
              <CardDescription>Update your B-BBEE classification details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sectorCode">Sector Code</Label>
                  <Select defaultValue="ict">
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
                <div className="space-y-2">
                  <Label htmlFor="verificationDate">Last Verification Date</Label>
                  <Input id="verificationDate" type="date" defaultValue="2024-06-15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Certificate Expiry Date</Label>
                  <Input id="expiryDate" type="date" defaultValue="2025-06-14" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verificationAgency">Verification Agency</Label>
                  <Input id="verificationAgency" defaultValue="BEE Verification Solutions" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-500" />
                Certificate Management
              </CardTitle>
              <CardDescription>Upload and manage your B-BBEE certificates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-dashed border-border p-6">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  <div className="rounded-full bg-purple-100 p-3">
                    <Upload className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Upload B-BBEE Certificate</h3>
                    <p className="text-sm text-muted-foreground">Drag and drop your certificate or click to browse</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={simulateUpload}>
                      Browse Files
                    </Button>
                    <Button variant="gradientOutline" size="sm">
                      Scan Document
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Supported formats: PDF, JPG, PNG (Max size: 10MB)</p>
                </div>
              </div>

              {uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uploading certificate...</span>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2 w-full" />
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Current Certificates</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-purple-100 p-2">
                        <FileText className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium">B-BBEE Certificate 2024-2025.pdf</p>
                        <p className="text-sm text-muted-foreground">Uploaded on June 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-purple-100 p-2">
                        <FileText className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium">B-BBEE Certificate 2023-2024.pdf</p>
                        <p className="text-sm text-muted-foreground">Uploaded on June 10, 2023</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Verification Schedule
              </CardTitle>
              <CardDescription>Manage your verification timeline and reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-purple-50 p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="font-medium">Certificate Expiry Reminder</p>
                    <p className="text-sm text-muted-foreground">
                      Your current certificate expires in 432 days (June 14, 2025)
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nextVerificationDate">Next Verification Date</Label>
                    <Input id="nextVerificationDate" type="date" defaultValue="2025-05-15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reminderPeriod">Reminder Period</Label>
                    <Select defaultValue="90">
                      <SelectTrigger id="reminderPeriod">
                        <SelectValue placeholder="Select reminder period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days before expiry</SelectItem>
                        <SelectItem value="60">60 days before expiry</SelectItem>
                        <SelectItem value="90">90 days before expiry</SelectItem>
                        <SelectItem value="120">120 days before expiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Verification Preparation Checklist</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="checklist1" />
                      <Label htmlFor="checklist1" className="text-sm font-normal">
                        Update shareholder certificates and agreements
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="checklist2" />
                      <Label htmlFor="checklist2" className="text-sm font-normal">
                        Compile skills development evidence and certificates
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="checklist3" />
                      <Label htmlFor="checklist3" className="text-sm font-normal">
                        Prepare enterprise development beneficiary documentation
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="checklist4" />
                      <Label htmlFor="checklist4" className="text-sm font-normal">
                        Organize socio-economic development initiative evidence
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="checklist5" />
                      <Label htmlFor="checklist5" className="text-sm font-normal">
                        Update management structure documentation
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-purple-500" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Manage how you receive notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Certificate Expiry Reminders</p>
                      <p className="text-sm text-muted-foreground">
                        Receive reminders when your B-BBEE certificate is about to expire
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Scorecard Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when your B-BBEE scorecard is updated
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compliance Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts when compliance issues are detected
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Monthly Reports</p>
                      <p className="text-sm text-muted-foreground">Receive monthly B-BBEE performance reports</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Regulatory Updates</p>
                      <p className="text-sm text-muted-foreground">Get notified about changes to B-BBEE regulations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dashboard Alerts</p>
                      <p className="text-sm text-muted-foreground">Show alerts and notifications on your dashboard</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Task Reminders</p>
                      <p className="text-sm text-muted-foreground">Receive reminders for pending B-BBEE tasks</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Document Updates</p>
                      <p className="text-sm text-muted-foreground">Get notified when documents are added or updated</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Schedule</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="notificationFrequency">Email Digest Frequency</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger id="notificationFrequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="immediate">Immediate (No Digest)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredDay">Preferred Day (for Weekly Digest)</Label>
                    <Select defaultValue="monday">
                      <SelectTrigger id="preferredDay">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-500" />
                Account Security
              </CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Update Password
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="rounded-lg bg-purple-50 p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">Enhance Your Account Security</p>
                      <p className="text-sm text-muted-foreground">
                        Two-factor authentication adds an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Session Management</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">
                        Chrome on Windows • Johannesburg, South Africa • Started 2 hours ago
                      </p>
                    </div>
                    <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">Active</div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="font-medium">Mobile App</p>
                      <p className="text-sm text-muted-foreground">
                        iPhone 13 • Cape Town, South Africa • Last active 2 days ago
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Log Out All Other Devices
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Login History</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Today, 15:42</p>
                      <p className="text-sm text-muted-foreground">Chrome on Windows • Johannesburg, South Africa</p>
                    </div>
                    <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                      Successful
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Yesterday, 09:15</p>
                      <p className="text-sm text-muted-foreground">Safari on macOS • Pretoria, South Africa</p>
                    </div>
                    <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                      Successful
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">April 5, 2025, 18:30</p>
                      <p className="text-sm text-muted-foreground">Firefox on Windows • Durban, South Africa</p>
                    </div>
                    <div className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600">Failed</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
