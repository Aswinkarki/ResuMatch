"use client"

import { motion } from "framer-motion"
import { CheckCircle, GraduationCap, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"

interface EducationMatchProps {
  educationMatch: boolean
  educationRequirements: string[]
}

export function EducationMatch({ educationMatch, educationRequirements }: EducationMatchProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Education Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Required Education</h3>
              <p className="text-sm text-muted-foreground">{educationRequirements.join(", ")}</p>
            </div>
          </div>

          <Alert variant={educationMatch ? "default" : "destructive"}>
            <div className="flex items-center gap-2">
              {educationMatch ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
              <AlertTitle>{educationMatch ? "Education Requirement Met" : "Education Requirement Not Met"}</AlertTitle>
            </div>
            <AlertDescription className="mt-2">
              {educationMatch
                ? "Your education matches the requirements for this position."
                : "Your education does not meet the requirements for this position. Consider highlighting relevant coursework or certifications to compensate."}
            </AlertDescription>
          </Alert>

          {educationMatch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-4 border rounded-lg bg-green-50"
            >
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <p className="font-medium">Bachelor&apos;s Degree in Computer Science</p>

              </div>
              <p className="text-sm text-green-600 mt-1">Expected: 2025</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

