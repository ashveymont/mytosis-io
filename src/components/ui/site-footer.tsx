import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
        <div className="text-neutral-300 font-semibold">
          Mytosis. <span className="text-neutral-500 font-normal">by Blackcrest Scaling</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <a
            href="https://www.linkedin.com/in/ashanveymont/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </nav>
        <div>© 2026 Blackcrest Scaling. All rights reserved. · Dubai, UAE</div>
      </div>
    </footer>
  );
}
