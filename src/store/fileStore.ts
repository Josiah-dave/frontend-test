import { create } from "zustand";

interface FileStore {
  data: File | null;
  setData: (data: File | null) => void;
}

export const useFileStore = create<FileStore>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
