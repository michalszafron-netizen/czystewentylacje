import { Phone, Wind, ShieldCheck, BadgeCheck, Play, Calendar, CheckCircle2, ArrowLeft, ArrowRight, Mail, MapPin, Star } from "lucide-react";
import { motion } from "motion/react";

const Header = () => (
  <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl font-black italic tracking-tighter text-slate-900 leading-none">Rotobrush</h1>
        <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">International LLC</span>
      </div>
      <nav className="hidden md:flex items-center gap-10">
        <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#">Główna</a>
        <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#">Usługi</a>
        <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#">Testymonia</a>
        <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#">Kontakt</a>
      </nav>
      <button className="bg-primary hover:bg-red-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md shadow-primary/20 flex items-center gap-2">
        <Phone className="w-4 h-4" />
        Zadzwoń teraz!
      </button>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-[550px] rounded-xl overflow-hidden relative group shadow-sm border border-slate-100"
    >
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <img 
        className="absolute inset-0 w-full h-full object-cover" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN3Xps-tSq3OxaWeC95acaZVrTgJlX-NcaF3nEotOWKExdtwp_PZTge5vEZKA3YBnQX9HCp_xrWSYuwaEqsYx7LVObez23TD479iFZtMVs3akSfUinSriTzjwsiXKSVCzlJLucn2HffQK_7DHZBWHNB9g5fEbAV-54BnNfUWi4uSUJvjHN1NiuzdYU3Qic82ojkG_hnoent-omdrcCp5p0UKcHOC5K1CkzxNXgFvMR3XuxxMliMcd2iFJ6hhXQbmDsmTQi2T1oBiNd" 
        alt="Rotobrush Hero"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(227,53,57,0.6)] cursor-pointer"
        >
          <Play className="text-white w-10 h-10 fill-current ml-1" />
        </motion.div>
        <h2 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight max-w-3xl">
          Oddychaj Czystym Powietrzem...
        </h2>
        <p className="text-white/90 mt-4 text-lg max-w-xl font-light">
          Twoje zdrowie zaczyna się od czystej wentylacji. Profesjonalne rozwiązania dla domów i firm od światowego lidera.
        </p>
        <button className="mt-10 bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center gap-3">
          Zarezerwuj teraz!
          <Calendar className="w-6 h-6" />
        </button>
      </div>
    </motion.div>

    {/* Stats Card */}
    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] md:w-full max-w-5xl z-30">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-xl shadow-xl border border-slate-100">
        {[
          { label: "Lat w branży", value: "10+" },
          { label: "Klientów", value: "700+" },
          { label: "m³ kanałów", value: "100k" },
          { label: "Certyfikaty", value: "22" },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center justify-center border-r border-slate-100 last:border-0 p-2">
            <span className="text-primary text-3xl font-black">{stat.value}</span>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider text-center">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Services = () => (
  <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
    <div className="bg-white p-8 rounded-xl border border-slate-100 flex flex-col items-start gap-4 hover:shadow-lg transition-all">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
        <Wind className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">Czyszczenie Kanałów</h3>
      <p className="text-slate-500 text-sm leading-relaxed">
        Usuwamy kurz, pył i zanieczyszczenia mechaniczne przy użyciu zaawansowanych szczotek Rotobrush.
      </p>
      <a className="mt-auto text-primary font-bold text-sm flex items-center gap-1 group" href="#">
        Dowiedz się więcej <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>

    <div className="bg-white p-8 rounded-xl border border-slate-100 flex flex-col items-start gap-4 hover:shadow-lg transition-all">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
        <ShieldCheck className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">Dezynfekcja</h3>
      <p className="text-slate-500 text-sm leading-relaxed">
        Eliminacja bakterii, grzybów i wirusów metodą zamgławiania atestowanymi preparatami biobójczymi.
      </p>
      <a className="mt-auto text-primary font-bold text-sm flex items-center gap-1 group" href="#">
        Dowiedz się więcej <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>

    <div className="bg-slate-900 p-8 rounded-xl text-white border border-slate-100 flex flex-col gap-4 relative overflow-hidden group">
      <div className="relative z-10">
        <span className="bg-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest mb-4 inline-block">Dlaczego my?</span>
        <h3 className="text-xl font-bold">Standard International</h3>
        <p className="text-slate-400 text-sm leading-relaxed mt-2">
          Jako autoryzowany partner Rotobrush International LLC, korzystamy z najnowocześniejszego sprzętu na świecie, zapewniając jakość, której nie dorówna konkurencja.
        </p>
      </div>
      <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
        <BadgeCheck className="w-[160px] h-[160px]" />
      </div>
    </div>
  </section>
);

const Process = () => (
  <section className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
    <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
      <div className="lg:col-span-3 aspect-video relative group cursor-pointer bg-slate-200">
        <img 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo4btdcIfz0hsHqiqgYwwEegJno4kDMIYzWhLYwwcyIKtCzZEs_3jxt4znXDj_85wh3FtfIW0qVp-BSxISQNNkeNPL6y4rzytN8UJtXRxMjJczwatavI16yG5fiGgKFai7-cgR2HJ0Gls9j7CGb1gHFuSYZ0jSBxPG-xTkdrLzUfGV__0F8l62y49jjWEwZ5BqAeOlr6N74Gr2kw3In2TXGmgd6OP317sD9fhz7NaDsubfsk3els_6MLL7ithrPuy4lgPUgs4IuM2w" 
          alt="Process Video"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-all">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play className="text-white w-8 h-8 fill-current ml-1" />
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 p-10 flex flex-col justify-center gap-6">
        <h3 className="text-3xl font-black text-slate-900 leading-tight">Zobacz jak pracujemy</h3>
        <p className="text-slate-500 leading-relaxed">
          Nasz proces jest transparentny, czysty i niezwykle skuteczny. Wykorzystujemy kamery inspekcyjne, aby pokazać Ci różnicę "przed" i "po" wykonaniu usługi.
        </p>
        <ul className="space-y-3">
          {[
            "Pełna wideo-inspeksja kanałów",
            "Bezpyłowa technologia HEPA",
            "Raport techniczny po usłudze"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="space-y-6">
    <div className="flex items-end justify-between px-2">
      <div>
        <h2 className="text-3xl font-black text-slate-900">Co mówią klienci</h2>
        <p className="text-slate-500">Zaufali nam najwięksi i klienci indywidualni.</p>
      </div>
      <div className="flex gap-2">
        <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-8 rounded-xl border border-slate-100 flex flex-col gap-6 hover:shadow-md transition-all">
        <div className="flex gap-1 text-primary">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
        </div>
        <p className="text-slate-700 font-medium italic">"Pełen profesjonalizm. Po czyszczeniu wentylacji w biurze jakość powietrza uległa diametralnej poprawie. Polecam każdemu przedsiębiorcy."</p>
        <div className="flex items-center gap-4 mt-auto">
          <img 
            className="w-12 h-12 rounded-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKufSuUuovsj-ev8MLhZqGSToxh4maRT5k8i9ApAPO7k9SgHQ5Lc0h3dmDNOejhXlv8nSDkEuEukB-EoqTi3z5NbXiJTXToipBGgXGMumdJJ3BdOGKalu_SlscK5MmVrnSsqeD_r3Yu9CCPsHfiT_hXFiMrUBVoEgxuvA3MhbNc_-NbwJNmmXADLnWvjgVxif2PD266gGPBWeIQ856QAbkUSTgT4WSpSVxJf6TNGdNWMWti8feIigAVsh1tdf1ueNAyR6BF7ULZJ0M" 
            alt="Marek Kowalski"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="font-bold text-slate-900 text-sm">Marek Kowalski</p>
            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">CEO Tech Solutions</p>
          </div>
        </div>
      </div>

      <div className="bg-primary p-8 rounded-xl text-white flex flex-col gap-6 shadow-xl shadow-primary/20">
        <div className="flex gap-1 text-white">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
        </div>
        <p className="font-medium italic">"Usługa wykonana szybko i co najważniejsze - bez bałaganu w mieszkaniu. Rotobrush to sprzęt z innej ligi. Bardzo rzetelna firma."</p>
        <div className="flex items-center gap-4 mt-auto">
          <img 
            className="w-12 h-12 rounded-full object-cover border-2 border-white/20" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMBWfs9uyMMxu4pIId8lJ8hL-VSSsbykCl0XLIvCqXrnY-07bcpTJvqEjgyuE4vv3rpJjeQgzL_SoO6Ci6RAqMELXSbtGQw0tg9cbCiLebompJO1p51hxjLpmPp8ZW0YhaVGf7nUTog_V2jO8x3UmE5HSUcZDHsc7IDhAD6jry-f_3U9I6BbXMlljXE5ssx1W9O5A_c705gNEY5PB5BPdVIZpFAZejxd7Bbz62t2Gy4fEAQi47A--VdsYOgH-HNq4ob8lYBLIL10n-" 
            alt="Anna Nowak"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="font-bold text-sm">Anna Nowak</p>
            <p className="text-white/70 text-xs uppercase tracking-widest font-bold">Klient Indywidualny</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-100 flex flex-col gap-6 hover:shadow-md transition-all">
        <div className="flex gap-1 text-primary">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
        </div>
        <p className="text-slate-700 font-medium italic">"Współpracujemy z Rotobrush regularnie przy serwisowaniu naszych obiektów gastronomicznych. Niezawodni, terminowi i fachowi."</p>
        <div className="flex items-center gap-4 mt-auto">
          <img 
            className="w-12 h-12 rounded-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLRtQH1RjFuhTR-OKxQRw64WJaudtXw975bqti8nw7rSN2LGa0kvAamDxbfWpyEhL6msuhFIjwYNN7OS_8jVnHoYK-lWjObdPWwpgLx04SVd1V60YPtPGFinEZG2e6jBjidEoEtm_acaAHEr3J5TqzcknwgLp6BdNmnQbNaqxZ6bhZQ380Vzg1zEFHBhriWFUtunbdki7trRF8HuaRp-DWYhwlgMG6Tki6Desj4W5mhdBUaj9VdGQHGLxCvB3QxG4BghU701gd1gPP" 
            alt="Tomasz Wiśniewski"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="font-bold text-slate-900 text-sm">Tomasz Wiśniewski</p>
            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Manager Restauracji</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-slate-100 mt-20 py-16">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex flex-col mb-6">
          <h1 className="text-2xl font-black italic tracking-tighter text-slate-900 leading-none">Rotobrush</h1>
          <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">International LLC</span>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed">
          Światowy lider w technologii czyszczenia kanałów wentylacyjnych i klimatyzacyjnych.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-6">Usługi</h4>
        <ul className="space-y-4 text-sm text-slate-500">
          <li><a className="hover:text-primary transition-colors" href="#">Czyszczenie domowe</a></li>
          <li><a className="hover:text-primary transition-colors" href="#">Obsługa firm</a></li>
          <li><a className="hover:text-primary transition-colors" href="#">Dezynfekcja UV-C</a></li>
          <li><a className="hover:text-primary transition-colors" href="#">Inspekcja wideo</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-6">Firma</h4>
        <ul className="space-y-4 text-sm text-slate-500">
          <li><a className="hover:text-primary transition-colors" href="#">O nas</a></li>
          <li><a className="hover:text-primary transition-colors" href="#">Certyfikaty</a></li>
          <li><a className="hover:text-primary transition-colors" href="#">Kariera</a></li>
          <li><a className="hover:text-primary transition-colors" href="#">Kontakt</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-6">Kontakt</h4>
        <ul className="space-y-4 text-sm text-slate-500">
          <li className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-primary" />
            +48 123 456 789
          </li>
          <li className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-primary" />
            kontakt@rotobrush.pl
          </li>
          <li className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-primary" />
            Warszawa, Polska
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
      <p>© 2024 Rotobrush International LLC. Wszystkie prawa zastrzeżone.</p>
      <div className="flex gap-6">
        <a className="hover:text-slate-900" href="#">Polityka prywatności</a>
        <a className="hover:text-slate-900" href="#">Regulamin</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-primary selection:text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-24">
        <Hero />
        <Services />
        <Process />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
