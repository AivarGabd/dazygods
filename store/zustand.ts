import { create } from "zustand";

type infoMenuState = {
  isOpen: boolean;
  updateIsOpen: (newState: boolean) => void;
};

export const useAnimeEntriesStore = create<infoMenuState>((set) => ({
  isOpen: false,
  updateIsOpen: (newState) => set(() => ({ isOpen: newState })),
}));

