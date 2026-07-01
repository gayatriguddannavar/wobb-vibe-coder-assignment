interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      className="input-mirror px-4 py-2.5 w-80 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search influencers..."
    />
  );
}
