import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse, Platform } from "@/types";
import { formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useShortlistStore } from "@/store/useShortlistStore";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);
  const { addToShortlist, removeFromShortlist, isShortlisted } = useShortlistStore();

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-muted">Loading...</p>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <p className="mb-4" style={{ color: "var(--danger)" }}>
          Could not load profile details for {username}
        </p>
        <Link to="/" className="underline" style={{ color: "var(--ion)" }}>
          Back to search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const added = isShortlisted(user.user_id);

  return (
    <Layout title={user.fullname}>
      <Link
        to="/"
        className="text-sm mb-5 inline-block hover:opacity-75 transition-opacity"
        style={{ color: "var(--ion)" }}
      >
        ← Back to search
      </Link>

      <div className="mirror-panel text-left max-w-2xl mx-auto p-6">
        <div className="flex gap-5 items-start">
          <div className="avatar-ring shrink-0">
            <img src={user.picture} className="w-20 h-20 object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-heading flex items-center">
              @{user.username}
              <VerifiedBadge verified={user.is_verified} />
            </h2>
            <p className="text-muted">{user.fullname}</p>
            <p className="text-xs text-dim mt-1 capitalize">
              Platform: {platform}
            </p>

            {user.description && (
              <p className="mt-3 text-sm text-muted">{user.description}</p>
            )}

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="stat-tile p-3">
                <div className="text-dim text-xs mb-0.5">Followers</div>
                <div className="mono-stat font-semibold text-heading">
                  {formatFollowersDetail(user.followers)}
                </div>
              </div>
              <div className="stat-tile p-3">
                <div className="text-dim text-xs mb-0.5">Engagement Rate</div>
                <div className="mono-stat font-semibold text-heading">
                  {user.engagement_rate !== undefined
                    ? formatEngagementRate(user.engagement_rate)
                    : "N/A"}
                </div>
              </div>
              {user.posts_count !== undefined && (
                <div className="stat-tile p-3">
                  <div className="text-dim text-xs mb-0.5">Posts</div>
                  <div className="mono-stat font-semibold text-heading">
                    {user.posts_count}
                  </div>
                </div>
              )}
              {user.avg_likes !== undefined && (
                <div className="stat-tile p-3">
                  <div className="text-dim text-xs mb-0.5">Avg Likes</div>
                  <div className="mono-stat font-semibold text-heading">
                    {formatFollowersDetail(user.avg_likes)}
                  </div>
                </div>
              )}
              {user.avg_comments !== undefined && (
                <div className="stat-tile p-3">
                  <div className="text-dim text-xs mb-0.5">Avg Comments</div>
                  <div className="mono-stat font-semibold text-heading">
                    {user.avg_comments}
                  </div>
                </div>
              )}
              {user.avg_views !== undefined && user.avg_views > 0 && (
                <div className="stat-tile p-3">
                  <div className="text-dim text-xs mb-0.5">Avg Views</div>
                  <div className="mono-stat font-semibold text-heading">
                    {formatFollowersDetail(user.avg_views)}
                  </div>
                </div>
              )}
              {user.engagements !== undefined && (
                <div className="stat-tile p-3">
                  <div className="text-dim text-xs mb-0.5">Engagements</div>
                  <div className="mono-stat font-semibold text-heading">
                    {user.engagements.toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            {user.url && (
              <a
                href={user.url}
                target="_blank"
                className="inline-block mt-4 text-sm hover:opacity-75 transition-opacity"
                style={{ color: "var(--ion)" }}
              >
                View on platform →
              </a>
            )}

            {/* TODO: candidates must implement Add to List feature */}
            {/* TODO: candidates must implement Add to List feature */}
            <button
              onClick={() => {
                if (added) {
                  removeFromShortlist(user.user_id);
                } else {
                  addToShortlist(user, platform as Platform);
                }
              }}
              className={`btn block mt-5 px-4 py-2 text-sm ${
                added ? "btn-danger" : "btn-chrome"
              }`}
            >
              {added ? "Remove from List" : "Add to List"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
