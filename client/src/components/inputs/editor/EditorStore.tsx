import { create } from 'zustand';

interface EditorStore {
  content: string;
  changeContent: (value: string) => void;
  clearContent: () => void;
}
export const useEditorStore = create<EditorStore>(set => ({
  content: '',
  changeContent: value => set({ content: value }),
  clearContent: () => set({ content: '' }),
}));
