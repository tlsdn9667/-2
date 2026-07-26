/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  motion, AnimatePresence 
} from 'motion/react';
import { 
  Mail, Instagram, ArrowDown, Menu, X, FileText, Settings, Database, Eye, ChevronRight
} from 'lucide-react';
import { 
  getTheatreWorks, 
  getExhibitionWorks, 
  getEssayWorks, 
  getNovelWorks, 
  getResidencies, 
  getAwards, 
  getCV, 
  getAbout, 
  getContact,
  getDatabaseStatus,
  initializeLocalStorage,
  getActiveUser,
  subscribeToAuth,
  resolveImgUrl
} from './lib/db';
import { 
  TheatreWork, ExhibitionWork, EssayWork, NovelWork, ResidencyItem, AwardItem, CVSection 
} from './types';
import AdminPanel from './components/AdminPanel';

type TabType = 'home' | 'work' | 'residencies' | 'awards' | 'cv' | 'about' | 'contact';
type WorkSubTab = 'theatre' | 'exhibition' | 'essay' | 'novel';

export default function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [workSubTab, setWorkSubTab] = useState<WorkSubTab>('theatre');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  
  // Hidden admin states
  const [adminVisible, setAdminVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  // Data states
  const [theatreWorks, setTheatreWorks] = useState<TheatreWork[]>([]);
  const [exhibitionWorks, setExhibitionWorks] = useState<ExhibitionWork[]>([]);
  const [essayWorks, setEssayWorks] = useState<EssayWork[]>([]);
  const [novelWorks, setNovelWorks] = useState<NovelWork[]>([]);
  const [residencies, setResidencies] = useState<ResidencyItem[]>([]);
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [cvData, setCvData] = useState<any>(null);
  const [aboutData, setAboutData] = useState<any>(null);
  const [contactData, setContactData] = useState<any>(null);
  
  // Interactive UI states
  const [expandedResidencies, setExpandedResidencies] = useState<Record<string, boolean>>({});
  const [dbStatus, setDbStatus] = useState(getDatabaseStatus());

  // Ref for scrolling
  const historySilentRef = useRef<HTMLDivElement>(null);
  const cvRightPaneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeLocalStorage();
    loadAllArchiveData();

    // Check url queries
    if (window.location.search.includes('admin=true') || window.location.search.includes('tlsdn9667')) {
      setAdminVisible(true);
    }

    // Subscribe to auth state
    const unsub = subscribeToAuth((u) => {
      if (u && u.email === 'tlsdn9667@gmail.com') {
        setAdminVisible(true);
      }
    });
    return unsub;
  }, []);

  const loadAllArchiveData = async () => {
    try {
      const [t, ex, es, nv, r, aw, cv, ab, co] = await Promise.all([
        getTheatreWorks(),
        getExhibitionWorks(),
        getEssayWorks(),
        getNovelWorks(),
        getResidencies(),
        getAwards(),
        getCV(),
        getAbout(),
        getContact()
      ]);
      setTheatreWorks(t);
      setExhibitionWorks(ex);
      setEssayWorks(es);
      setNovelWorks(nv);
      setResidencies(r);
      setAwards(aw);
      setCvData(cv);
      setAboutData(ab);
      setContactData(co);
      setDbStatus(getDatabaseStatus());
    } catch (e) {
      console.error("Error loading archive data", e);
    }
  };

  const handleScrollDownFromHome = () => {
    historySilentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleResidency = (id: string) => {
    setExpandedResidencies(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrintCV = () => {
    window.print();
  };

  const scrollToCVSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col selection:bg-black selection:text-white">
      {/* Header & Minimalist Top Nav */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-black/5 no-print">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex flex-col items-start cursor-pointer text-left"
          >
            <span className="font-serif text-lg tracking-[0.25em] font-medium leading-none mb-1">KIM WOO YOUNG</span>
            <span className="text-[9px] font-mono tracking-widest text-black/50 uppercase leading-none">Playwright & Writer</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => setActiveTab('home')}
              className={`text-xs tracking-[0.2em] font-mono uppercase cursor-pointer transition-colors ${activeTab === 'home' ? 'text-black font-semibold' : 'text-black/50 hover:text-black'}`}
            >
              HOME
            </button>
            
            {/* WORK Nav with interactive hover dropdown indicator */}
            <div className="relative group">
              <button 
                onClick={() => {
                  setActiveTab('work');
                }}
                className={`text-xs tracking-[0.2em] font-mono uppercase cursor-pointer transition-colors flex items-center gap-1 ${activeTab === 'work' ? 'text-black font-semibold' : 'text-black/50 hover:text-black'}`}
              >
                WORK
              </button>
            </div>

            <button 
              onClick={() => setActiveTab('residencies')}
              className={`text-xs tracking-[0.2em] font-mono uppercase cursor-pointer transition-colors ${activeTab === 'residencies' ? 'text-black font-semibold' : 'text-black/50 hover:text-black'}`}
            >
              RESIDENCIES
            </button>

            <button 
              onClick={() => setActiveTab('awards')}
              className={`text-xs tracking-[0.2em] font-mono uppercase cursor-pointer transition-colors ${activeTab === 'awards' ? 'text-black font-semibold' : 'text-black/50 hover:text-black'}`}
            >
              AWARDS
            </button>

            <button 
              onClick={() => setActiveTab('cv')}
              className={`text-xs tracking-[0.2em] font-mono uppercase cursor-pointer transition-colors ${activeTab === 'cv' ? 'text-black font-semibold' : 'text-black/50 hover:text-black'}`}
            >
              CV
            </button>

            <button 
              onClick={() => setActiveTab('about')}
              className={`text-xs tracking-[0.2em] font-mono uppercase cursor-pointer transition-colors ${activeTab === 'about' ? 'text-black font-semibold' : 'text-black/50 hover:text-black'}`}
            >
              ABOUT
            </button>

            <button 
              onClick={() => setActiveTab('contact')}
              className={`text-xs tracking-[0.2em] font-mono uppercase cursor-pointer transition-colors ${activeTab === 'contact' ? 'text-black font-semibold' : 'text-black/50 hover:text-black'}`}
            >
              CONTACT
            </button>
          </nav>

          {/* Desktop Right Panel (Admin Trigger & DB State) */}
          <div className="hidden lg:flex items-center gap-4 no-print">
            <button
              onClick={() => setAdminOpen(true)}
              className="flex items-center gap-1.5 border border-black px-4 py-2 text-[10px] tracking-widest font-mono uppercase hover:bg-black hover:text-white transition-all cursor-pointer"
            >
              <Settings size={12} />
              ADMIN PANEL
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-black cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 bg-white border-b border-black/10 z-30 flex flex-col p-6 space-y-4 shadow-xl lg:hidden no-print font-mono"
          >
            {[
              { id: 'home', label: 'HOME' },
              { id: 'work', label: 'WORK' },
              { id: 'residencies', label: 'RESIDENCIES' },
              { id: 'awards', label: 'AWARDS' },
              { id: 'cv', label: 'CV' },
              { id: 'about', label: 'ABOUT' },
              { id: 'contact', label: 'CONTACT' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id as TabType);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-xs tracking-widest uppercase py-2 border-b border-black/5 ${
                  activeTab === link.id ? 'text-black font-bold' : 'text-black/60'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAdminOpen(true);
              }}
              className="flex items-center justify-center gap-1.5 border border-black py-3 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all font-semibold"
            >
              <Settings size={14} />
              ADMIN PANEL
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          
          {/* HOME TAB */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fade-in"
            >
              {/* Splash First Pane: Pristine & Extremely Minimalist */}
              <div className="h-[90vh] flex flex-col justify-between items-center text-center px-6 py-16 bg-white">
                <div />
                
                <div className="space-y-4">
                  <motion.h1 
                    initial={{ letterSpacing: '0.1em', opacity: 0 }}
                    animate={{ letterSpacing: '0.3em', opacity: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="font-serif text-5xl md:text-7xl font-light text-black tracking-[0.3em] uppercase select-none leading-none"
                  >
                    KIM WOO YOUNG
                  </motion.h1>
                  <p className="text-xs md:text-sm font-mono tracking-[0.4em] text-black/50 uppercase select-none">
                    Playwright &amp; Writer
                  </p>
                </div>

                <button 
                  onClick={handleScrollDownFromHome}
                  className="group flex flex-col items-center gap-2 cursor-pointer animate-bounce"
                >
                  <span className="text-[10px] font-mono tracking-widest text-black/40 uppercase group-hover:text-black transition-colors">Scroll</span>
                  <ArrowDown size={14} className="text-black/40 group-hover:text-black transition-colors" />
                </button>
              </div>

              {/* Second Scroll Pane: Full Screen Deep Black, Spacious Poetic Accent */}
              <div 
                ref={historySilentRef}
                className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 py-20 text-center select-none"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="max-w-3xl space-y-8"
                >
                  <p className="font-serif italic text-3xl md:text-5xl font-light tracking-wide text-neutral-200 leading-relaxed">
                    “Stories begin where history falls silent.”
                  </p>
                  <div className="w-12 h-px bg-white/20 mx-auto" />
                  <p className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                    KIM WOO YOUNG · ARTIST MANIFESTO
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* WORK TAB */}
          {activeTab === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-6 py-12 md:py-20 fade-in"
            >
              {/* Sub navigation for Work categories */}
              <div className="flex justify-center border-b border-black/10 pb-4 mb-16 no-print">
                <div className="flex gap-4 md:gap-12 flex-wrap justify-center">
                  {[
                    { id: 'theatre', label: 'THEATRE' },
                    { id: 'exhibition', label: 'EXHIBITION' },
                    { id: 'essay', label: 'ESSAY' },
                    { id: 'novel', label: 'NOVEL' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setWorkSubTab(sub.id as WorkSubTab)}
                      className={`text-xs md:text-sm tracking-[0.25em] font-mono uppercase cursor-pointer pb-2 relative transition-all ${
                        workSubTab === sub.id 
                          ? 'text-black font-bold' 
                          : 'text-black/45 hover:text-black'
                      }`}
                    >
                      {sub.label}
                      {workSubTab === sub.id && (
                        <motion.div 
                          layoutId="activeSubBorder" 
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-black" 
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Contents */}
              <AnimatePresence mode="wait">
                
                {/* 1. THEATRE SUBTAB */}
                {workSubTab === 'theatre' && (
                  <motion.div
                    key="theatre-list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-16"
                  >
                    {theatreWorks.map((work) => (
                      <div 
                        key={work.id}
                        className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-b border-black/5 pb-16 items-start"
                      >
                        {/* Year & Index */}
                        <div className="col-span-1 md:col-span-2">
                          <span className="font-mono text-lg font-light tracking-widest text-black/30 block mb-1">
                            {work.year}
                          </span>
                          <span className="text-[10px] font-mono text-black/50 tracking-widest uppercase">
                            PLAYWRITING
                          </span>
                        </div>

                        {/* Text & Synopsis */}
                        <div className="col-span-1 md:col-span-6 space-y-6">
                          <h3 className="font-serif text-2xl md:text-3xl tracking-widest uppercase font-medium group-hover:text-black/85 transition-colors">
                            {work.title}
                          </h3>
                          <div className="space-y-4">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-black/40 block">Synopsis</span>
                            <p className="text-sm text-black/75 leading-relaxed font-sans whitespace-pre-line">
                              {work.synopsis}
                            </p>
                          </div>

                          {/* Performances */}
                          {work.performances && work.performances.length > 0 && (
                            <div className="space-y-3 pt-2">
                              <span className="text-[10px] font-mono tracking-widest uppercase text-black/40 block">Performances</span>
                              <div className="space-y-2.5">
                                {work.performances.map((perf, idx) => (
                                  <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-xs font-mono border-l-2 border-black/10 pl-3">
                                    <span className="text-black/50 tracking-wider font-medium">{perf.date}</span>
                                    <span className="text-black/80 tracking-wide">{perf.location}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Single Primary Image */}
                        <div className="col-span-1 md:col-span-4">
                          <div className="aspect-[3/2] bg-neutral-100 overflow-hidden relative group border border-black/10">
                            {work.images && work.images[0] ? (
                              <img 
                                src={resolveImgUrl(work.images[0])} 
                                alt={work.title} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale hover:grayscale-0"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-black/5 text-black/40 font-mono text-xs uppercase tracking-widest">
                                ARCHIVE PHOTO
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* 2. EXHIBITION SUBTAB */}
                {workSubTab === 'exhibition' && (
                  <motion.div
                    key="exhibition-list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20"
                  >
                    {exhibitionWorks.map((work) => (
                      <div key={work.id} className="group space-y-6">
                        {/* Large Image presentation */}
                        <div className="aspect-[3/2] overflow-hidden bg-neutral-100 border border-black/10 relative">
                          {work.images && work.images[0] ? (
                            <img 
                              src={resolveImgUrl(work.images[0])} 
                              alt={work.title} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black/5 text-black/40 font-mono text-xs uppercase tracking-widest">
                              EXHIBITION DOC
                            </div>
                          )}
                        </div>

                        {/* Text description */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-black/5 pb-2">
                            <h3 className="font-serif text-xl tracking-widest uppercase font-medium">{work.title}</h3>
                            <span className="font-mono text-xs text-black/40">{work.year}</span>
                          </div>
                          
                          <p className="text-xs font-mono tracking-widest text-black/50 uppercase italic">
                            {work.medium}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* 3. ESSAY SUBTAB */}
                {workSubTab === 'essay' && (
                  <motion.div
                    key="essay-list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-24 max-w-4xl mx-auto"
                  >
                    {essayWorks.map((essay) => (
                      <div key={essay.id} className="space-y-8 border-b border-black/5 pb-20">
                        {/* Title details */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-sm text-black/40">{essay.year}</span>
                            <span className="text-[9px] font-mono tracking-widest bg-black/5 px-2 py-0.5 text-black/60 uppercase">ESSAY</span>
                          </div>
                          <h3 className="font-serif text-3xl tracking-widest uppercase font-medium">{essay.title}</h3>
                          <p className="text-xs font-mono text-black/50 uppercase tracking-widest">
                            Published in: <span className="font-semibold text-black">{essay.publishedIn}</span>
                          </p>
                        </div>

                        {/* Essay context / Description */}
                        <div className="bg-neutral-light p-6 border-l-2 border-black/20">
                          <p className="text-xs text-black/60 font-mono tracking-wider uppercase mb-1">Context / Premise</p>
                          <p className="text-sm text-black/80 leading-relaxed font-sans">{essay.description}</p>
                        </div>

                        {/* Poetic Block Excerpt */}
                        <div className="bg-white border border-black/10 p-8 md:p-12 shadow-sm font-serif">
                          <span className="text-[10px] font-mono tracking-widest text-black/40 uppercase block mb-6">Excerpt</span>
                          <p className="text-base md:text-lg text-black/85 leading-loose whitespace-pre-line font-serif italic tracking-wide">
                            {essay.excerpt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* 4. NOVEL SUBTAB */}
                {workSubTab === 'novel' && (
                  <motion.div
                    key="novel-list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-24 max-w-4xl mx-auto"
                  >
                    {novelWorks.map((novel) => (
                      <div key={novel.id} className="space-y-8 border-b border-black/5 pb-20">
                        {/* Title details */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-sm text-black/40">{novel.year}</span>
                            <span className="text-[9px] font-mono tracking-widest bg-black/5 px-2 py-0.5 text-black/60 uppercase">NOVEL EXCERPT</span>
                          </div>
                          <h3 className="font-serif text-3xl tracking-widest uppercase font-medium">{novel.title}</h3>
                          <p className="text-xs font-mono text-black/50 uppercase tracking-widest">
                            Platform: <span className="font-semibold text-black">{novel.publishedIn}</span>
                          </p>
                        </div>

                        {/* Context */}
                        {novel.description && (
                          <div className="bg-neutral-light p-6 border-l-2 border-black/20">
                            <p className="text-xs text-black/60 font-mono tracking-wider uppercase mb-1">Theme</p>
                            <p className="text-sm text-black/80 leading-relaxed font-sans">{novel.description}</p>
                          </div>
                        )}

                        {/* Poetic Excerpt */}
                        <div className="bg-white border border-black/15 p-8 md:p-12 font-serif bg-gradient-to-br from-white to-neutral-50 shadow-sm leading-relaxed">
                          <span className="text-[10px] font-mono tracking-widest text-black/40 uppercase block mb-6">Excerpt</span>
                          <p className="text-base md:text-lg text-black/90 leading-loose whitespace-pre-line tracking-wide">
                            {novel.excerpt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* RESIDENCIES TAB */}
          {activeTab === 'residencies' && (
            <motion.div
              key="residencies"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto px-6 py-12 md:py-20 fade-in"
            >
              <div className="text-center mb-16 space-y-3">
                <h2 className="font-serif text-3xl tracking-widest uppercase font-medium">ARTIST RESIDENCIES</h2>
                <p className="text-xs font-mono tracking-widest uppercase text-black/40">Chronological history of localized research and fellowships</p>
              </div>

              {/* Vertical Timeline */}
              <div className="relative border-l border-black/10 pl-6 md:pl-10 ml-4 space-y-12">
                {residencies.map((res) => (
                  <div key={res.id} className="relative group">
                    {/* Circle timeline pointer */}
                    <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 bg-white border border-black rounded-full group-hover:bg-black transition-colors" />
                    
                    <div className="space-y-4">
                      {/* Year badge */}
                      <span className="font-mono text-base font-light text-black/40 block">
                        {res.year}
                      </span>

                      {/* Header block */}
                      <div className="space-y-1">
                        {(() => {
                          const hasToggle = !(
                            (res.year === '2026' && res.name.includes('Seoul Art Space Yeonhui')) ||
                            (res.year === '2023' && res.name.includes('Toji Cultural Center'))
                          ) && !!res.outcome;

                          return hasToggle ? (
                            <h3 
                              onClick={() => toggleResidency(res.id)}
                              className="font-serif text-xl tracking-widest uppercase font-medium cursor-pointer hover:text-black/60 transition-colors inline-block"
                            >
                              {res.name}
                            </h3>
                          ) : (
                            <h3 className="font-serif text-xl tracking-widest uppercase font-medium inline-block text-black">
                              {res.name}
                            </h3>
                          );
                        })()}
                        <p className="text-xs font-mono text-black/40 tracking-wider">
                          {res.location} | {res.period}
                        </p>
                      </div>

                      {/* Expandable Outcome */}
                      {(() => {
                        const hasToggle = !(
                          (res.year === '2026' && res.name.includes('Seoul Art Space Yeonhui')) ||
                          (res.year === '2023' && res.name.includes('Toji Cultural Center'))
                        ) && !!res.outcome;

                        return hasToggle ? (
                          <div className="space-y-3">
                            <button
                              onClick={() => toggleResidency(res.id)}
                              className="text-[10px] font-mono tracking-widest uppercase border-b border-black/20 hover:border-black transition-colors pb-0.5 cursor-pointer text-black/60"
                            >
                              {expandedResidencies[res.id] ? 'COLLAPSE DETAILS ▲' : 'VIEW OUTCOME & ACTIVITIES ▼'}
                            </button>

                            <AnimatePresence>
                              {expandedResidencies[res.id] && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden bg-neutral-light p-6 border border-black/5"
                                >
                                  <p className="text-xs font-mono text-black/40 tracking-widest uppercase mb-2">Outcome Summary</p>
                                  <p className="text-sm text-black/80 font-sans leading-relaxed whitespace-pre-line">
                                    {res.outcome}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* AWARDS TAB */}
          {activeTab === 'awards' && (
            <motion.div
              key="awards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-6 py-12 md:py-20 fade-in"
            >
              <div className="text-center mb-16 space-y-3">
                <h2 className="font-serif text-3xl tracking-widest uppercase font-medium">HONORS &amp; GRANTS</h2>
                <p className="text-xs font-mono tracking-widest uppercase text-black/40">Creative endorsements, selections, and writing awards</p>
              </div>

              {/* Three Parallel Columns (Timeline structure) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Column 1: Grants */}
                <div className="space-y-8">
                  <div className="border-b border-black pb-3">
                    <h3 className="font-serif text-lg tracking-widest uppercase font-medium">01. GRANTS</h3>
                    <p className="text-[10px] font-mono text-black/40 tracking-widest uppercase">Support &amp; Funding Programs</p>
                  </div>
                  <div className="space-y-6">
                    {awards.filter(a => a.category === 'Grants').map((item) => (
                      <div key={item.id} className="space-y-2 group">
                        <span className="font-mono text-xs text-black/40 font-light block">{item.year}</span>
                        <p className="text-xs font-sans text-black/80 tracking-wide leading-relaxed font-medium group-hover:text-black transition-colors">
                          {item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Awards */}
                <div className="space-y-8">
                  <div className="border-b border-black pb-3">
                    <h3 className="font-serif text-lg tracking-widest uppercase font-medium">02. AWARDS</h3>
                    <p className="text-[10px] font-mono text-black/40 tracking-widest uppercase">Competition &amp; Press Prizes</p>
                  </div>
                  <div className="space-y-6">
                    {awards.filter(a => a.category === 'Awards').map((item) => (
                      <div key={item.id} className="space-y-2 group">
                        <span className="font-mono text-xs text-black/40 font-light block">{item.year}</span>
                        <p className="text-xs font-sans text-black/80 tracking-wide leading-relaxed font-medium group-hover:text-black transition-colors">
                          {item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3: Selections */}
                <div className="space-y-8">
                  <div className="border-b border-black pb-3">
                    <h3 className="font-serif text-lg tracking-widest uppercase font-medium">03. SELECTIONS</h3>
                    <p className="text-[10px] font-mono text-black/40 tracking-widest uppercase">Festivals &amp; Official Selections</p>
                  </div>
                  <div className="space-y-6">
                    {awards.filter(a => a.category === 'Selections').map((item) => (
                      <div key={item.id} className="space-y-2 group">
                        <span className="font-mono text-xs text-black/40 font-light block">{item.year}</span>
                        <p className="text-xs font-sans text-black/80 tracking-wide leading-relaxed font-medium group-hover:text-black transition-colors">
                          {item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CV TAB */}
          {activeTab === 'cv' && cvData && (
            <motion.div
              key="cv"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-6 py-12 md:py-20 fade-in print-page"
            >
              {/* CV Download / Print Trigger */}
              <div className="flex justify-between items-center mb-16 border-b border-black/15 pb-6 no-print">
                <div className="space-y-1">
                  <h2 className="font-serif text-3xl tracking-widest uppercase font-medium">CURRICULUM VITAE</h2>
                  <p className="text-xs font-mono tracking-widest text-black/40 uppercase">Kim Woo Young · Plays, Exhibitions, and Literary Career</p>
                </div>
                
                <button
                  onClick={handlePrintCV}
                  className="flex items-center gap-2 border border-black px-5 py-2.5 text-xs tracking-widest font-mono uppercase hover:bg-black hover:text-white transition-all cursor-pointer"
                >
                  <FileText size={14} />
                  Print CV (PDF)
                </button>
              </div>

              {/* Printable Title Block */}
              <div className="hidden print:block text-center mb-12">
                <h1 className="font-serif text-4xl tracking-widest uppercase">KIM WOO YOUNG</h1>
                <p className="text-xs font-mono tracking-widest uppercase mt-2">Playwright &amp; Writer · Portfolio CV</p>
                <div className="w-20 h-px bg-black mx-auto mt-4" />
              </div>

              {/* Split layout: Left sidebar TOC, Right contents scrollable */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left side: TOC index (Sticky desktop, hidden on mobile & print) */}
                <div className="col-span-1 lg:col-span-3 lg:sticky lg:top-32 h-fit space-y-6 no-print">
                  <p className="text-[10px] font-mono tracking-widest text-black/40 uppercase border-b border-black/10 pb-2">CV INDEX</p>
                  <nav className="flex flex-col gap-3 font-mono text-xs">
                    {[
                      { id: 'education', label: '01. EDUCATION' },
                      { id: 'writing', label: '02. WRITING / PLAYS' },
                      { id: 'exhibitions', label: '03. EXHIBITIONS' },
                      { id: 'awards-selections', label: '04. HONORS' }
                    ].map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToCVSection(section.id)}
                        className="text-left text-black/60 hover:text-black tracking-widest transition-colors cursor-pointer flex items-center justify-between group"
                      >
                        <span>{section.label}</span>
                        <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Right side: Core Content */}
                <div 
                  ref={cvRightPaneRef}
                  className="col-span-1 lg:col-span-9 space-y-16"
                >
                  {/* section 1: Education */}
                  <section id="education" className="space-y-6">
                    <h3 className="font-serif text-lg tracking-widest uppercase font-medium border-b border-black/15 pb-2">
                      01. EDUCATION
                    </h3>
                    <ul className="space-y-3">
                      {cvData.education.map((edu: string, idx: number) => (
                        <li key={idx} className="text-sm text-black/85 tracking-wide leading-relaxed font-sans">
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* section 2: Writing */}
                  <section id="writing" className="space-y-6">
                    <h3 className="font-serif text-lg tracking-widest uppercase font-medium border-b border-black/15 pb-2">
                      02. WRITING &amp; PLAYS
                    </h3>
                    <div className="space-y-4">
                      {cvData.writing.map((item: any, idx: number) => (
                        <div key={idx} className="grid grid-cols-12 gap-2 text-sm">
                          <span className="col-span-2 md:col-span-1 font-mono text-black/40">{item.year}</span>
                          <span className="col-span-10 md:col-span-11 text-black/85 leading-relaxed font-sans">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* section 3: Exhibitions */}
                  <section id="exhibitions" className="space-y-6">
                    <h3 className="font-serif text-lg tracking-widest uppercase font-medium border-b border-black/15 pb-2">
                      03. EXHIBITIONS
                    </h3>
                    <div className="space-y-4">
                      {cvData.exhibitions.map((item: any, idx: number) => (
                        <div key={idx} className="grid grid-cols-12 gap-2 text-sm">
                          <span className="col-span-2 md:col-span-1 font-mono text-black/40">{item.year}</span>
                          <span className="col-span-10 md:col-span-11 text-black/85 leading-relaxed font-sans">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* section 4: Awards */}
                  <section id="awards-selections" className="space-y-6">
                    <h3 className="font-serif text-lg tracking-widest uppercase font-medium border-b border-black/15 pb-2">
                      04. AWARDS &amp; SELECTIONS
                    </h3>
                    <div className="space-y-4">
                      {cvData.awardsSelections.map((item: any, idx: number) => (
                        <div key={idx} className="grid grid-cols-12 gap-2 text-sm">
                          <span className="col-span-2 md:col-span-1 font-mono text-black/40">{item.year}</span>
                          <span className="col-span-10 md:col-span-11 text-black/85 leading-relaxed font-sans">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && aboutData && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto px-6 py-12 md:py-20 fade-in font-serif"
            >
              <div className="space-y-16">
                {/* Core Bio - large elegant text */}
                <p className="text-xl md:text-2xl font-light text-black/95 leading-relaxed tracking-wide italic">
                  “{aboutData.bio}”
                </p>

                <div className="w-12 h-px bg-black/20" />

                {/* Detailed Statement */}
                <div className="space-y-8">
                  <h3 className="font-serif text-[10px] tracking-widest uppercase font-mono text-black/40 block">ARTIST STATEMENT</h3>
                  
                  <div className="space-y-6 text-sm md:text-base text-black/80 leading-relaxed font-sans font-light">
                    {aboutData.statement.map((para: string, idx: number) => (
                      <p key={idx} className="text-justify whitespace-pre-line leading-loose">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-black/5 flex justify-start no-print">
                  <button
                    onClick={handlePrintCV}
                    className="flex items-center gap-2 border border-black px-6 py-3 text-xs tracking-widest font-mono uppercase hover:bg-black hover:text-white transition-all cursor-pointer"
                  >
                    <FileText size={14} />
                    Download CV PDF / PRINT
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && contactData && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto px-6 py-12 md:py-24 text-center fade-in space-y-12"
            >
              <div className="space-y-3">
                <h2 className="font-serif text-3xl tracking-widest uppercase font-medium">CONTACT</h2>
                <p className="text-xs font-mono tracking-widest uppercase text-black/40">Please feel free to reach out for publications, performances, or exhibitions</p>
              </div>

              <div className="w-12 h-px bg-black/20 mx-auto" />

              <div className="space-y-6 max-w-sm mx-auto">
                {/* Email block */}
                <a 
                  href={`mailto:${contactData.email}`}
                  className="flex items-center justify-between border border-black p-4 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-black/50 group-hover:text-white transition-colors" />
                    <div>
                      <p className="text-[10px] font-mono text-black/40 group-hover:text-white/40 tracking-widest uppercase mb-0.5">EMAIL ADDRESS</p>
                      <p className="text-xs md:text-sm tracking-wider font-mono font-medium">{contactData.email}</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-black/35 group-hover:text-white transition-colors" />
                </a>

                {/* Instagram block */}
                <a 
                  href={contactData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-black p-4 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <Instagram size={16} className="text-black/50 group-hover:text-white transition-colors" />
                    <div>
                      <p className="text-[10px] font-mono text-black/40 group-hover:text-white/40 tracking-widest uppercase mb-0.5">INSTAGRAM</p>
                      <p className="text-xs md:text-sm tracking-wider font-mono font-medium">{contactData.instagram}</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-black/35 group-hover:text-white transition-colors" />
                </a>
              </div>
              
              <div className="pt-12 text-[10px] font-mono text-black/35 tracking-widest uppercase">
                © {new Date().getFullYear()} KIM WOO YOUNG · ALL RIGHTS RESERVED
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-black/5 py-8 mt-20 no-print">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p 
            onClick={() => {
              setClickCount(prev => {
                const next = prev + 1;
                if (next >= 5) {
                  setAdminVisible(true);
                  return 0;
                }
                return next;
              });
            }}
            className="text-[10px] font-mono text-black/40 tracking-widest uppercase cursor-pointer select-none"
            title="Kim Woo Young Archive"
          >
            © {new Date().getFullYear()} KIM WOO YOUNG ARCHIVE
          </p>
          <div className="flex items-center gap-6">
            <a 
              href="mailto:wyoung95@naver.com"
              className="text-[10px] font-mono text-black/40 hover:text-black tracking-widest uppercase transition-colors"
            >
              EMAIL
            </a>
            <a 
              href="https://instagram.com/wooyoungann"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-black/40 hover:text-black tracking-widest uppercase transition-colors"
            >
              INSTAGRAM
            </a>
            {adminVisible && (
              <button
                onClick={() => setAdminOpen(true)}
                className="text-[10px] font-mono text-black/40 hover:text-black tracking-widest uppercase transition-colors flex items-center gap-1"
              >
                <Settings size={10} />
                ADMIN
              </button>
            )}
          </div>
        </div>
      </footer>



      {/* ADMIN CONSOLE OVERLAY */}
      <AnimatePresence>
        {adminOpen && (
          <AdminPanel 
            onDataChange={loadAllArchiveData}
            onClose={() => setAdminOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
