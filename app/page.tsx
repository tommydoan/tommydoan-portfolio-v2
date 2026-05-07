"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Sun, Moon, Terminal, ExternalLink, Network, Code2, Rocket, Globe2, Cpu, 
  BrainCircuit, Mail, FileText, MapPin, GraduationCap, Send, 
  ChevronRight, ChevronsLeft, ChevronsRight, Phone, Laptop, PenTool, Layers,
  Activity, Palette, Heart, Database, Music, Image as ImageIcon, Mic, Dumbbell, BookOpen
} from "lucide-react";
import { useTheme } from "next-themes";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
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
  image_url?: string;
  link?: string;
}

interface HobbyItem {
  name: string;
  icon: React.ReactNode;
}

interface HobbiesLocaleData {
  tabs: Record<'sports' | 'entertainment' | 'intellectual', string>;
  header: { lifestyle: string; title: string; desc: string };
  items: Record<'sports' | 'entertainment' | 'intellectual', HobbyItem[]>;
  cards: Record<'sports' | 'entertainment' | 'intellectual', { title: string; desc: string; icon: React.ReactNode }>;
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [activeSection, setActiveSection] = useState("hero");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const fetchProjects = useCallback(async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      fetchProjects();
    });

    const handleScroll = () => {
      const sections = ["hero", "skills", "projects", "hobbies", "contact"];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= -250 && rect.top <= 250;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchProjects]);

  if (!mounted) return null;

  const hobbiesData: Record<'vi' | 'en', HobbiesLocaleData> = {
    vi: {
      tabs: { sports: "Vận động", entertainment: "Giải trí", intellectual: "Tư duy" },
      header: { lifestyle: "LỐI SỐNG", title: "Khám phá thế giới đa màu sắc", desc: "Mỗi sở thích là một mảnh ghép quan trọng tạo nên sự sáng tạo." },
      items: {
        sports: [
          { name: "Cầu lông", icon: <Activity size={12} className="text-emerald-500"/> },
          { name: "Gym", icon: <Dumbbell size={12} className="text-emerald-500"/> },
          { name: "Boxing", icon: <Activity size={12} className="text-emerald-500"/> },
          { name: "Đá bóng", icon: <Activity size={12} className="text-emerald-500"/> },
        ],
        entertainment: [
          { name: "Nghe nhạc", icon: <Music size={12} className="text-blue-500"/> },
          { name: "Xem hoạt hình", icon: <ImageIcon size={12} className="text-blue-500"/> },
          { name: "Ca hát", icon: <Mic size={12} className="text-blue-500"/> },
        ],
        intellectual: [
          { name: "Đọc sách", icon: <BookOpen size={12} className="text-purple-500"/> },
          { name: "Giải đố", icon: <BrainCircuit size={12} className="text-purple-500"/> },
          { name: "Phần cứng", icon: <Cpu size={12} className="text-purple-500"/> },
        ],
      },
      cards: {
        sports: { title: "THỂ THAO & VẬN ĐỘNG", desc: "Nâng cao sức khỏe và sự dẻo dai.", icon: <Dumbbell size={32} className="text-emerald-500"/> },
        entertainment: { title: "GIẢI TRÍ & NGHỆ THUẬT", desc: "Thư giãn và nuôi dưỡng tâm hồn.", icon: <Palette size={32} className="text-blue-500"/> },
        intellectual: { title: "TƯ DUY & CÔNG NGHỆ", desc: "Học hỏi và khám phá kiến thức.", icon: <BrainCircuit size={32} className="text-purple-500"/> },
      }
    },
    en: {
      tabs: { sports: "Active", entertainment: "Arts", intellectual: "Puzzles" },
      header: { lifestyle: "LIFESTYLE", title: "Discover a multi-colored world", desc: "Each hobby is an essential puzzle piece that forms creativity." },
      items: {
        sports: [
          { name: "Badminton", icon: <Activity size={12} className="text-emerald-500"/> },
          { name: "Fitness", icon: <Dumbbell size={12} className="text-emerald-500"/> },
          { name: "Boxing", icon: <Activity size={12} className="text-emerald-500"/> },
          { name: "Football", icon: <Activity size={12} className="text-emerald-500"/> },
        ],
        entertainment: [
          { name: "Music", icon: <Music size={12} className="text-blue-500"/> },
          { name: "Animation", icon: <ImageIcon size={12} className="text-blue-500"/> },
          { name: "Singing", icon: <Mic size={12} className="text-blue-500"/> },
        ],
        intellectual: [
          { name: "Reading", icon: <BookOpen size={12} className="text-purple-500"/> },
          { name: "Puzzles", icon: <BrainCircuit size={12} className="text-purple-500"/> },
          { name: "Hardware", icon: <Cpu size={12} className="text-purple-500"/> },
        ],
      },
      cards: {
        sports: { title: "SPORTS & ACTIVE", desc: "Boosting health and stamina.", icon: <Dumbbell size={32} className="text-emerald-500"/> },
        entertainment: { title: "ARTS & ENTERTAINMENT", desc: "Relaxing and feeding the soul.", icon: <Palette size={32} className="text-blue-500"/> },
        intellectual: { title: "INTELLECT & TECH", desc: "Learning and exploring knowledge.", icon: <BrainCircuit size={32} className="text-purple-500"/> },
      }
    }
  };

  const content = {
    vi: {
      name: "ĐOÀN CÔNG MINH", heroTitle: "lập trình viên và kĩ sư phần mềm.",
      heroSub: "Kiến tạo những giải pháp bền vững, xử lý luồng dữ liệu ổn định và tối ưu hóa hệ thống.",
      heroLongSub: "Tôi là một người đam mê công nghệ, luôn tìm tòi học hỏi và không ngại thử thách.Hơn 2 năm kinh nghiệm làm việc với các hệ thống phức tạp, từ frontend React/Next.js đến backend .NET/Python. Tôi đam mê giải quyết các vấn đề kỹ thuật hóc búa, tối ưu hóa hiệu suất và xây dựng kiến trúc phần mềm mở rộng được.",
      status: "SẴN SÀNG LÀM VIỆC", nav: ["Giới thiệu", "Kỹ năng", "Dự án", "Sở thích", "Liên hệ"],
      items: {
        net: { top: "NETWORKING", mid: "MẠNG MÁY TÍNH", bot: "IPV4 / IPV6 • OSI • SUBNET" },
        ai: { top: "AI LOGIC", mid: "LOGIC AI", bot: "ML • DL • THUẬT TOÁN" },
        cert: { top: "CREDENTIALS", mid: "CHỨNG CHỈ", bot: "TIẾNG ANH B1 (CEFR)" },
        design: { top: "DESIGN", mid: "THIẾT KẾ ĐỒ HỌA", bot: "UI/UX • FIGMA" },
        major: { top: "MAJOR", mid: "CHUYÊN NGÀNH", bot: "KỸ SƯ CNTT (NCTU)" },
        loc: { top: "LOCATION", mid: "ĐỊA ĐIỂM", bot: "CẦN THƠ, VIỆT NAM" }
      },
      skillsTitle: "Hệ sinh thái công nghệ", projectsTitle: "Sản phẩm tâm huyết",
      hobbiesTitle: "Sở thích cá nhân", contactTitle: "Liên hệ",
      phone: "0917.847.649", formName: "Họ tên", formMsg: "Tin nhắn...", sendBtn: "Gửi ngay"
    },
    en: {
      name: "TOMMY DOAN", heroTitle: "programmer and software engineer.",
      heroSub: "Architecting robust solutions, ensuring stable data flow and system optimization.",
      heroLongSub: "I am a tech enthusiast, always curious and thriving on challenges. Over 2 years of experience working with complex systems, from React/Next.js frontends to .NET/Python backends. I am passionate about solving tough technical problems, optimizing performance, and building scalable software architectures.",
      status: "AVAILABLE FOR WORK", nav: ["About", "Skills", "Projects", "Hobbies", "Contact"],
      phone: "+84 917 847 649",
      items: {
        net: { top: "NETWORKING", mid: "NETWORKING", bot: "IPV4 / IPV6 • OSI • SUBNET" },
        ai: { top: "AI LOGIC", mid: "AI LOGIC", bot: "ML • DL • ALGORITHMS" },
        cert: { top: "CREDENTIALS", mid: "CERTIFICATIONS", bot: "ENGLISH B1 (CEFR)" },
        design: { top: "DESIGN", mid: "GRAPHIC DESIGN", bot: "UI/UX • FIGMA" },
        major: { top: "MAJOR", mid: "MAJOR", bot: "IT ENGINEER (NCTU)" },
        loc: { top: "LOCATION", mid: "LOCATION", bot: "CAN THO, VIETNAM" }
      },
      skillsTitle: "Tech Arsenal", projectsTitle: "Featured Projects",
      hobbiesTitle: "Personal Hobbies", contactTitle: "Contact",
      formName: "Full Name", formMsg: "Message...", sendBtn: "Send Now"
    }
  };

  const t = content[lang];
  const h = hobbiesData[lang];
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('hero')}>
            <span className="font-black text-xl tracking-tighter uppercase dark:text-white text-slate-900 group-hover:text-emerald-500 transition-colors">{t.name}</span>
          </div>

          <nav className="hidden md:flex items-center bg-slate-100 dark:bg-slate-900 rounded-full p-1 relative border border-slate-200 dark:border-slate-800 shadow-inner">
            {["hero", "skills", "projects", "hobbies", "contact"].map((id, idx) => (
              <button key={id} onClick={() => scrollTo(id)} className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest relative z-10 transition-colors duration-300 ${activeSection === id ? 'text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>{t.nav[idx]}</button>
            ))}
            <AnimatePresence>
              <motion.div 
                layoutId="nav-pill" 
                className="absolute h-[80%] bg-emerald-500 rounded-full z-0 shadow-[0_0_15px_#10b981]" 
                initial={false} 
                animate={{ x: ["hero", "skills", "projects", "hobbies", "contact"].indexOf(activeSection) * 100 + "%", width: "20%" }} 
                transition={{ type: "spring", stiffness: 350, damping: 30 }} 
                style={{ left: 0 }} 
              />
            </AnimatePresence>
          </nav>

          <div className="flex gap-2">
            <button onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')} className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl font-bold text-xs flex items-center gap-2 border border-slate-200 dark:border-slate-800 uppercase hover:border-emerald-500 transition-all active:scale-95"><Globe2 size={14} className="text-emerald-500" /> {lang}</button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:rotate-12 transition-all active:scale-95">{theme === 'dark' ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-blue-500" />}</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 space-y-24 selection:bg-emerald-300">
        
        {/* HERO SECTION - TINH CHỈNH GỌN GÀNG, DỄ NHÌN */}
        <section id="hero" className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="md:col-span-2 bg-linear-to-br from-emerald-500 to-teal-700 rounded-4xl p-8 md:p-10 lg:p-12 text-white relative overflow-hidden shadow-2xl group border border-emerald-400/20">
             <Terminal size={250} className="absolute -bottom-10 -right-10 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
             <div className="z-10 relative flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-10 text-center lg:text-left">
                <div className="space-y-5 md:space-y-6 flex-1 w-full">
                   <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/20 backdrop-blur-md rounded-full text-[9px] md:text-[10px] font-bold border border-white/30 uppercase tracking-widest shadow-inner mx-auto lg:mx-0 w-fit">
                      <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-300 rounded-full animate-pulse" /> {t.status}
                   </div>
                   {/* Đã giảm size tiêu đề và kéo dãn khoảng cách dòng */}
                   <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black uppercase leading-[1.1] tracking-tighter drop-shadow-xl">{t.heroTitle}</h1>
                   <div className="space-y-2 md:space-y-3">
                     <p className="text-emerald-50 text-sm md:text-base lg:text-lg max-w-md italic opacity-90 leading-relaxed mx-auto lg:mx-0">&ldquo;{t.heroSub}&rdquo;</p>
                     <p className="text-emerald-100 text-xs md:text-sm max-w-lg leading-relaxed mx-auto lg:mx-0 opacity-80">{t.heroLongSub}</p>
                   </div>
                   <button onClick={() => scrollTo('projects')} className="bg-white/10 hover:bg-white/20 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl border border-white/20 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center gap-2 md:gap-3 group/btn transition-all mx-auto lg:mx-0 shadow-xl active:scale-95 w-fit">
                      KHÁM PHÁ DỰ ÁN <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform"/>
                   </button>
                </div>
                {/* Giảm nhẹ size Avatar */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-64 lg:h-64 flex-none avatar-glow rounded-full border-[3px] md:border-4 border-white/30 p-1.5 md:p-2 backdrop-blur-sm cursor-pointer" onClick={() => window.open("https://www.instagram.com/hnim_712", "_blank")}>
                   <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/50 relative shadow-2xl"><Image src="/avatar.png" alt="Minh" fill className="object-cover group-hover:scale-110 transition-transform duration-700" priority sizes="(max-w: 768px) 176px, 256px" /></div>
                </div>
             </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="grid grid-cols-1 gap-4 md:gap-6">
             <TechInfoCard icon={<Network size={28}/>} data={t.items.net} />
             <TechInfoCard icon={<BrainCircuit size={28}/>} data={t.items.ai} />
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
             <TechInfoCard icon={<FileText size={24}/>} data={t.items.cert} />
             <TechInfoCard icon={<PenTool size={24}/>} data={t.items.design} />
             <TechInfoCard icon={<GraduationCap size={24}/>} data={t.items.major} />
             <TechInfoCard icon={<MapPin size={24}/>} data={t.items.loc} />
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="space-y-12 border-t border-slate-200 dark:border-slate-800 pt-16">
          <div className="flex items-center gap-4 px-2">
            <Layers size={20} className="text-emerald-500" />
            <h2 className="text-xs font-black uppercase tracking-[0.4em] dark:text-white text-slate-900">{t.skillsTitle}</h2>
            <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CategoryCard title="Frontend" icon={<Laptop/>} skills={['React', 'Next.js', 'Tailwind', 'Motion', 'Typescript']} color="emerald" />
            <CategoryCard title="Backend" icon={<Database/>} skills={['C#', 'SQL Server', 'Python', 'Neo4j', 'Node.js']} color="blue" />
            <CategoryCard title="Specialized" icon={<Cpu/>} skills={['IoT', 'C++', 'ESP32', 'Networking', 'AI Logic']} color="purple" />
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="space-y-12 border-t border-slate-200 dark:border-slate-800 pt-16">
           <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-4 grow">
                <Rocket size={24} className="text-blue-500" />
                <h2 className="text-xs font-black uppercase tracking-[0.4em] dark:text-white text-slate-900">{t.projectsTitle}</h2>
                <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
              </div>
              <div className="flex gap-2 ml-6">
                <button onClick={() => swiperInstance?.slidePrev()} className="p-3 bg-white dark:bg-slate-900 rounded-xl md:rounded-2xl hover:bg-emerald-500 hover:text-white transition-all border border-slate-200 dark:border-slate-800 shadow-sm active:scale-95"><ChevronsLeft size={20}/></button>
                <button onClick={() => swiperInstance?.slideNext()} className="p-3 bg-white dark:bg-slate-900 rounded-xl md:rounded-2xl hover:bg-emerald-500 hover:text-white transition-all border border-slate-200 dark:border-slate-800 shadow-sm active:scale-95"><ChevronsRight size={20}/></button>
              </div>
           </div>
           <Swiper modules={[Navigation, Autoplay]} onSwiper={setSwiperInstance} spaceBetween={24} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 } }} className="w-full">
            {projects.map((p, idx) => (
              <SwiperSlide key={p.id}>
                <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-800 overflow-hidden group shadow-lg hover:shadow-2xl relative border-b-4 border-b-transparent hover:border-b-emerald-500 transition-all duration-500 h-128 flex flex-col active:border-emerald-500">
                   <div className="relative h-60 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex-none active:scale-105 transition-transform duration-700">
                      {p.image_url ? (
                        <Image src={p.image_url} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" sizes="(max-w: 768px) 100vw, 50vw" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-300 dark:text-slate-700 bg-grid-tech"><Rocket size={70} className="opacity-20"/></div>
                      )}
                      <a href={p.link || "#"} target="_blank" className="absolute top-5 right-5 p-4 bg-white/90 dark:bg-slate-950/90 rounded-2xl text-emerald-500 shadow-2xl opacity-0 group-hover:opacity-100 transition-all active:scale-90 border border-white/20"><ExternalLink size={24} /></a>
                   </div>
                   <div className="p-8 flex flex-col flex-1">
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full w-fit">Project #0{idx+1}</span>
                      <h3 className="text-2xl font-black mt-4 mb-2 tracking-tighter uppercase dark:text-white text-slate-900 leading-tight line-clamp-2">{p.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 italic mb-4">{lang === 'vi' ? p.description_vi : (p.description_en || p.description_vi)}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {p.tech_stack?.map((tech) => <span key={tech} className="text-[9px] font-black uppercase px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 shadow-sm active:bg-emerald-500 active:text-white">{tech}</span>)}
                      </div>
                   </div>
                </div>
              </SwiperSlide>
            ))}
           </Swiper>
        </motion.section>

        {/* COMPONENT SỞ THÍCH CÁ NHÂN */}
        <HobbiesSection fadeInUp={fadeInUp} h={h} lang={lang} />

        {/* CONTACT SECTION */}
        <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="space-y-8 md:space-y-12 border-t border-slate-200 dark:border-slate-800 pt-12 md:pt-16 pb-10">
           <div className="flex items-center gap-4 px-2">
            <Mail size={24} className="text-blue-500" />
            <h2 className="text-xs font-black uppercase tracking-[0.4em] dark:text-white text-slate-900">{t.contactTitle}</h2>
            <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
          </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-slate-950 rounded-4xl p-10 md:p-16 text-white relative overflow-hidden shadow-2xl group border border-slate-800">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />
              <div className="z-10 space-y-12">
                 <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none text-center lg:text-left">Let&apos;s build <br/> something <span className="text-emerald-500 block mt-4 shadow-emerald-500/20 shadow-xl w-fit mx-auto lg:mx-0">EPIC.</span></h2>
                 <div className="space-y-6 flex flex-col items-center lg:items-start">
                    <ContactItem icon={<Mail size={20}/>} label="Email" val="dntommy12@gmail.com" link="mailto:dntommy12@gmail.com" />
                    <ContactItem icon={<Phone size={20}/>} label="Phone" val={t.phone} link={`tel:${t.phone.replace(/\./g, '')}`} />
                    <ContactItem icon={<Globe2 size={20}/>} label="LinkedIn" val="Cong Minh Doan" link="https://linkedin.com/in/cong-minh-doan-176a9a408/" />
                 </div>
              </div>
              <form action={async (formData) => {
                  setIsSending(true);
                  try {
                    const res = await sendEmail(formData);
                    alert(res.success ? "Tin nhắn đã gửi thành công!" : "Thất bại!");
                  } finally {
                    setIsSending(false);
                  }
              }} className="z-10 bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 space-y-5 shadow-2xl flex flex-col items-center">
                 <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-emerald-500 w-full text-center">{lang === 'vi' ? 'Gửi tin nhắn' : 'Direct Message'}</h3>
                 <input name="name" placeholder={t.formName} required className="w-full bg-black/30 p-5 rounded-2xl outline-none focus:ring-1 ring-emerald-500/50 border border-white/5 text-sm font-bold transition-all shadow-inner dark:text-white" />
                 <input name="email" type="email" placeholder="Email" required className="w-full bg-black/30 p-5 rounded-2xl outline-none focus:ring-1 ring-emerald-500/50 border border-white/5 text-sm font-bold transition-all shadow-inner dark:text-white" />
                 <textarea name="message" placeholder={t.formMsg} required className="w-full bg-black/30 p-5 rounded-2xl h-40 outline-none focus:ring-1 ring-emerald-500/50 border border-white/5 text-sm font-bold transition-all shadow-inner dark:text-white resize-none" />
                 <button disabled={isSending} type="submit" className="w-full bg-emerald-500 font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-emerald-600 transition-all flex justify-center gap-3 shadow-xl shadow-emerald-500/20 active:scale-95 disabled:opacity-50">
                    {isSending ? "SYNCING..." : <>SEND MESSAGE <Send size={20}/></>}
                 </button>
              </form>
           </div>
        </motion.section>
      </main>

      <footer className="text-center pb-12 md:pb-20 border-t border-slate-200 dark:border-slate-900 pt-10 md:pt-16 flex flex-col items-center gap-4 md:gap-6 selection:bg-emerald-300">
         <div className="flex gap-6 md:gap-8 opacity-20 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"><Code2 size={20} className="md:w-6 md:h-6" /> <Database size={20} className="md:w-6 md:h-6" /> <Cpu size={20} className="md:w-6 md:h-6" /> <PenTool size={20} className="md:w-6 md:h-6" /></div>
         <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-slate-400 dark:text-slate-500">© 2026 {t.name} | INFORMATION TECHNOLOGY | NCTU</p>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function TechInfoCard({ icon, data }: { icon: React.ReactNode, data: { top: string, mid: string, bot: string } }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-center gap-3 md:gap-4 relative overflow-hidden group shadow-sm hover:shadow-md border-b-[3px] md:border-b-4 border-b-emerald-500 h-full transition-all duration-300 items-center text-center">
      <div className="text-emerald-500 group-hover:scale-110 transition-transform duration-300 w-fit p-2.5 md:p-3 bg-emerald-500/5 rounded-xl md:rounded-2xl border border-emerald-500/10 flex items-center justify-center shadow-inner">{icon}</div>
      <div className="w-full flex-col flex items-center justify-center z-10">
         <h4 className="font-black text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] md:tracking-[0.2em] mb-1">{data.top}</h4>
         <p className="font-black text-xl md:text-2xl tracking-tighter uppercase dark:text-white text-slate-900 leading-none my-1 md:my-1.5 group-hover:text-emerald-500 transition-colors">{data.mid}</p>
         <p className="text-[9px] md:text-[10px] font-bold text-slate-400 dark:text-slate-500 italic uppercase tracking-wider md:tracking-widest">{data.bot}</p>
      </div>
      <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-10 transition-opacity rotate-12 scale-150">{icon}</div>
    </motion.div>
  );
}

