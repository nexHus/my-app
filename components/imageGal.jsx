'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button";
import {useState} from 'react'


export default function ImageGal() {

    const [currentImage, setCurrentImage] = useState(0);

    

    return (
       <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-amber-400/20 blur-3xl" />
            <div className="relative rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-2xl shadow-slate-200/70 backdrop-blur">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 text-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Pipeline overview</p>
                    <h2 className="mt-1 text-2xl font-semibold">Applications in motion</h2>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-medium text-emerald-300">
                    Live preview
                  </span>
                </div>

                <div className="mt-8 space-y-4">
                 { 
                 currentImage ===0 &&
                 <Image src="/hero1.png" alt="Hero image" width={500} height={300} />
                 }
                 {
                 currentImage ===1 &&
                 <Image src="/hero2.png" alt="Hero image" width={500} height={300} />
                 }
                 {
                 currentImage ===2 &&
                 <Image src="/hero3.png" alt="Hero image" width={500} height={300} />
                 } 
                </div>
              </div>
              <div className="flex justify-around mt-6">

          <Button className="rounded-full w-25" onClick={() => setCurrentImage(0)}>Hello</Button>
          <Button className="rounded-full w-25" onClick={() => setCurrentImage(1)}>Hello</Button>
          <Button className="rounded-full w-25" onClick={() => setCurrentImage(2)}>Hello</Button>
              </div>

            </div>
          </div>
    )
}