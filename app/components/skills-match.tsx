"use client"

import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

interface SkillsMatchProps {
  extractedSkills: string[]
  jobSkills: string[]
  matchedSkills: string[]
}

export function SkillsMatch({ extractedSkills, jobSkills, matchedSkills }: SkillsMatchProps) {
  const missingSkills = jobSkills.filter((skill) => !matchedSkills.includes(skill))
  const extraSkills = extractedSkills.filter((skill) => !jobSkills.includes(skill))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Required Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Matched Skills</h3>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
                      >
                        <CheckCircle className="h-3 w-3" />
                        {skill}
                      </Badge>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No matched skills found</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Missing Skills</h3>
              <div className="flex flex-wrap gap-2">
                {missingSkills.length > 0 ? (
                  missingSkills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1"
                      >
                        <XCircle className="h-3 w-3" />
                        {skill}
                      </Badge>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No missing skills</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Additional Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-sm font-medium mb-2">Skills in your resume not required for this job</h3>
          <div className="flex flex-wrap gap-2">
            {extraSkills.length > 0 ? (
              extraSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {skill}
                  </Badge>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No additional skills found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

