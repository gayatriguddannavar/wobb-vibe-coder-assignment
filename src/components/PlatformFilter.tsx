import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-6">
      <div className="mirror-panel inline-flex gap-1 p-1 mb-4">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            data-active={selected === p}
            className="tab-mirror relative px-4 py-1.5 text-sm"
          >
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by username or name..."
          className="input-mirror w-full max-w-md px-4 py-2.5 text-sm"
        />
      </div>
    </div>
  );
}
