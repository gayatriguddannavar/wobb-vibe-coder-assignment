import { useState, useMemo, useCallback } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  // useMemo means: only re-run extractProfiles when platform changes
  // not on every single keystroke
  const allProfiles = useMemo(
    () => extractProfiles(platform),
    [platform]
  );

  // useMemo means: only re-filter when allProfiles or searchQuery changes
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  // useCallback means: this function reference stays stable
  // so ProfileList doesn't re-render unnecessarily
  const handleProfileClick = useCallback((username: string) => {
    console.log("Clicked profile:", username);
  }, []);

  return (
    <Layout title="Find Influencers">
      <p className="text-muted mb-5 text-sm -mt-4">
        Browse top creators across social platforms
      </p>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="mono-stat text-xs text-dim mb-4 text-left">
        Showing {filtered.length} of {allProfiles.length} on{" "}
        <span className="capitalize">{platform}</span>
      </p>

      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
        onProfileClick={handleProfileClick}
      />
    </Layout>
  );
}
