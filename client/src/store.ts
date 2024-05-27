import create from "zustand";
import { Contact } from "./domain/contact/Contact";

interface FavoriteState {
  favorites: Contact[];
  addFavorite: (contact: Contact) => void;
  removeFavorite: (contactId: string) => void;
  isFavorite: (contactId: string) => boolean;
}

/*
 * I use zustand for the favorites strore
 * This allows us to have a global state that leter we use on Contacts component
 *
 */

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  addFavorite: (contact: Contact) => {
    const { favorites } = get();
    const updatedFavorites = [...favorites, contact];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    set({ favorites: updatedFavorites });
  },
  removeFavorite: (contactId: string) => {
    const { favorites } = get();
    const updatedFavorites = favorites.filter((fav) => fav.id !== contactId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    set({ favorites: updatedFavorites });
  },
  isFavorite: (contactId: string) => {
    const { favorites } = get();
    return favorites.some((fav) => fav.id === contactId);
  },
}));
