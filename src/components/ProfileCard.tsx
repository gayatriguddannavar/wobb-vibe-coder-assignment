import React from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./ui/VerifiedBadge";
import { useShortlistStore } from "@/store/useShortlistStore";



interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M followers";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K followers";
  return count + " followers";
}

export const ProfileCard = React.memo(function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { addToShortlist, removeFromShortlist, isShortlisted } =
    useShortlistStore();

  const added = isShortlisted(profile.user_id);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (added) {
      removeFromShortlist(profile.user_id);
    } else {
      addToShortlist(profile, platform);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="mirror-card mirror-card--interactive flex items-center gap-4 p-4 cursor-pointer w-full"
      data-search={searchQuery}
    >
      <div className="avatar-ring shrink-0">
        <img src={profile.picture} className="w-12 h-12 object-cover" />
      </div>
      <div className="text-left flex-1 min-w-0">
        <div className="font-semibold text-heading truncate flex items-center">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-muted truncate">{profile.fullname}</div>
        <div className="mono-stat text-sm text-dim mt-0.5">
          {formatFollowersLocal(profile.followers)}
        </div>
      </div>
      <button
        onClick={handleAddToList}
        className={`btn shrink-0 px-3.5 py-1.5 text-sm ${
          added ? "btn-danger" : "btn-chrome"
        }`}
      >
        {added ? "Remove" : "Add to List"}
      </button>
    </div>
  );
});
