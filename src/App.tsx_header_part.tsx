import { Phone, Wind, ShieldCheck, BadgeCheck, Play, Calendar, CheckCircle2, ArrowRight, ArrowLeft, Mail, MapPin, Star, Menu, X, Facebook, Shield, ChevronDown, ChevronUp, Zap, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { siteData } from "./data/siteData";

const Logo = ({ className = "" }: { className?: string }) => {
  const [error, setError] = useState(false);
  
  return (
    <div className={`flex items-center ${className}`} style={{ minHeight: '40px' }}>
      {!error ? (
        <img 
          src="/trannslogo2.png" 
          alt="Freedom Czyste Wentylacje" 
          className="h-full w-auto object-contain transition-transform hover:scale-105"
          onError={() => {
            console.warn("Logo image not found, falling back to CSS logo.");
            setError(true);
          }}
        />
      ) : (
        <div className="inline-flex flex-col items-center justify-center border-[2px] border-primary rounded-[0.75rem] md:rounded-[1rem] px-3 md:px-6 py-1 md:py-2 skew-x-[-12deg] bg-transparent transition-all hover:scale-105 duration-300">
          <div className="skew-x-[12deg] flex flex-col items-center w-full">
            <span 
              className="text-xl md:text-3xl font-black italic tracking-tighter text-transparent leading-none mb-0.5 md:mb-1 select-none font-outfit"
              style={{ 
                WebkitTextStroke: '1px #e33538',
                letterSpacing: '-0.02em'
              }}
            >
              Freedom
            </span>
            <div className="w-full flex justify-between gap-0.5 md:gap-1">
              {"CZYSTE WENTYLACJE".split("").map((char, i) => (
                <span key={i} className="text-[6px] md:text-[8px] font-black text-primary uppercase leading-none select-none">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Header = ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) onToggle(); // Close on location change if open
  }, [location.pathname]);

  return (
    <header className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-[100] md:w-[92%] max-w-7xl bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl md:rounded-[2.5rem] shadow-2xl p-2 md:p-3 h-[64px] md:h-[84px] flex items-center">
      <div className="relative flex items-center justify-between w-full px-2 md:px-6">
        
        {/* Logo (Left side) */}
        <div className="flex justify-start items-center">
          <Link to="/" className="relative z-[110] block transform-gpu hover:scale-105 transition-transform">
            <Logo className="max-w-[120px] md:max-w-none h-10 md:h-16" />
          </Link>
        </div>
        
        {/* Desktop Nav (Center) */}
        <nav className="hidden md:flex justify-center items-center gap-10">
          {[
            { label: 'Główna', path: '/' },
            { label: 'Usługi', path: '/uslugi' },
            { label: 'O nas', path: '/o-nas' },
            { label: 'Kontakt', path: '/kontakt' }
          ].map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`text-sm font-bold tracking-tight transition-all relative py-2
                ${location.pathname === item.path ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all" />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions (Right side) */}
        <div className="flex items-center gap-4">
          <Link to="/kontakt" className="hidden md:flex bg-primary hover:bg-black text-white px-7 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-primary/25 shadow-primary/10 items-center gap-2">
            <Phone className="w-4 h-4" />
            Kontakt
          </Link>
          
          {/* Transparent Spacer for Absolute Button placement on mobile */}
          <div className="md:hidden w-12 h-12" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="md:hidden absolute top-[calc(100%+12px)] left-0 right-0 bg-white rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden z-[115]"
          >
            <div className="flex flex-col p-6 space-y-2">
              {[
                { label: 'Główna', path: '/' },
                { label: 'Usługi', path: '/uslugi' },
                { label: 'O nas', path: '/o-nas' },
                { label: 'Kontakt', path: '/kontakt' }
              ].map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`text-xl font-black p-4 rounded-2xl transition-colors flex items-center justify-between group
                    ${location.pathname === item.path ? 'text-primary bg-primary/5' : 'text-slate-800 hover:bg-slate-50'}`}
                >
                  {item.label}
                  <ArrowRight className={`w-5 h-5 transition-all ${location.pathname === item.path ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </Link>
              ))}
              <div className="h-px bg-slate-100 my-4" />
              <Link to="/kontakt" className="bg-primary hover:bg-black text-white text-center py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3">
                <Phone className="w-6 h-6" />
                Umów bezpłatną wycenę
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
