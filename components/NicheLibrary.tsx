
import React, { useState } from 'react';
import { BookOpen, Heart, Target, Palette, Lightbulb, Hash, AlertTriangle, Copy, Check } from 'lucide-react';
import { Language } from '../types';

interface NicheLibraryProps {
  lang: Language;
}

interface NicheData {
  id: string;
  name: string;
  description: string;
  audience: string;
  pains: string[];
  buyingItems: string[];
  visualStyle: string;
  portfolioIdeas: string[];
  captions: string[];
  hashtags: string[];
  mistakes: string[];
  places: string[];
}

const NICHES: NicheData[] = [
  {
    id: 'ldr',
    name: 'Casais em Relacionamento à Distância (LDR)',
    description: 'Casais que vivem longe um do outro e buscam formas de sentir proximidade física e emocional através da arte.',
    audience: 'Jovens adultos (18-30 anos), EUA/Europa, usuários ativos de Discord e Reddit. Sentimentais e valorizam memórias.',
    pains: ['Saudade física', 'Falta de fotos juntos', 'Necessidade de conexão', 'Datas comemorativas longe um do outro'],
    buyingItems: ['Retratos "Closing the distance" (encontro)', 'Desenhos fazendo atividades juntos (jogando, dormindo)', 'Polaroids com mensagens'],
    visualStyle: 'Cores quentes e acolhedoras (Lo-fi), iluminação suave, foco em expressões de carinho e intimidade.',
    portfolioIdeas: [
      'Casal dividido pela tela do celular/pc se tocando',
      'Um dormindo pensando no outro (balão de pensamento)',
      'Encontro no aeroporto (abraço emocionante)',
      'Casal jogando video-game juntos online'
    ],
    captions: [
      "Distance implies so little when someone means so much. ❤️ I drew this couple to help them close the gap.",
      "Miles apart, but connected by heart. A special commission for a lovely LDR couple.",
      "Proof that love knows no distance. Tag your player 2! 🎮❤️"
    ],
    hashtags: ['#LDRart', '#longdistancerelationship', '#closingthedistance', '#ldrcouple', '#commissionartist'],
    mistakes: ['Fazer poses muito estáticas/duras', 'Esquecer detalhes pessoais (tatuagens, acessórios)', 'Não transmitir emoção no olhar'],
    places: ['r/LongDistance', 'r/LDR', 'Grupos de Facebook "LDR Support"', 'Instagram #LDRcommunity']
  },
  {
    id: 'pets',
    name: 'Pets & Animais de Estimação',
    description: 'Donos de animais que consideram seus pets como filhos (fur babies) ou que perderam um pet recentemente.',
    audience: 'Mulheres (25-45 anos), EUA/UK, classe média/alta, tratam o pet como membro da família.',
    pains: ['Luto (perda do pet)', 'Amor incondicional', 'Querer eternizar a personalidade do bicho', 'Decoração da casa'],
    buyingItems: ['Memorial (com auréola/asas)', 'Pet como realeza/nobre', 'Pet estilo Disney', 'Stickers do pet para WhatsApp/Telegram'],
    visualStyle: 'Vibrante e alegre para vivos, Suave e etéreo para memoriais. Foco total nos olhos e pelagem.',
    portfolioIdeas: [
      'Cachorro/Gato com roupa de astronauta ou profissão',
      'Memorial com arco-íris ao fundo (Rainbow Bridge)',
      'Dono abraçando o pet (foco na conexão)',
      'Vários pets juntos em uma "foto de família"'
    ],
    captions: [
      "They are not just pets, they are family. 🐾❤️ Captured this good boy's smile forever.",
      "Run free over the rainbow bridge. 🌈 A memorial piece for a very special friend.",
      "If love could save you, you would have lived forever. 🕊️"
    ],
    hashtags: ['#petportrait', '#dogart', '#catdrawing', '#rainbowbridge', '#petmemorial', '#dogmom'],
    mistakes: ['Errar a mancha específica do pelo', 'Olhos sem brilho (parece taxidermia)', 'Fundo que briga com a cor do animal'],
    places: ['r/Aww', 'r/RainbowBridge', 'Grupos de raças específicas (ex: Golden Retriever Lovers)', 'Instagram #petsofinstagram']
  },
  {
    id: 'dnd',
    name: 'RPG / D&D / Fantasia',
    description: 'Jogadores de RPG de mesa que querem ver seus personagens originais ganharem vida visualmente.',
    audience: 'Gamers e Nerds (20-40 anos), Maioria homens, investem muito no hobby. Detalhistas.',
    pains: ['Personagem só existe na imaginação', 'Quer mostrar pro grupo', 'Campanha épica terminando', 'Apego emocional à história'],
    buyingItems: ['Character Sheet (Corpo inteiro + itens)', 'Party completa (grupo todo)', 'Cenas de batalha', 'Retrato token para VTT'],
    visualStyle: 'Épico, iluminação dramática, texturas de metal/couro, anatomia correta, magia visível.',
    portfolioIdeas: [
      'Guerreiro(a) em pose de descanso na taverna',
      'Mago lançando feitiço (efeitos de luz)',
      'Grupo de aventureiros reunidos na fogueira',
      'Close-up no rosto com cicatrizes e expressão marcante'
    ],
    captions: [
      "Every scar tells a story. Ready for the next adventure? ⚔️🛡️",
      "Bringing characters to life, one dice roll at a time. 🎲✨ Meet [Character Name]!",
      "From the character sheet to reality. Who is your favorite D&D character?"
    ],
    hashtags: ['#dndart', '#dndcharacter', '#rpgcharacter', '#fantasyart', '#dungeonsanddragons', '#commissionsopen'],
    mistakes: ['Armaduras impraticáveis/irrealistas', 'Armas tortas', 'Esquecer itens do inventário descritos', 'Fazer todos os rostos iguais'],
    places: ['r/DnD', 'r/CharacterDrawing', 'r/DnDart', 'Twitter/X (Comunidade TTRPG)']
  },
  {
    id: 'f1',
    name: 'F1 & Automobilismo',
    description: 'Fãs apaixonados por pilotos e equipes que querem celebrar vitórias ou momentos icônicos.',
    audience: 'Fãs de esportes (18-35 anos), ativos no Twitter/X e Tumblr. Fandom muito engajado (especialmente feminino recentemente).',
    pains: ['Paixão pelo piloto', 'Momentos históricos', 'Shipps (em alguns casos)', 'Colecionismo'],
    buyingItems: ['Piloto comemorando vitória', 'Carro em alta velocidade (motion blur)', 'Capacete detalhado', 'Momentos fofos no paddock'],
    visualStyle: 'Dinâmico, cores saturadas das equipes (Vermelho Ferrari, Laranja McLaren), contraste alto.',
    portfolioIdeas: [
      'Piloto favorito segurando o troféu',
      'Carro fazendo uma curva em chuva',
      'Dupla de pilotos (teammates) interagindo',
      'Colagem estilo poster vintage de corrida'
    ],
    captions: [
      "Lights out and away we go! 🏎️💨 Capturing the speed and passion of F1.",
      "Still buzzing from that race! Here is a tribute to the winner. 🏆",
      "Smooth operator. 😉 Who is your favorite driver on the grid?"
    ],
    hashtags: ['#f1art', '#formula1', '#leclerc', '#hamilton', '#mclaren', '#scuderiaferrari'],
    mistakes: ['Errar proporção do carro', 'Errar logos de patrocinadores', 'Desenhar capacete antigo', 'Rosto irreconhecível'],
    places: ['Twitter/X (F1twt)', 'Tumblr', 'r/Formula1', 'Instagram Fan Accounts']
  },
  {
    id: 'real-couples',
    name: 'Casais Reais / Aniversários',
    description: 'Casais que querem presentear em datas especiais (Dia dos Namorados, Aniversário de Namoro/Casamento).',
    audience: 'Mulheres e Homens apaixonados (20-35 anos), procuram presentes únicos e personalizados.',
    pains: ['Não sabem o que dar de presente', 'Querem algo romântico', 'Querem eternizar uma foto especial', 'Datas chegando'],
    buyingItems: ['Redesenho de foto favorita', 'Casal estilo Disney/Cartoon', 'Ilustração para convite de casamento', 'Quadrinhos contando como se conheceram'],
    visualStyle: 'Romântico, cores pastéis ou vibrantes (depende do gosto), foco em sorrisos e contato visual.',
    portfolioIdeas: [
      'Redesenho de uma selfie do casal (com roupa melhorada)',
      'Pedido de casamento ilustrado',
      'Casal cozinhando juntos na cozinha bagunçada',
      'Evolução do casal (primeiro encontro vs hoje)'
    ],
    captions: [
      "Love is in the air! ❤️ Turned this beautiful couple photo into a special illustration.",
      "The perfect anniversary gift doesn't exi... oh wait! 🎁✨",
      "Capturing real love stories into art. Happy Valentine's Day! 🌹"
    ],
    hashtags: ['#coupleportrait', '#anniversarygift', '#weddingart', '#couplegoals', '#customportrait'],
    mistakes: ['Não captar a semelhança dos rostos', 'Esquecer alianças', 'Fazer o casal parecer irmãos (falta de química)', 'Cores muito frias'],
    places: ['Instagram (Hashtags de casamento)', 'Pinterest', 'Grupos de Noivas', 'TikTok']
  },
  {
    id: 'ocs',
    name: 'OCs (Original Characters) / Escritores',
    description: 'Escritores de Wattpad/AO3 ou criadores de histórias que precisam visualizar seus protagonistas.',
    audience: 'Escritores amadores e semi-profissionais, leitores ávidos. Muito ativos no Twitter e Tumblr.',
    pains: ['Não sabem desenhar o que escrevem', 'Querem capa pro livro', 'Querem mostrar pro leitor como é o personagem'],
    buyingItems: ['Capa de livro (Ebook)', 'Design de personagem (frente/costas)', 'Cena chave do capítulo', 'Casal principal (OTP)'],
    visualStyle: 'Atmosférico, foco em roupas e descrição física precisa (cicatrizes, cor dos olhos, cabelo).',
    portfolioIdeas: [
      'Protagonista segurando um objeto chave da história',
      'Vilão nas sombras',
      'Casal principal em momento de tensão (quase beijo)',
      'Ficha de personagem com paleta de cores'
    ],
    captions: [
      "Bringing stories to life! 📖✨ This is [Name], the protagonist of a new fantasy novel.",
      "Writers, seeing your characters for the first time is magic. Let's make it happen! ✍️🎨",
      "Commission for a Wattpad author. I loved working on this character design!"
    ],
    hashtags: ['#ocart', '#originalcharacter', '#wattpadcover', '#characterdesign', '#bookstagram'],
    mistakes: ['Ignorar a descrição do autor', 'Errar a "vibe" (fazer fofo se o livro é dark)', 'Roupas genéricas'],
    places: ['Wattpad Forums', 'Twitter/X (Writer Community)', 'Tumblr', 'Grupos de NaNoWriMo']
  },
  {
    id: 'gamers',
    name: 'Gamers & Streamers',
    description: 'Jogadores de Valorant, LoL, WoW ou Streamers que precisam de identidade visual.',
    audience: 'Streamers iniciantes/médios, Gamers hardcores. Plataforma principal: Twitch e Discord.',
    pains: ['Avatar genérico', 'Canal sem personalidade', 'Querem se ver como seu "main" (personagem favorito)'],
    buyingItems: ['Avatar para Twitch/Discord', 'Emotes personalizados', 'Banner de "Offline"', 'Desenho do Gamer vestido como o personagem'],
    visualStyle: 'Cyberpunk, Neon, Traço Anime ou "Gaming", Cores RGB, Contraste alto para telas pequenas.',
    portfolioIdeas: [
      'Avatar de uma garota gamer com headset de gatinho',
      'Versão do cliente usando a roupa da Jett/Sage (Valorant)',
      'Set de 3 emotes (Hi, Rage, Love)',
      'Banner de espera com o setup do quarto ao fundo'
    ],
    captions: [
      "Level up your stream! 🎮💜 Custom avatar commission for a Twitch streamer.",
      "Main Sage? Let me draw you as your favorite agent! ✨",
      "New emotes dropping soon! Which one is your favorite? pog/love/gg"
    ],
    hashtags: ['#twitchart', '#streamerbranding', '#valorantfanart', '#emotesartist', '#gamergirl'],
    mistakes: ['Emotes ilegíveis quando pequenos', 'Cores muito apagadas', 'Não entender as referências do jogo'],
    places: ['Twitter/X', 'Discord de Streamers', 'r/Twitch', 'Grupos de Valorant/LoL']
  },
  {
    id: 'family',
    name: 'Família & Maternidade',
    description: 'Mães, pais e avós que querem eternizar a infância dos filhos ou a gravidez.',
    audience: 'Mães (25-40 anos), Valorizam muito a família. Gostam de decoração e lembranças.',
    pains: ['Filhos crescem rápido', 'Não tem fotos bonitas de todos juntos', 'Quer decorar o quarto do bebê'],
    buyingItems: ['Retrato de família estilo "fofo"', 'Ilustração da gestante', 'Quadro de nascimento (com peso/altura)', 'Família estilo Simpsons/Disney'],
    visualStyle: 'Soft, Tons pastéis, Aquarela digital, Traço infantil ou Disney, foco na ternura.',
    portfolioIdeas: [
      'Mãe grávida com a mão na barriga',
      'Bebê dormindo em uma lua (fantasia)',
      'Família inteira no sofá (incluindo o cachorro)',
      'Criança vestida de super-herói'
    ],
    captions: [
      "Capturing the sweetest moments of motherhood. 🤰💖",
      "Little feet, big dreams. A nursery illustration for baby [Name]. 🧸",
      "Family is everything. A custom portrait to cherish forever. 🏠❤️"
    ],
    hashtags: ['#familyportrait', '#nurseryart', '#momlife', '#digitalwatercolor', '#babyart'],
    mistakes: ['Crianças com rosto de adulto', 'Cores muito escuras/tristes', 'Falta de conexão entre os membros da família'],
    places: ['Instagram (Mom influencers)', 'Pinterest', 'Facebook Groups de Mães', 'Etsy']
  },
  {
    id: 'aesthetic',
    name: 'Minimalista / Aesthetic / Tattoo',
    description: 'Pessoas que buscam arte para tatuagem ou decoração clean, focada em linhas e estética.',
    audience: 'Jovens adultos, Hipsters, amantes de decoração e tatuagem. Pinterest users.',
    pains: ['Querem uma tatuagem única', 'Querem arte para parede que não canse', 'Buscam "vibe" específica'],
    buyingItems: ['Design de Tatuagem (Line work)', 'Wallpapers minimalistas', 'Prints botânicos', 'Line art de foto pessoal'],
    visualStyle: 'Preto e branco (ou pouca cor), Linhas finas, Espaço negativo, Botânica, Geometria.',
    portfolioIdeas: [
      'Line art de duas mãos se tocando (floral)',
      'Silhueta de um rosto com flores saindo da cabeça',
      'Desenho de um animal geométrico',
      'Design de tatuagem para antebraço'
    ],
    captions: [
      "Simple lines, deep meaning. 🌿 Custom tattoo design commission.",
      "Less is more. Minimalist line art for a modern home decor. 🖼️",
      "Turning memories into elegant lines. DM for custom tattoo tickets! 🎟️"
    ],
    hashtags: ['#lineart', '#tattoodesign', '#minimalistart', '#botanicalillustration', '#aestheticart'],
    mistakes: ['Linhas trêmulas', 'Excesso de informação/detalhes', 'Composição desequilibrada'],
    places: ['Pinterest', 'Instagram', 'TikTok (Process videos)', 'Twitter/X']
  },
  {
    id: 'polaroid',
    name: 'Estilo Polaroid / Nostalgia',
    description: 'Um formato específico que vende muito: transformar fotos digitais em "memórias físicas" desenhadas.',
    audience: 'Gen Z e Millennials, Amantes de fotografia analógica, Casais e Amigos.',
    pains: ['Nostalgia', 'Feed do Instagram "Aesthetic"', 'Presente barato e significativo'],
    buyingItems: ['Polaroid digital desenhada', 'Sequência de 3 polaroids contando história', 'Sticker estilo polaroid'],
    visualStyle: 'Borda branca clássica, filtro granulado (noise), caligrafia "feita a mão" na borda.',
    portfolioIdeas: [
      'Polaroid de uma viagem na praia (com data escrita)',
      'Polaroid de um casal rindo espontaneamente',
      'Polaroid de um grupo de amigos na festa',
      'Polaroid de um pet fazendo bagunça'
    ],
    captions: [
      "Making memories last forever. 📸✨ Digital polaroid commission.",
      "Capture the feeling, not just the image. Vintage vibes for this couple. 🎞️",
      "Your favorite photo, turned into a timeless polaroid illustration. 🖋️"
    ],
    hashtags: ['#polaroidart', '#vintagevibes', '#digitalpolaroid', '#memorykeeper', '#nostalgiaart'],
    mistakes: ['Esquecer a textura de papel', 'Fonte do texto muito digital/falsa', 'Desenho muito HD (tem que parecer foto antiga)'],
    places: ['Instagram', 'TikTok', 'Twitter', 'Pinterest']
  }
];

