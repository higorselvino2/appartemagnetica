
import React, { useState, useEffect } from 'react';
import { Client, CommissionStatus, Language } from '../types';
import { generateScript } from '../services/geminiService';
import { 
  Users, 
  Plus, 
  Search, 
  Calendar, 
  DollarSign, 
  MoreHorizontal, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare,
  Trash2,
  X,
  Loader2,
  Copy
} from 'lucide-react';

const INITIAL_CLIENTS: Client[] = [];

interface ClientTrackerProps {
  lang: Language;
}

export const ClientTracker: React.FC<ClientTrackerProps> = ({ lang }) => {
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('Todos');
  const [scriptLoading, setScriptLoading] = useState<string | null>(null);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Client>>({
    status: 'Briefing Recebido',
    priority: 'Média'
  });

  useEffect(() => {
    const saved = localStorage.getItem('arte_magnetica_clients');
    if (saved) {
      setClients(JSON.parse(saved));
    }
  }, []);

  const saveClients = (newClients: Client[]) => {
    setClients(newClients);
    localStorage.setItem('arte_magnetica_clients', JSON.stringify(newClients));
  };

  const handleAddClient = () => {
    if (!formData.name || !formData.price) return;

    const newClient: Client = {
      id: Date.now().toString(),
      name: formData.name!,
      country: formData.country || 'USA',
      platform: formData.platform || 'Instagram',
      artType: formData.artType || 'Full Body',
      price: Number(formData.price),
      status: formData.status as CommissionStatus,
      startDate: formData.startDate || new Date().toISOString().split('T')[0],
      dueDate: formData.dueDate || '',
      description: formData.description || '',
      priority: (formData.priority as any) || 'Média',
    };

    saveClients([...clients, newClient]);
    setShowAddModal(false);
    setFormData({ status: 'Briefing Recebido', priority: 'Média' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este cliente?')) {
      saveClients(clients.filter(c => c.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: CommissionStatus) => {
    const updated = clients.map(c => c.id === id ? { ...c, status: newStatus } : c);
    saveClients(updated);
  };

  const handleGenerateScript = async (client: Client) => {
    setScriptLoading(client.id);
    setGeneratedScript(null);
    
    const scenario = `Cliente está no status: ${client.status}. Preciso de uma mensagem sobre isso.`;
    // Fixed: Pass lang to generateScript for proper localization in Gemini response
    const script = await generateScript(scenario, client.name, `Pedido: ${client.artType}. Detalhes: ${client.description}`, 'Professional', lang);
    
    setGeneratedScript(script);
    setScriptLoading(null);
  };

  const filteredClients = filterStatus === 'Todos' 
    ? clients 
    : clients.filter(c => c.status === filterStatus);

  const getStatusColor = (status: string) => {
    if (status.includes('Concluído') || status.includes('Pronto')) return 'text-green-400 border-green-400/30 bg-green-400/10';
    if (status.includes('Aguardando') || status.includes('Sumiu')) return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
    if (status.includes('Cancelado')) return 'text-red-400 border-red-400/30 bg-red-400/10';
    return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="text-brand" size={32} />
            Tracker de Clientes
          </h2>
          <p className="text-gray-400 mt-1">Gerencie seus pedidos e prazos em um só lugar.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-brand/20"
        >
          <Plus size={20} /> Adicionar Cliente
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700">
        {['Todos', 'Aguardando Pagamento', 'Rascunho', 'Line Art', 'Concluído'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border transition-all ${
              filterStatus === status 
                ? 'bg-white text-dark-bg font-bold border-white' 
                : 'bg-dark-card text-gray-400 border-gray-700 hover:border-gray-500'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Client List */}
      <div className="grid gap-4">
        {filteredClients.length === 0 ? (
          <div className="text-center py-12 bg-dark-card border border-dashed border-gray-800 rounded-xl">
            <Users size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">Nenhum cliente encontrado com esse status.</p>
          </div>
        ) : (
          filteredClients.map(client => (
            <div key={client.id} className="bg-dark-card border border-gray-800 rounded-xl p-5 hover:border-brand/30 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Info Principal */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getStatusColor(client.status)} border-2`}>
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg flex items-center gap-2">
                      {client.name}
                      <span className="text-xs font-normal text-gray-500 border border-gray-700 px-2 py-0.5 rounded">{client.country}</span>
                    </h3>
                    <p className="text-sm text-gray-400">{client.artType} • {client.platform}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                       <span className="text-gray-300 flex items-center gap-1"><DollarSign size={14} className="text-green-400"/> US$ {client.price}</span>
                       <span className="text-gray-300 flex items-center gap-1"><Calendar size={14} className="text-brand-light"/> {client.dueDate || 'Sem prazo'}</span>
                    </div>
                  </div>
                </div>

                {/* Status e Ações */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                  <select 
                    value={client.status}
                    onChange={(e) => handleStatusChange(client.id, e.target.value as CommissionStatus)}
                    className={`bg-dark-bg border border-gray-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-brand ${getStatusColor(client.status)} border-opacity-50`}
                  >
                    <option>Aguardando Pagamento</option>
                    <option>Briefing Recebido</option>
                    <option>Rascunho</option>
                    <option>Line Art</option>
                    <option>Cores Base</option>
                    <option>Render Final</option>
                    <option>Pronto para Envio</option>
                    <option>Concluído</option>
                    <option>Cliente Sumiu</option>
                    <option>Cancelado</option>
                  </select>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => handleGenerateScript(client)}
                      disabled={!!scriptLoading}
                      className="flex-1 sm:flex-none bg-brand/10 hover:bg-brand/20 text-brand-light p-2 rounded-lg transition-colors border border-brand/20"
                      title="Gerar Script para este cliente"
                    >
                      {scriptLoading === client.id ? <Loader2 size={20} className="animate-spin" /> : <MessageSquare size={20} />}
                    </button>
                    <button 
                      onClick={() => handleDelete(client.id)}
                      className="flex-1 sm:flex-none bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg transition-colors border border-red-500/20"
                      title="Remover Cliente"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Script Result Area (Inline) */}
              {generatedScript && scriptLoading === null && (
                 <div className="mt-4 pt-4 border-t border-gray-800 animate-fade-in">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-brand-light uppercase tracking-wider">Script Gerado (Inglês)</span>
                      <button onClick={() => { navigator.clipboard.writeText(generatedScript); setGeneratedScript(null); }} className="text-xs text-gray-400 hover:text-white flex items-center gap-1"><Copy size={12}/> Copiar e Fechar</button>
                   </div>
                   <div className="bg-dark-bg p-3 rounded-lg border border-gray-700 text-sm text-gray-300 font-mono whitespace-pre-wrap">
                     {generatedScript}
                   </div>
                 </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-card border border-gray-700 rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Novo Cliente</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white"><X /></button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Nome</label>
                  <input className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">País</label>
                  <input className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white" value={formData.country || ''} onChange={e => setFormData({...formData, country: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-xs text-gray-400 mb-1">Plataforma</label>
                  <select className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white" value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})}>
                    <option>Instagram</option>
                    <option>Reddit</option>
                    <option>Twitter/X</option>
                    <option>Ko-Fi</option>
                    <option>Email</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Preço (USD)</label>
                  <input type="number" className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white" value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Tipo de Arte</label>
                <input className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white" placeholder="Ex: Full Body RPG Character" value={formData.artType || ''} onChange={e => setFormData({...formData, artType: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Data de Entrega</label>
                  <input type="date" className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white" value={formData.dueDate || ''} onChange={e => setFormData({...formData, dueDate: e.target.value})} />
                </div>
                <div>
                   <label className="block text-xs text-gray-400 mb-1">Prioridade</label>
                   <select className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value as any})}>
                     <option>Baixa</option>
                     <option>Média</option>
                     <option>Alta</option>
                   </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Descrição / Notas</label>
                <textarea className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white h-20" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>

              <button onClick={handleAddClient} className="w-full bg-brand hover:bg-brand-dark text-white py-3 rounded-lg font-bold mt-2">Salvar Cliente</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
