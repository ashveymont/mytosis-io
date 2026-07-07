import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-black to-neutral-950 px-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 text-center">
        <div className="text-sm font-semibold tracking-widest text-neutral-500 uppercase">
          404
        </div>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 leading-tight tracking-tight">
          Page not found.
        </h1>
        <p className="mt-6 text-lg text-neutral-300 leading-relaxed max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-br from-white/20 to-white/5 px-6 py-3 text-sm font-semibold text-white shadow-[0_2px_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:from-white/30 hover:to-white/10 hover:shadow-[0_4px_30px_rgba(255,255,255,0.15)] sm:text-base"
        >
          Back to home
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
