import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { useShortlistStore } from "@/store/useShortlistStore";

function formatFollowers(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K";
  return String(count);
}

export function ShortlistPage() {
  const { shortlist, removeFromShortlist } = useShortlistStore();

  return (
    <Layout title="My Shortlist">
      <Link
        to="/"
        className="text-sm mb-5 inline-block hover:opacity-75 transition-opacity"
        style={{ color: "var(--ion)" }}
      >
        ← Back to search
      </Link>

      {shortlist.length === 0 ? (
        <div className="mirror-panel p-8 text-center">
          <p className="text-muted">
            No profiles added yet. Go back to search and click "Add to List"
            on any profile.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {shortlist.map(({ profile, platform }) => (
            <div
              key={profile.user_id}
              className="mirror-card flex items-center gap-4 p-4 w-full"
            >
              <div className="avatar-ring shrink-0">
                <img src={profile.picture} className="w-12 h-12 object-cover" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="font-semibold text-heading truncate flex items-center">
                  @{profile.username}
                  <VerifiedBadge verified={profile.is_verified} />
                </div>
                <div className="text-sm text-muted truncate">
                  {profile.fullname}
                </div>
                <div className="mono-stat text-sm text-dim mt-0.5">
                  {formatFollowers(profile.followers)} followers ·{" "}
                  <span className="capitalize">{platform}</span>
                </div>
              </div>
              <button
                onClick={() => removeFromShortlist(profile.user_id)}
                className="btn btn-danger shrink-0 px-3.5 py-1.5 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
