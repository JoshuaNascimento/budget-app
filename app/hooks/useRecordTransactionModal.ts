import { create } from 'zustand';

interface RecordTransactionModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const RecordTransactionModal = create<RecordTransactionModal>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
}))
 
export default RecordTransactionModal;