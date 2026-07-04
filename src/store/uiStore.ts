import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  activeModal: string | null;
  toasts: Toast[];
  theme: 'dark';

  toggleSidebar: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  activeModal: null,
  toasts: [],
  theme: 'dark',

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),

  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { ...toast, id: `toast-${Date.now()}-${Math.random().toString(36).slice(2)}` },
      ],
    })),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
