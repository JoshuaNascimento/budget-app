'use client'

import useRecordTransactionModal from "@/app/hooks/useRecordTransactionModal"
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
import { categories } from "../navbar/Categories";

interface RecordTransactionModalProps {
  categories: any
}

const RecordTransactionModal: React.FC<RecordTransactionModalProps> = ({categories}) => {

  const recordTransactionModal = useRecordTransactionModal();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false); // Display DatePicker
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isExpense, setIsExpense] = useState(true)

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

  const handleToggle = () => {
    setIsExpense(prevState => !prevState)
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
      amount: '0',
    }
  })

  const parseTransaction: SubmitHandler<FieldValues> = (data) => {
    //setIsLoading(true);
    // id field doesnt seem to work for Datepicker so set date manually using state
    data.date = selectedDate; 
    data.category = selectedCategory;
    if (data.creditAmount <= 0 && data.debitAmount <= 0) {
      toast.error("Please enter an amount");
      return;
    }

    if (isExpense) {  // Check if entry is an expense
      try {
        axios.post('api/uploadExpense', data)
        toast.success("Transaction created successfully")
        router.refresh();
      } catch (error: any) {
        console.log(error)
        toast.error("Something went wrong")
      }
      recordTransactionModal.onClose()
    } else {  // Otherwise entry is income
      try {
        axios.post('api/uploadIncome', data)
        toast.success("Transaction created successfully")
        router.refresh();
      } catch (error: any) {
        console.log(error)
        toast.error("Something went wrong")
      }
      recordTransactionModal.onClose()
    }
  
    
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

      
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" onClick={() => handleToggle()}/>
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isExpense ? "Record Expense" : "Record Income"}</span>
      </label>

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
        {/* Conditionally render categories based on if the user is inputting an expense or income */}
        {isExpense ?
            categories.expense.map( (recordExpenseItem: any) => (
              <option key={recordExpenseItem.id} value={recordExpenseItem.id}>{recordExpenseItem}</option>
            ))
          :
          categories.income.map( (recordIncomeItem: any) => (
            <option key={recordIncomeItem.id} value={recordIncomeItem.id}>{recordIncomeItem}</option>
          ))
        }
      </Select>
      
      <Input 
        id="amount"
        label="Amount"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

    </div>
  )

  return (
    <Modal
      isOpen={recordTransactionModal.isOpen}
      onClose={recordTransactionModal.onClose}
      onSubmit={handleSubmit(parseTransaction)}
      actionLabel={actionLabel}
      secondaryActionLabel={undefined}
      secondaryAction={undefined}
      title="Record A Transaction"
      body={bodyContent}
    />
  )
}

export default RecordTransactionModal;