
import React, { useState, useEffect } from 'react';
import { AppView, Language } from './types';
import { TRANSLATIONS } from './translations';
import { Home } from './components/Home';
import { Plan14Days } from './components/Plan14Days';
import { SmartScripts } from './components/SmartScripts';
import { NicheGenerator, CaptionGenerator, PricingCalculator, PortfolioExpress } from './components/Generators';
import { NicheLibrary } from './components/NicheLibrary';
import { ClientTracker } from './components/ClientTracker';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Target, 
  Image, 
  DollarSign, 
  Briefcase, 
  Menu,
  X,
  Home as HomeIcon,
  CalendarDays,
  BookOpen,
  Users,
  Globe
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('arte_magnetica_lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('arte_magnetica_lang', language);
  }, [language]);

  const t = TRANSLATIONS[language];

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Home onChangeView={setCurrentView} lang={language} />;
      case AppView.PLAN_14_DAYS:
        return <Plan14Days onChangeView={setCurrentView} lang={language} />;
      case AppView.SMART_SCRIPTS:
        return <SmartScripts lang={language} />;
      case AppView.NICHE_GENERATOR:
        return <NicheGenerator lang={language} />;
      case AppView.NICHE_LIBRARY:
        return <NicheLibrary lang={language} />;
      case AppView.CLIENT_TRACKER:
        return <ClientTracker lang={language} />;
      case AppView.CAPTION_GENERATOR:
        return <CaptionGenerator lang={language} />;
      case AppView.PRICING_CALCULATOR:
        return <PricingCalculator lang={language} />;
      case AppView.PORTFOLIO_EXPRESS:
        return <PortfolioExpress lang={language} />;
      default:
        return <Home onChangeView={setCurrentView} lang={language} />;
    }
  };

  const NavItem = ({ view, label, icon: Icon }: { view: AppView, label: string, icon: any }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        currentView === view 
          ? 'bg-dark-card text-brand-light font-medium border border-dark-border shadow-sm' 
          : 'text-dark-muted hover:bg-dark-card/50 hover:text-brand-light border border-transparent'
      }`}
    >
      <Icon size={18} className={currentView === view ? 'text-brand-light focus:animate-pulse' : 'text-dark-muted'} />
      <span className="text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-transparent text-dark-text font-sans flex overflow-hidden selection:bg-brand-accent selection:text-white">
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-72 bg-dark-bg/80 backdrop-blur-xl border-r border-dark-border 
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        <div className="p-6 border-b border-dark-border flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 w-32 h-32 bg-white/5 rounded-full blur-3xl -z-10"></div>
          <div className="flex items-center gap-3 z-10">
            <div className="w-10 h-10 bg-dark-card border border-dark-border rounded-xl flex items-center justify-center text-brand-light font-display font-bold text-xl shadow-inner shadow-white/5">
              A
            </div>
            <div>
              <h1 className="font-display font-bold text-lg leading-none tracking-tight text-white/90">Arte Magnética</h1>
              <span className="text-[9px] text-dark-muted uppercase tracking-[0.2em] font-mono">App PRO</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-dark-muted hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-border">
          <div className="text-[10px] font-mono text-dark-muted uppercase tracking-widest mb-3 mt-4 px-4">{t.menu_main}</div>
          <NavItem view={AppView.DASHBOARD} label={t.menu_home} icon={HomeIcon} />
          <NavItem view={AppView.PLAN_14_DAYS} label={t.menu_plan} icon={CalendarDays} />
          
          <div className="text-[10px] font-mono text-dark-muted uppercase tracking-widest mb-3 mt-8 px-4">{t.menu_management}</div>
          <NavItem view={AppView.CLIENT_TRACKER} label={t.menu_tracker} icon={Users} />

          <div className="text-[10px] font-mono text-dark-muted uppercase tracking-widest mb-3 mt-8 px-4">{t.menu_tools}</div>
          <NavItem view={AppView.NICHE_LIBRARY} label={t.menu_niche_lib} icon={BookOpen} />
          <NavItem view={AppView.SMART_SCRIPTS} label={t.menu_scripts} icon={MessageSquare} />
          <NavItem view={AppView.NICHE_GENERATOR} label={t.menu_niche_gen} icon={Target} />
          <NavItem view={AppView.CAPTION_GENERATOR} label={t.menu_captions} icon={Image} />
          <NavItem view={AppView.PRICING_CALCULATOR} label={t.menu_pricing} icon={DollarSign} />
          <NavItem view={AppView.PORTFOLIO_EXPRESS} label={t.menu_portfolio} icon={Briefcase} />
        </nav>

        <div className="p-4 space-y-4 border-t border-dark-border bg-dark-bg/50">
          {/* Language Selector */}
          <div className="bg-dark-card/50 rounded-xl p-3 border border-dark-border/50">
            <div className="flex items-center gap-2 mb-3 px-1 text-dark-muted text-[9px] font-mono uppercase tracking-widest">
              <Globe size={12} className="opacity-70" /> {t.language}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['en', 'pt', 'es'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`py-1.5 text-[10px] font-mono rounded-lg transition-all uppercase ${
                    language === l 
                      ? 'bg-white text-black font-bold shadow-sm' 
                      : 'text-dark-muted hover:bg-dark-border/50 hover:text-brand-light'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-transparent">
        <header className="lg:hidden p-4 border-b border-dark-border flex justify-between items-center bg-dark-bg/80 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-dark-card border border-dark-border rounded-lg flex items-center justify-center text-brand-light font-display font-bold shadow-inner shadow-white/5">A</div>
            <h1 className="font-display font-bold text-lg tracking-tight">Arte Magnética</h1>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="text-brand-light p-1.5 hover:bg-dark-border rounded-md transition-colors">
            <Menu size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-border scrollbar-track-transparent">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
