
import React, { useState } from 'react';
import { generateCaptions, generateNicheIdeas, generatePortfolioBio } from '../services/geminiService';
import { Loader2, Target, Image as ImageIcon, DollarSign, Briefcase, Copy, ChevronRight } from 'lucide-react';
import { Language } from '../types';

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
          <div className="prose prose-invert max-w-none whitespace-pre-wrap text-gray-300 text-sm">
            {result}
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
           <div className="flex-1 overflow-auto whitespace-pre-wrap text-sm text-gray-300 font-mono">
             {result || "As legendas geradas aparecerão aqui..."}
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
  const [level, setLevel] = useState<'Iniciante' | 'Intermediário' | 'Avançado'>('Iniciante');
  const [type, setType] = useState<'Bust' | 'Half Body' | 'Full Body'>('Bust');
  const [bg, setBg] = useState(false);
  
  const calculatePrice = () => {
    let base = 0;
    if (type === 'Bust') base = 25;
    if (type === 'Half Body') base = 40;
    if (type === 'Full Body') base = 60;

    if (level === 'Intermediário') base *= 1.5;
    if (level === 'Avançado') base *= 2.5;

    if (bg) base += (level === 'Iniciante' ? 15 : level === 'Intermediário' ? 30 : 50);

    return Math.round(base);
  };

  const price = calculatePrice();

  return (
    <div className="p-6 max-w-xl mx-auto">
       <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex justify-center items-center gap-2"><DollarSign className="text-brand" /> Precificador Automático</h2>
        <p className="text-gray-400 text-sm">Calcule o valor justo (em Dólar) para sua arte.</p>
      </div>

      <div className="bg-dark-card p-6 rounded-xl border border-gray-800 space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Seu Nível de Experiência</label>
          <div className="grid grid-cols-3 gap-2">
             {(['Iniciante', 'Intermediário', 'Avançado'] as const).map(l => (
               <button key={l} onClick={() => setLevel(l)} className={`text-xs py-2 rounded border ${level === l ? 'bg-brand border-brand text-white' : 'border-gray-700 text-gray-400'}`}>{l}</button>
             ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Tipo de Ilustração</label>
          <div className="grid grid-cols-3 gap-2">
             {(['Bust', 'Half Body', 'Full Body'] as const).map(t => (
               <button key={t} onClick={() => setType(t)} className={`text-xs py-2 rounded border ${type === t ? 'bg-brand border-brand text-white' : 'border-gray-700 text-gray-400'}`}>{t}</button>
             ))}
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-dark-bg rounded-lg border border-gray-700 cursor-pointer" onClick={() => setBg(!bg)}>
          <div className={`w-5 h-5 rounded border flex items-center justify-center ${bg ? 'bg-brand border-brand' : 'border-gray-500'}`}>
            {bg && <div className="w-2 h-2 bg-white rounded-full" />}
          </div>
          <span className="text-sm text-gray-300">Incluir Cenário Detalhado (Background)</span>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <span className="text-gray-400 text-sm block mb-1">Preço Sugerido</span>
          <div className="text-5xl font-bold text-brand-light">US$ {price}</div>
          <p className="text-gray-500 text-xs mt-2">Este é um valor estimado baseado no mercado internacional.</p>
        </div>
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
           <div className="flex-1 overflow-auto whitespace-pre-wrap text-sm text-gray-300 font-mono">
             {result || "A estrutura do seu perfil aparecerá aqui..."}
           </div>
        </div>
      </div>
    </div>
  );
};
