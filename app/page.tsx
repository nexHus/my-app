
import Link from "next/link";
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import ImageGal from "@/components/imageGal";

const stats = [
  { value: "2x", label: "faster application tracking" },
  { value: "94%", label: "of tasks visible at a glance" },
  { value: "24/7", label: "dashboard access from any device" },
  { value: "Built By Pakistan", label: "Early access from any device" },
];

const features = [
  {
    title: "Centralize every role",
    description:
      "Keep applications, interview dates, notes, and follow-ups in one clean workspace.",
  },
  {
    title: "Stay on top of next steps",
    description:
      "See what needs attention now with a layout that highlights deadlines and status.",
  },
  {
    title: "Track momentum visually",
    description:
      "Use a polished, readable interface that makes progress obvious at a glance.",
  },
];



export default function Home() {
  
  return (
    <main
      id="top"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.18),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_45%,_#f8fafc_100%)] text-slate-950"
    >
   
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-20 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
              Job tracking, redesigned for clarity
            </div>

            <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Track your job search with a calm, focused workspace.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              This landing page is frontend-only and built with Tailwind CSS plus shadcn/ui..
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {/* Frontend-only CTA: this scrolls to the feature section and does not call any backend. */}
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="#features">Explore features</Link>
              </Button>

              {/* Future backend CTA: this is where sign-in or onboarding would be wired once auth exists. */}
              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <Link href="#waitlist">Join the waitlist</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur"
                >
                  <div className="text-3xl font-semibold text-slate-950">{stat.value}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
                
          <ImageGal/>
        
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-7xl px-6 pb-12 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white/85 p-8 shadow-sm backdrop-blur">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Product highlights
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Built to feel simple, polished, and useful from the first glance.
            </h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="mb-4 h-11 w-11 rounded-2xl bg-slate-950/90" />
                <h3 className="text-xl font-semibold text-slate-950">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="waitlist" className="mx-auto w-full max-w-7xl px-6 pb-16 lg:px-8">
        <div className="rounded-[2rem] bg-slate-950 px-8 py-10 text-slate-50 shadow-2xl shadow-slate-200/60 sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Ready for launch
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                A landing page that feels finished before the product is wired up.
              </h2>
              <p className="mt-4 text-slate-300">
                Add backend logic later for sign-up, waitlist storage, or authentication. For now, this page stays frontend-only and fully presentational.
              </p>
            </div>

            {/* Future backend CTA: this would be the spot to submit waitlist or onboarding data once the API exists. */}
            <Button asChild size="lg" className="rounded-full bg-white px-6 text-slate-950 hover:bg-slate-100">
              <Link href="#top">Back to top</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
