'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Datepicker from "tailwind-datepicker-react"
import Heading from "../Heading";
import Input from "../inputs/Input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useUpdateTransactionModal from "@/app/hooks/useUpdateTransactionModal";
import Modal from "./Modal";

const UpdateTransactionModal = () => {

  // TODO: to have forms update in realtime need to pass values in <Input/> Label field
  // Changing default values to non-empty strings prevents re-renders for some reason
    
  const updateTransactionModal = useUpdateTransactionModal();
  console.log("Modal: ", updateTransactionModal.getTransaction().description);


  const data = updateTransactionModal.getTransaction()
  

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false); // Display DatePicker
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  
	const dateHandleChange = (selectedDate: any) => { 
    setSelectedDate(selectedDate)
	}

	const dateHandleClose = (state: boolean) => {
		setShow(state)
	}
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      date: selectedDate,
      category: '',
      description: '',
      debitAmount: '',
      creditAmount: '',
    }
  })



  const actionLabel = "Update"

  const options = {
    title: "Date of Transaction",
    theme: {
      background: "",
      todayBtn: "bg-lime-600",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "",
      input: "",
      inputIcon: "",
      selected: "bg-lime-600",
    },
  }

  const bodyContent = (
    
    <div className="flex flex-col gap-4">
      
      <Heading 
        title ="Update a Transaction"
      />

      <Datepicker options={options} onChange={dateHandleChange} show={show} setShow={dateHandleClose} />
        
      <Input 
        id="description"
        label={data.description}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      {/* TODO: IDEA 1 
        Maybe some sort of tertiary operator to display the default label AND previous input
      */}
      <Input 
        id="category"
        label={`Category: ${data.category}`}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      

      {/* TODO: IDEA 2 
        An or operator to display either the amount previously inputted OR default value
      */}
      <Input 
        id="debitAmount"
        label={data.debitAmount || "Amount Gained"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="creditAmount"
        label="Amount Lost"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

    </div>
  )

  return (
    <Modal
      isOpen={updateTransactionModal.isOpen}
      onClose={updateTransactionModal.onClose}
      onSubmit={() => {console.log("update modal!")}}
      actionLabel={actionLabel}
      secondaryActionLabel={undefined}
      secondaryAction={undefined}
      title="Update A Transaction"
      body={bodyContent}
    />
  )
}

export default UpdateTransactionModal;