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
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { success, error } = await signIn(email, password)
      
      if (success) {
        router.push("/dashboard")
        toast.success("Logged in successfully")
      } else {
        console.error("Login error:", error)
        toast.error(error?.message || "Failed to log in")
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("An unexpected error occurred")
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
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-500 text-sm">Enter your credentials to access your account</p>
        </div>
        <div className="space-y-4 mt-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-md"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-md"
              />
            </div>
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary font-medium underline-offset-4 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
