
import React, { useState, useEffect } from 'react';
// Fixed: Changed PLAN_DATA to Language since PLAN_DATA is not exported from types.ts
import { AppView, DayPlan, Language } from '../types';
import { CheckCircle2, Circle, ArrowRight, Lock } from 'lucide-react';
// Fixed: Import localized plan data from translations.ts
import { PLAN_DATA_LOCALIZED } from '../translations';

interface Plan14DaysProps {
  onChangeView: (view: AppView) => void;
  lang: Language;
}

export const Plan14Days: React.FC<Plan14DaysProps> = ({ onChangeView, lang }) => {
  // Fixed: Use localized plan data based on current language
  const [plan, setPlan] = useState<DayPlan[]>(PLAN_DATA_LOCALIZED[lang]);
  const [openDay, setOpenDay] = useState<number | null>(1);

  // Load progress from local storage on mount and when language changes
  useEffect(() => {
    const saved = localStorage.getItem('arte_magnetica_plan');
    const localizedPlan = PLAN_DATA_LOCALIZED[lang];
    
    if (saved) {
      const savedProgress = JSON.parse(saved);
      // Merge saved completion status with current localized content
      const mergedPlan = localizedPlan.map(day => {
        const savedDay = savedProgress.find((sd: any) => sd.day === day.day);
        return savedDay ? { ...day, isCompleted: savedDay.isCompleted } : day;
      });
      
      setPlan(mergedPlan);
      
      // Find the first incomplete day to open it automatically
      const firstIncomplete = mergedPlan.find((d: DayPlan) => !d.isCompleted);
      if (firstIncomplete) {
        setOpenDay(firstIncomplete.day);
      } else {
        setOpenDay(null); // All done
      }
    } else {
      setPlan(localizedPlan);
    }
  }, [lang]);

  // Save progress
  const toggleDayComplete = (dayIndex: number) => {
    const newPlan = [...plan];
    newPlan[dayIndex].isCompleted = !newPlan[dayIndex].isCompleted;
    setPlan(newPlan);
    localStorage.setItem('arte_magnetica_plan', JSON.stringify(newPlan));
    
    // Auto open next day if completed and unlocked
    if (newPlan[dayIndex].isCompleted && dayIndex + 1 < plan.length) {
      setOpenDay(plan[dayIndex + 1].day);
    }
  };

  const calculateProgress = () => {
    const completed = plan.filter(d => d.isCompleted).length;
    return Math.round((completed / plan.length) * 100);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto pb-24">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Plano Prático de 14 Dias</h2>
        <p className="text-gray-400">Siga o passo a passo sequencial para realizar sua primeira venda internacional.</p>
        
        <div className="mt-6 bg-dark-card p-4 rounded-xl border border-gray-800">
          <div className="flex justify-between text-sm mb-2 text-gray-300">
            <span>Seu Progresso</span>
            <span className="font-bold text-brand-light">{calculateProgress()}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-brand h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {plan.map((day, index) => {
          // Logic: Locked if previous day is NOT completed (unless it's the first day)
          const isLocked = index > 0 && !plan[index - 1].isCompleted;
          const isOpen = openDay === day.day;

          return (
            <div 
              key={day.day} 
              className={`border rounded-xl transition-all duration-300 ${
                isLocked 
                  ? 'border-gray-800 bg-dark-card/30 opacity-60 cursor-not-allowed' 
                  : isOpen 
                    ? 'border-brand bg-dark-card ring-1 ring-brand/30' 
                    : 'border-gray-800 bg-dark-card/50 hover:border-gray-700 cursor-pointer'
              }`}
            >
              <div 
                className="p-4 flex items-center justify-between"
                onClick={() => !isLocked && setOpenDay(isOpen ? null : day.day)}
              >
                <div className="flex items-center gap-4">
                  {/* Icon Logic */}
                  {isLocked ? (
                     <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-500">
                       <Lock size={18} />
                     </div>
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${
                      day.isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-brand/20 text-brand-light'
                    }`}>
                      {day.day}
                    </div>
                  )}
                  
                  <div>
                    <h3 className={`font-semibold text-lg ${
                      isLocked ? 'text-gray-500' : day.isCompleted ? 'text-gray-400 line-through' : 'text-white'
                    }`}>
                      {day.title}
                    </h3>
                    {!isOpen && !isLocked && <p className="text-sm text-gray-500 truncate">{day.description}</p>}
                    {isLocked && <p className="text-xs text-gray-600 uppercase font-bold tracking-wider mt-0.5">Bloqueado</p>}
                  </div>
                </div>
                
                <div className="text-gray-400">
                  {!isLocked && (day.isCompleted ? <CheckCircle2 className="text-green-500" /> : <Circle />)}
                </div>
              </div>

              {isOpen && !isLocked && (
                <div className="px-4 pb-6 pt-0 border-t border-gray-800/50 mt-2 animate-fade-in">
                  <p className="text-gray-300 mt-4 mb-6">{day.description}</p>
                  
                  <div className="space-y-3 bg-dark-bg p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Checklist do Dia</h4>
                    {day.tasks.map((task, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${day.isCompleted ? 'bg-green-500' : 'bg-brand'}`} />
                        <span className={`${day.isCompleted ? 'text-gray-400 line-through' : 'text-gray-300'} text-sm`}>{task}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {day.linkedView && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onChangeView(day.linkedView!);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand-light rounded-lg hover:bg-brand/20 transition-colors text-sm font-medium"
                      >
                        Abrir Ferramenta <ArrowRight size={16} />
                      </button>
                    )}
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDayComplete(index);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        day.isCompleted 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-brand text-white hover:bg-brand-dark shadow-lg shadow-brand/20'
                      }`}
                    >
                      {day.isCompleted ? 'Marcar como Pendente' : 'Concluir Dia'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