export const NicheLibrary: React.FC<NicheLibraryProps> = ({ lang }) => {
  const [selectedNiche, setSelectedNiche] = useState<NicheData | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto pb-24">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
          <BookOpen className="text-brand" size={32} />
          Biblioteca de Nichos
        </h2>
        <p className="text-gray-400 mt-2">Um catálogo estratégico para você escolher onde atacar e como vender.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar de Seleção */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Nichos Lucrativos</h3>
          {NICHES.map(niche => (
            <button
              key={niche.id}
              onClick={() => setSelectedNiche(niche)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                selectedNiche?.id === niche.id 
                  ? 'bg-brand/20 border-brand text-white shadow-lg shadow-brand/10' 
                  : 'bg-dark-card border-gray-800 text-gray-400 hover:border-brand/50 hover:text-white'
              }`}
            >
              <span className="font-medium">{niche.name}</span>
              <Copy size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${selectedNiche?.id === niche.id ? 'text-brand-light' : 'text-gray-500'}`} />
            </button>
          ))}
        </div>

        {/* Área de Detalhes */}
        <div className="lg:col-span-8">
          {selectedNiche ? (
            <div className="bg-dark-card border border-gray-800 rounded-2xl overflow-hidden animate-fade-in">
              {/* Header do Nicho */}
              <div className="bg-gradient-to-r from-brand-dark to-brand p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedNiche.name}</h2>
                <p className="text-brand-light/90">{selectedNiche.description}</p>
              </div>

              <div className="p-6 space-y-8">
                
                {/* Público e Dores */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-dark-bg p-4 rounded-xl border border-gray-700/50">
                    <h4 className="flex items-center gap-2 text-brand-light font-bold mb-3">
                      <Target size={18} /> Quem Compra?
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{selectedNiche.audience}</p>
                  </div>
                  <div className="bg-dark-bg p-4 rounded-xl border border-gray-700/50">
                    <h4 className="flex items-center gap-2 text-red-400 font-bold mb-3">
                      <Heart size={18} /> Dores Emocionais
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                      {selectedNiche.pains.map((pain, i) => <li key={i}>{pain}</li>)}
                    </ul>
                  </div>
                </div>

                {/* O que vender & Estilo */}
                <div>
                   <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                     <Palette size={18} className="text-brand" /> O que vender & Estilo Visual
                   </h4>
                   <div className="bg-dark-bg p-5 rounded-xl border border-gray-700/50 space-y-4">
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase">Produtos Chave</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedNiche.buyingItems.map((item, i) => (
                            <span key={i} className="text-xs bg-brand/10 text-brand-light px-3 py-1 rounded-full border border-brand/20">{item}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase">Estilo Visual Recomendado</span>
                        <p className="text-sm text-gray-300 mt-1">{selectedNiche.visualStyle}</p>
                      </div>
                   </div>
                </div>

                {/* Ideias de Portfólio */}
                <div>
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Lightbulb size={18} className="text-yellow-400" /> Ideias para Portfólio
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedNiche.portfolioIdeas.map((idea, i) => (
                      <div key={i} className="flex items-start gap-3 bg-dark-bg p-3 rounded-lg border border-gray-800">
                        <div className="w-6 h-6 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">{i+1}</div>
                        <span className="text-sm text-gray-300">{idea}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legendas e Hashtags */}
                <div className="bg-brand/5 border border-brand/10 rounded-xl p-5">
                   <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                     <Hash size={18} className="text-blue-400" /> Legendas & Hashtags
                   </h4>
                   <div className="space-y-3">
                     {selectedNiche.captions.map((caption, i) => (
                       <div key={i} className="bg-dark-bg p-3 rounded-lg border border-gray-700/50 flex gap-3 group">
                         <p className="text-sm text-gray-300 italic flex-1">"{caption}"</p>
                         <button onClick={() => handleCopy(caption)} className="text-gray-500 hover:text-white transition-colors">
                           {copiedText === caption ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                         </button>
                       </div>
                     ))}
                   </div>
                   <div className="mt-4 pt-4 border-t border-brand/10">
                     <p className="text-xs text-brand-light font-mono">{selectedNiche.hashtags.join(' ')}</p>
                   </div>
                </div>

                {/* Onde Encontrar e Erros */}
                <div className="grid md:grid-cols-2 gap-6">
                   <div>
                     <h4 className="text-sm font-bold text-gray-400 mb-3 flex items-center gap-2">
                       <Target size={16} /> Onde postar
                     </h4>
                     <ul className="space-y-2">
                       {selectedNiche.places.map((place, i) => (
                         <li key={i} className="text-sm text-brand-light hover:text-white cursor-pointer transition-colors underline decoration-brand/30 underline-offset-4">
                           {place}
                         </li>
                       ))}
                     </ul>
                   </div>
                   <div>
                     <h4 className="text-sm font-bold text-gray-400 mb-3 flex items-center gap-2">
                       <AlertTriangle size={16} className="text-orange-500" /> Erros Comuns
                     </h4>
                     <ul className="space-y-2">
                       {selectedNiche.mistakes.map((mistake, i) => (
                         <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                           <span className="text-red-500 mt-1">×</span> {mistake}
                         </li>
                       ))}
                     </ul>
                   </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-dark-card border border-gray-800 border-dashed rounded-2xl text-gray-500 p-8 text-center">
              <BookOpen size={48} className="mb-4 opacity-20" />
              <h3 className="text-lg font-bold text-gray-400 mb-2">Selecione um Nicho</h3>
              <p className="text-sm max-w-md">Escolha um nicho na lista ao lado para ver estratégias completas, ideias de desenho e legendas prontas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
