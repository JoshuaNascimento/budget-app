'use client'

import useUploadModal from "@/app/hooks/useUploadModal";
import Modal from "./Modal";
import Heading from "../Heading";

import { useMemo, useState } from "react";

import { FileInput, Label } from 'flowbite-react'
import toast from "react-hot-toast";

enum STEPS {
  UPLOAD = 0,
  CATEGORIZE = 1,
  CONFIRM = 2
}

const UploadModal = () => {

  const uploadModal = useUploadModal();
  const acceptedFileTypes = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"

  const [file, setFile] = useState<File | null>(null);  // file is either typed to null or FileList
  const [step, setStep] = useState(STEPS.UPLOAD);

  // Return to previous step of uploading file
  const onBack = () => {
    setStep((value) => value - 1);
  }

  // Advance to next step of uploading file
  const onNext = () => {
    setStep((value) => value + 1);
  }

  // Handle file submission in dropzone
  const fileSubmit = (upload : any) => {

    // Selected file is either set to the first file in upload or null if none exists
    const selectedFile = upload.target.files ? upload.target.files[0] : null  
    console.log(selectedFile)

    if (!selectedFile) {
      toast.error('No File Found')
      return null;  // If no file exists exit function
    }

    setFile(selectedFile);
    toast.success('File Submitted')
  }

  const actionLabel = useMemo(() => {

    // Check if user is on last step of upload process
    if (step === STEPS.CONFIRM) { 
      return 'Upload'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {

    // Check if user is on first step of upload process
    if (step === STEPS.UPLOAD) {
      return undefined; // Prevent user from going back a step
    }

    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      {/* DROPZONE CONTENT */}
      <div className="flex w-full items-center justify-center">
        <Label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            {/* Display file name on submission */}
            {file ? 
                <p className="mb-2 text-sm text-lime-600 dark:text-gray-400">{file.name}</p>
              :
                ''
            }
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">.CSV (Compatability for other extensions WIP)</p>
          </div>
          <FileInput accept={acceptedFileTypes} id="dropzone-file" className="hidden" onChange={(file) => {fileSubmit(file)}
          }/>
        </Label>
      </div>
    </div>
  )

  return ( 
    <Modal 
      isOpen={uploadModal.isOpen}
      onClose={uploadModal.onClose}
      onSubmit={uploadModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORIZE ? undefined : onBack}  // If user is on the first step of upload process prevent onBack action
      title="Upload File"
      body={bodyContent}
    />
   );
}
 
export default UploadModal;