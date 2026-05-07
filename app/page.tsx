"use client";
import { motion } from "framer-motion";
import { Sun, Moon, Terminal, ExternalLink, Network, Code2, Rocket, Globe2, Cpu, BrainCircuit, Mail, FileText, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Kết nối Supabase
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
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [projects, setProjects] = useState<Project[]>([]);

  async function fetchProjects() {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    fetchProjects();
  }, []);

  if (!mounted) return null;

  const content = {
    vi: {
      role: "Kỹ sư Phần mềm",
      heroTitle: "Architecting Robust Systems.",
      heroSub: "Chuyên gia phát triển phần mềm, tích hợp IoT và trí tuệ nhân tạo.",
      techTitle: "Vũ khí công nghệ",
      networkTitle: "Mạng máy tính",
      networkSub: "IPv4/IPv6, Subnetting, OSI",
      projectTitle: "Dự án tiêu biểu",
      contact: "Liên hệ",
      location: "Cần Thơ, Việt Nam",
      status: "Sẵn sàng làm việc",
      exp: "Kinh nghiệm",
      edu: "Học vấn",
      letsTalk: "Hãy kết nối"
    },
    en: {
      role: "Software Engineer",
      heroTitle: "Architecting Robust Systems.",
      heroSub: "Expert in software development, IoT integration, and AI systems.",
      techTitle: "Tech Arsenal",
      networkTitle: "Networking",
      networkSub: "IPv4/IPv6, Subnetting, OSI",
      projectTitle: "Featured Projects",
      contact: "Contact",
      location: "Can Tho, Vietnam",
      status: "Available for Work",
      exp: "Experience",
      edu: "Education",
      letsTalk: "Let&apos;s talk"
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 p-4 md:p-12 max-w-7xl mx-auto bg-grid-white selection:bg-emerald-500 selection:text-white">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-10 px-2">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <h1 className="text-3xl font-black tracking-tighter">TOMMY DOAN.</h1>
          <p className="text-emerald-500 font-bold uppercase text-xs tracking-widest">{t.role}</p>
        </motion.div>
        
        <div className="flex gap-3">
          <button onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')} className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl font-bold flex items-center gap-2 text-sm border border-slate-200 dark:border-slate-800 hover:scale-105 transition-all">
            <Globe2 size={18}/> {lang.toUpperCase()}
          </button>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:rotate-12 transition-all">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
        
        {/* Khối Giới Thiệu */}
        <motion.div 
          whileHover={{ y: -5 }} 
          className="md:col-span-2 md:row-span-2 p-10 rounded-4xl bg-linear-to-br from-emerald-500 to-teal-700 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl border border-emerald-400/20"
        >
           <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
           <Terminal size={180} className="absolute top-10 right-10 opacity-10 rotate-12" />
           
           <div className="flex items-center gap-4 z-10 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-2xl">T</div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-400/30 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-300/30">
                  <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span> {t.status}
                </div>
              </div>
           </div>

           <div className="z-10">
             <h2 className="text-5xl font-black mb-4 leading-tight tracking-tighter">{t.heroTitle}</h2>
             <p className="text-emerald-50 text-lg opacity-90 max-w-md">{t.heroSub}</p>
           </div>
        </motion.div>

        {/* Khối Kỹ Năng */}
        <div className="md:col-span-2 p-8 rounded-4xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-center shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2"><Code2 size={14}/> {t.techTitle}</h3>
          <div className="flex flex-wrap gap-2">
            {['C++', 'C#', 'Python', 'Neo4j', 'SQL Server', 'React', 'TypeScript', 'Node.js', 'Vercel'].map(tech => (
              <span key={tech} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold shadow-xs hover:border-emerald-500 transition-colors cursor-default">{tech}</span>
            ))}
          </div>
        </div>

        {/* Khối Kinh nghiệm */}
        <div className="p-8 rounded-4xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm group">
           <Briefcase className="text-emerald-500 group-hover:scale-110 transition-transform" size={32} />
           <div>
             <h3 className="font-black text-lg">{t.exp}</h3>
             <p className="text-slate-500 text-xs mt-1">Research & Projects</p>
           </div>
        </div>

        {/* Khối Liên hệ */}
        <div className="p-8 rounded-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm group">
           <div className="flex justify-between items-start w-full">
              <Mail className="text-blue-500 group-hover:rotate-12 transition-transform" size={32} />
              <a href="mailto:contact@tommydoan.dev" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full"><ExternalLink size={14}/></a>
           </div>
           <div>
             <h3 className="font-black text-lg">{t.contact}</h3>
             <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase" dangerouslySetInnerHTML={{ __html: t.letsTalk }} />
           </div>
        </div>

        {/* Khối Mạng */}
        <div className="p-8 rounded-4xl bg-slate-900 dark:bg-emerald-950/20 text-white flex flex-col justify-center items-center text-center border border-emerald-500/10 shadow-lg relative overflow-hidden">
           <div className="absolute inset-0 bg-linear-to-b from-emerald-500/10 to-transparent opacity-50"></div>
           <Network size={40} className="text-emerald-500 mb-4 z-10" />
           <h3 className="font-black text-xl z-10">{t.networkTitle}</h3>
           <p className="text-slate-400 text-[10px] mt-2 uppercase tracking-widest z-10">{t.networkSub}</p>
        </div>

        {/* Khối Học vấn */}
        <div className="p-8 rounded-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm group">
           <GraduationCap className="text-purple-500 group-hover:scale-110 transition-transform" size={32} />
           <div>
             <h3 className="font-black text-lg">{t.edu}</h3>
             <p className="text-slate-500 text-xs mt-1 truncate">Computer Science</p>
           </div>
        </div>

        {/* Khối AI/Logic */}
        <div className="p-8 rounded-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center text-center shadow-sm">
           <BrainCircuit size={40} className="text-blue-500 mb-4" />
           <h3 className="font-black text-xl">AI Logic</h3>
           <p className="text-slate-500 text-[10px] mt-2 uppercase tracking-widest">Algorithms & Models</p>
        </div>

        {/* Khối LinkedIn */}
        <div className="p-8 rounded-4xl bg-slate-900 text-white flex flex-col justify-between border border-slate-800 shadow-xl group cursor-pointer">
           <div className="flex justify-between items-start">
              <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <FileText size={20} className="text-slate-500 group-hover:text-white transition-colors" />
           </div>
           <div>
             <h3 className="font-black text-lg leading-tight tracking-tight">LinkedIn <br/> & Resume</h3>
           </div>
        </div>

        {/* Dự án động (Đã tích hợp Cpu icon vào logic) */}
        {projects.map((project, idx) => (
          <motion.div 
            key={project.id} 
            whileHover={{ y: -5 }} 
            className="md:col-span-2 md:row-span-2 p-10 rounded-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between group transition-all"
          >
            <div className="flex justify-between items-start">
              <div className={`p-5 rounded-2xl ${idx % 2 === 0 ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>
                {/* Logic thay đổi icon linh hoạt */}
                {idx % 2 === 0 ? <Rocket size={28} /> : <Cpu size={28} />}
              </div>
              <div className="flex gap-2">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-emerald-500 transition-colors"><ExternalLink size={18} /></div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black mt-8 mb-4 tracking-tighter uppercase">{project.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 grow text-lg">
                {lang === 'vi' ? project.description_vi : (project.description_en || project.description_vi)}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack?.map((tech: string) => (
                  <span key={tech} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xs group-hover:border-emerald-500/50 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Địa điểm */}
        <div className="md:col-span-2 p-8 rounded-4xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
           <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xs"><MapPin className="text-red-500" size={24} /></div>
           <p className="font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest text-xs">{t.location}</p>
        </div>

      </div>
      
      {/* Footer */}
      <footer className="mt-16 text-center text-slate-400 text-[10px] uppercase tracking-widest font-bold opacity-50">
         Built with Next.js 15 & Tailwind v4 // Designed by Tommy Doan 2026
      </footer>
    </div>
  );
}