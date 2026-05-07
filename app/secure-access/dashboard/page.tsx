"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Plus, Trash2, LogOut, LayoutDashboard, Database } from "lucide-react";
import Image from "next/image"; // Sửa lỗi: Quan trọng nhất là import dòng này

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Project {
  id: number;
  title: string;
  description_vi: string;
  tech_stack: string[];
  image_url?: string; // Sửa lỗi: Thêm image_url vào interface
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [descVi, setDescVi] = useState("");
  const [techs, setTechs] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Thêm state cho image

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
      title, 
      description_vi: descVi, 
      tech_stack: techs.split(',').map(t => t.trim()).filter(t => t !== ""),
      image_url: imageUrl
    }]);
    
    if (!error) { 
      setTitle(""); setDescVi(""); setTechs(""); setImageUrl(""); 
      fetchAll(); 
    } else {
      alert("Lỗi upload: " + error.message);
      setLoading(false);
    }
  };

  const del = async (id: number) => {
    if(confirm("Xác nhận xóa vĩnh viễn dự án này?")) {
      await supabase.from('projects').delete().eq('id', id);
      fetchAll();
    }
  };

  if (loading && projects.length === 0) return <div className="min-h-screen bg-slate-950 text-emerald-500 flex items-center justify-center font-mono tracking-tighter">SYNCHRONIZING_CORE...</div>;

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 text-slate-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="text-emerald-500" />
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Control Center</h1>
        </div>
        <button onClick={() => supabase.auth.signOut().then(() => window.location.href="/")} className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-xl hover:bg-red-950 transition-all font-bold text-xs uppercase">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={add} className="bg-slate-900 p-8 rounded-4xl border border-slate-800 h-fit space-y-4 shadow-xl">
          <h2 className="text-sm font-black text-white mb-2 flex items-center gap-2 uppercase tracking-widest"><Plus size={18} className="text-emerald-500" /> NEW ENTRY</h2>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Project Title" className="w-full bg-slate-950 p-4 rounded-xl outline-none focus:ring-1 ring-emerald-500 text-sm" required />
          <textarea value={descVi} onChange={e => setDescVi(e.target.value)} placeholder="Description (VI)" className="w-full bg-slate-950 p-4 rounded-xl outline-none focus:ring-1 ring-emerald-500 h-32 text-sm" required />
          <input value={techs} onChange={e => setTechs(e.target.value)} placeholder="Tech (React, Next.js,...)" className="w-full bg-slate-950 p-4 rounded-xl outline-none focus:ring-1 ring-emerald-500 text-sm" required />
          <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL from Storage" className="w-full bg-slate-950 p-4 rounded-xl outline-none focus:ring-1 ring-emerald-500 text-sm" required />
          <button type="submit" className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-xl hover:bg-emerald-400 transition-all active:scale-95 uppercase text-xs tracking-widest">SAVE PROJECT</button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-black text-white flex items-center gap-2 px-2 uppercase tracking-widest"><Database size={18} className="text-emerald-500" /> REPOSITORY</h2>
          {projects.map(p => (
            <div key={p.id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex justify-between items-center group hover:border-slate-600 transition-all">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-none bg-slate-950">
                   {p.image_url ? <Image src={p.image_url} alt="" fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" /> : <Database className="m-auto text-slate-800" />}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">{p.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-1">{p.description_vi}</p>
                  <div className="flex gap-2 mt-2">
                    {p.tech_stack?.map((t: string) => <span key={t} className="text-[9px] bg-slate-800 px-2 py-0.5 rounded text-emerald-400 font-bold uppercase">{t}</span>)}
                  </div>
                </div>
              </div>
              <button onClick={() => del(p.id)} className="p-2 text-slate-700 hover:text-red-500 transition-all">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}