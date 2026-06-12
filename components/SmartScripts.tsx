
import React, { useState } from 'react';
import { generateScript } from '../services/geminiService';
import { MessageSquare, Copy, Loader2, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import Markdown from 'react-markdown';

interface SmartScriptsProps {
  lang: Language;
}

export const SmartScripts: React.FC<SmartScriptsProps> = ({ lang }) => {
  const [scenario, setScenario] = useState('Primeiro contato');
  const [clientName, setClientName] = useState('');
  const [details, setDetails] = useState('');
  const [tone, setTone] = useState<'Friendly' | 'Professional' | 'Firm'>('Friendly');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    // Fixed: Passing lang prop to generateScript
    const script = await generateScript(scenario, clientName, details, tone, lang);
    setResult(script);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <MessageSquare className="text-brand" size={32} />
          Scripts Inteligentes
        </h2>
        <p className="text-gray-400 mt-2">Gere respostas perfeitas em inglês para qualquer situação com o cliente.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-dark-card p-6 rounded-xl border border-gray-800">
            <label className="block text-sm font-medium text-gray-400 mb-2">Situação</label>
            <select 
              value={scenario} 
              onChange={(e) => setScenario(e.target.value)}
              className="w-full bg-dark-bg border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand focus:outline-none"
            >
              <option>Primeiro contato (Interesse)</option>
              <option>Cliente perguntando preço</option>
              <option>Cliente indeciso / Sumiu</option>
              <option>Cliente pediu desconto</option>
              <option>Fechamento (Enviar Invoice)</option>
              <option>Entrega do desenho (Final)</option>
            </select>
          </div>

          <div className="bg-dark-card p-6 rounded-xl border border-gray-800 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Nome do Cliente</label>
              <input 
                type="text" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex: John"
                className="w-full bg-dark-bg border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Detalhes Específicos</label>
              <textarea 
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Ex: Ele quer um desenho de casal com pokemon. O valor é $65."
                className="w-full bg-dark-bg border border-gray-700 rounded-lg p-3 text-white h-24 focus:ring-2 focus:ring-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Tom de Voz</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Friendly', 'Professional', 'Firm'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`p-2 rounded-lg text-sm font-medium border transition-all ${
                      tone === t 
                        ? 'bg-brand/20 border-brand text-brand-light' 
                        : 'bg-dark-bg border-gray-700 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {t === 'Friendly' ? 'Amigável' : t === 'Professional' ? 'Profissional' : 'Firme'}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Gerar Resposta em Inglês'}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="bg-dark-card p-6 rounded-xl border border-gray-800 h-full min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-4">
            <h3 className="font-semibold text-white">Resposta Gerada</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => navigator.clipboard.writeText(result)}
                className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 transition-colors"
                title="Copiar"
              >
                <Copy size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto bg-dark-bg p-4 rounded-lg border border-gray-700 text-gray-300 font-mono text-sm markdown-body prose prose-invert prose-sm max-w-none">
            {loading ? (
              <div className="h-full flex items-center justify-center text-gray-500 gap-2">
                <RefreshCw className="animate-spin" /> Gerando a melhor resposta...
              </div>
            ) : result ? (
               <Markdown>{result}</Markdown>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-600 italic text-center">
                Configure o cenário e clique em gerar para ver a mágica acontecer.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
