
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppView, DayPlan, Language } from '../types';
import { CheckCircle2, Circle, ArrowRight, Lock, Sparkles } from 'lucide-react';
import { PLAN_DATA_LOCALIZED } from '../translations';

interface Plan14DaysProps {
  onChangeView: (view: AppView) => void;
  lang: Language;
}

export const Plan14Days: React.FC<Plan14DaysProps> = ({ onChangeView, lang }) => {
  const [plan, setPlan] = useState<DayPlan[]>(PLAN_DATA_LOCALIZED[lang]);
  const [openDay, setOpenDay] = useState<number | null>(1);

  useEffect(() => {
    const saved = localStorage.getItem('arte_magnetica_plan');
    const localizedPlan = PLAN_DATA_LOCALIZED[lang];
    
    if (saved) {
      const savedProgress = JSON.parse(saved);
      const mergedPlan = localizedPlan.map(day => {
        const savedDay = savedProgress.find((sd: any) => sd.day === day.day);
        return savedDay ? { ...day, isCompleted: savedDay.isCompleted } : day;
      });
      
      setPlan(mergedPlan);
      
      const firstIncomplete = mergedPlan.find((d: DayPlan) => !d.isCompleted);
      if (firstIncomplete) {
        setOpenDay(firstIncomplete.day);
      } else {
        setOpenDay(null);
      }
    } else {
      setPlan(localizedPlan);
    }
  }, [lang]);

  const toggleDayComplete = (dayIndex: number) => {
    const newPlan = [...plan];
    newPlan[dayIndex].isCompleted = !newPlan[dayIndex].isCompleted;
    setPlan(newPlan);
    localStorage.setItem('arte_magnetica_plan', JSON.stringify(newPlan));
    
    if (newPlan[dayIndex].isCompleted && dayIndex + 1 < plan.length) {
      setOpenDay(plan[dayIndex + 1].day);
    }
  };

  const calculateProgress = () => {
    const completed = plan.filter(d => d.isCompleted).length;
    return Math.round((completed / plan.length) * 100);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto pb-24"
    >
      <div className="mb-10 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-accent/20 blur-[100px] -z-10 rounded-full"></div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">Plano Prático <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-accent">14 Dias</span></h2>
        <p className="text-dark-muted font-mono text-sm max-w-xl mx-auto">Siga o passo a passo sequencial para realizar sua primeira venda internacional.</p>
        
        <div className="mt-8 bg-dark-card/50 backdrop-blur-md p-6 rounded-2xl border border-dark-border shadow-xl">
          <div className="flex justify-between items-center text-sm mb-3 text-dark-muted font-mono uppercase tracking-widest">
            <span className="flex items-center gap-2"><Sparkles size={14} className="text-brand-accent"/> Seu Progresso</span>
            <span className="font-bold text-white text-lg">{calculateProgress()}%</span>
          </div>
          <div className="w-full bg-dark-bg border border-dark-border rounded-full h-3 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${calculateProgress()}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-brand to-brand-accent h-full rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]" 
            ></motion.div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {plan.map((day, index) => {
          const isLocked = index > 0 && !plan[index - 1].isCompleted;
          const isOpen = openDay === day.day;

          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={day.day} 
              className={`border overflow-hidden rounded-2xl transition-all duration-300 ${
                isLocked 
                  ? 'border-dark-border bg-dark-bg/40 opacity-50 cursor-not-allowed' 
                  : isOpen 
                    ? 'border-brand-accent/50 bg-dark-card/80 shadow-lg shadow-brand-accent/5' 
                    : 'border-dark-border bg-dark-card/40 hover:border-dark-muted/50 cursor-pointer'
              }`}
            >
              <div 
                className="p-5 flex items-center justify-between"
                onClick={() => !isLocked && setOpenDay(isOpen ? null : day.day)}
              >
                <div className="flex items-center gap-5">
                  {isLocked ? (
                     <div className="w-12 h-12 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-center text-dark-muted shadow-inner shadow-white/5">
                       <Lock size={18} />
                     </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-display font-bold text-lg transition-all ${
                      day.isCompleted ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-brand/10 border-brand/30 text-brand-light shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                    }`}>
                      {day.day}
                    </div>
                  )}
                  
                  <div>
                    <h3 className={`font-display font-semibold text-lg tracking-wide ${
                      isLocked ? 'text-dark-muted' : day.isCompleted ? 'text-dark-muted line-through' : 'text-white/90'
                    }`}>
                      {day.title}
                    </h3>
                    {!isOpen && !isLocked && <p className="text-xs text-dark-muted font-mono truncate max-w-xs md:max-w-md">{day.description}</p>}
                    {isLocked && <p className="text-[10px] text-dark-muted uppercase font-mono tracking-[0.2em] mt-1">Bloqueado</p>}
                  </div>
                </div>
                
                <div className="text-dark-muted">
                  {!isLocked && (day.isCompleted ? <CheckCircle2 className="text-green-400" size={24} /> : <Circle size={24} />)}
                </div>
              </div>

              <AnimatePresence>
                {isOpen && !isLocked && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-6 pt-0 border-t border-dark-border mt-2"
                  >
                    <p className="text-dark-muted font-mono text-sm leading-relaxed mt-5 mb-6">{day.description}</p>
                    
                    <div className="space-y-4 bg-dark-bg/50 border border-dark-border p-5 rounded-xl">
                      <h4 className="text-[10px] font-mono font-bold text-dark-muted uppercase tracking-[0.2em]">Checklist do Dia</h4>
                      {day.tasks.map((task, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (i * 0.1) }}
                          key={i} 
                          className="flex items-start gap-4"
                        >
                          <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 shadow-sm ${day.isCompleted ? 'bg-green-400 shadow-green-400/50' : 'bg-brand shadow-brand/50'}`} />
                          <span className={`${day.isCompleted ? 'text-dark-muted line-through' : 'text-white/80'} text-sm font-mono leading-relaxed`}>{task}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                      {day.linkedView && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onChangeView(day.linkedView!);
                          }}
                          className="flex items-center gap-2 px-5 py-2.5 border border-brand/30 bg-brand/10 text-brand-light rounded-xl hover:bg-brand/20 transition-colors text-xs font-mono font-bold uppercase tracking-widest"
                        >
                          Abrir Ferramenta <ArrowRight size={16} />
                        </button>
                      )}
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDayComplete(index);
                        }}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase font-bold transition-all ${
                          day.isCompleted 
                            ? 'bg-dark-bg border border-dark-border text-dark-muted hover:text-white' 
                            : 'bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10'
                        }`}
                      >
                        {day.isCompleted ? 'Marcar como Pendente' : 'Concluir Dia'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
