
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
   
      <section className="mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-8 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex max-w-full items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur sm:mb-6 sm:text-sm">
              Job tracking, redesigned for clarity
            </div>

            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
              Track your job search with a calm, focused workspace.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl">
              This landing page is frontend-only and built with Tailwind CSS plus shadcn/ui..
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {/* Frontend-only CTA: this scrolls to the feature section and does not call any backend. */}
              <Button asChild size="lg" className="h-12 rounded-full px-6 sm:h-11">
                <Link href="#features">Explore features</Link>
              </Button>

              {/* Future backend CTA: this is where sign-in or onboarding would be wired once auth exists. */}
              <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-6 sm:h-11">
                <Link href="#waitlist">Join the waitlist</Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5"
                >
                  <div className="text-2xl font-semibold text-slate-950 sm:text-3xl">{stat.value}</div>
                  <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
                
          <ImageGal/>
        
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 lg:pb-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur sm:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Product highlights
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Built to feel simple, polished, and useful from the first glance.
            </h2>
          </div>

          <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
              >
                <div className="mb-4 h-10 w-10 rounded-2xl bg-slate-950/90 sm:h-11 sm:w-11" />
                <h3 className="text-lg font-semibold text-slate-950 sm:text-xl">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="waitlist" className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="rounded-[2rem] bg-slate-950 px-5 py-8 text-slate-50 shadow-2xl shadow-slate-200/60 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Ready for launch
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                A landing page that feels finished before the product is wired up.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                Add backend logic later for sign-up, waitlist storage, or authentication. For now, this page stays frontend-only and fully presentational.
              </p>
            </div>

            {/* Future backend CTA: this would be the spot to submit waitlist or onboarding data once the API exists. */}
            <Button asChild size="lg" className="h-12 rounded-full bg-white px-6 text-slate-950 hover:bg-slate-100 sm:h-11">
              <Link href="#top">Back to top</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
