'use client'

import { Field, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Datepicker from "tailwind-datepicker-react"
import Heading from "../Heading";
import Input from "../inputs/Input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useUpdateTransactionModal from "@/app/hooks/useUpdateTransactionModal";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";

const UpdateTransactionModal = () => {

  // TODO: Date changing doesnt work

  const router = useRouter()
    
  const updateTransactionModal = useUpdateTransactionModal();

  const data = updateTransactionModal.getTransaction()

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false); // Display DatePicker
  const [selectedDate, setSelectedDate] = useState(data.date)
  
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
      id: data.id,
      date: data.date,
      category: '',
      description: '',
      debitAmount: 0,
      creditAmount: 0,
    }
  })

  const actionLabel = "Update"
  const secondaryActionLabel ="Delete"

  // Options for Datepicker component
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
    defaultDate: new Date(data.date)
  }

  // Change the default values of our form each time the modal is rendered
  useEffect(() => { 
    setValue('description', data.description)
    setValue('category', data.category)
    setValue('date', data.date)
    setValue('debitAmount', data.debitAmount)
    setValue('creditAmount', data.creditAmount)
  }, [setValue, data])

  const updateTransaction: SubmitHandler<FieldValues> = async (updateData) => {
    //setIsLoading(true)
    updateData.id = data.id
    if (updateData.creditAmount <= 0 && updateData.debitAmount <= 0) {
      toast.error("Please enter an amount");
      return;
    }

    try {
      await axios.put('api/updateTransaction', updateData)
      toast.success("Transaction updated successfully")
      router.refresh()
    } catch (error: any) {
      console.log(error)
      toast.error("Somethign went wrong")
    }
    updateTransactionModal.onClose()
  }

  const deleteTransaction: SubmitHandler<FieldValues> = async () => {
    try {
      await axios.delete('/api/deleteTransaction', {
        data: {id: data.id},
      });
      toast.success("Transaction deleted successfully")
      router.refresh();
    } catch (error: any) {
      console.log(error)
      toast.error("Something went wrong")
    }

    updateTransactionModal.onClose()
  }
  
  const bodyContent = (
    
    <div className="flex flex-col gap-4">
      
      <Heading 
        title ="Update a Transaction"
      />

      <Datepicker options={options} onChange={dateHandleChange} show={show} setShow={dateHandleClose} />
        
      <Input 
        id="description"
        label={"Description"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input 
        id="category"
        label={'Category'}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      
      {data.debitAmount > 0 ? 
      <Input 
        id="debitAmount"
        label={'Debited Amount'}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      :
      <Input 
        id="creditAmount"
        label={'Credited Amount'}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      }

    </div>
  )

  return (
    <Modal
      isOpen={updateTransactionModal.isOpen}
      onClose={updateTransactionModal.onClose}
      onSubmit={handleSubmit(updateTransaction)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={handleSubmit(deleteTransaction)}
      title="Update A Transaction"
      body={bodyContent}
    />
  )
}

export default UpdateTransactionModal;