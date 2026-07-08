import Link from "next/link";
import { ReactNode } from "react";

export function LegalPageLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-black to-neutral-950 py-24">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-semibold text-neutral-400 hover:text-white transition-colors"
        >
          ← Back to home
        </Link>

        <h1 className="mt-6 text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 leading-tight tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-sm text-neutral-500">Last updated: {updated}</p>

        <div className="mt-12 space-y-8 text-neutral-300 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-white [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </div>
    </div>
  );
}
