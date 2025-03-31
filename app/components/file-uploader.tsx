"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { FileText, Upload, X } from "lucide-react"
import { Button } from "../components/ui/button"

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
  accept?: string
}

export function FileUploader({ onFileSelect, selectedFile, accept = ".pdf,.docx,.doc" }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      onFileSelect(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      onFileSelect(file)
    }
  }

  const handleRemoveFile = () => {
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="w-full">
      {!selectedFile ? (
        <motion.div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm font-medium mb-1">Drag and drop your resume here</p>
          <p className="text-xs text-muted-foreground mb-4">Supports PDF and DOCX files</p>
          <Button type="button" variant="secondary" size="sm">
            Browse Files
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept={accept} className="hidden" />
        </motion.div>
      ) : (
        <motion.div
          className="border rounded-lg p-4 flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemoveFile}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Remove file</span>
          </Button>
        </motion.div>
      )}
    </div>
  )
}

