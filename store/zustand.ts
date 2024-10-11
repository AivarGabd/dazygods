import { create } from "zustand";

type DialogState = {
  isOpen: boolean;
  title: "about-return" | "about-delivery" | "about-payment";
};

type InfoMenuState = {
  dialogState: DialogState;
  updateDialogState: (newState: Partial<DialogState>) => void;
};

export const useAnimeEntriesStore = create<InfoMenuState>((set) => ({
  dialogState: {
    isOpen: false,
    title: "about-return",
  },
  updateDialogState: (newState) =>
    set((state) => ({
      dialogState: { ...state.dialogState, ...newState },
    })),
}));
