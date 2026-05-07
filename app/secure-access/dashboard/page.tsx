"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Plus, Trash2, LogOut, LayoutDashboard, Database } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Khai báo kiểu dữ liệu rõ ràng để TypeScript ngừng báo lỗi "any"
interface Project {
  id: number;
  title: string;
  description_vi: string;
  tech_stack: string[];
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]); // Đã sửa
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [descVi, setDescVi] = useState("");
  const [techs, setTechs] = useState("");

  async function fetchAll() {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) window.location.href = "/secure-access";
      else fetchAll();
    });
  }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('projects').insert([{
      title, description_vi: descVi, tech_stack: techs.split(',').map(t => t.trim())
    }]);
    if (!error) { setTitle(""); setDescVi(""); setTechs(""); fetchAll(); }
    else setLoading(false);
  };

  const del = async (id: number) => {
    if(confirm("Delete project?")) {
      await supabase.from('projects').delete().eq('id', id);
      fetchAll();
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 text-emerald-500 flex items-center justify-center font-mono">SYNCHRONIZING...</div>;

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 text-slate-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="text-emerald-500" />
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Control Center</h1>
        </div>
        <button onClick={() => supabase.auth.signOut().then(() => window.location.href="/")} className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-xl hover:bg-red-950 transition">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={add} className="bg-slate-900 p-8 rounded-4xl border border-slate-800 h-fit space-y-4 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Plus size={18} className="text-emerald-500" /> NEW ENTRY</h2>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Project Title" className="w-full bg-slate-950 p-4 rounded-xl outline-none focus:ring-1 ring-emerald-500" required />
          <textarea value={descVi} onChange={e => setDescVi(e.target.value)} placeholder="Description (VI)" className="w-full bg-slate-950 p-4 rounded-xl outline-none focus:ring-1 ring-emerald-500 h-32" required />
          <input value={techs} onChange={e => setTechs(e.target.value)} placeholder="Tech (React, C++, ...)" className="w-full bg-slate-950 p-4 rounded-xl outline-none focus:ring-1 ring-emerald-500" required />
          <button type="submit" className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-xl hover:bg-emerald-400 transition">SAVE PROJECT</button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 px-2"><Database size={18} className="text-emerald-500" /> REPOSITORY</h2>
          {projects.map(p => (
            <div key={p.id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex justify-between items-start group hover:border-slate-600 transition">
              <div>
                <h3 className="text-white font-bold text-lg">{p.title}</h3>
                <p className="text-slate-500 text-sm mt-1">{p.description_vi}</p>
                <div className="flex gap-2 mt-4">
                  {/* Đã sửa tham số t:any thành t:string */}
                  {p.tech_stack?.map((t: string) => <span key={t} className="text-[10px] bg-slate-800 px-2 py-1 rounded text-emerald-400 font-bold uppercase">{t}</span>)}
                </div>
              </div>
              <button onClick={() => del(p.id)} className="p-2 text-slate-700 hover:text-red-500 transition"><Trash2 size={20} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}