import {Button} from "./ui/button"
import Link from "next/link";
import {
  NavigationMenu as NavigationMenuPrimitive,
  NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuViewport,
    NavigationMenu,
} from "@/components/ui/navigation-menu";




export default function NavBar() {  
    const navItems = [
  { label: "Home", href: "#top" },
  { label: "Features", href: "#features" },
  { label: "Waitlist", href: "#waitlist" },
];
return (
    <>
       <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Link href="#top" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white shadow-sm">
              JT
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                JobTracker
              </p>
              <p className="text-sm text-slate-500">Calm job search dashboard</p>
            </div>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link href={item.href} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-950">
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 sm:flex">
              {/* Future backend CTA: this would open the login flow when auth is connected. */}
              <Button asChild variant="ghost" className="rounded-full px-4">
                <Link href="api/auth/login">Login</Link>
              </Button>

              {/* Future backend CTA: this would submit account creation or onboarding data later. */}
              <Button asChild className="rounded-full px-5">
                <Link href="api/auth/signup">Sign up</Link>
              </Button>
            </div>

            <button
              type="button"
              className="group flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm"
              aria-label="Profile image"
            >
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80"
                alt="Profile avatar"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </button>
          </div>
        </div>
      </header>

    </>
)

}