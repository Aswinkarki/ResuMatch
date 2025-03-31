"use client"

import { motion } from "framer-motion"
import { CheckCircle, Briefcase, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { Progress } from "../components/ui/progress"

interface ExperienceMatchProps {
  experienceMatch: boolean
  requiredYears: number
}

export function ExperienceMatch({ experienceMatch, requiredYears }: ExperienceMatchProps) {
  // Assuming 6 months of experience from the resume data
  const actualExperience = 0.5 // in years
  const experiencePercentage = Math.min((actualExperience / requiredYears) * 100, 100)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Experience Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Required Experience</h3>
              <p className="text-sm text-muted-foreground">{requiredYears} years of experience</p>
            </div>
          </div>

          <Alert variant={experienceMatch ? "default" : "destructive"}>
            <div className="flex items-center gap-2">
              {experienceMatch ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
              <AlertTitle>
                {experienceMatch ? "Experience Requirement Met" : "Experience Requirement Not Met"}
              </AlertTitle>
            </div>
            <AlertDescription className="mt-2">
              {experienceMatch
                ? "Your experience meets the requirements for this position."
                : "Your experience (6 months) does not meet the requirements for this position (3 years). Consider highlighting relevant projects and skills to compensate for the experience gap."}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Your Experience: 6 months</span>
              <span>Required: {requiredYears} years</span>
            </div>
            <Progress value={experiencePercentage} className="h-2" />
            <p className="text-xs text-muted-foreground text-right">
              {Math.round(experiencePercentage)}% of required experience
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-4 border rounded-lg bg-amber-50"
          >
            <div className="flex items-center gap-2 text-amber-700">
              <Briefcase className="h-5 w-5" />
              <p className="font-medium">Software Developer</p>
            </div>
            <p className="text-sm text-amber-600 mt-1">6 months of experience</p>
            <ul className="text-sm text-amber-600 mt-2 space-y-1 list-disc list-inside">
              <li>Developed web applications using React.js, Django, and .NET</li>
              <li>Implemented JWT authentication for secure APIs</li>
              <li>Integrated Redux and Context API for state management</li>
            </ul>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

