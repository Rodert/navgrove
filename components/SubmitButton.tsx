"use client";
import { useState } from "react";

export function SubmitButton({ label }: { label: string }) {
  const [form, setForm] = useState({ name: "", url: "", description: "", category: "", email: "" });

  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const openDraft = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = [
      `Product name: ${form.name}`,
      `Website URL: ${form.url}`,
      `Description: ${form.description}`,
      `Category: ${form.category}`,
      `Contact email: ${form.email}`,
      `Browser language: ${navigator.language}`,
    ].join("\n");
    window.location.href = `mailto:support@navgrove.com?subject=${encodeURIComponent(`Tool Submission: ${form.name}`)}&body=${encodeURIComponent(body)}`;
  };

  return <form onSubmit={openDraft} className="mt-6 grid gap-4">
    <label className="grid gap-1 text-sm font-medium text-slate-700">Product name<input required value={form.name} onChange={(event) => update("name", event.target.value)} className="focus-ring rounded-md border border-slate-300 px-3 py-2 font-normal" /></label>
    <label className="grid gap-1 text-sm font-medium text-slate-700">Website URL<input required type="url" value={form.url} onChange={(event) => update("url", event.target.value)} className="focus-ring rounded-md border border-slate-300 px-3 py-2 font-normal" /></label>
    <label className="grid gap-1 text-sm font-medium text-slate-700">Description<textarea required value={form.description} onChange={(event) => update("description", event.target.value)} className="focus-ring min-h-24 rounded-md border border-slate-300 px-3 py-2 font-normal" /></label>
    <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-1 text-sm font-medium text-slate-700">Category<input required value={form.category} onChange={(event) => update("category", event.target.value)} className="focus-ring rounded-md border border-slate-300 px-3 py-2 font-normal" /></label><label className="grid gap-1 text-sm font-medium text-slate-700">Contact email<input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} className="focus-ring rounded-md border border-slate-300 px-3 py-2 font-normal" /></label></div>
    <button type="submit" className="focus-ring w-fit rounded-md bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700">{label}</button>
    <p className="text-sm leading-6 text-slate-500">Clicking submit will open your local email app. Review the pre-filled message and send it to us. If it does not open, email <a className="text-green-700 hover:underline" href="mailto:support@navgrove.com">support@navgrove.com</a> directly.</p>
  </form>;
}
