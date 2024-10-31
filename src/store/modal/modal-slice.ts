import { StateCreator } from 'zustand';

import { ModalSlice, ModalState } from './modal.type';

const initialState: ModalState = {
  isVisible: false,
  content: null,
};

export const createModalSlice: StateCreator<ModalSlice, [['zustand/immer', never]], [], ModalSlice> = (set) => ({
  ...initialState,
  showModal: (content) =>
    set((state) => {
      state.isVisible = true;
      state.content = content;
    }),
  hideModal: () =>
    set((state) => {
      state.isVisible = false;
      state.content = null;
    }),
});
