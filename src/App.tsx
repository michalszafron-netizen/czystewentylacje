import { Phone, Wind, ShieldCheck, BadgeCheck, Play, Calendar, CheckCircle2, ArrowRight, ArrowLeft, Mail, MapPin, Star, Menu, X, Facebook, Shield, ChevronDown, ChevronUp, Zap, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { siteData } from "./data/siteData";

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
    return () => { document.title = 'Czyścimy Wentylacje | Eksperci od Higieny Wentylacji'; };
  }, [title]);
};

const PageTitle = ({ title }: { title: string }) => {
  usePageTitle(title);
  return null;
};

const Logo = ({ className = "" }: { className?: string }) => {
  const [error, setError] = useState(false);
  
  return (
    <div className={`flex items-center justify-start ${className}`} style={{ minHeight: '40px', minWidth: '100px' }}>
      {!error ? (
        <img 
          src="/Zasob1.png" 
          alt="Czyścimy Wentylacje" 
          className="h-7 md:h-10 max-w-full w-auto object-contain transition-transform hover:scale-105"
          onError={() => setError(true)}
        />
      ) : (
        <div className="inline-flex flex-col items-center justify-center border-[2px] border-primary rounded-[0.75rem] md:rounded-[1rem] px-3 md:px-5 py-1 md:py-2 skew-x-[-12deg] bg-transparent transition-all hover:scale-105 duration-300">
          <div className="skew-x-[12deg] flex flex-col items-center w-full">
            <span className="text-lg md:text-3xl font-black italic tracking-tighter text-transparent leading-none mb-0.5 md:mb-1 select-none font-outfit" style={{ WebkitTextStroke: '1px #e33538' }}>CZYŚCIMY</span>
            <div className="w-full flex justify-between gap-0.5">
              {"CZYŚCIMY WENTYLACJE".split("").map((char, i) => (
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
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.78%] h-[177.78%] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 opacity-70"
          src="https://www.youtube.com/embed/IZro72G3_AA?autoplay=1&loop=1&playlist=IZro72G3_AA&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1"
          title="Czyścimy Wentylacje - video"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
        />
      </div>

      {/* Dark gradient overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-transparent z-10 pointer-events-none"></div>

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
                  <Link to={`/uslugi#${service.id}`} className="inline-flex items-center gap-2 text-primary font-black text-sm pt-2 group/link">
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


const VideoPlaceholder = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="px-0 md:px-10 lg:px-14 relative">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative h-auto aspect-square md:aspect-auto md:h-[600px] bg-slate-900 rounded-2xl md:rounded-[4rem] overflow-hidden shadow-2xl border border-white/10 group"
      >
        {!isPlaying ? (
          <>
            {/* Background Image */}
            <img 
              src="https://img.youtube.com/vi/IZro72G3_AA/maxresdefault.jpg"
              alt="Video Thumbnail"
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
                <p className="hidden md:block text-slate-300 text-lg leading-relaxed font-bold">
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
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 md:w-32 md:h-32 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all duration-300 group/btn pointer-events-auto"
                >
                  <Play className="w-8 h-8 md:w-14 md:h-14 fill-current ml-1.5 md:ml-2 group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 w-full h-full bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/IZro72G3_AA?autoplay=1&controls=1&modestbranding=1&rel=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button 
              onClick={() => setIsPlaying(false)}
              className="absolute top-6 right-6 z-30 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};

const InfiniteRibbon = () => {
  const images = [
    "/assets/images/web/czyscimy-wentylacje-rotobrush-van.avif",
    "/assets/images/web/czyscimy-wentylacje-przygotowanie-do-czyszczenia-2.avif",
    "/assets/images/web/dwojew-pracownikow-rotobrush.avif",
    "/assets/images/web/technician-cleaning-ventilation-with-rotobrush.avif",
    "/assets/images/web/pracownik-techniczny-przed-zleceniem-czyszczenia-wentylacji.avif",
    "/assets/images/web/van-rotobrush-preparation.avif",
    "/assets/images/web/cleaning-vehicle-with-rotobrush-logo.avif",
    "/assets/images/web/czyscimy-wentylacje-przygotowanie-do-czyszczenia-rotobrush.avif",
    "/assets/images/web/dwoje-technikow-czyscimy-wentylacje.avif",
    "/assets/images/web/pracownik-czyscimy-wentylacje-rotobrush.avif",
  ];

  return (
    <div className="relative py-10 overflow-hidden bg-slate-50 border-y border-slate-100">
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 min-w-max"
        >
          {[...images, ...images].map((img, i) => (
            <div key={i} className="w-64 h-40 rounded-2xl overflow-hidden shadow-md flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500">
              <img src={img} className="w-full h-full object-cover" alt={`Work ${i}`} loading="lazy" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const RealizationsGallery = () => {
  const [showAll, setShowAll] = useState(false);
  const allImages = [
    "/assets/images/web/technician-cleaning-ducts-with-rotobrush-2.avif",
    "/assets/images/web/czyszczenie-wentylacji-przygotowanie-sprzetu-2.avif",
    "/assets/images/web/technik-czyszczenie-wentylacji-rotobrush-3.avif",
    "/assets/images/web/pracownik-czyszczy-wentylacje-rotobrush.avif",
    "/assets/images/web/dwojew-pracownicy-czyscimy-wentylacje-przygotowanie.avif",
    "/assets/images/web/czyszczenie-wentylacji-przygotowanie-5.avif",
    "/assets/images/web/pracownik-czyscimy-wentylacje-rotobrush-2.avif",
    "/assets/images/web/technicy-przygotowani-do-czyszczenia-wentylacji.avif",
    "/assets/images/web/technician-using-rotobrush.avif",
    "/assets/images/web/toyota-proace-verso-przygotowanie-do-zlecenia.avif",
    "/assets/images/web/czyscimy-wentylacje-przygotowanie-do-czyszczenia-3.avif",
    "/assets/images/web/czyscimy-wentylacje-czyszczenie-instalacji-rotobrush.avif",
  ];

  const visibleImages = showAll ? allImages : allImages.slice(0, 6);

  return (
    <section className="px-6 md:px-10 lg:px-14 py-24">
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block"
        >
          Nasze Realizacje
        </motion.span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Pasja w każdym detalu</h2>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {visibleImages.map((img, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: (i % 3) * 0.1 }}
            className="break-inside-avoid rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
          >
            <img 
              src={img} 
              className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" 
              alt={`Realizacja ${i}`} 
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button 
          onClick={() => setShowAll(!showAll)}
          className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-xl shadow-slate-200 active:scale-95"
        >
          {showAll ? "Pokaż mniej" : "Zobacz więcej realizacji"}
        </button>
      </div>
    </section>
  );
};

const RotobrushTech = () => (
  <section className="px-4 md:px-10 lg:px-14 relative py-20 overflow-hidden">
    {/* Background Decorative Element */}
    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left Content */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="mb-8">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block"
          >
            Napędzane przez Rotobrush®
          </motion.span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
            Technologia, która <span className="text-primary italic">zmienia</span> standardy
          </h2>
          <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12 max-w-xl border-l-4 border-primary/20 pl-6">
            Nie korzystamy z półśrodków. Nasz system to jedyne rozwiązanie na rynku, które gwarantuje całkowitą sterylność kanałów.
          </p>
        </div>

        <div className="space-y-8">
          {[
            {
              title: "Brush-in-Vacuum",
              desc: "Szczotka rotuje bezpośrednio przy wlocie ssącym. Brud nie ma szans uciec.",
              icon: Wind
            },
            {
              title: "Filtracja HEPA",
              desc: "Zatrzymuje 99.97% zanieczyszczeń, bakterii i alergenów.",
              icon: Shield
            },
            {
              title: "Precyzja i Moc",
              desc: "Kompaktowa budowa i najwyższa na rynku siła ssania.",
              icon: Zap
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6 group"
            >
              <div className="w-14 h-14 bg-white shadow-xl shadow-slate-200/50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <item.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900 mb-1">{item.title}</h4>
                <p className="text-slate-500 text-sm font-bold leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Image Grid */}
      <div className="relative h-[500px] md:h-[600px]">
        {/* Main large image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="absolute left-0 top-0 w-[70%] h-[70%] z-20"
        >
          <img 
            src="/assets/images/technology/roto1.png" 
            alt="Rotobrush Tech 1" 
            className="w-full h-full object-cover rounded-[3rem] shadow-2xl border-4 border-white"
          />
        </motion.div>

        {/* Top right image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="absolute right-0 top-[10%] w-[45%] h-[40%] z-10"
        >
          <img 
            src="/assets/images/technology/roto2.png" 
            alt="Rotobrush Tech 2" 
            className="w-full h-full object-cover rounded-[2rem] shadow-xl border-4 border-white"
          />
        </motion.div>

        {/* Bottom left image */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="absolute left-[5%] bottom-0 w-[40%] h-[45%] z-30"
        >
          <img 
            src="/assets/images/technology/roto3.png" 
            alt="Rotobrush Tech 3" 
            className="w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-white"
          />
        </motion.div>

        {/* Bottom right image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="absolute right-[5%] bottom-[5%] w-[50%] h-[55%] z-20"
        >
          <img 
            src="/assets/images/technology/roto4.png" 
            alt="Rotobrush Tech 4" 
            className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl border-4 border-white"
          />
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-primary/10 rounded-full scale-110 pointer-events-none"></div>
      </div>
    </div>
  </section>
);

const Home = () => (
  <>
    <PageTitle title="Czyścimy Wentylacje | Czyszczenie i Dezynfekcja Kanałów Wentylacyjnych" />
    <main className="max-w-7xl mx-auto py-8 space-y-12 md:space-y-32 mb-20 px-6">
    <Hero />
    
    <Services />

    <VideoPlaceholder />

    <InfiniteRibbon />

    <RotobrushTech />

    <RealizationsGallery />

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
            <p className="text-slate-700 font-bold leading-relaxed text-lg">"{t.text}"</p>
            <div className="mt-auto">
              <p className="font-black text-slate-900">{t.name}</p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </main>
</>
);

const ServicesPage = () => {
  usePageTitle('Nasze Usługi | Czyścimy Wentylacje');
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">
      <div className="max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-8 leading-tight"
        >
          Nasze Usługi i Technologia
        </motion.h1>
        <p className="text-xl text-slate-500 leading-relaxed font-bold border-l-4 border-primary pl-8 py-2">
          Jesteśmy ekspertami w czyszczeniu wszelkiego rodzaju kanałów wentylacyjnych. Nasze podejście opiera się na planowaniu zapobiegawczym, profesjonalnych konsultacjach i rygorystycznej metodologii ISO.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-24">
        {siteData.uslugi.detailed.map((s, i) => (
          <div key={i} id={s.id} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-start scroll-mt-32`}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 md:aspect-[4/3] aspect-[3/2] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white group"
            >
              <img src={s.asset} alt={s.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-[2s]" />
            </motion.div>
            <div className="w-full lg:w-1/2 space-y-6 pt-4">
              <span className="text-slate-600 font-black uppercase tracking-[0.2em] text-[10px] bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200 mb-4 inline-block">Usługa {i + 1}</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">{s.title}</h2>
              
              <div>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {s.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

const AboutPage = () => (
  <>
    <PageTitle title="O nas | Czyścimy Wentylacje" />
    <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-20 space-y-32">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">Eksperci od Higieny Wentylacji</h1>
        <p className="text-xl text-slate-600 leading-relaxed mb-10">
          W Czyste Wentylacje nie tylko serwisujemy kanały – przywracamy budynkom ich naturalną zdolność do oddychania. Nasza historia to ewolucja od fascynacji technologią Rotobrush® do pozycji lidera w dziedzinie zaawansowanej sanacji systemów HVAC. Łączymy amerykańską myśl techniczną z polską rzetelnością, oferując standardy higieny, które wyznaczają nowy poziom bezpieczeństwa.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-5xl font-black text-primary leading-none">3+</p>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Lat doświadczenia</p>
          </div>
          <div>
            <p className="text-5xl font-black text-primary leading-none">150+</p>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Zadowolonych Klientów</p>
          </div>
        </div>
      </div>
      <div className="rounded-[4rem] overflow-hidden shadow-2xl border-12 border-white rotate-2 bg-slate-200 aspect-[3/4]">
        <img src="/assets/images/web/czyscimy-wentylacje-czyszczenie-instalacji-rotobrush.avif" className="w-full h-full object-cover" />
      </div>
    </div>

    <section className="bg-slate-900 rounded-3xl md:rounded-[4rem] p-8 md:p-24 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
        <h2 className="text-4xl font-black tracking-tight uppercase">Nasze Podejście: Bez Kompromisów</h2>
        <p className="text-lg text-slate-400 leading-relaxed font-bold">
          Od momentu przyjęcia zlecenia, nasz zespół ekspertów koncentruje się na specyficznych potrzebach Twojej instalacji. Wykorzystujemy najnowocześniejszy park maszynowy Rotobrush® i rygorystyczne procedury kontrolne, aby zapewnić efekt, który jest mierzalny, trwały i w pełni bezpieczny.
        </p>
      </div>
    </section>
  </main>
</>
);

const ContactPage = () => {
  usePageTitle('Kontakt | Czyścimy Wentylacje');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', 'bot-field': '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    try {
      if (isLocal) {
        // Local Mode: Use server.ts with JSON
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '', 'bot-field': '' });
        } else {
          setStatus('error');
        }
      } else {
        // Production Mode: Use Netlify Forms with urlencoded
        const encode = (data: any) => {
          return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
        };

        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "contact", ...formData })
        });

        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '', 'bot-field': '' });
        } else {
          setStatus('error');
        }
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
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight">Jesteśmy w Kontakcie</h1>
          <div className="space-y-8">
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center shrink-0">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Kontakt</p>
                <p className="text-2xl font-black text-slate-900">{siteData.contact.tel1}</p>
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
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Dane firmy</p>
                  <p className="text-sm font-bold text-slate-600">NIP: {siteData.contact.nip}</p>
                  <p className="text-sm font-bold text-slate-600">REGON: {siteData.contact.regon}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-16 rounded-3xl md:rounded-[3rem] border border-slate-100 shadow-2xl space-y-8">
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">Wyślij Zapytanie</h3>
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
            <form 
              className="space-y-6" 
              onSubmit={handleSubmit}
              name="contact"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>Don’t fill this out if you're human: 
                  <input 
                    name="bot-field" 
                    value={formData['bot-field']}
                    onChange={(e) => setFormData({ ...formData, 'bot-field': e.target.value })}
                  />
                </label>
              </p>
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

              <div className="flex gap-3 items-start p-4 bg-slate-50 rounded-xl border border-slate-200">
                <input 
                  type="checkbox" 
                  required 
                  id="rodo"
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 accent-primary" 
                />
                <label htmlFor="rodo" className="text-[11px] text-slate-500 leading-tight font-medium">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zapytania. Administratorem danych jest P.H.U. "Instal-Centrum" Agnieszka Wanicka. Więcej w <Link to="/polityka-prywatnosci" className="text-primary underline">Polityce Prywatności</Link>.
                </label>
              </div>

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

const Footer = () => {
  const [isMapHovered, setIsMapHovered] = useState(false);
  
  return (
    <footer className="px-4 md:px-8 lg:px-12 pb-8 md:pb-12 relative overflow-hidden">
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 bg-primary/5 blur-[100px] pointer-events-none"></div>
      <div className="bg-slate-900 rounded-2xl md:rounded-[4rem] p-8 md:p-16 text-white relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="col-span-1 lg:col-span-3">
            <div className="mb-8">
              <Logo />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-bold">
              Ekspert w technologii czyszczenia kanałów wentylacyjnych i klimatyzacyjnych. Prawdziwa higiena, certyfikowana jakość.
            </p>
            <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col gap-1">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Dane firmy</p>
              <span className="text-xs font-bold text-slate-400">NIP: {siteData.contact.nip}</span>
              <span className="text-xs font-bold text-slate-400">REGON: {siteData.contact.regon}</span>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-black text-white mb-8 tracking-widest text-xs uppercase text-primary">Linki</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-bold">
              <li><Link className="hover:text-primary transition-colors" to="/">Główna</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/uslugi">Nasze Usługi</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/o-nas">O nas</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/kontakt">Kontakt</Link></li>
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-4">
            <h4 className="font-black text-white mb-8 tracking-widest text-xs uppercase text-primary">Nasza Siedziba</h4>
            <div 
              className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl h-48 bg-slate-800 relative cursor-pointer"
              onMouseEnter={() => setIsMapHovered(true)}
              onMouseLeave={() => setIsMapHovered(false)}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2577.1415383694803!2d18.6821642!3d49.764594499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471403a251be994d%3A0x491f1d4717061572!2sRolna%201%2C%2043-400%20Cieszyn!5e0!3m2!1sen!2spl!4v1773947958893!5m2!1sen!2spl"
                width="100%" 
                height="100%" 
                style={{ 
                  border: 0, 
                  filter: isMapHovered 
                    ? 'grayscale(0) brightness(1) contrast(1)' 
                    : 'grayscale(0.5) brightness(0.8) contrast(1.1)',
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-3">
            <h4 className="font-black text-white mb-8 tracking-widest text-xs uppercase text-primary">Kontakt</h4>
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
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p>© 2026 Czyścimy Wentylacje. Prawa zastrzeżone.</p>
            <span className="hidden md:block opacity-20">|</span>
            <a 
              href="https://wideart.agency" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors opacity-60 hover:opacity-100"
            >
              Realizacja: Wideart.agency
            </a>
          </div>
          <div className="flex gap-8">
            <Link className="hover:text-white" to="/polityka-prywatnosci">Polityka prywatności</Link>
            <Link className="hover:text-white" to="/regulamin">Regulamin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LegalLayout = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <main className="max-w-4xl mx-auto px-6 py-20">
    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-12">{title}</h1>
    <div className="prose prose-slate max-w-none space-y-8 text-slate-600 font-medium leading-relaxed">
      {children}
    </div>
  </main>
);

const PrivacyPolicy = () => (
  <>
    <PageTitle title="Polityka Prywatności | Czyścimy Wentylacje" />
    <LegalLayout title="Polityka Prywatności">
    <section className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900">1. Administrator Danych</h2>
      <p>Administratorem Twoich danych osobowych jest <strong>Agnieszka Wanicka Przedsiębiorstwo Handlowo Usługowe "Instal-Centrum"</strong> z siedzibą przy ul. Rolna 1, 43-400 Cieszyn, NIP: 5482259175, REGON: 240366063.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900">2. Zakres i Cel Przetwarzania</h2>
      <p>Przetwarzamy dane podane dobrowolnie w formularzu kontaktowym (imię, adres e-mail, temat, treść wiadomości) wyłącznie w celu udzielenia odpowiedzi na Twoje zapytanie oraz ewentualnego nawiązania współpracy.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900">3. Twoje Prawa</h2>
      <p>Masz prawo do wglądu w swoje dane, ich poprawiania, żądania ograniczenia przetwarzania lub całkowitego usunięcia danych z naszej bazy. W tym celu skontaktuj się z nami pod adresem: <strong>biuro@instal-centrum.pl</strong>.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900">4. Bezpieczeństwo i Cookies</h2>
      <p>Strona korzysta z certyfikatu SSL, co zapewnia szyfrowanie przesyłanych danych. Wykorzystujemy również pliki cookies w celach statystycznych i funkcjonalnych, aby zapewnić poprawne działanie serwisu.</p>
    </section>
  </LegalLayout>
</>
);

const TermsOfService = () => (
  <>
    <PageTitle title="Regulamin | Czyścimy Wentylacje" />
    <LegalLayout title="Regulamin Serwisu">
    <section className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900">1. Postanowienia Ogólne</h2>
      <p>Niniejszy regulamin określa zasady korzystania z serwisu informacyjnego firmy Instal-Centrum, dostępnego pod adresem czyscimywentylacje.pl.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900">2. Charakter Serwisu</h2>
      <p>Serwis ma charakter informacyjno-ofertowy. Prezentuje zakres usług związanych z czyszczeniem i sanacją instalacji wentylacyjnych oraz umożliwia kontakt z firmą poprzez formularz.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900">3. Prawa Autorskie</h2>
      <p>Wszelkie treści, zdjęcia oraz logotypy zamieszczone na stronie są własnością Administratora lub są wykorzystywane na podstawie stosownych licencji. Kopiowanie i wykorzystywanie materiałów bez zgody jest zabronione.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900">4. Kontakt i Reklamacje</h2>
      <p>Wszelkie uwagi dotyczące działania serwisu można zgłaszać drogą elektroniczną na adres biuro@instal-centrum.pl. Odpowiadamy na zgłoszenia w terminie do 14 dni roboczych.</p>
    </section>
  </LegalLayout>
</>
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
            <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />
            <Route path="/regulamin" element={<TermsOfService />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
