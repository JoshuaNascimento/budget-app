import { create } from 'zustand';

interface UpdateTransactionModalStore {
  isOpen: boolean;
  transaction: {}
  onOpen: (data: any) => void;
  onClose: () => void;
  setTransaction: (data: any) => void;
  getTransaction: () => any;
}

const useUpdateTransactionModal = create<UpdateTransactionModalStore>((set, get) => ({
  isOpen: false,
  transaction: [],
  onOpen: async (data) => {
    await set(() => ({transaction: data})),
    set({isOpen: true})},
  onClose: () => {
    set({isOpen: false})
    set(() => ({transaction: {}}))
  },
  setTransaction:  async (data: any) => {
     await set(() => ({transaction: data}))
  },
  getTransaction: () => {
    return get().transaction
  }
}))


export default useUpdateTransactionModal;

