
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  PLAN_14_DAYS = 'PLAN_14_DAYS',
  NICHE_GENERATOR = 'NICHE_GENERATOR',
  CAPTION_GENERATOR = 'CAPTION_GENERATOR',
  PRICING_CALCULATOR = 'PRICING_CALCULATOR',
  SMART_SCRIPTS = 'SMART_SCRIPTS',
  PORTFOLIO_EXPRESS = 'PORTFOLIO_EXPRESS',
  NICHE_LIBRARY = 'NICHE_LIBRARY',
  CLIENT_TRACKER = 'CLIENT_TRACKER',
}

export type Language = 'en' | 'pt' | 'es';

export interface DayPlan {
  day: number;
  title: string;
  description: string;
  isCompleted: boolean;
  linkedView?: AppView;
  tasks: string[];
}

export interface ScriptCategory {
  id: string;
  label: string;
  icon: string;
  promptContext: string;
}

export type CommissionStatus = 
  | 'Aguardando Pagamento'
  | 'Briefing Recebido'
  | 'Rascunho'
  | 'Line Art'
  | 'Cores Base'
  | 'Render Final'
  | 'Pronto para Envio'
  | 'Concluído'
  | 'Cliente Sumiu'
  | 'Cancelado';

export interface Client {
  id: string;
  name: string;
  country: string;
  platform: string;
  artType: string;
  price: number;
  status: CommissionStatus;
  startDate: string;
  dueDate: string;
  description: string;
  priority: 'Alta' | 'Média' | 'Baixa';
}
