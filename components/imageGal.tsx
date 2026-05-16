'use client'
import {clsx} from 'clsx'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import {useState} from 'react'


export default function ImageGal() {

    const [currentImage, setCurrentImage] = useState(0);

    

    return (
       <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-amber-400/20 blur-3xl sm:-inset-6" />
            <div className="relative rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-2xl shadow-slate-200/70 backdrop-blur sm:p-5">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-4 text-slate-50 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Pipeline overview</p>
                    <h2 className="mt-1 text-xl font-semibold sm:text-2xl">Applications in motion</h2>
                  </div>
                  <span className="w-fit rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300 sm:text-sm">
                    Live preview
                  </span>
                </div>

                <div className="mt-6 space-y-4 sm:mt-8">
                 { 
                 currentImage ===0 &&
                 <Image className="h-auto w-full rounded-2xl" src="/hero1.png" alt="Hero image" width={500} height={300} />
                 }
                 {
                 currentImage ===1 &&
                 <Image className="h-auto w-full rounded-2xl" src="/hero2.png" alt="Hero image" width={500} height={300} />
                 }
                 {
                 currentImage ===2 &&
                 <Image className="h-auto w-full rounded-2xl" src="/hero3.png" alt="Hero image" width={500} height={300} />
                 } 
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:mt-6 sm:grid-cols-3">

          <Button className={clsx("w-full rounded-full px-4 text-sm", { "bg-slate-200 text-slate-950": currentImage === 0 })} onClick={() => setCurrentImage(0)}>Home Page</Button>
          <Button className={clsx("w-full rounded-full px-4 text-sm", { "bg-slate-200 text-slate-950": currentImage === 1 })} onClick={() => setCurrentImage(1)}>Home Page Full</Button>
          <Button className={clsx("w-full rounded-full px-4 text-sm", { "bg-slate-200 text-slate-950": currentImage === 2 })} onClick={() => setCurrentImage(2)}>Edit Page</Button>
              </div>

            </div>
          </div>
    )
}