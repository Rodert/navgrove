"use client";

import { useState } from "react";

export function ToolLogo({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-md bg-green-50 font-bold text-green-700">{name.slice(0, 1)}</div>;
  return <div className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-md border border-slate-100 bg-white p-1"><img src={src} alt={`${name} logo`} className="size-full object-contain" onError={() => setFailed(true)} /></div>;
}
