import Link from "next/link";
import { Icon } from "@/components/icons";
import { Avatar } from "@/components/ui/avatar";
import { profile } from "@/lib/profile";

/**
 * Global navy top bar. Left edge lines up with the sidebar; the search box
 * starts at the content column (272px) and the right edge matches the
 * content's 32px gutter, as in Figma.
 */
export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-[60px] items-center gap-4 bg-brand-navy pl-4 pr-8 text-white">
      <div className="flex w-[240px] shrink-0 items-center pl-3">
        <Link href="/dashboard" className="flex items-center gap-2.5" aria-label="IB Academy home">
          <span className="rounded-md bg-brand-gradient px-2 py-1 text-sm font-bold">CXM</span>
          <span className="text-base font-semibold">IB Academy</span>
        </Link>
      </div>

      <form role="search" className="w-[360px] shrink-0" action="#">
        <label className="flex items-center gap-2 rounded-lg bg-white/[0.08] px-3 py-2 focus-within:bg-white/[0.12]">
          <Icon name="search" size={16} className="text-muted-on-dark" />
          <input
            type="search"
            placeholder="Search courses, metrics, strategies…"
            aria-label="Search the Academy"
            className="w-full bg-transparent text-sm text-white placeholder:text-muted-on-dark focus:outline-none"
          />
        </label>
      </form>

      <div className="flex-1" />

      <button type="button" aria-label="Notifications" className="text-[#c9cdd6] hover:text-white">
        <Icon name="bell" size={18} />
      </button>
      <span className="text-sm font-medium">EN</span>
      <div className="leading-tight">
        <div className="text-xs text-muted-on-dark">Rebate balance</div>
        <div className="text-sm font-semibold">{profile.rebateBalance}</div>
      </div>
      <Avatar initials={profile.initials} />
    </header>
  );
}
