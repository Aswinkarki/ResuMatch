import Link from "next/link"
import { Button } from "../app/components/ui/button"
import { ArrowRight, FileText, CheckCircle, BarChart2 } from "lucide-react"
import { HeroAnimation } from "./components/hero-animation"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <FileText className="h-6 w-6 text-primary" />
            <span>ResuMatch</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              How it Works
            </Link>
            <Link
              href="/analyze"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Try Now
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Match Your Resume to Job Descriptions
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Upload your resume, enter a job description, and get instant feedback on how well you match the
                    requirements.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/analyze">
                    <Button size="lg" className="group">
                      Analyze Your Resume
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <HeroAnimation />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our resume analyzer helps you stand out from the competition
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Resume Analysis</h3>
                <p className="text-center text-muted-foreground">
                  Extract skills, experience, and education from your resume automatically
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Job Matching</h3>
                <p className="text-center text-muted-foreground">
                  Compare your resume against job descriptions to find the perfect match
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Score Insights</h3>
                <p className="text-center text-muted-foreground">
                  Get detailed insights on how to improve your resume for specific jobs
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Three simple steps to optimize your resume for any job
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  1
                </div>
                <div className="absolute left-full top-6 hidden h-0.5 w-full -translate-y-1/2 bg-muted md:block" />
                <h3 className="text-xl font-bold">Upload Resume</h3>
                <p className="text-center text-muted-foreground">Upload your resume in PDF or DOCX format</p>
              </div>
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  2
                </div>
                <div className="absolute left-full top-6 hidden h-0.5 w-full -translate-y-1/2 bg-muted md:block" />
                <h3 className="text-xl font-bold">Enter Job Description</h3>
                <p className="text-center text-muted-foreground">Paste the job description you&apos;re interested in</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Get Results</h3>
                <p className="text-center text-muted-foreground">
                  Receive a detailed analysis and match score instantly
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/analyze">
                <Button size="lg" className="group">
                  Try It Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row">
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4" />
            <span className="font-semibold">ResuMatch</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} ResuMatch. All rights reserved.
          </p>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

