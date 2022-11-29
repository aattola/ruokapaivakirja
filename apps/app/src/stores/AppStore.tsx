import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface AppStoreState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const name = "AppStore";

const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () => {
        set((state) => {
          if (state.theme === "light") return { theme: "dark" };
          else return { theme: "light" };
        });
      },
    }),
    {
      name,
      getStorage: () => AsyncStorage,
    }
  )
);

export { useAppStore };
