"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Plus, Trash2, LogOut, LayoutDashboard, Database, Link, Globe, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Project {
  id: number;
  title: string;
  description_vi: string;
  description_en?: string;
  tech_stack: string[];
  image_url?: string;
  link?: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State cho Form - Bổ sung đầy đủ các trường
  const [title, setTitle] = useState("");
  const [descVi, setDescVi] = useState("");
  const [descEn, setDescEn] = useState("");
  const [techs, setTechs] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectLink, setProjectLink] = useState("");

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

    // FIX LỖI VALUE: Xử lý chuỗi thành mảng chuẩn Postgres
    const techArray = techs
      .split(',')
      .map(t => t.trim())
      .filter(t => t !== ""); // Loại bỏ các phần tử rỗng

    const { error } = await supabase.from('projects').insert([{
      title, 
      description_vi: descVi, 
      description_en: descEn,
      tech_stack: techArray, // Gửi mảng đã lọc
      image_url: imageUrl,
      link: projectLink
    }]);
    
    if (!error) { 
      // Reset form
      setTitle(""); setDescVi(""); setDescEn(""); 
      setTechs(""); setImageUrl(""); setProjectLink("");
      fetchAll(); 
    } else {
      alert("Lỗi database: " + error.message);
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
        {/* Form thêm dự án */}
        <form onSubmit={add} className="bg-slate-900 p-8 rounded-4xl border border-slate-800 h-fit space-y-4 shadow-xl">
          <h2 className="text-sm font-black text-white mb-2 flex items-center gap-2 uppercase tracking-widest"><Plus size={18} className="text-emerald-500" /> NEW ENTRY</h2>
          
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Tên dự án (Ví dụ: NutriPlan)" className="w-full bg-slate-950 p-4 rounded-xl outline-none focus:ring-1 ring-emerald-500 text-sm" required />
          
          <textarea value={descVi} onChange={e => setDescVi(e.target.value)} placeholder="Mô tả Tiếng Việt" className="w-full bg-slate-950 p-4 rounded-xl outline-none focus:ring-1 ring-emerald-500 h-24 text-sm resize-none" required />
          
          <textarea value={descEn} onChange={e => setDescEn(e.target.value)} placeholder="Mô tả Tiếng Anh (Tùy chọn)" className="w-full bg-slate-950 p-4 rounded-xl outline-none focus:ring-1 ring-emerald-500 h-24 text-sm resize-none" />

          <div className="relative">
            <Globe className="absolute left-4 top-4 text-slate-600" size={16} />
            <input value={techs} onChange={e => setTechs(e.target.value)} placeholder="React, Tailwind, AI..." className="w-full bg-slate-950 p-4 pl-12 rounded-xl outline-none focus:ring-1 ring-emerald-500 text-sm" required />
          </div>

          <div className="relative">
            <ImageIcon className="absolute left-4 top-4 text-slate-600" size={16} />
            <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Link ảnh từ Storage" className="w-full bg-slate-950 p-4 pl-12 rounded-xl outline-none focus:ring-1 ring-emerald-500 text-sm" required />
          </div>

          <div className="relative">
            <Link className="absolute left-4 top-4 text-slate-600" size={16} />
            <input value={projectLink} onChange={e => setProjectLink(e.target.value)} placeholder="Link GitHub / Demo" className="w-full bg-slate-950 p-4 pl-12 rounded-xl outline-none focus:ring-1 ring-emerald-500 text-sm" />
          </div>

          <button type="submit" className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-xl hover:bg-emerald-400 transition-all active:scale-95 uppercase text-[10px] tracking-widest">
            SAVE PROJECT
          </button>
        </form>

        {/* Danh sách dự án hiện có */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-black text-white flex items-center gap-2 px-2 uppercase tracking-widest"><Database size={18} className="text-emerald-500" /> REPOSITORY ({projects.length})</h2>
          {projects.map(p => (
            <div key={p.id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex justify-between items-center group hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-none bg-slate-950 border border-slate-800">
                   {p.image_url ? <Image src={p.image_url} alt="" fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" /> : <Database className="m-auto text-slate-800" />}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">{p.title}</h3>
                  <p className="text-slate-500 text-[11px] mt-1 line-clamp-1 max-w-md">{p.description_vi}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {p.tech_stack?.map((t: string) => <span key={t} className="text-[9px] bg-slate-800 px-2 py-0.5 rounded text-emerald-400 font-bold uppercase tracking-tighter">{t}</span>)}
                  </div>
                </div>
              </div>
              <button onClick={() => del(p.id)} className="p-3 text-slate-700 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}