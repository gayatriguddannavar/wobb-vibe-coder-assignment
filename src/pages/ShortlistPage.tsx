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
      <Link to="/" className="text-sm text-blue-600 mb-4 inline-block">
        ← Back to search
      </Link>

      {shortlist.length === 0 ? (
        <p className="text-gray-500 mt-4">
          No profiles added yet. Go back to search and click "Add to List" on
          any profile.
        </p>
      ) : (
        <div className="flex flex-col items-center gap-2 mt-4">
          {shortlist.map(({ profile, platform }) => (
            <div
              key={profile.user_id}
              className="flex items-center gap-3 p-3 border border-gray-300 rounded w-full max-w-2xl"
            >
              <img
                src={profile.picture}
                className="w-12 h-12 rounded-full"
              />
              <div className="text-left flex-1">
                <div className="font-bold">
                  @{profile.username}
                  <VerifiedBadge verified={profile.is_verified} />
                </div>
                <div className="text-sm text-gray-600">{profile.fullname}</div>
                <div className="text-sm">
                  {formatFollowers(profile.followers)} followers ·{" "}
                  <span className="capitalize">{platform}</span>
                </div>
              </div>
              <button
                onClick={() => removeFromShortlist(profile.user_id)}
                className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200"
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