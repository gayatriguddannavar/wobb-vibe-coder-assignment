import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useShortlistStore } from "@/store/useShortlistStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { shortlist } = useShortlistStore();

  return (
    <div className="p-4 min-h-screen">
      <header className="mb-6 border-b pb-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          Influencer Search
        </Link>
        <Link
          to="/shortlist"
          className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded"
        >
          My List ({shortlist.length})
        </Link>
      </header>
      {title && <h1 className="text-2xl mt-2 mb-4">{title}</h1>}
      <main>{children}</main>
    </div>
  );
}
