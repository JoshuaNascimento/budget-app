import { create } from 'zustand';

interface CreateTransactionModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateTransactionModal = create<CreateTransactionModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
}))
 
export default useCreateTransactionModal;