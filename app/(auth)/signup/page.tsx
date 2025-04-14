"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user makes changes
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Pass user metadata to be stored in Supabase
      const userData = {
        full_name: formData.name,
        company_name: formData.companyName,
      }

      const { success, error } = await signUp(formData.email, formData.password, userData)
      
      if (success) {
        // Navigate to onboarding after successful signup
        router.push("/onboarding")
      } else {
        console.error("Signup error:", error)
        setError(error?.message || "Failed to create account")
        setIsLoading(false)
      }
    } catch (err) {
      console.error("Unexpected error during signup:", err)
      setError("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 bg-white">
      <Link
        href="/"
        className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Back to home"
      >
        <ArrowLeft className="h-5 w-5 text-gray-500" />
      </Link>

      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Shield className="h-8 w-8 text-primary mb-2" />
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-gray-500 text-sm">Enter your information to get started</p>
        </div>
        <div className="space-y-4 mt-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-medium">
                Company Name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Acme Inc."
                value={formData.companyName}
                onChange={handleChange}
                required
                className="rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="rounded-md"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium underline-offset-4 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