function CategoryCard({ title, icon, skills, color }: { title: string, icon: React.ReactNode, skills: string[], color: "emerald" | "blue" | "purple" }) {
  const colors = {
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20 hover:border-blue-500",
    purple: "text-purple-500 bg-purple-500/10 border-purple-500/20 hover:border-purple-500"
  };
  return (
    <div className={`p-8 md:p-10 rounded-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl group transition-all duration-500 border-b-4 ${colors[color].split(' ').slice(2).join(' ')}`}>
      <div className={`p-4 w-fit rounded-2xl mb-8 shadow-sm border ${colors[color].split(' ').slice(0, 3).join(' ')}`}>{icon}</div>
      <h3 className="font-black text-3xl mb-6 uppercase tracking-tighter dark:text-white text-slate-900 leading-none">{title}</h3>
      <div className="flex flex-wrap gap-2 md:gap-2.5">
        {skills.map(s => <span key={s} className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 shadow-sm hover:scale-105 transition-transform cursor-default active:bg-emerald-500 active:text-white">{s}</span>)}
      </div>
    </div>
  );
}

const ContactCard = ({ icon, label, val }: { icon: React.ReactNode, label: string, val: string }) => (
  <div className="flex items-center gap-4 md:gap-5 cursor-pointer text-center">
    <div className="p-3 md:p-4 bg-slate-900 rounded-xl md:rounded-2xl text-emerald-500 border border-white/10 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xl flex items-center justify-center">{icon}</div>
    <div className="w-full flex-col flex items-start lg:items-center justify-center">
      <p className="text-[9px] md:text-[10px] font-black opacity-40 uppercase tracking-widest mb-0.5 md:mb-1 leading-none text-slate-300">{label}</p>
      <p className="font-bold text-base md:text-lg text-slate-100 group-hover:text-emerald-400 transition-colors leading-none truncate">{val}</p>
    </div>
  </div>
);

function ContactItem({ icon, label, val, link }: { icon: React.ReactNode, label: string, val: string, link: string }) {
  if (link) return <a href={link} target="_blank" className="group block w-fit mx-auto lg:mx-0 active:scale-95"><ContactCard icon={icon} label={label} val={val}/></a>;
  return <div className="group block w-fit mx-auto lg:mx-0"><ContactCard icon={icon} label={label} val={val}/></div>;
}

function HobbiesSection({ fadeInUp, h, lang }: { fadeInUp: Variants, h: HobbiesLocaleData, lang: string }) {
  const [activeTab, setActiveTab] = useState<'sports' | 'entertainment' | 'intellectual'>('sports');
  const currentTabItems = h.items[activeTab];
  const currentTabCard = h.cards[activeTab];

  return (
    <motion.section id="hobbies" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="space-y-8 md:space-y-10 border-t border-slate-200 dark:border-slate-800 pt-12 md:pt-16">
      <div className="flex items-center gap-3 md:gap-4 px-2">
        <Heart size={20} className="text-red-500" />
        <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] dark:text-white text-slate-900">{lang === 'vi' ? 'Sở thích cá nhân' : 'Personal Hobbies'}</h2>
        <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
      </div>
      
      <div className="flex gap-2">
        <div className="p-1.5 bg-slate-100 dark:bg-slate-900 rounded-full flex gap-1 border border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar w-full md:w-fit shadow-inner">
          {(Object.keys(h.tabs) as Array<'sports' | 'entertainment' | 'intellectual'>).map(tabKey => (
            <button key={tabKey} onClick={() => setActiveTab(tabKey)} className={`px-5 md:px-8 py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all whitespace-nowrap active:scale-95 ${activeTab === tabKey ? 'bg-white dark:bg-slate-800 text-emerald-500 shadow-sm border border-emerald-500/20' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
              <span className={`w-2 h-2 rounded-full ${activeTab === tabKey ? 'bg-emerald-500' : 'bg-slate-400'}`}/> {h.tabs[tabKey]}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-4xl p-8 md:p-12 shadow-sm border-b-4 border-b-transparent hover:border-b-emerald-500 transition-all duration-300">
        <div className="space-y-6 flex flex-col items-center justify-center">
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-900 w-fit text-center leading-none shadow-sm">{h.header.lifestyle}</p>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-[1.1] w-full text-center drop-shadow-sm">{h.header.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm italic opacity-90 text-sm md:text-base leading-relaxed">{h.header.desc}</p>
          <div className="pt-4 flex flex-wrap gap-3 items-center justify-center">
            {currentTabItems.map((item, idx) => (
              <span key={idx} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform cursor-default active:border-emerald-500 active:text-emerald-500">
                {item.icon} 
                {item.name}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-950 p-10 md:p-14 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-inner relative group flex flex-col items-center justify-center text-center overflow-hidden h-full">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-200/50 dark:to-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Heart size={200} className="absolute -bottom-10 -right-10 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors duration-700 rotate-12"/>
          
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl mb-8 flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform duration-500 shadow-emerald-500/5">
             {currentTabCard.icon}
          </div>
          
          <h4 className="font-black text-2xl md:text-3xl mb-4 tracking-tighter uppercase text-slate-900 dark:text-white z-10 truncate w-full">{currentTabCard.title}</h4>
          <p className="text-slate-600 dark:text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-300 italic text-sm md:text-base z-10 leading-relaxed max-w-xs">{currentTabCard.desc}</p>
        </div>
      </div>
    </motion.section>
  );
}