"use client"

import { motion } from "framer-motion"
import { Lightbulb, ArrowRight, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Alert, AlertDescription } from "../components/ui/alert"

interface ResumeImprovementProps {
  matchData: any
}

export function ResumeImprovement({ matchData }: ResumeImprovementProps) {
  const missingSkills = matchData.job_description_skills.filter(
    (skill: string) => !matchData.matched_skills.includes(skill),
  )

  const suggestions = [
    {
      title: "Highlight your matched skills",
      description: "Make sure your matched skills (Django, SQL, React) are prominently displayed in your resume.",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Add missing skills",
      description: `Consider adding or highlighting experience with ${missingSkills.join(", ")} if you have any exposure to them.`,
      icon: <XCircle className="h-5 w-5 text-red-500" />,
    },
    {
      title: "Address experience gap",
      description: "Emphasize relevant projects that demonstrate your skills to compensate for the experience gap.",
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
    },
    {
      title: "Quantify achievements",
      description: "Add metrics and specific achievements to make your experience more impactful.",
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
    },
    {
      title: "Tailor your summary",
      description: "Customize your professional summary to align with the job description.",
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Resume Improvement Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertDescription>
              Based on our analysis, here are some suggestions to improve your resume for this specific job.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="mt-0.5">{suggestion.icon}</div>
                <div>
                  <h3 className="font-medium">{suggestion.title}</h3>
                  <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Sample Improvements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Original Summary</h3>
            <div className="p-3 border rounded-lg bg-muted/30 text-sm">
              Aspiring full-stack developer with 6 months of hands-on experience in React.js, Django, .NET, SQL, and C#.
              Passionate about building scalable web applications and solving real-world problems with clean, efficient
              code.
            </div>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="h-6 w-6 text-muted-foreground" />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Improved Summary</h3>
            <div className="p-3 border rounded-lg bg-green-50 text-sm">
              <span className="font-medium text-green-700">Python-focused</span> full-stack developer with hands-on
              experience in
              <span className="font-medium text-green-700"> Django, React.js, and SQL</span>. Developed multiple web
              applications including a
              <span className="font-medium text-green-700"> machine learning-powered stock prediction system</span>.
              Passionate about building scalable web applications and solving real-world problems with clean, efficient
              code. Eager to leverage my Computer Science education and technical skills in a Python Developer role.
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

