"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { Sun, Moon, Terminal, ExternalLink, Network, Code2, Rocket, Globe2, Cpu, BrainCircuit, Mail, FileText, MapPin, Briefcase, GraduationCap, Send, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { sendEmail } from "./actions/email";

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
  const [isSending, setIsSending] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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

  // Cấu trúc nội dung (Đã đồng bộ hóa tất cả các Key để fix lỗi TypeScript)
  const content = {
    vi: {
      nav: ["Giới thiệu", "Kỹ năng", "Dự án", "Liên hệ"],
      role: "Kỹ sư Phần mềm",
      heroTitle: "Architecting Robust Systems.",
      heroSub: "Chuyên gia phát triển phần mềm, tích hợp IoT và trí tuệ nhân tạo.",
      status: "Sẵn sàng làm việc",
      techTitle: "Hệ sinh thái công nghệ",
      projectTitle: "Sản phẩm tâm huyết",
      contactTitle: "Kết nối kỹ thuật",
      formName: "Họ tên",        // Fixed: Added missing key
      formMsg: "Tin nhắn...",    // Fixed: Added missing key
      sendBtn: "Gửi ngay"        // Fixed: Added missing key
    },
    en: {
      nav: ["About", "Skills", "Projects", "Contact"],
      role: "Software Engineer",
      heroTitle: "Architecting Robust Systems.",
      heroSub: "Expert in software development, IoT integration, and AI systems.",
      status: "Available for Work",
      techTitle: "Tech Arsenal",
      projectTitle: "Featured Projects",
      contactTitle: "Technical Contact",
      formName: "Your Name",
      formMsg: "Message...",
      sendBtn: "Send Now"
    }
  };

  const t = content[lang];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-emerald-500 selection:text-white transition-colors duration-500">
      
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-50" style={{ scaleX }} />

      {/* Header Chuyên nghiệp - Đã sử dụng Globe2 */}
      <header className="fixed top-0 w-full z-40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-emerald-500/20">T</div>
            <span className="font-black tracking-tighter text-xl hidden sm:block">TOMMY.</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
            {t.nav.map((item, index) => (
              <button 
                key={item} 
                onClick={() => scrollTo(['hero', 'skills', 'projects', 'contact'][index])}
                className="px-4 py-2 text-xs font-black uppercase tracking-widest hover:text-emerald-500 transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex gap-2">
            <button onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')} className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl font-bold text-xs border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-all flex items-center gap-2">
              <Globe2 size={14} /> {lang.toUpperCase()}
            </button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:rotate-12 transition-all">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-12 pt-32 pb-20 space-y-24 bg-grid-white">
        
        {/* SECTION 1: HERO */}
        <section id="hero" className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 p-10 rounded-4xl bg-linear-to-br from-emerald-500 to-teal-700 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl border border-emerald-400/20 group"
          >
            <Terminal size={200} className="absolute -bottom-20 -right-20 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            <div className="z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md overflow-hidden border border-white/30 shadow-xl">
                  <Image src="/avatar.png" alt="Tommy" fill className="object-cover" />
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-400/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-300/30">
                  <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span> {t.status}
                </div>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black mb-4 leading-[0.85] tracking-tighter uppercase">{t.heroTitle}</h2>
              <p className="text-emerald-50 text-lg opacity-80 max-w-sm">{t.heroSub}</p>
            </div>
            <button onClick={() => scrollTo('projects')} className="z-10 flex items-center gap-2 font-black uppercase text-xs tracking-widest mt-8 hover:gap-4 transition-all group/btn">
              {lang === 'vi' ? 'Xem dự án' : 'View Work'} <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform"/>
            </button>
          </motion.div>

          <div className="p-8 rounded-4xl bg-slate-900 text-white flex flex-col justify-between border border-slate-800 shadow-xl group overflow-hidden relative">
            <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-5 transition-opacity" />
            <Network size={40} className="text-emerald-500" />
            <div>
              <h3 className="font-black text-xl uppercase tracking-tighter">Networking</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">IPv4/IPv6 • OSI • Subnet</p>
            </div>
          </div>

          <div className="p-8 rounded-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm group">
            <BrainCircuit size={40} className="text-blue-500 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="font-black text-xl uppercase tracking-tighter">AI Logic</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">ML • Algorithms</p>
            </div>
          </div>

          <div className="md:col-span-2 p-8 rounded-4xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center gap-6 shadow-inner">
             <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700"><MapPin className="text-red-500" size={32} /></div>
             <div>
               <h3 className="font-black text-2xl tracking-tighter uppercase leading-none">Can Tho, VN</h3>
               <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">Current Location</p>
             </div>
          </div>
        </section>

        {/* SECTION 2: SKILLS - Đã sử dụng Code2 */}
        <section id="skills" className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <div className="flex items-center gap-2 text-emerald-500">
              <Code2 size={16} />
              <h2 className="text-xs font-black uppercase tracking-[0.3em]">{t.techTitle}</h2>
            </div>
            <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {['C++', 'C#', 'Python', 'Neo4j', 'SQL Server', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Vercel', 'Tailwind', 'IoT'].map((tech, idx) => (
              <motion.div 
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5, borderColor: '#10b981', boxShadow: '0 10px 30px -10px rgba(16,185,129,0.2)' }}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center gap-3 transition-all"
              >
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 font-black text-[10px] tracking-tighter uppercase">{tech.slice(0,2)}</div>
                <span className="font-bold text-sm">{tech}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: PROJECTS */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500">{t.projectTitle}</h2>
            <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                whileHover={{ y: -8 }}
                className="p-10 rounded-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-125 transition-transform duration-700">
                    {idx % 2 === 0 ? <Rocket size={120} /> : <Cpu size={120} />}
                </div>
                <div className="flex justify-between items-start mb-10 z-10">
                  <div className={`p-5 rounded-2xl ${idx % 2 === 0 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'}`}>
                    {idx % 2 === 0 ? <Rocket size={28} /> : <Cpu size={28} />}
                  </div>
                  <div className="flex gap-2">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 group-hover:text-emerald-500 transition-colors"><ExternalLink size={18} /></div>
                  </div>
                </div>
                <h3 className="text-4xl font-black mb-4 tracking-tighter uppercase z-10">{project.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 grow text-lg z-10">
                  {lang === 'vi' ? project.description_vi : (project.description_en || project.description_vi)}
                </p>
                <div className="flex flex-wrap gap-2 z-10">
                  {project.tech_stack?.map((tech: string) => (
                    <span key={tech} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl group-hover:border-emerald-500/30 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CONTACT */}
        <section id="contact" className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 p-10 rounded-4xl bg-slate-900 text-white border border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-blue-500/10 to-transparent"></div>
            <div className="z-10">
              <h2 className="text-5xl font-black tracking-tighter uppercase mb-4 leading-none">Let&apos;s build <br/> something <br/> <span className="text-emerald-500 text-6xl">EPIC.</span></h2>
              <p className="text-slate-400 text-lg max-w-xs">Hợp tác cùng tôi để tạo nên những hệ thống phần mềm đột phá.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-12 z-10">
               <a href="mailto:your-email@gmail.com" className="p-6 bg-slate-800 rounded-3xl border border-slate-700 hover:border-emerald-500 transition-all group flex flex-col justify-between aspect-square">
                  <Mail className="text-emerald-500 group-hover:scale-110 transition-transform" />
                  <span className="font-black text-xs uppercase tracking-widest">Email</span>
               </a>
               <a href="https://linkedin.com/in/tommydoan" target="_blank" className="p-6 bg-slate-800 rounded-3xl border border-slate-700 hover:border-blue-500 transition-all group flex flex-col justify-between aspect-square">
                  <div className="text-blue-500 group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <span className="font-black text-xs uppercase tracking-widest">LinkedIn</span>
               </a>
            </div>
          </div>

          <div className="md:col-span-2 p-10 rounded-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
             <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-500/20"><Mail size={20}/></div>
                <h3 className="font-black text-2xl uppercase tracking-tighter">{t.contactTitle}</h3>
             </div>
             <form action={async (fd) => {
                setIsSending(true);
                const res = await sendEmail(fd);
                setIsSending(false);
                alert(res.success ? "Sent!" : "Failed!");
             }} className="flex flex-col gap-4 grow">
                <div className="grid grid-cols-2 gap-4">
                  <input name="name" placeholder={t.formName} required className="bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl outline-none focus:ring-2 ring-emerald-500/20 text-sm font-bold border border-transparent focus:border-emerald-500 transition-all" />
                  <input name="email" type="email" placeholder="Email" required className="bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl outline-none focus:ring-2 ring-emerald-500/20 text-sm font-bold border border-transparent focus:border-emerald-500 transition-all" />
                </div>
                <textarea name="message" placeholder={t.formMsg} required className="bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl outline-none focus:ring-2 ring-emerald-500/20 text-sm font-bold grow min-h-20 border border-transparent focus:border-emerald-500 transition-all" />
                <button type="submit" disabled={isSending} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black p-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-white transition-all active:scale-95 disabled:opacity-50 uppercase text-xs tracking-[0.2em] shadow-xl">
                  {isSending ? "Processing..." : <><Send size={18}/> {t.sendBtn}</>}
                </button>
             </form>
          </div>
        </section>

        <footer className="pt-20 border-t border-slate-200 dark:border-slate-800 text-center flex flex-col items-center gap-6">
           <div className="flex gap-8">
             <Briefcase size={20} className="text-slate-300 dark:text-slate-700" />
             <GraduationCap size={20} className="text-slate-300 dark:text-slate-700" />
             <FileText size={20} className="text-slate-300 dark:text-slate-700" />
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 opacity-50">
              © 2026 Tommy Doan // Information Technology // Can Tho University
           </p>
        </footer>
      </main>
    </div>
  );
}