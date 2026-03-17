import { Phone, Wind, ShieldCheck, BadgeCheck, Play, Calendar, CheckCircle2, ArrowRight, ArrowLeft, Mail, MapPin, Star, Menu, X, Facebook, Shield, ChevronDown, ChevronUp, Zap, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { siteData } from "./data/siteData";

const Logo = ({ className = "" }: { className?: string }) => {
  const [error, setError] = useState(false);
  
  return (
    <div className={`flex items-center justify-start ${className}`} style={{ minHeight: '40px', minWidth: '100px' }}>
      {!error ? (
        <img 
          src="/trannslogo2.png" 
          alt="Freedom Czyste Wentylacje" 
          className="h-10 md:h-16 w-auto object-contain transition-transform hover:scale-105"
          onError={() => setError(true)}
        />
      ) : (
        <div className="inline-flex flex-col items-center justify-center border-[2px] border-primary rounded-[0.75rem] md:rounded-[1rem] px-3 md:px-5 py-1 md:py-2 skew-x-[-12deg] bg-transparent transition-all hover:scale-105 duration-300">
          <div className="skew-x-[12deg] flex flex-col items-center w-full">
            <span className="text-lg md:text-3xl font-black italic tracking-tighter text-transparent leading-none mb-0.5 md:mb-1 select-none font-outfit" style={{ WebkitTextStroke: '1px #e33538' }}>Freedom</span>
            <div className="w-full flex justify-between gap-0.5">
              {"CZYSTE WENTYLACJE".split("").map((char, i) => (
                <span key={i} className="text-[5px] md:text-[8px] font-black text-primary uppercase">{char === " " ? "\u00A0" : char}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Header = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) => {
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location, setIsOpen]);
  return (
    <>
      <header className="fixed top-0 md:top-6 left-0 right-0 md:left-1/2 md:-translate-x-1/2 z-[1000] bg-white/95 md:bg-white/80 backdrop-blur-xl border-b md:border border-slate-200/60 h-[72px] md:h-[90px] flex items-center md:w-[95%] max-w-7xl md:rounded-[2.5rem] md:shadow-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          <Link to="/" className="shrink-0 flex items-center">
            <Logo />
          </Link>
          
          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: 'Główna', path: '/' },
              { label: 'Usługi', path: '/uslugi' },
              { label: 'O nas', path: '/o-nas' }
            ].map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-bold tracking-tight transition-all relative py-2
                    ${isActive ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/kontakt" className="hidden md:flex bg-primary hover:bg-black text-white px-7 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Kontakt
            </Link>

            <button 
              type="button"
              onClick={() => setIsOpen(!isOpen)} 
              className="flex md:hidden w-12 h-12 rounded-2xl bg-primary items-center justify-center text-white shadow-xl shadow-primary/30 active:scale-95 transition-transform"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-7 h-7 stroke-[3]" /> : <Menu className="w-7 h-7 stroke-[3]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Overlay correctly outside header tag) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-[72px] left-0 right-0 bottom-0 bg-white z-[9999] overflow-y-auto"
          >
            <div className="flex flex-col p-6 space-y-2">
              {[
                { label: 'Główna', path: '/' },
                { label: 'Usługi', path: '/uslugi' },
                { label: 'O nas', path: '/o-nas' }
              ].map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className={`text-2xl font-black p-4 rounded-2xl transition-colors flex items-center justify-between
                      ${isActive ? 'text-primary bg-primary/5' : 'text-slate-800'}`}
                  >
                    {item.label}
                    <ArrowRight className={`w-6 h-6 ${isActive ? 'opacity-100' : 'opacity-30'}`} />
                  </Link>
                );
              })}
              <div className="h-px bg-slate-100 my-6" />
              <Link to="/kontakt" className="bg-primary text-white text-center py-6 rounded-2xl font-black text-xl shadow-2xl shadow-primary/20 flex items-center justify-center gap-3">
                <Phone className="w-7 h-7" />
                Zarezerwuj wycenę
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => (
  <section className="relative">
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-auto aspect-square md:aspect-auto md:h-[650px] rounded-2xl md:rounded-[3rem] overflow-hidden relative group shadow-2xl border border-white/10 bg-slate-900"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-black/95 via-black/40 to-transparent z-10"></div>
      <img 
        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] opacity-70" 
        src={siteData.home.hero.background} 
        alt="Rotobrush Hero"
      />
      
      {/* Centered Play Button wrapper */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="w-16 h-16 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(227,30,36,0.6)] cursor-pointer border-4 border-white/40 pointer-events-auto"
        >
          <Play className="w-6 h-6 md:w-10 md:h-10 text-white fill-current ml-1" />
        </motion.div>
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center md:items-start justify-center text-center md:text-left px-6 md:px-16 pt-12 pb-12 md:pt-32 md:pb-32 max-w-5xl">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <span className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.4em] px-5 py-2 rounded-full shadow-lg shadow-primary/20">
            Lider Higieny Powietrza
          </span>
        </motion.div>
        
        <h2 className="text-white text-2xl md:text-5xl font-black leading-[1.1] tracking-tighter mb-4 md:mb-6 max-w-3xl">
          {siteData.home.hero.title.split(' ').map((word, i) => (
            <span key={i} className={word === 'Rotobrush' ? 'text-primary italic' : ''}>{word} </span>
          ))}
        </h2>
        
        <p className="hidden md:block text-white/70 text-base md:text-lg max-w-xl font-medium leading-relaxed mb-12">
          {siteData.home.hero.subtitle}
        </p>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-5">
          <Link to="/kontakt" className="bg-primary hover:bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl text-sm md:text-base font-bold transition-all flex items-center gap-3 shadow-xl shadow-primary/30 active:scale-95">
            Zarezerwuj Termin
            <Calendar className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.div>

    {/* Floating Stats Bar - Increased Offset for spacing */}
    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] md:w-[85%] max-w-5xl z-30">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/95 backdrop-blur-3xl p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-2xl border border-white/40">
        {siteData.home.stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center justify-center border-r last:border-0 border-slate-100/30">
            <span className="text-primary text-3xl font-black mb-0.5">{stat.value}</span>
            <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Services = () => {
  const scrollRef = useState<HTMLDivElement | null>(null)[0];
  
  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('services-carousel');
    if (container) {
      const card = container.firstElementChild as HTMLElement;
      if (card) {
        const cardWidth = card.offsetWidth;
        const gap = 32; // gap-8
        const scrollAmount = cardWidth + gap;
        container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="pt-32 pb-10">
      <div className="flex items-end justify-between mb-16 px-0 md:px-10 lg:px-14">
        <div className="max-w-2xl">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block"
          >
            Nasze Specjalizacje
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">Technologia w Służbie Zdrowia</h2>
        </div>
        <div className="flex gap-3">
          <button onClick={() => scroll('left')} className="w-14 h-14 rounded-2xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-primary transition-all group active:scale-90">
            <ArrowLeft className="w-6 h-6 text-slate-400 group-hover:text-primary" />
          </button>
          <button onClick={() => scroll('right')} className="w-14 h-14 rounded-2xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-primary transition-all group active:scale-90 shadow-lg shadow-slate-200/50">
            <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-primary" />
          </button>
        </div>
      </div>

      <div 
        id="services-carousel"
        className="flex gap-8 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory px-0 md:px-10 lg:px-14 scroll-smooth"
      >
        {siteData.home.services.map((service, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="min-w-[85%] md:min-w-[45%] lg:min-w-[calc((100%-64px)/3)] snap-center"
          >
            <motion.div 
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[3rem] border border-slate-100 flex flex-col items-start gap-8 shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all h-full group cursor-pointer"
            >
              <div className="w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden relative">
                <img src={service.asset} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex-1 flex flex-col gap-4 w-full">
                <h3 className="text-2xl font-black text-slate-900">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{service.desc}</p>
                <div className="mt-auto">
                  <Link to="/uslugi" className="inline-flex items-center gap-2 text-primary font-black text-sm pt-2 group/link">
                    Szczegóły Usługi 
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};


const VideoPlaceholder = () => (
  <section className="px-0 md:px-10 lg:px-14 relative">
    <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="relative h-auto aspect-square md:aspect-auto md:h-[600px] bg-slate-900 rounded-2xl md:rounded-[4rem] overflow-hidden shadow-2xl border border-white/10 group cursor-pointer"
    >
      {/* Background Image */}
      <img 
        src="/assets/images/home/forest-placeholder.jpg"
        alt="Video Background"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
      
      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 md:p-16 text-center md:text-left md:flex-row md:justify-between gap-6 md:gap-12">
        <div className="max-w-xl space-y-4 md:space-y-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Zobacz jak pracujemy
          </h2>
          <p className="hidden md:block text-slate-300 text-lg leading-relaxed font-bold italic">
            Nasz proces jest transparentny, czysty i niezwykle skuteczny. Wykorzystujemy kamery inspekcyjne, aby pokazać Ci różnicę "przed" i "po" wykonaniu usługi.
          </p>
          <ul className="hidden md:block space-y-4">
            {[ 
              "Pełna wideo-inspekcja kanałów",
              "Bezpyłowa technologia HEPA",
              "Raport techniczny po usłudze"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-white font-bold">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center">
          <button className="w-20 h-20 md:w-32 md:h-32 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all duration-300 group/btn">
            <Play className="w-8 h-8 md:w-14 md:h-14 fill-current ml-1.5 md:ml-2 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  </section>
);

const RotobrushTech = () => (
  <section className="px-0 md:px-10 lg:px-14 relative py-12">
    <div className="flex flex-col items-center text-center mb-16">
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4"
      >
        Napędzane przez Rotobrush®
      </motion.span>
      <h2 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-6">
        Technologia, która zmienia standardy
      </h2>
      <p className="max-w-2xl text-slate-500 font-medium italic">
        Nie korzystamy z półśrodków. Nasz system to jedyne rozwiązanie na rynku, które gwarantuje całkowitą sterylność kanałów.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "Brush-in-Vacuum",
          desc: "Unikalna technologia czyszczenia mechanicznego, gdzie szczotka rotuje bezpośrednio przy wlocie ssącym. Brud nie ma szans uciec poza system.",
          icon: Wind,
          delay: 0.1
        },
        {
          title: "Filtracja HEPA",
          desc: "Nasz sprzęt posiada certyfikowaną filtrację HEPA, która zatrzymuje 99.97% zanieczyszczeń, bakterii i alergenów. Twoje płuca poczują różnicę.",
          icon: Shield,
          delay: 0.2
        },
        {
          title: "Precyzja i Moc",
          desc: "Kompaktowa budowa pozwala nam na pracę w miejscach niedostępnych dla innych firm, zachowując przy tym najwyższą siłę ssania.",
          icon: Zap,
          delay: 0.3
        }
      ].map((tech, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: tech.delay }}
          whileHover={{ y: -10 }}
          className="bg-white/40 backdrop-blur-xl border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all group"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <tech.icon className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-4">{tech.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-bold italic">{tech.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const Home = () => (
  <main className="max-w-7xl mx-auto py-8 space-y-12 md:space-y-32 mb-20 px-6">
    <Hero />
    
    <Services />

    <VideoPlaceholder />

    <RotobrushTech />

    <section className="px-0 md:px-10 lg:px-14">
      <div className="bg-slate-900 rounded-2xl md:rounded-[4rem] overflow-hidden relative border border-slate-800 shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 md:p-20 flex flex-col justify-center gap-8 relative z-10">
          <span className="bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest w-fit">Najlepsza Technologia</span>
          <h3 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter">Dlaczego wybrać naszą technologię?</h3>
          <ul className="space-y-6">
            {[
              { title: "Szybka wycena", desc: "Wstępny kosztorys na podstawie ilości anemostatów." },
              { title: "Bezpieczeństwo", desc: "Praca na dedykowanym sprzęcie DanDuct z Danii." },
              { title: "Certyfikacja", desc: "Licencjonowany personel (European Ventilation Hygiene Association)." }
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-h-[400px]">
          <img 
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
            src="/assets/images/home/jednostki-scaled.jpg" 
            alt="Rotobrush Equipment"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>
        </div>
      </div>
    </section>

    <section>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Głos Naszych Klientów</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {siteData.home.testimonials.map((t, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 flex flex-col gap-6 shadow-sm hover:shadow-xl transition-all relative">
            <div className="absolute top-8 right-8 text-primary/10">
              <Star className="w-16 h-16 fill-current" />
            </div>
            <div className="flex gap-1 text-primary">
              {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-700 font-bold italic leading-relaxed text-lg">"{t.text}"</p>
            <div className="mt-auto">
              <p className="font-black text-slate-900">{t.name}</p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </main>
);

const ServicesPage = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [expandedInfoIndex, setExpandedInfoIndex] = useState<number | null>(null);

  return (
    <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">
      <div className="max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-tight italic"
        >
          Nasze Usługi i Technologia
        </motion.h1>
        <p className="text-xl text-slate-500 leading-relaxed font-bold italic border-l-4 border-primary pl-8 py-2">
          Jesteśmy ekspertami w czyszczeniu wszelkiego rodzaju kanałów wentylacyjnych. Nasze podejście opiera się na planowaniu zapobiegawczym, profesjonalnych konsultacjach i rygorystycznej metodologii ISO.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-24">
        {siteData.uslugi.detailed.map((s, i) => (
          <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-start`}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white group"
            >
              <img src={s.asset} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
            </motion.div>
            <div className="w-full lg:w-1/2 space-y-6 pt-4">
              <span className="text-slate-600 font-black uppercase tracking-[0.2em] text-[10px] bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">Serwis {i + 1}</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">{s.title}</h2>
              
              <div className="relative">
                <p className={`text-lg text-slate-600 leading-relaxed font-medium transition-all duration-500 overflow-hidden ${expandedIndex === i ? 'max-h-[1000px] opacity-100' : 'max-h-24 opacity-80'}`}>
                  {s.text}
                </p>
                {expandedIndex !== i && (
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg shadow-primary/20"
                >
                  {expandedIndex === i ? 'Zwiń Opis' : 'Rozwiń Opis'}
                  {expandedIndex === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <Link to="/kontakt" className="inline-flex items-center gap-2 text-slate-900 hover:text-primary font-black text-sm group hover:scale-105 transition-transform bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm">
                  Zapytaj o szczegóły <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Refined Technical Sections with Accordion */}
      {[
        {
          id: 'cert',
          tag: 'Ekspertyza',
          title: 'Certyfikat HVAC Maintenance Specialist',
          description: 'Co sprawia, że w kwestii wentylacji można nam zaufać? Wieloletnie doświadczenie poparte Certyfikatami i Kursami pozwala nam doradzać klientom na najwyższym możliwym poziomie jeśli chodzi o wentylacje! To my byliśmy pionierami jeśli chodzi o rekuperację w Polsce. Doświadczenie pokazało nam, żeby zadbać o dobro, komfort i satysfakcję klienta potrzeba najwyższego poziomu usług. Aby właściwie zadbać o kondycję powietrza w swoim domu warto co określony okres czasu (zazwyczaj 3-5 lat) oczyścić kanały wentylacyjne, które pełne są kurzu, brudu i różnego rodzaju bakterii. Napisz do nas w celu ustalenia czy twoja wentylacja potrzebuję czyszczenia. Zrób coś dla swojego zdrowia w 2023.',
          image: '/assets/images/uslugi/certyfikat-scaled.jpg',
          bgColor: 'bg-slate-50'
        },
        {
          id: 'res',
          title: 'Czyszczenie Wentylacji w domu jednorodzinnym',
          description: 'Wentylacja to ważny element każdego domu jednorodzinnego. Jest to system, który pozwala na wymianę powietrza w pomieszczeniach, zapewniając świeże powietrze oraz usuwając zanieczyszczenia. Jednakże, co ważne, system wentylacyjny wymaga regularnego czyszczenia. Czyszczenie wentylacji to zadanie, które często jest pomijane przez właścicieli domów. Jest to jednak błąd, który może skutkować wieloma problemami. Oto kilka powodów, dlaczego warto regularnie czyścić wentylację w domu jednorodzinnym.\n\nPo pierwsze, brudna wentylacja może prowadzić do problemów zdrowotnych. Wszystkie zanieczyszczenia, które gromadzą się w systemie wentylacyjnym, mogą wpływać na jakość powietrza w pomieszczeniach. Mogą to być bakterie, wirusy, grzyby, pyłki, a nawet zanieczyszczenia chemiczne. Te substancje mogą wpływać na zdrowie domowników, szczególnie osób z chorobami układu oddechowego.\n\nPo drugie, brudna wentylacja może prowadzić do wzrostu kosztów energii. Kiedy system wentylacyjny jest zatkany, wymiana powietrza jest utrudniona, co prowadzi do wzrostu kosztów ogrzewania i klimatyzacji. Czysta wentylacja pozwala na bardziej efektywną pracę systemu, co prowadzi do niższych rachunków za energię.\n\nPo trzecie, brudna wentylacja może prowadzić do zwiększonego ryzyka pożaru. Zanieczyszczenia, takie jak kurz, mogą gromadzić się w systemie wentylacyjnym i stawać się łatwopalne. Jeśli system wentylacyjny nie jest regularnie czyszczony, może to prowadzić do powstania pożaru.',
          image: '/assets/images/uslugi/oddech-scaled.jpg',
          bgColor: 'bg-white'
        },
        {
          id: 'comm',
          title: 'Czyszczenie wentylacji w lokalach użytkowych',
          description: 'Czyszczenie systemów wentylacyjnych w lokalach użytkowych to kluczowy element utrzymania higieny oraz bezpieczeństwa w budynkach. Dlatego warto zwrócić uwagę na europejskie standardy ISO, które określają wymagania w zakresie czyszczenia i konserwacji systemów wentylacyjnych.\n\nISO 16890 to standard, który określa kategorie filtrów powietrza w systemach wentylacyjnych. Filtry are ważnym elementem w procesie oczyszczania powietrza, eliminując zanieczyszczenia, takie jak pyłki, wirusy, bakterie i alergeny. Filtry powinny być regularnie wymieniane, aby utrzymać czystość i skuteczność pracy systemu.\n\nISO 14644 to standard, który określa wymagania w zakresie czystości powietrza w pomieszczeniach, w tym w lokalach użytkowych. Standard ten określa klasy czystości, w których pomieszczenia mogą być podzielone, aby zapewnić oczekiwany poziom higieny i bezpieczeństwa dla pracowników oraz klientów.\n\nCzyszczenie systemów wentylacyjnych w lokalach użytkowych jest nie tylko kwestią higieny, ale także wpływa na efektywność energetyczną i bezpieczeństwo. Zatkane lub brudne systemy wentylacyjne mogą prowadzić do wzrostu kosztów energii, a nawet zwiększonego ryzyka pożaru. Dlatego zaleca się regularne czyszczenie systemów wentylacyjnych przez profesjonalistów specjalizujących się w tej dziedzinie.',
          image: '/assets/images/uslugi/lokal-scaled.jpg',
          bgColor: 'bg-white',
          dark: false
        },
        {
          id: 'fire',
          title: 'Ryzyko pożaru',
          description: 'Pożary wywołane zabrudzonymi kanałami wentylacyjnymi to poważny problem, który może prowadzić do tragicznych skutków. Według danych z ostatnich lat, liczba pożarów związanych z systemami wentylacyjnymi wzrasta, co tylko podkreśla konieczność regularnego czyszczenia tych urządzeń.\n\nWiele pożarów jest wywoływanych przez gromadzenie się zanieczyszczeń, takich jak pył, kurz, ropa naftowa, a nawet pożywienie, które osadza się w kanałach wentylacyjnych. Te substancje mogą łatwo zapłonąć, zwłaszcza gdy znajdują się w pobliżu gorących źródeł, takich jak piece lub kotły. Według National Fire Protection Association, około 20% pożarów w budynkach to pożary związane z systemami wentylacyjnymi. W ciągu ostatnich lat liczba pożarów spowodowanych przez zabrudzone kanały wentylacyjne wzrosła, aż o 50%. Te statystyki są szczególnie niepokojące, biorąc pod uwagę, że większość pożarów mogłaby być łatwo uniknięta poprzez regularne czyszczenie systemów wentylacyjnych.',
          image: '/assets/images/uslugi/pozar-1-scaled.jpg',
          bgColor: 'bg-white'
        },
        {
          id: 'dis',
          title: 'Top pielęgnacja i najwyższy poziom komfortu - Dezynfekcja',
          description: 'Dezynfekcja kanałów wentylacyjnych to ważny proces, który pomaga zapobiegać rozprzestrzenianiu się chorób i zapewnia czyste powietrze w pomieszczeniach. Kanały wentylacyjne są miejscem, gdzie osadza się wiele zanieczyszczeń, w tym bakterii, grzybów, wirusów i innych substansji szkodliwych dla zdrowia. Dlatego tak ważne jest, aby regularnie dezynfekować kanały wentylacyjne w celu zapewnienia czystego powietrza i ochrony zdrowia ludzi.\n\nProces dezynfekcji kanałów wentylacyjnych zaczyna się od dokładnego oczyszczenia kanałów z zanieczyszczeń i osadów, które gromadzą się wewnątrz. Następnie, specjalistyczne środki dezynfekcyjne są wtryskiwane wewnątrz kanałów, aby zniszczyć bakterie, wirusy i grzyby, które mogą się tam znajdować. Dezynfekcja kanałów wentylacyjnych zapewnia czyste powietrze w pomieszczeniach, co jest szczególnie ważne dla osób cierpiących na alergie, astmę i inne choroby układu oddechowego.',
          image: '/assets/images/uslugi/chemia-scaled.jpg',
          bgColor: 'bg-slate-50'
        },
        {
          id: 'sbs',
          title: 'Syndrom chorego budynku',
          description: 'Syndrom chorego budynku to zjawisko, które polega na występowaniu u ludzi objawów chorobowych związanych z przebywaniem w zamkniętych pomieszczeniach. Objawy te są zwykle trudne do zdiagnozowania i mogą obejmować m.in. bóle głowy, problemy z oddychaniem, problemy ze skórą, osłabienie i ogólne złe samopoczucie. Wiele badań wskazuje, że syndrom chorego budynku może być spowodowany zanieczyszczeniem powietrza wewnątrz budynku.\n\nWnętrza budynków są zamknięte i klimatyzowane, co powoduje, że powietrze wewnątrz staje się narażone na różne zanieczyszczenia, takie jak kurz, pyłki, pleśnie, wirusy i bakterie. Te zanieczyszczenia mogą wpływać na jakość powietrza i spowodować objawy chorobowe u osób, które przebywają w budynku. Ponadto, wiele budynków jest szczelnie izolowanych, co powoduje, że powietrze jest recyrkulowane i nie ma dostępu do świeżego powietrza z zewnątrz. Poprawa jakości powietrza to inwestycja w zdrowie i dobre samopoczucie, które przyczyni się do zwiększenia produktywności i efektywności pracy w budynkach.',
          image: '/assets/images/uslugi/syndrom-scaled.jpg',
          bgColor: 'bg-white'
        }
      ].map((block, idx) => {
        const isExpanded = expandedInfoIndex === idx;
        const isDark = block.dark;

        return (
          <motion.section 
            key={block.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
          >
            <div className={`${block.bgColor} rounded-2xl md:rounded-[4rem] p-8 md:p-24 border ${isDark ? 'border-white/10' : 'border-slate-200 shadow-sm'} flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center overflow-hidden relative group cursor-pointer hover:shadow-2xl transition-all`}>
              {isDark && <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[120px] rounded-full"></div>}
              
              <div className={`lg:w-1/2 space-y-8 relative z-10`}>
                {block.tag && (
                  <span className={`${isDark ? 'bg-white/10 text-white' : 'bg-primary/10 text-primary'} font-black uppercase tracking-[0.2em] text-[10px] px-4 py-1.5 rounded-full`}>
                    {block.tag}
                  </span>
                )}
                <h2 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight italic`}>
                  {block.title}
                </h2>
                
                <div className="relative">
                  <div className={`space-y-6 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px]' : 'max-h-32 md:max-h-32'}`}>
                    {block.description.split('\n\n').map((par, pIdx) => (
                      <p key={pIdx} className={`${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed text-sm md:text-base`}>
                        {par}
                      </p>
                    ))}
                  </div>
                  {!isExpanded && (
                    <div className={`absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t ${isDark ? 'from-slate-900' : 'from-white'} to-transparent`}></div>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={() => setExpandedInfoIndex(isExpanded ? null : idx)}
                    className={`inline-flex items-center gap-2 ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'} px-6 py-3 rounded-2xl font-black text-sm transition-all active:scale-95`}
                  >
                    {isExpanded ? 'Zwiń Opis' : 'Rozwiń Opis'}
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <a 
                    href={`tel:${siteData.contact.tel1}`} 
                    className={`inline-flex items-center gap-2 ${isDark ? 'text-white bg-white/5 border-white/10' : 'text-slate-900 bg-slate-100 border-slate-200'} font-black text-sm group hover:scale-105 transition-transform px-6 py-3 rounded-2xl border`}
                  >
                    Zapytaj o szczegóły <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              <div className={`lg:w-1/2 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl ${block.id === 'cert' ? 'bg-white p-4' : 'border-4 border-white/10 aspect-video'} relative z-10`}>
                <img 
                  src={block.image} 
                  className={`w-full h-full ${block.id === 'cert' ? 'object-contain' : 'object-cover'}`} 
                />
              </div>
            </div>
          </motion.section>
        );
      })}
    </main>
  );
};

const AboutPage = () => (
  <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-20 space-y-32">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-8 leading-tight italic">Gwarancja Jakości Powietrza</h1>
        <p className="text-xl text-slate-600 leading-relaxed mb-10">
          Jesteśmy zespołem profesjonalistów z wieloletnim doświadczeniem w branży czyszczenia systemów HVAC. Nasza firma to połączenie globalnej technologii Rotobrush z lokalnym, rzetelnym podejściem do klienta.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-5xl font-black text-primary italic leading-none">8+</p>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Lat w branży</p>
          </div>
          <div>
            <p className="text-5xl font-black text-primary italic leading-none">583+</p>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Klientów</p>
          </div>
        </div>
      </div>
      <div className="rounded-[4rem] overflow-hidden shadow-2xl border-12 border-white rotate-2 bg-slate-200 aspect-[3/4]">
        <img src="/assets/images/o-nas/ekipa-scaled.jpg" className="w-full h-full object-cover" />
      </div>
    </div>

    <section className="bg-slate-900 rounded-3xl md:rounded-[4rem] p-8 md:p-24 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
        <h2 className="text-4xl font-black italic tracking-tight uppercase">Nasza Ekipa do Zadań Specjalnych</h2>
        <p className="text-lg text-slate-400 leading-relaxed font-bold">
          Od momentu przyjęcia zlecenia nasi specjaliści zaczynają pracę nad Twoimi potrzebami. Planowanie, wykonanie i inspekcja – wszystko profesionalnie, bezpiecznie i z dbałością o detale.
        </p>
      </div>
    </section>
  </main>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight italic uppercase">Jesteśmy w Kontakcie</h1>
          <div className="space-y-8">
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center shrink-0">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Telefon</p>
                <p className="text-2xl font-black text-slate-900">{siteData.contact.tel1}</p>
                <p className="text-xl font-bold text-slate-500 mt-1">{siteData.contact.tel2}</p>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center shrink-0">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">E-mail</p>
                <p className="text-2xl font-black text-slate-900">{siteData.contact.email}</p>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center shrink-0">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Siedziba</p>
                <p className="text-2xl font-black text-slate-900">{siteData.contact.address.street}</p>
                <p className="text-xl font-bold text-slate-500 mt-1">{siteData.contact.address.city}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-16 rounded-3xl md:rounded-[3rem] border border-slate-100 shadow-2xl space-y-8">
          <h3 className="text-3xl font-black text-slate-900 italic tracking-tight">Wyślij Zapytanie</h3>
          <p className="text-slate-500 font-bold">Skontaktujemy się z Tobą w ciągu 24 godzin!</p>
          
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-100 p-8 rounded-[2rem] text-center space-y-4"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-black text-green-900">Wiadomość wysłana!</h4>
              <p className="text-green-700 font-medium">Dziękujemy za kontakt. Odpowiemy tak szybko, jak to możliwe.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-green-700 font-bold underline mt-4"
              >
                Wyślij kolejną wiadomość
              </button>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input 
                required
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans" 
                placeholder="Imię *" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input 
                required
                type="email"
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans" 
                placeholder="E-mail *" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input 
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans" 
                placeholder="Temat" 
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
              <textarea 
                required
                rows={4} 
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans" 
                placeholder="Wiadomość *" 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              
              {status === 'error' && (
                <p className="text-primary font-bold text-sm">Wystąpił błąd podczas wysyłania. Spróbuj ponownie później.</p>
              )}

              <button 
                disabled={status === 'sending'}
                className="w-full bg-primary hover:bg-red-700 disabled:bg-slate-300 text-white py-5 rounded-2xl text-lg font-black transition-all shadow-xl shadow-primary/20 uppercase tracking-widest"
              >
                {status === 'sending' ? 'Wysyłanie...' : 'Wyślij Wiadomość'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

const Footer = () => (
  <footer className="px-4 md:px-8 lg:px-12 pb-8 md:pb-12 relative overflow-hidden">
    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 bg-primary/5 blur-[100px] pointer-events-none"></div>
    <div className="bg-slate-900 rounded-2xl md:rounded-[4rem] p-8 md:p-20 text-white relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 md:mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="mb-8">
            <Logo />
          </div>
          <p className="text-slate-400 text-sm leading-relaxed font-bold italic">
            Ekspert w technologii czyszczenia kanałów wentylacyjnych i klimatyzacyjnych. Prawdziwa higiena, certyfikowana jakość.
          </p>
        </div>
        <div>
          <h4 className="font-black text-white mb-8 tracking-widest text-xs uppercase">Szybkie Linki</h4>
          <ul className="space-y-4 text-sm text-slate-400 font-bold">
            <li><Link className="hover:text-primary transition-colors" to="/">Główna</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/uslugi">Nasze Usługi</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/o-nas">O nas</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/kontakt">Kontakt</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-white mb-8 tracking-widest text-xs uppercase">Social Media</h4>
          <ul className="space-y-4 text-sm text-slate-400 font-bold">
            <li><a className="hover:text-primary transition-colors" href={siteData.contact.socials.facebook}>Facebook</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">LinkedIn</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Instagram</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-white mb-8 tracking-widest text-xs uppercase">Kontakt</h4>
          <ul className="space-y-4 text-sm text-slate-400 font-bold">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary" />
              {siteData.contact.tel1}
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary" />
              {siteData.contact.email}
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-primary" />
              {siteData.contact.address.city}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
        <p>© 2026 Freedom Czyste Wentylacje. Prawa zastrzeżone.</p>
        <div className="flex gap-8">
          <a className="hover:text-white" href="#">Polityka prywatności</a>
          <a className="hover:text-white" href="#">Regulamin</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-primary selection:text-white">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        
        <div className="pt-32">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/uslugi" element={<ServicesPage />} />
            <Route path="/o-nas" element={<AboutPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
