
import React, { useEffect, useState } from 'react';
import { AppView, Language, DayPlan } from '../types';
import { TRANSLATIONS, PLAN_DATA_LOCALIZED } from '../translations';
import { 
  Target, 
  MessageSquare, 
  Image as ImageIcon, 
  DollarSign, 
  Briefcase, 
  ArrowRight,
  Trophy,
  Sparkles,
  PlayCircle,
  BookOpen,
  Users
} from 'lucide-react';

interface HomeProps {
  onChangeView: (view: AppView) => void;
  lang: Language;
}

export const Home: React.FC<HomeProps> = ({ onChangeView, lang }) => {
  const [progress, setProgress] = useState(0);
  const [nextDay, setNextDay] = useState<DayPlan | null>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const saved = localStorage.getItem('arte_magnetica_plan');
    const fullPlan: DayPlan[] = PLAN_DATA_LOCALIZED[lang];
    const userPlanProgress = saved ? JSON.parse(saved) : fullPlan;
    
    const completedCount = userPlanProgress.filter((p: any) => p.isCompleted).length;
    const percentage = Math.round((completedCount / fullPlan.length) * 100);
    setProgress(percentage);

    const next = userPlanProgress.find((p: any) => !p.isCompleted);
    // Find matching localized day
    const localizedNext = fullPlan.find(p => p.day === next?.day);
    setNextDay(localizedNext || null);
  }, [lang]);

  const ToolCard = ({ title, desc, icon: Icon, view, delay }: any) => (
    <button 
      onClick={() => onChangeView(view)}
      className={`group relative overflow-hidden bg-dark-card/40 backdrop-blur-sm border border-dark-border hover:border-dark-muted/50 hover:bg-dark-card/80 p-6 rounded-2xl text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in ${delay}`}
    >
      <div className="absolute top-0 right-0 p-8 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-brand-accent/5 transition-all"></div>
      <div className="w-10 h-10 bg-dark-bg border border-dark-border rounded-xl flex items-center justify-center mb-4 group-hover:border-brand-accent/30 group-hover:text-brand-accent transition-colors text-dark-muted shadow-inner shadow-white/5">
        <Icon size={18} />
      </div>
      <h3 className="text-sm font-display font-semibold text-white/90 mb-1.5 tracking-wide">{title}</h3>
      <p className="text-xs text-dark-muted leading-relaxed font-mono">{desc}</p>
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-10 pb-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">
            {t.welcome} <span className="text-brand-muted">{t.artist_span}</span>
          </h1>
          <p className="text-sm text-dark-muted font-mono">{t.ready_to_transform}</p>
        </div>
        <div className="flex items-center gap-2 bg-dark-card border border-dark-border px-4 py-2 rounded-lg text-brand-light font-mono text-[10px] uppercase tracking-widest shadow-sm">
          <Sparkles size={14} className="text-brand-accent" />
          <span>{t.focus_label}</span>
        </div>
      </header>

      <div className="relative overflow-hidden bg-dark-card border border-dark-border rounded-2xl p-6 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-brand-accent">
                <Trophy size={14} />
                <span>{t.menu_plan}</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-white bg-dark-border px-2 py-1 rounded-md">{progress}% {t.completed}</span>
            </div>
            <div className="flex flex-col mb-4">
              <h2 className="text-lg font-display font-semibold text-white">
                {progress === 100 ? t.plan_completed : nextDay ? `${t.today_task}${nextDay.title}` : t.menu_plan}
              </h2>
            </div>
            <div className="w-full bg-dark-bg border border-dark-border rounded-full h-2">
              <div 
                className="bg-white h-full rounded-full transition-all duration-1000 ease-out shadow-sm" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <button 
            onClick={() => onChangeView(AppView.PLAN_14_DAYS)}
            className="w-full md:w-auto shrink-0 bg-white text-black px-6 py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            {progress === 0 ? t.start_button : t.go_to_day}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-mono font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-widest">
          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
          {t.menu_tools}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ToolCard title={t.menu_niche_lib} desc="Catálogo com estratégias." icon={BookOpen} view={AppView.NICHE_LIBRARY} delay="delay-[50ms]" />
          <ToolCard title={t.menu_tracker} desc="Mini CRM de pedidos." icon={Users} view={AppView.CLIENT_TRACKER} delay="delay-[100ms]" />
          <ToolCard title={t.menu_niche_gen} desc="Descubra nichos." icon={Target} view={AppView.NICHE_GENERATOR} delay="delay-[150ms]" />
          <ToolCard title={t.menu_scripts} desc="Respostas em inglês." icon={MessageSquare} view={AppView.SMART_SCRIPTS} delay="delay-[200ms]" />
          <ToolCard title={t.menu_captions} desc="Textos para redes sociais." icon={ImageIcon} view={AppView.CAPTION_GENERATOR} delay="delay-[250ms]" />
          <ToolCard title={t.menu_pricing} desc="Calcule o valor da arte." icon={DollarSign} view={AppView.PRICING_CALCULATOR} delay="delay-[300ms]" />
          <ToolCard title={t.menu_portfolio} desc="Estruturas de perfil." icon={Briefcase} view={AppView.PORTFOLIO_EXPRESS} delay="delay-[350ms]" />
          <button onClick={() => onChangeView(AppView.PLAN_14_DAYS)} className="group bg-dark-bg/50 border border-dashed border-dark-border hover:border-dark-muted p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all min-h-[140px]">
             <div className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-dark-muted mb-3 group-hover:scale-110 group-hover:text-brand-light transition-all">
               <ArrowRight size={18} />
             </div>
             <h3 className="text-[10px] font-monofont-bold uppercase tracking-widest text-dark-muted group-hover:text-white transition-colors">{t.view_full_plan}</h3>
           </button>
        </div>
      </div>
    </div>
  );
};
