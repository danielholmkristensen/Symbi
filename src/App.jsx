import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, ShieldCheck, Activity, Terminal, CheckCircle2, Database, Network, ChevronDown } from 'lucide-react';
import { useLanguage } from './i18n/LanguageContext';
import { languages } from './i18n/translations';

gsap.registerPlugin(ScrollTrigger);

// Language Switcher Component
function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm text-white"
      >
        <span>{currentLang?.flag}</span>
        <span className="hidden sm:inline">{currentLang?.name}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-symbi-navy border border-symbi-blue/30 rounded-lg shadow-xl overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
              className={`flex items-center gap-3 px-4 py-2.5 w-full text-left hover:bg-white/10 transition-colors text-sm ${
                language === lang.code ? 'text-symbi-amber' : 'text-white'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const momsNumRef = useRef(null);
  const checklistRef = useRef(null);
  const heroRef = useRef(null);
  const philosophyRef = useRef(null);

  // Navbar Scroll Logic
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations + Blur Effect
  useEffect(() => {
    // Hero Animation
    gsap.fromTo('.hero-text',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.2 }
    );

    // Blur effect for sections as they scroll past
    const blurSections = document.querySelectorAll('.blur-on-scroll');
    blurSections.forEach((section) => {
      gsap.to(section, {
        filter: 'blur(8px)',
        opacity: 0.6,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 20%',
          end: 'top -30%',
          scrub: 1,
        },
      });
    });

    // Feature 2: Moms Counter
    if (momsNumRef.current) {
      gsap.to(momsNumRef.current, {
        innerHTML: 349500,
        duration: 2.5,
        snap: { innerHTML: 1 },
        ease: "power2.out",
        scrollTrigger: {
          trigger: momsNumRef.current,
          start: "top 85%",
        },
        onUpdate: function() {
          if(momsNumRef.current) {
            momsNumRef.current.innerHTML = Number(momsNumRef.current.innerHTML).toLocaleString('da-DK') + ' DKK';
          }
        }
      });
    }

    // Feature 3: Checklist Stagger
    gsap.fromTo('.checklist-item',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.3, duration: 0.8, ease: "power2.out", scrollTrigger: {
        trigger: checklistRef.current,
        start: "top 80%"
      }}
    );
    gsap.fromTo('.progress-fill',
      { width: "0%" },
      { width: "100%", duration: 1.5, ease: "power3.inOut", delay: 0.5, scrollTrigger: {
        trigger: checklistRef.current,
        start: "top 80%"
      }}
    );

    // Philosophy Reveal
    gsap.fromTo('.philosophy-text',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.3, ease: "power3.out", scrollTrigger: {
        trigger: philosophyRef.current,
        start: "top 70%"
      }}
    );

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="font-sans text-symbi-navy selection:bg-symbi-amber selection:text-symbi-navy">

      {/* A. NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-symbi-navy/90 backdrop-blur-md border-b border-symbi-blue/30 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-[1180px] mx-auto px-6 flex justify-between items-center">
          <div className="text-white font-bold text-2xl tracking-tight flex items-center gap-1">
            Symbi<span className="text-symbi-amber w-2 h-2 rounded-full bg-symbi-amber block mb-4"></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-symbi-gray">
            <a href="#product" className="hover:text-white transition-colors">{t('nav.product')}</a>
            <a href="#pricing" className="hover:text-white transition-colors">{t('nav.pricing')}</a>
            <a href="#manifesto" className="hover:text-white transition-colors">{t('nav.whySymbi')}</a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button className="bg-symbi-amber text-symbi-navy px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-yellow-500 transition-colors shadow-[0_0_15px_rgba(232,160,32,0.3)]">
              {t('nav.bookDemo')}
            </button>
          </div>
        </div>
      </nav>

      {/* B. HERO SECTION */}
      <section className="relative h-[100dvh] flex items-center justify-center bg-symbi-navy overflow-hidden blur-on-scroll">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Nordic Office Minimalist"
            className="w-full h-full object-cover opacity-40 grayscale mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-symbi-navy via-symbi-navy/80 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-[800px] px-6 mt-16" ref={heroRef}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none text-white hero-text">
            {t('hero.title1')}
          </h1>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none text-symbi-amber mt-2 hero-text">
            {t('hero.title2')}
          </h1>
          <p className="mt-8 text-lg md:text-xl text-symbi-gray font-light max-w-2xl mx-auto hero-text">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* C. FEATURES - "The Orchestration Engine" */}
      <section id="product" className="py-32 bg-symbi-white px-6 blur-on-scroll">
        <div className="max-w-[1180px] mx-auto">
          <div className="mb-16">
            <h2 className="text-sm font-mono text-symbi-blue uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity size={16}/> {t('features.architecture')}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{t('features.engineTitle')}</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-symbi-navy/5 text-symbi-navy rounded-lg flex items-center justify-center mb-6">
                  <FileText size={24} />
                </div>
                <h4 className="text-xl font-semibold mb-2">{t('features.bilagTitle')}</h4>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">{t('features.bilagDesc')}</p>
              </div>
              <div className="bg-symbi-navy rounded-lg p-5 font-mono text-xs text-symbi-gray relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-symbi-amber"></div>
                <div className="flex justify-between mb-2"><span>{t('features.invoiceNo')}</span> <span className="text-white">INV-8892</span></div>
                <div className="flex justify-between mb-2"><span>{t('features.date')}</span> <span className="text-white">26/02/2026</span></div>
                <div className="flex justify-between"><span>{t('features.amount')}</span> <span className="text-symbi-amber">3,490 DKK</span></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-symbi-amber/10 text-symbi-amber rounded-lg flex items-center justify-center mb-6">
                  <Database size={24} />
                </div>
                <h4 className="text-xl font-semibold mb-2">{t('features.momsTitle')}</h4>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">{t('features.momsDesc')}</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-5 bg-gray-50/50">
                <div className="text-xs font-mono text-gray-500 mb-1">{t('features.momsOwed')}</div>
                <div ref={momsNumRef} className="text-2xl font-bold font-mono text-symbi-navy mb-4">0</div>
                <div className="flex gap-2 h-2">
                  <div className="bg-symbi-blue h-full rounded-l-full w-[60%]"></div>
                  <div className="bg-gray-300 h-full rounded-r-full w-[40%]"></div>
                </div>
                <div className="flex justify-between text-[10px] mt-2 text-gray-400 font-mono uppercase">
                  <span>{t('features.incoming')}</span>
                  <span>{t('features.outgoing')}</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col justify-between" ref={checklistRef}>
              <div>
                <div className="w-12 h-12 bg-symbi-navy/5 text-symbi-navy rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="text-xl font-semibold mb-2">{t('features.complianceTitle')}</h4>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">{t('features.complianceDesc')}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm checklist-item">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span className="text-gray-700 font-medium">{t('features.digitalStorage')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm checklist-item">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span className="text-gray-700 font-medium">{t('features.backup')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm checklist-item">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span className="text-gray-700 font-medium">{t('features.auditTrail')}</span>
                </div>
                <div className="h-1 w-full bg-gray-100 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-symbi-amber progress-fill w-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. PHILOSOPHY - "The Manifesto" */}
      <section id="manifesto" className="py-40 bg-symbi-navy text-center px-6 blur-on-scroll" ref={philosophyRef}>
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6 philosophy-text">
            {t('philosophy.line1')}
          </h2>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-symbi-gray philosophy-text">
            {t('philosophy.line2')} <span className="text-symbi-amber font-bold">{t('philosophy.highlight')}</span>
          </h2>
        </div>
      </section>

      {/* E. PROTOCOL - "The 3-Day Onboarding" */}
      <section className="bg-symbi-white relative">
        {/* Panel 1 */}
        <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center bg-white border-b border-gray-100">
          <div className="max-w-[1180px] w-full px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-symbi-amber font-mono font-bold text-sm mb-4">{t('protocol.day01')}</div>
              <h2 className="text-4xl font-bold tracking-tight mb-4">{t('protocol.day01Title')}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{t('protocol.day01Desc')}</p>
            </div>
            <div className="bg-gray-50 h-[400px] rounded-xl border border-gray-200 flex items-center justify-center relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000')] opacity-5 mix-blend-multiply bg-cover"></div>
              <div className="flex items-center gap-8 z-10">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 font-mono text-symbi-blue font-bold">e-conomic</div>
                <Network className="text-symbi-gray animate-pulse" size={32} />
                <div className="bg-symbi-navy p-6 rounded-lg shadow-md font-bold text-white tracking-tight text-xl">Symbi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center bg-gray-50 border-b border-gray-200">
          <div className="max-w-[1180px] w-full px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-symbi-amber font-mono font-bold text-sm mb-4">{t('protocol.day02')}</div>
              <h2 className="text-4xl font-bold tracking-tight mb-4">{t('protocol.day02Title')}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{t('protocol.day02Desc')}</p>
            </div>
            <div className="bg-white h-[400px] rounded-xl border border-gray-200 p-8 shadow-xl flex flex-col justify-center gap-6">
               <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                 <span className="font-mono text-sm text-symbi-navy">{t('protocol.autoReconcile')}</span>
                 <div className="w-10 h-5 bg-symbi-amber rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div></div>
               </div>
               <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                 <span className="font-mono text-sm text-symbi-navy">{t('protocol.exceptionFlag')}</span>
                 <div className="w-10 h-5 bg-symbi-amber rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div></div>
               </div>
               <div className="flex items-center justify-between pb-4 opacity-50">
                 <span className="font-mono text-sm text-gray-500">{t('protocol.manualOverride')}</span>
                 <div className="w-10 h-5 bg-gray-200 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5"></div></div>
               </div>
            </div>
          </div>
        </div>

        {/* Panel 3 */}
        <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center bg-[#f4f6f8]">
          <div className="max-w-[1180px] w-full px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-symbi-amber font-mono font-bold text-sm mb-4">{t('protocol.day03')}</div>
              <h2 className="text-4xl font-bold tracking-tight mb-4">{t('protocol.day03Title')}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{t('protocol.day03Desc')}</p>
            </div>
            <div className="bg-symbi-navy h-[400px] rounded-xl border border-symbi-blue/30 overflow-hidden relative shadow-2xl flex items-center justify-center">
               <div className="absolute inset-0 flex flex-col justify-around py-10 opacity-30">
                 <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-symbi-amber to-transparent"></div>
                 <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-symbi-amber to-transparent translate-x-10"></div>
                 <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-symbi-amber to-transparent -translate-x-10"></div>
               </div>
               <div className="z-10 bg-white/10 backdrop-blur-md px-8 py-4 rounded-lg border border-white/20 text-white font-mono flex items-center gap-3">
                 <Terminal size={18} className="text-symbi-amber" />
                 {t('protocol.statusAutonomous')}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* F. PRICING */}
      <section id="pricing" className="py-32 bg-white px-6 blur-on-scroll">
        <div className="max-w-[1180px] mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">{t('pricing.title')}</h2>
          <p className="text-gray-600 mb-16 max-w-xl mx-auto">{t('pricing.subtitle')}</p>

          <div className="grid md:grid-cols-3 gap-8 text-left items-center">
            {/* Starter */}
            <div className="border border-gray-200 rounded-xl p-8 bg-gray-50">
              <h3 className="text-lg font-semibold text-symbi-navy mb-2">{t('pricing.starter')}</h3>
              <div className="text-3xl font-bold mb-6 font-mono">1,490 <span className="text-sm text-gray-500 font-sans">{t('pricing.perMonth')}</span></div>
              <ul className="space-y-4 mb-8 text-sm text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-symbi-blue"/> {t('pricing.bilagAgent')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-symbi-blue"/> {t('pricing.momsAgent')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-symbi-blue"/> {t('pricing.standardSupport')}</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-gray-300 font-semibold text-symbi-navy hover:bg-gray-100 transition-colors">{t('pricing.startTrial')}</button>
            </div>

            {/* Growth */}
            <div className="border-2 border-symbi-amber rounded-xl p-10 bg-white shadow-2xl relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-symbi-amber text-symbi-navy px-4 py-1 rounded-full text-xs font-bold tracking-wide">{t('pricing.recommended')}</div>
              <h3 className="text-xl font-semibold text-symbi-navy mb-2">{t('pricing.growth')}</h3>
              <div className="text-4xl font-bold mb-6 font-mono">3,490 <span className="text-sm text-gray-500 font-sans">{t('pricing.perMonth')}</span></div>
              <ul className="space-y-4 mb-8 text-sm text-gray-700 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-symbi-amber"/> {t('pricing.allAgents')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-symbi-amber"/> {t('pricing.skatAgent')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-symbi-amber"/> {t('pricing.priorityOnboard')}</li>
              </ul>
              <button className="w-full py-4 rounded-lg bg-symbi-amber text-symbi-navy font-bold hover:bg-yellow-500 transition-colors shadow-lg">{t('pricing.provisionWorkspace')}</button>
            </div>

            {/* Scale */}
            <div className="border border-gray-200 rounded-xl p-8 bg-gray-50">
              <h3 className="text-lg font-semibold text-symbi-navy mb-2">{t('pricing.scale')}</h3>
              <div className="text-3xl font-bold mb-6 font-mono">6,990 <span className="text-sm text-gray-500 font-sans">{t('pricing.perMonth')}</span></div>
              <ul className="space-y-4 mb-8 text-sm text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-symbi-blue"/> {t('pricing.customWorkflows')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-symbi-blue"/> {t('pricing.dedicatedManager')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-symbi-blue"/> {t('pricing.fullApi')}</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-gray-300 font-semibold text-symbi-navy hover:bg-gray-100 transition-colors">{t('pricing.contactSales')}</button>
            </div>
          </div>
        </div>
      </section>

      {/* G. FOOTER */}
      <footer className="bg-symbi-navy pt-24 pb-12 px-6 border-t border-symbi-blue/20">
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="text-white font-bold text-3xl tracking-tight flex items-center gap-1 mb-4">
              Symbi<span className="text-symbi-amber w-2 h-2 rounded-full bg-symbi-amber block mb-4"></span>
            </div>
            <p className="text-symbi-gray max-w-sm">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">{t('footer.platform')}</h4>
            <ul className="space-y-3 text-symbi-gray text-sm">
              <li><a href="#" className="hover:text-symbi-amber transition-colors">{t('footer.orchestrationEngine')}</a></li>
              <li><a href="#" className="hover:text-symbi-amber transition-colors">{t('footer.complianceMonitor')}</a></li>
              <li><a href="#" className="hover:text-symbi-amber transition-colors">{t('footer.securityArch')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">{t('footer.legal')}</h4>
            <ul className="space-y-3 text-symbi-gray text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.dpa')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1180px] mx-auto border-t border-symbi-blue/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-symbi-gray text-xs">{t('footer.copyright')}</div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
            <span className="font-mono text-xs text-symbi-gray tracking-wide uppercase">{t('footer.systemStatus')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
