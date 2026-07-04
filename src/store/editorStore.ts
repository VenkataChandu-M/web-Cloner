import { create } from 'zustand';

export type ViewMode = 'desktop' | 'tablet' | 'mobile';
export type ActivePanel = 'sections' | 'elements' | 'layers';

export interface HistoryEntry {
  html: string;
  timestamp: number;
}

export interface EditorSection {
  id: string;
  type: string;
  label: string;
  htmlContent: string;
}

interface EditorState {
  // Content
  html: string;
  sections: EditorSection[];

  // Selection
  selectedSectionId: string | null;
  hoveredSectionId: string | null;

  // History (undo/redo)
  history: HistoryEntry[];
  historyIndex: number;

  // Viewport
  viewMode: ViewMode;
  zoom: number;

  // UI
  activePanel: ActivePanel;
  showCode: boolean;
  isSaved: boolean;

  // Actions
  setHtml: (html: string, pushHistory?: boolean) => void;
  setSections: (sections: EditorSection[]) => void;
  setSelectedSection: (id: string | null) => void;
  setHoveredSection: (id: string | null) => void;
  setViewMode: (mode: ViewMode) => void;
  setZoom: (zoom: number) => void;
  setActivePanel: (panel: ActivePanel) => void;
  setShowCode: (show: boolean) => void;
  setIsSaved: (saved: boolean) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  pushHistory: (html: string) => void;
  reset: () => void;
}

const MAX_HISTORY = 50;

export const useEditorStore = create<EditorState>((set, get) => ({
  html: '',
  sections: [],
  selectedSectionId: null,
  hoveredSectionId: null,
  history: [],
  historyIndex: -1,
  viewMode: 'desktop',
  zoom: 100,
  activePanel: 'sections',
  showCode: false,
  isSaved: true,

  setHtml: (html, pushHistory = true) => {
    set({ html, isSaved: false });
    if (pushHistory) {
      get().pushHistory(html);
    }
  },

  setSections: (sections) => set({ sections }),

  setSelectedSection: (id) => set({ selectedSectionId: id }),

  setHoveredSection: (id) => set({ hoveredSectionId: id }),

  setViewMode: (viewMode) => set({ viewMode }),

  setZoom: (zoom) => set({ zoom: Math.max(25, Math.min(200, zoom)) }),

  setActivePanel: (activePanel) => set({ activePanel }),

  setShowCode: (showCode) => set({ showCode }),

  setIsSaved: (isSaved) => set({ isSaved }),

  pushHistory: (html) => {
    const { history, historyIndex } = get();
    // Trim future history if we branched
    const newHistory = history.slice(0, historyIndex + 1);
    const entry: HistoryEntry = { html, timestamp: Date.now() };
    const trimmed = [...newHistory, entry].slice(-MAX_HISTORY);
    set({
      history: trimmed,
      historyIndex: trimmed.length - 1,
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({
        html: history[newIndex].html,
        historyIndex: newIndex,
        isSaved: false,
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({
        html: history[newIndex].html,
        historyIndex: newIndex,
        isSaved: false,
      });
    }
  },

  canUndo: () => {
    const { historyIndex } = get();
    return historyIndex > 0;
  },

  canRedo: () => {
    const { history, historyIndex } = get();
    return historyIndex < history.length - 1;
  },

  reset: () =>
    set({
      html: '',
      sections: [],
      selectedSectionId: null,
      hoveredSectionId: null,
      history: [],
      historyIndex: -1,
      viewMode: 'desktop',
      zoom: 100,
      activePanel: 'sections',
      showCode: false,
      isSaved: true,
    }),
}));
