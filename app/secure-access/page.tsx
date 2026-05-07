"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Terminal, Lock } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    // Tắt cảnh báo setState trong effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true); 
  }, []);

  if (!mounted) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) window.location.href = "/secure-access/dashboard";
    else alert("Access Denied.");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-mono text-emerald-500">
      <div className="mb-10 text-center">
        <Terminal size={60} className="mx-auto mb-4 animate-pulse" />
        <h1 className="text-3xl font-black tracking-tighter text-white">SECURE GATEWAY</h1>
        <p className="text-slate-600 text-xs mt-2">Tommy Doan Portfolio Admin Access</p>
      </div>
      <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-900 p-10 rounded-4xl border border-slate-800 shadow-2xl">
        <input type="email" placeholder="ROOT_ID" onChange={(e) => setEmail(e.target.value)} className="w-full p-4 bg-slate-950 rounded-2xl mb-4 border border-slate-800 outline-none focus:ring-1 ring-emerald-500 text-white" required />
        <input type="password" placeholder="SECURE_KEY" onChange={(e) => setPassword(e.target.value)} className="w-full p-4 bg-slate-950 rounded-2xl mb-6 border border-slate-800 outline-none focus:ring-1 ring-emerald-500 text-white" required />
        <button type="submit" className="w-full bg-emerald-500 text-slate-950 font-black p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors">
          <Lock size={18}/> AUTHENTICATE
        </button>
      </form>
    </div>
  );
}