import {create} from "zustand";

export interface CategoryState {
  selectedCategory: string;
  searchQuery: string;
  cartItems: number[];
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  toggleCartItem: (id: number) => void;
}

const useProductStore = create<CategoryState>((set) => ({
  selectedCategory: 'None',
  searchQuery: '',
  cartItems: [],
  setSelectedCategory: (selectedCategory: string) => set(() => ({selectedCategory})),
  setSearchQuery: (searchQuery: string) => set(() => ({searchQuery})),
  toggleCartItem: (id: number) => set((state) => ({
    cartItems: state.cartItems.includes(id)
      ? state.cartItems.filter(itemId => itemId !== id)
      : [...state.cartItems, id]
  })),
}));


export default useProductStore;