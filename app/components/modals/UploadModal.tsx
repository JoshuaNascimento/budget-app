'use client'


import useUploadModal from "@/app/hooks/useUploadModal";
import Modal from "./Modal";

import { useEffect, useMemo, useState } from "react";

import { FileInput, Label } from 'flowbite-react'
import { FieldValues, useForm } from "react-hook-form";
import * as Papa from 'papaparse';

import toast from "react-hot-toast";

import { User } from "@prisma/client";
import axios from "axios";


enum STEPS {
  UPLOAD = 0,
  // Potentially expand on steps once basic import is working well
  //ACCOUNT = 1,
  //CONFIRM = 2,
}



const UploadModal = () => {

  const uploadModal = useUploadModal();

  const acceptedFileTypes = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
  const fileReader = new FileReader();

  const [file, setFile] = useState<File | null>(null);  // file is either typed to null or FileList
  const [csvData, setCsvData] = useState();
  const [step, setStep] = useState(STEPS.UPLOAD);


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      date: '',
      description: '',
      debitAmount: '0',
      creditAmount: '0',
    }
  })

  
  // Return to previous step of uploading file
  const onBack = () => {
    setStep((value) => value - 1);
  }

  // Advance to next step of uploading file
  const onNext = () => {
    setStep((value) => value + 1);
  }

  // Handle file submission in dropzone
  const handleUpload = (input : any) => {
    const csv = input.target.files ? input.target.files[0] : null

    if (!csv) {
      toast.error("Invalid or No File")
      return null;
    }

    // Parse local CSV file
    Papa.parse(csv, {
      complete: async function(results: any) {
          await setCsvData(results.data);
          setFile(csv)
    }});
  }

  const uploadCSV = async () => {
    //setIsLoading(true);

    // If no CSV uploaded prompt user to do so
    if (!csvData) {
      toast.error("Upload a file");
      return;
    }
    

    axios.post('api/transaction', csvData)
      .then(() => {
        uploadModal.onClose();
      })
      .catch((error: any) => {
        toast.error("Something Went Wrong!")
      })
      .finally(() => {
        //setIsLoading(false);
      })

  }

  // Check for csvData changes
  useEffect(() => {
    console.log("CSV", csvData);
  }, [csvData])

  const actionLabel = useMemo(() => {
    /* When we wish to display action label based on current step, make sure to add step to dependencies
    if (step === STEPS.CONFIRM) {
      return 'Upload'
    }
    */

    return 'Submit'
  }, [])

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
          <FileInput accept={acceptedFileTypes} id="dropzone-file" className="hidden" onChange={(file) => {handleUpload(file)}
          }/>
        </Label>
      </div>
    </div>
  )


  return ( 
    <Modal 
      isOpen={uploadModal.isOpen}
      onClose={uploadModal.onClose}
      onSubmit={uploadCSV}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={undefined} // step === STEPS.UPLOAD ? undefined : onBack -> when we wish to display action based on current step
      title="Upload File"
      body={bodyContent}
    />
   );
}
 
export default UploadModal;