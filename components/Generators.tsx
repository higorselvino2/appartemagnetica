
import React, { useState } from 'react';
import { generateCaptions, generateNicheIdeas, generatePortfolioBio } from '../services/geminiService';
import { Loader2, Target, Image as ImageIcon, DollarSign, Briefcase, Copy, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import Markdown from 'react-markdown';

// --- NICHE GENERATOR ---
interface NicheGeneratorProps {
  lang: Language;
}

export const NicheGenerator: React.FC<NicheGeneratorProps> = ({ lang }) => {
  const [style, setStyle] = useState('');
  const [themes, setThemes] = useState<string[]>([]);
  const [preference, setPreference] = useState('Ambos');
  const [emotion, setEmotion] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleTheme = (theme: string) => {
    if (themes.includes(theme)) setThemes(themes.filter(t => t !== theme));
    else setThemes([...themes, theme]);
  };

  const handleGenerate = async () => {
    setLoading(true);
    // Fixed: Pass lang to generateNicheIdeas for localized Gemini response
    const res = await generateNicheIdeas(style, themes, preference, emotion, lang);
    setResult(res);
    setLoading(false);
  };

  const commonThemes = ["Casais/Romance", "Pets", "Animes", "D&D/RPG", "Fanart", "OCs", "NSFW", "Retratos Realistas"];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex justify-center items-center gap-2"><Target className="text-brand" /> Gerador de Nicho Inteligente</h2>
        <p className="text-gray-400 text-sm">Descubra nichos lucrativos baseados no que você já gosta de fazer.</p>
      </div>

      <div className="bg-dark-card p-6 rounded-xl border border-gray-800 space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Qual seu estilo de traço principal?</label>
          <select className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white" value={style} onChange={e => setStyle(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="Anime/Mangá">Anime/Mangá</option>
            <option value="Cartoon">Cartoon/Disney</option>
            <option value="Semi-realista">Semi-realista</option>
            <option value="Realista">Realista</option>
            <option value="Chibi/Kawaii">Chibi/Kawaii</option>
            <option value="Pixel Art">Pixel Art</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">O que você gosta de desenhar? (Selecione múltiplos)</label>
          <div className="flex flex-wrap gap-2">
            {commonThemes.map(t => (
              <button 
                key={t} 
                onClick={() => toggleTheme(t)}
                className={`px-3 py-1 rounded-full text-sm border ${themes.includes(t) ? 'bg-brand border-brand text-white' : 'bg-dark-bg border-gray-700 text-gray-400'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Qual emoção você quer transmitir?</label>
          <input 
            type="text" 
            className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white"
            placeholder="Ex: Fofura, Saudade, Épico, Nostalgia..."
            value={emotion}
            onChange={e => setEmotion(e.target.value)}
          />
        </div>

        <button onClick={handleGenerate} disabled={loading} className="w-full bg-brand hover:bg-brand-dark text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : 'Gerar Ideias de Nicho'}
        </button>
      </div>

      {result && (
        <div className="mt-8 bg-dark-card p-6 rounded-xl border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-4">Sugestões de Nicho</h3>
          <div className="prose prose-invert max-w-none text-gray-300 text-sm markdown-body">
            <Markdown>{result}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
};

// --- CAPTION GENERATOR ---
interface CaptionGeneratorProps {
  lang: Language;
}

export const CaptionGenerator: React.FC<CaptionGeneratorProps> = ({ lang }) => {
  const [niche, setNiche] = useState('');
  const [topic, setTopic] = useState('');
  const [emotion, setEmotion] = useState('');
  const [platform, setPlatform] = useState<'Instagram' | 'Reddit' | 'Facebook'>('Instagram');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    // Fixed: Pass lang to generateCaptions for localized Gemini response
    const res = await generateCaptions(niche, topic, emotion, platform, lang);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex justify-center items-center gap-2"><ImageIcon className="text-brand" /> Gerador de Legendas</h2>
        <p className="text-gray-400 text-sm">Crie legendas em inglês que conectam e convertem.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-dark-card p-6 rounded-xl border border-gray-800 space-y-4 h-fit">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Plataforma</label>
            <div className="flex bg-dark-bg rounded-lg p-1 border border-gray-700">
              {(['Instagram', 'Reddit', 'Facebook'] as const).map(p => (
                <button key={p} onClick={() => setPlatform(p)} className={`flex-1 text-sm py-1 rounded ${platform === p ? 'bg-brand text-white' : 'text-gray-400'}`}>{p}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Seu Nicho</label>
            <input type="text" className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white text-sm" placeholder="Ex: Casais LDR" value={niche} onChange={e => setNiche(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">O que está no desenho?</label>
            <input type="text" className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white text-sm" placeholder="Ex: Um casal jogando videogame online juntos" value={topic} onChange={e => setTopic(topic => e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Emoção Principal</label>
            <input type="text" className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white text-sm" placeholder="Ex: Conexão, diversão" value={emotion} onChange={e => setEmotion(e.target.value)} />
          </div>
          <button onClick={handleGenerate} disabled={loading} className="w-full bg-brand hover:bg-brand-dark text-white py-2 rounded-lg font-bold flex justify-center items-center gap-2 text-sm">
            {loading ? <Loader2 className="animate-spin" size={16} /> : 'Gerar Legendas'}
          </button>
        </div>

        <div className="bg-dark-card p-6 rounded-xl border border-gray-800 min-h-[300px] flex flex-col">
           <h3 className="text-sm font-bold text-white mb-2 border-b border-gray-700 pb-2">Resultado</h3>
           <div className="flex-1 overflow-auto text-sm text-gray-300 font-mono markdown-body prose prose-invert prose-sm max-w-none">
             {result ? <Markdown>{result}</Markdown> : "As legendas geradas aparecerão aqui..."}
           </div>
           {result && (
             <button onClick={() => navigator.clipboard.writeText(result)} className="mt-3 w-full border border-gray-600 text-gray-400 hover:text-white py-2 rounded flex justify-center items-center gap-2 text-sm">
               <Copy size={14} /> Copiar
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

// --- PRICING CALCULATOR ---
interface PricingCalculatorProps {
  lang: Language;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ lang }) => {
  const [goal, setGoal] = useState<number>(2000);
  const [currency, setCurrency] = useState<'USD' | 'BRL'>('USD');
  const [calcMode, setCalcMode] = useState<'price' | 'volume'>('price');
  
  // inputValue represents "Volume (Drawings)" when mode is 'price'
  // inputValue represents "Price per Drawing" when mode is 'volume'
  const [inputValue, setInputValue] = useState<number>(10);

  // Sync default values when switching modes for better UX
  const handleModeSwitch = (mode: 'price' | 'volume') => {
    if (mode === calcMode) return;
    setCalcMode(mode);
    if (mode === 'price') {
      setInputValue(10); // default 10 drawings
    } else {
      setInputValue(150); // default $150 per drawing
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8 animate-fade-in pb-24">
      <div className="text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-accent/20 blur-[80px] -z-10 rounded-full"></div>
        <h2 className="text-3xl font-display font-bold text-white mb-2 tracking-tight flex justify-center items-center gap-3">
          <DollarSign size={28} className="text-brand-accent" />
          Calculadora de Metas
        </h2>
        <p className="text-dark-muted font-mono text-sm max-w-md mx-auto leading-relaxed">
          Defina quanto você quer ganhar e ajuste as variáveis para encaixar na sua realidade.
        </p>
      </div>

      <div className="bg-dark-card/60 backdrop-blur-md border border-dark-border p-6 rounded-2xl shadow-xl">
        <label className="text-[10px] uppercase font-mono tracking-[0.2em] font-bold text-dark-muted mb-4 block text-center">Sua Meta de Faturamento Mensal</label>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex p-1 bg-dark-bg border border-dark-border rounded-xl">
            <button 
              onClick={() => setCurrency('BRL')} 
              className={`px-6 py-2.5 rounded-lg text-xs font-mono font-bold transition-all ${currency === 'BRL' ? 'bg-brand/20 text-brand-light border border-brand/30 shadow-sm' : 'text-dark-muted hover:text-white'}`}
            >
              BRL
            </button>
            <button 
              onClick={() => setCurrency('USD')} 
              className={`px-6 py-2.5 rounded-lg text-xs font-mono font-bold transition-all ${currency === 'USD' ? 'bg-green-500/10 text-green-400 border border-green-500/30 shadow-sm' : 'text-dark-muted hover:text-white'}`}
            >
              USD
            </button>
          </div>
          <div className="relative flex-1 w-full">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-dark-muted font-bold text-lg">{currency === 'USD' ? '$' : 'R$'}</span>
            <input 
              type="number" 
              value={goal} 
              onChange={(e) => setGoal(Math.max(0, Number(e.target.value)))} 
              className="w-full bg-dark-bg border border-dark-border rounded-xl pl-12 pr-6 py-4 text-white font-display text-2xl font-bold focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/50 outline-none transition-all shadow-inner shadow-black/20" 
            />
          </div>
        </div>
      </div>

      <div className="flex p-1 bg-dark-bg border border-dark-border rounded-xl">
        <button 
          onClick={() => handleModeSwitch('price')} 
          className={`flex-1 py-3 rounded-lg text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase transition-all ${calcMode === 'price' ? 'bg-dark-card border border-dark-border text-white shadow-sm' : 'text-dark-muted hover:text-white hover:bg-dark-card/50'}`}
        >
          Sei a Quantidade
        </button>
        <button 
          onClick={() => handleModeSwitch('volume')} 
          className={`flex-1 py-3 rounded-lg text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase transition-all ${calcMode === 'volume' ? 'bg-dark-card border border-dark-border text-white shadow-sm' : 'text-dark-muted hover:text-white hover:bg-dark-card/50'}`}
        >
          Sei o Preço
        </button>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-2xl p-8 relative overflow-hidden shadow-xl shadow-brand/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        {calcMode === 'price' ? (
          <div className="flex flex-col items-center relative z-10 animate-fade-in">
            <span className="text-dark-muted text-sm font-mono mb-6 text-center">Quantos desenhos você quer (ou consegue) fazer no mês?</span>
            
            <div className="flex items-center justify-center gap-6 mb-10">
              <button onClick={() => setInputValue(Math.max(1, inputValue - 1))} className="w-12 h-12 rounded-xl bg-dark-bg border border-dark-border text-dark-muted flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-all text-xl shadow-sm">-</button>
              <div className="text-5xl font-display font-bold text-white w-20 text-center tracking-tight">{inputValue}</div>
              <button onClick={() => setInputValue(inputValue + 1)} className="w-12 h-12 rounded-xl bg-dark-bg border border-dark-border text-dark-muted flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-all text-xl shadow-sm">+</button>
            </div>
            
            <div className="w-full h-px bg-dark-border relative my-6">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-card px-4 text-[10px] font-mono uppercase tracking-[0.2em] text-brand-accent font-bold">Você Precisa Cobrar</span>
            </div>
            
            <div className="text-6xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mt-6 tracking-tighter">
              $ {((currency === 'BRL' ? goal / 5 : goal) / Math.max(1, inputValue)).toFixed(2)}
            </div>
            <span className="text-dark-muted text-xs font-mono uppercase tracking-widest mt-4 bg-dark-bg px-3 py-1 rounded-md border border-dark-border">por desenho (em Dólar)</span>
          </div>
        ) : (
          <div className="flex flex-col items-center relative z-10 animate-fade-in">
            <span className="text-dark-muted text-sm font-mono mb-6 text-center">Por quanto você vai vender cada desenho? (USD)</span>
            
            <div className="w-full max-w-[240px] mb-10">
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-dark-muted font-bold text-xl">$</span>
                <input 
                  type="number" 
                  value={inputValue} 
                  onChange={(e) => setInputValue(Math.max(1, Number(e.target.value)))} 
                  className="w-full bg-dark-bg border border-dark-border rounded-xl pl-12 pr-6 py-4 text-white font-display text-3xl font-bold text-center focus:border-brand-accent/50 outline-none transition-all shadow-inner shadow-black/20" 
                />
              </div>
            </div>
            
            <div className="w-full h-px bg-dark-border relative my-6">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-card px-4 text-[10px] font-mono uppercase tracking-[0.2em] text-brand-light font-bold">Você Precisa Vender</span>
            </div>
            
            <div className="text-6xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-accent mt-6 tracking-tighter">
              {Math.ceil((currency === 'BRL' ? goal / 5 : goal) / Math.max(1, inputValue))}
            </div>
            <span className="text-dark-muted text-xs font-mono uppercase tracking-widest mt-4 bg-dark-bg px-3 py-1 rounded-md border border-dark-border">desenhos por mês</span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- PORTFOLIO EXPRESS ---
interface PortfolioExpressProps {
  lang: Language;
}

export const PortfolioExpress: React.FC<PortfolioExpressProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [niche, setNiche] = useState('');
  const [vibe, setVibe] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    // Fixed: Pass lang to generatePortfolioBio for localized Gemini response
    const res = await generatePortfolioBio(name, niche, vibe, lang);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex justify-center items-center gap-2"><Briefcase className="text-brand" /> Portfólio Express</h2>
        <p className="text-gray-400 text-sm">Gere a estrutura perfeita para sua Bio e perfil.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-dark-card p-6 rounded-xl border border-gray-800 space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Seu Nome Artístico</label>
            <input type="text" className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white text-sm" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Seu Nicho</label>
            <input type="text" className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white text-sm" value={niche} onChange={e => setNiche(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Vibe do Perfil</label>
            <input type="text" className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white text-sm" placeholder="Ex: Acolhedora, Mágica, Sombria" value={vibe} onChange={e => setVibe(e.target.value)} />
          </div>
          <button onClick={handleGenerate} disabled={loading} className="w-full bg-brand hover:bg-brand-dark text-white py-2 rounded-lg font-bold flex justify-center items-center gap-2 text-sm">
            {loading ? <Loader2 className="animate-spin" size={16} /> : 'Gerar Estrutura'}
          </button>
        </div>

        <div className="bg-dark-card p-6 rounded-xl border border-gray-800 min-h-[300px] flex flex-col">
           <h3 className="text-sm font-bold text-white mb-2 border-b border-gray-700 pb-2">Sua Bio e Estrutura</h3>
           <div className="flex-1 overflow-auto text-sm text-gray-300 font-mono markdown-body prose prose-invert prose-sm max-w-none">
             {result ? <Markdown>{result}</Markdown> : "A estrutura do seu perfil aparecerá aqui..."}
           </div>
        </div>
      </div>
    </div>
  );
};
