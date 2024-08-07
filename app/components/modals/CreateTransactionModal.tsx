'use client'

import useCreateTransactionModal from "@/app/hooks/useCreateTransactionModal"
import Modal from './Modal'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Datepicker from "tailwind-datepicker-react"
import Heading from "../Heading";
import Input from "../inputs/Input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Papa from "papaparse";
import { Select } from "flowbite-react";
import { useRouter } from "next/navigation";

interface CreateTransactionModalProps {
  categories: any
}

const CreateTransactionModal: React.FC<CreateTransactionModalProps> = ({categories}) => {

  const createTransactionModal = useCreateTransactionModal();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false); // Display DatePicker
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedCategory, setSelectedCategory] = useState("")

	const dateHandleChange = (selectedDate: any) => { 
    setSelectedDate(selectedDate)
	}

	const dateHandleClose = (state: boolean) => {
		setShow(state)
	}

  const handleSelect = async (e: any) => {
    console.log(e.target.value)
    setSelectedCategory(e.target.value)
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
      date: '',
      description: '',
      debitAmount: '0',
      creditAmount: '0',
    }
  })

  const parseTransaction: SubmitHandler<FieldValues> = (data) => {
    //setIsLoading(true);
    // id field doesnt seem to work for Datepicker so set date manually using state
    data.date = selectedDate; 
    data.category = selectedCategory ? selectedCategory : "Other";
    if (data.creditAmount <= 0 && data.debitAmount <= 0) {
      toast.error("Please enter an amount");
      return;
    }
  
    try {
      console.log("Transaction: ", data);
      axios.post('api/uploadTransaction', data)
      toast.success("Transaction created successfully")
      router.refresh();
    } catch (error: any) {
      console.log(error)
      toast.error("Something went wrong")
    }
    createTransactionModal.onClose()
  }

  const actionLabel = "Submit"

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
        title ="Record a Transaction"
      />

      <Datepicker options={options} onChange={dateHandleChange} show={show} setShow={dateHandleClose} />
        
      <Input 
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Select required value={selectedCategory} id="category" onChange={(e) => handleSelect(e)}>
        <option>Select a category</option>
        {categories.map( (item: any) => (
          <option key={item.id} value={item.id}>{item}</option>
        ))}
      </Select>
      
      <Input 
        id="debitAmount"
        label="Amount Gained"
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
      isOpen={createTransactionModal.isOpen}
      onClose={createTransactionModal.onClose}
      onSubmit={handleSubmit(parseTransaction)}
      actionLabel={actionLabel}
      secondaryActionLabel={undefined}
      secondaryAction={undefined}
      title="Record A Transaction"
      body={bodyContent}
    />
  )
}

export default CreateTransactionModal;