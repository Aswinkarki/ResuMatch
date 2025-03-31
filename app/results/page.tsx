"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, FileText, Download, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { SkillsMatch } from "../components/skills-match"
import { EducationMatch } from "../components/education-match"
import { ExperienceMatch } from "../components/experience-match"
import { ResumeImprovement } from "../components/resume-improvement"

export default function ResultsPage() {
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)

    // Get the analysis results from localStorage
    try {
      const storedData = localStorage.getItem("resumeAnalysisResults")
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        setAnalysisData(parsedData)
      } else {
        setError("No analysis data found. Please try analyzing your resume again.")
      }
    } catch (err) {
      console.error("Error loading analysis data:", err)
      setError("Error loading analysis results. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
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
        <main className="flex-1 container flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-xl font-medium">Loading results...</h2>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
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
          <div className="text-center">
            <XCircle className="h-10 w-10 mx-auto mb-4 text-destructive" />
            <h2 className="text-xl font-medium mb-2">Error Loading Results</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Link href="/analyze">
              <Button>Try Again</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
            href="/analyze"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Analysis
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
            <h1 className="text-3xl font-bold tracking-tight">Resume Analysis Results</h1>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Overall Match Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      />
                      <circle
                        className="text-primary stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - analysisData.resume_score / 100)}`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">{Math.round(analysisData.resume_score)}%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-medium">
                      {analysisData.resume_score >= 80
                        ? "Excellent Match!"
                        : analysisData.resume_score >= 60
                          ? "Good Match"
                          : "Needs Improvement"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your resume matches {Math.round(analysisData.resume_score)}% of the job requirements
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Match Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <div className="text-lg font-medium mb-2">Skills</div>
                    <div className="text-3xl font-bold mb-2">
                      {analysisData.matched_skills.length}/{analysisData.job_description_skills.length}
                    </div>
                    <Progress
                      value={(analysisData.matched_skills.length / analysisData.job_description_skills.length) * 100}
                      className="w-full h-2"
                    />
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <div className="text-lg font-medium mb-2">Education</div>
                    <div className="mb-2">
                      {analysisData.education_match ? (
                        <CheckCircle className="h-10 w-10 text-green-500" />
                      ) : (
                        <XCircle className="h-10 w-10 text-red-500" />
                      )}
                    </div>
                    <div className="text-sm text-center text-muted-foreground">
                      {analysisData.education_match ? "Meets requirements" : "Doesn't meet requirements"}
                    </div>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <div className="text-lg font-medium mb-2">Experience</div>
                    <div className="mb-2">
                      {analysisData.experience_match ? (
                        <CheckCircle className="h-10 w-10 text-green-500" />
                      ) : (
                        <XCircle className="h-10 w-10 text-red-500" />
                      )}
                    </div>
                    <div className="text-sm text-center text-muted-foreground">
                      {analysisData.experience_match ? "Meets requirements" : "Doesn't meet requirements"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="skills">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="improvements">Improvements</TabsTrigger>
              </TabsList>
              <TabsContent value="skills" className="mt-4">
                <SkillsMatch
                  extractedSkills={analysisData.extracted_skills}
                  jobSkills={analysisData.job_description_skills}
                  matchedSkills={analysisData.matched_skills}
                />
              </TabsContent>
              <TabsContent value="education" className="mt-4">
                <EducationMatch
                  educationMatch={analysisData.education_match}
                  educationRequirements={analysisData.education_requirements}
                />
              </TabsContent>
              <TabsContent value="experience" className="mt-4">
                <ExperienceMatch
                  experienceMatch={analysisData.experience_match}
                  requiredYears={analysisData.required_experience_years}
                />
              </TabsContent>
              <TabsContent value="improvements" className="mt-4">
                <ResumeImprovement matchData={analysisData} />
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center pt-4">
            <Link href="/analyze">
              <Button size="lg">Analyze Another Resume</Button>
            </Link>
          </motion.div>
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

