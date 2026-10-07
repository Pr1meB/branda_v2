import Link from "next/link";
import { markets } from "@/config/markets";

export function Footer() {
  return (
    <footer className="bg-paper text-ink py-20 mt-20 border-t border-sand/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          <div className="md:col-span-4 lg:col-span-5 pr-8">
            <span className="text-2xl font-display font-semibold tracking-tight text-ink mb-6 block">
              Branda.
            </span>
            <p className="text-sm font-body text-stone-muted max-w-sm leading-relaxed mb-8">
              A curated ecosystem for discovering and ordering premium branding services. We partner with top-tier creative professionals globally.
            </p>
            <div className="flex gap-4">
              <span className="h-10 w-10 bg-sand/50 rounded-full flex items-center justify-center hover:bg-sand cursor-pointer transition-colors text-xs text-ink font-medium">in</span>
              <span className="h-10 w-10 bg-sand/50 rounded-full flex items-center justify-center hover:bg-sand cursor-pointer transition-colors text-xs text-ink font-medium">tw</span>
              <span className="h-10 w-10 bg-sand/50 rounded-full flex items-center justify-center hover:bg-sand cursor-pointer transition-colors text-xs text-ink font-medium">ig</span>
            </div>
          </div>
          
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="font-display font-medium text-ink mb-6 text-sm">Categories</h3>
            <ul className="space-y-4 text-sm font-body text-stone-muted">
              <li><Link href="/ng/services?category=Digital" className="hover:text-ink transition-colors">Digital</Link></li>
              <li><Link href="/ng/services?category=Gifts" className="hover:text-ink transition-colors">Gifts</Link></li>
              <li><Link href="/ng/services?category=Create" className="hover:text-ink transition-colors">Create</Link></li>
              <li><Link href="/ng/services?category=Studio" className="hover:text-ink transition-colors">Studio</Link></li>
              <li><Link href="/ng/services?category=Prints" className="hover:text-ink transition-colors">Prints</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="font-display font-medium text-ink mb-6 text-sm">Markets</h3>
            <ul className="space-y-4 text-sm font-body text-stone-muted">
              {Object.values(markets).map(m => (
                <li key={m.id}>
                  <Link href={`/${m.id}`} className="hover:text-ink transition-colors">
                    {m.country}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="font-display font-medium text-ink mb-6 text-sm">Newsletter</h3>
            <p className="text-sm font-body text-stone-muted mb-4">Stay updated on creative trends.</p>
            <div className="flex border-b border-sand pb-2">
              <input type="email" placeholder="Enter email" className="bg-transparent border-none text-sm w-full focus:outline-none text-ink placeholder:text-stone-muted" />
              <button className="text-ink text-xs font-medium hover:text-stone-500 transition-colors">Submit</button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-sand/50 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-stone-muted font-body uppercase tracking-widest">
          <p>&copy; 2026 Branda Assessment.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-ink transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-ink transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
