"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FileText, Upload, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/textarea"
import { Label } from "../components/label"
import { FileUploader } from "../components/file-uploader"
import { Card, CardContent } from "../components/ui/card"
import { useToast } from "../components/use-toast"

export default function AnalyzePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!file) {
      toast({
        title: "No resume selected",
        description: "Please upload your resume to continue",
        variant: "destructive",
      })
      return
    }
  
    if (!jobDescription.trim()) {
      toast({
        title: "Job description missing",
        description: "Please enter a job description to continue",
        variant: "destructive",
      })
      return
    }
  
    setIsLoading(true)
  
    try {
      // Create FormData to send the file and job description
      const formData = new FormData()
      formData.append("file", file)
      formData.append("job_description", jobDescription)
  
      // Send the data to the Django API
      const response = await fetch("http://127.0.0.1:8000/api/api/upload/", {
        method: "POST",
        body: formData,
        // No need to add CORS headers here - they should be handled by the server
      })
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
  
      const data = await response.json()
  
      // Store the response data in localStorage to access it on the results page
      localStorage.setItem("resumeAnalysisResults", JSON.stringify(data))
  
      // Redirect to the results page
      router.push("/results")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Something went wrong",
        description: "Failed to analyze your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <FileText className="h-6 w-6 text-primary" />
            <span>ResuMatch</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 container max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Analyze Your Resume</h1>
          <p className="mt-2 text-muted-foreground">
            Upload your resume and enter a job description to see how well they match.
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="resume">Upload Resume (PDF or DOCX)</Label>
                  <FileUploader onFileSelect={handleFileChange} selectedFile={file} accept=".pdf,.docx,.doc" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="job-description">Job Description</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Paste the job description here..."
                    className="min-h-[200px]"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={isLoading} className="group">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Resume
                    <Upload className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex justify-center text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ResuMatch. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

