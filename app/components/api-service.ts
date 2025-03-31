/**
 * API service for interacting with the resume analyzer backend
 */

// Base URL for the API
const API_BASE_URL = "http://127.0.0.1:8000/api"

/**
 * Upload a resume and job description for analysis
 * @param file The resume file (PDF or DOCX)
 * @param jobDescription The job description text
 * @returns The analysis results
 */
export async function analyzeResume(file: File, jobDescription: string) {
  try {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("job_description", jobDescription)

    const response = await fetch(`${API_BASE_URL}/api/upload/`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error analyzing resume:", error)
    throw error
  }
}

/**
 * Get a list of previous resume analyses
 * @returns Array of previous analyses
 */
export async function getPreviousAnalyses() {
  try {
    const response = await fetch(`${API_BASE_URL}/analyses/`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching previous analyses:", error)
    throw error
  }
}

