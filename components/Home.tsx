
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

  const ToolCard = ({ title, desc, icon: Icon, view, index }: any) => (
    <motion.button 
      onClick={() => onChangeView(view)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative overflow-hidden bg-dark-card/40 backdrop-blur-sm border border-dark-border hover:border-brand-accent/50 hover:bg-dark-card/80 p-6 rounded-2xl text-left transition-all duration-300 shadow-sm`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl group-hover:bg-brand-accent/20 transition-all duration-500 transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0"></div>
      <div className="w-10 h-10 bg-dark-bg border border-dark-border rounded-xl flex items-center justify-center mb-4 group-hover:border-brand-accent/30 group-hover:text-brand-accent transition-colors text-dark-muted shadow-inner shadow-white/5 relative z-10">
        <Icon size={18} />
      </div>
      <h3 className="text-sm font-display font-semibold text-white/90 mb-1.5 tracking-wide relative z-10 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-xs text-dark-muted leading-relaxed font-mono relative z-10">{desc}</p>
    </motion.button>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-6 md:p-10 space-y-10 pb-24"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">
            {t.welcome} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-accent">{t.artist_span}</span>
          </h1>
          <p className="text-sm text-dark-muted font-mono">{t.ready_to_transform}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 bg-brand/10 border border-brand/20 px-4 py-2 rounded-lg text-brand-light font-mono text-[10px] uppercase tracking-widest shadow-sm shadow-brand/5"
        >
          <Sparkles size={14} className="text-brand-accent animate-pulse" />
          <span>{t.focus_label}</span>
        </motion.div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative overflow-hidden bg-dark-card border border-dark-border rounded-2xl p-6 shadow-xl shadow-brand/5"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent pointer-events-none"></div>
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
            <div className="w-full bg-dark-bg border border-dark-border rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                className="bg-gradient-to-r from-brand to-brand-accent h-full rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]" 
              ></motion.div>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChangeView(AppView.PLAN_14_DAYS)}
            className="w-full md:w-auto shrink-0 bg-white text-black px-6 py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-brand/20 group"
          >
            {progress === 0 ? t.start_button : t.go_to_day}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      <div>
        <h2 className="text-sm font-mono font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-widest">
          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
          {t.menu_tools}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ToolCard title={t.menu_niche_lib} desc="Catálogo com estratégias." icon={BookOpen} view={AppView.NICHE_LIBRARY} index={1} />
          <ToolCard title={t.menu_tracker} desc="Mini CRM de pedidos." icon={Users} view={AppView.CLIENT_TRACKER} index={2} />
          <ToolCard title={t.menu_niche_gen} desc="Descubra nichos." icon={Target} view={AppView.NICHE_GENERATOR} index={3} />
          <ToolCard title={t.menu_scripts} desc="Respostas em inglês." icon={MessageSquare} view={AppView.SMART_SCRIPTS} index={4} />
          <ToolCard title={t.menu_captions} desc="Textos para redes sociais." icon={ImageIcon} view={AppView.CAPTION_GENERATOR} index={5} />
          <ToolCard title={t.menu_pricing} desc="Calcule o valor da arte." icon={DollarSign} view={AppView.PRICING_CALCULATOR} index={6} />
          <ToolCard title={t.menu_portfolio} desc="Estruturas de perfil." icon={Briefcase} view={AppView.PORTFOLIO_EXPRESS} index={7} />
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChangeView(AppView.PLAN_14_DAYS)} 
            className="group bg-dark-bg/50 border border-dashed border-dark-border hover:border-brand-accent/50 hover:bg-dark-card p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all min-h-[140px] shadow-sm relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <div className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-dark-muted mb-3 group-hover:scale-110 group-hover:text-brand-accent group-hover:border-brand-accent/30 transition-all relative z-10 shadow-inner group-hover:shadow-brand-accent/20">
               <ArrowRight size={18} />
             </div>
             <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-dark-muted group-hover:text-white transition-colors relative z-10">{t.view_full_plan}</h3>
           </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
