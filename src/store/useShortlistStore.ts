import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary, Platform } from "@/types";

export interface ShortlistedProfile {
  profile: UserProfileSummary;
  platform: Platform;
}

interface ShortlistStore {
  shortlist: ShortlistedProfile[];
  addToShortlist: (profile: UserProfileSummary, platform: Platform) => void;
  removeFromShortlist: (userId: string) => void;
  isShortlisted: (userId: string) => boolean;
}

export const useShortlistStore = create<ShortlistStore>()(
  persist(
    (set, get) => ({
      shortlist: [],

      addToShortlist: (profile, platform) => {
        const alreadyAdded = get().shortlist.some(
          (item) => item.profile.user_id === profile.user_id
        );
        if (alreadyAdded) return;

        set((state) => ({
          shortlist: [...state.shortlist, { profile, platform }],
        }));
      },

      removeFromShortlist: (userId) => {
        set((state) => ({
          shortlist: state.shortlist.filter(
            (item) => item.profile.user_id !== userId
          ),
        }));
      },

      isShortlisted: (userId) => {
        return get().shortlist.some((item) => item.profile.user_id === userId);
      },
    }),
    {
      name: "wobb-shortlist-storage",
    }
  )
);