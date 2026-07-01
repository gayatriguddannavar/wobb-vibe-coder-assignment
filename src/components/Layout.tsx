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
    <div className="min-h-screen">
      <header className="mirror-nav px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between py-4">
          <Link
            to="/"
            className="text-lg font-semibold text-heading tracking-tight hover:opacity-80 transition-opacity"
          >
            Influencer Search
          </Link>
          <Link
            to="/shortlist"
            className="btn btn-chrome text-sm px-4 py-2 inline-flex items-center gap-1.5"
          >
            My List
            <span className="mono-stat inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-black/15 text-xs font-semibold">
              {shortlist.length}
            </span>
          </Link>
        </div>
      </header>
      <main className="px-4 sm:px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {title && (
            <h1 className="text-2xl sm:text-3xl font-semibold text-heading mt-8 mb-6 tracking-tight">
              {title}
            </h1>
          )}
          <div>{children}</div>
        </div>
      </main>
    </div>
  );
}
