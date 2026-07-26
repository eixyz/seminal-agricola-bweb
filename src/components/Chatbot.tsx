import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, services, company } from '../lib/data';

type Message = {
  role: 'bot' | 'user';
  text: string;
  links?: { label: string; to: string }[];
};

const greetings = [
  'Olá! Sou o assistente virtual da Seminal Agrícola. Como posso ajudar?',
  'Olá! Posso ajudar com informações sobre os nossos produtos e serviços. O que precisa?',
];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

// Levenshtein distance for fuzzy matching
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j] + 1, dp[i][j - 1] + cost);
    }
  }
  return dp[m][n];
}

// Check if two words are "close" — exact, substring, or edit distance ≤ 2
function isCloseMatch(queryWord: string, keyword: string): boolean {
  if (queryWord === keyword) return true;
  if (keyword.length >= 4 && queryWord.includes(keyword)) return true;
  if (queryWord.length >= 4 && keyword.includes(queryWord)) return true;
  if (queryWord.length >= 4 && keyword.length >= 4) {
    return levenshtein(queryWord, keyword) <= 2;
  }
  return false;
}

type Searchable = {
  type: 'product' | 'service';
  slug: string;
  name: string;
  badge: string;
  description: string;
  features: string[];
  keywords: string[];
};

// Build searchable items with rich keyword sets (synonyms, related terms, words from descriptions)
function buildSearchIndex(): Searchable[] {
  const extractWords = (text: string): string[] =>
    normalize(text)
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 3);

  const productKeywords: Record<string, string[]> = {
    milho: ['milho', 'cereal', 'cereais', 'grao', 'graos', 'racao', 'consumo humano', 'colheita', 'safra', 'granel'],
    arroz: ['arroz', 'cereal', 'cereais', 'polido', 'integral', 'grao'],
    feijao: ['feijao', 'leguminosa', 'leguminosas', 'proteina', 'proteinas', 'selecao', 'calibragem'],
    batata: ['batata', 'batata-doce', 'batata doce', 'roxa', 'branca', 'tuber', 'tuberculo', 'colheita'],
    sementes: ['semente', 'sementes', 'germinacao', 'germinar', 'insumo', 'opv', 'certificada', 'certificadas', 'rastreada', 'horticula', 'horticulas', 'hortaliça', 'hortalica'],
  };

  const serviceKeywords: Record<string, string[]> = {
    insumos: ['insumo', 'insumos', 'equipamento', 'equipamentos', 'adubo', 'adubos', 'fertilizante', 'fertilizantes', 'fitossanitario', 'fitossanitarios', 'grade', 'grades', 'arado', 'arados', 'pulverizador', 'pulverizadores', 'retalho', 'grosso', 'agroquimico', 'defensivo', 'defensivos'],
    estufa: ['estufa', 'estufas', 'sombrite', 'hidroponico', 'hidroponia', 'hidroponicos', 'tunel', 'tuneis', 'clima', 'protecao', 'cultura protegida', 'horticula', 'horticulas', 'hortaliça', 'hortalica', 'estufagem'],
    producao: ['producao', 'mercado', 'safra', 'safra', 'rotacao', 'culturas', 'bpa', 'boas praticas', 'comprador', 'compradores', 'logistica', 'distribuicao', 'rentabilidade', 'planeamento', 'ciclo produtivo'],
    irrigacao: ['irrigacao', 'irrigar', 'regar', 'regador', 'gota', 'gota-a-gota', 'aspersao', 'aspersor', 'aspersores', 'canhao', 'canhao hidraulico', 'pivot', 'pivot central', 'bomba', 'bomba solar', 'bomba de agua', 'future pump', 'solar', 'energia solar', 'reservatorio', 'reservatorios', 'agua', 'agua da chuva', 'captação', 'captacao', 'tubo', 'tubo de aspersao', 'aspersao'],
    publicidade: ['publicidade', 'publicitar', 'marketing', 'panfleto', 'panfletos', 'campanha', 'campanhas', 'promocao', 'promocional', 'promocoes', 'visibilidade', 'promover', 'anuncio', 'anuncios', 'comunicacao'],
  };

  const items: Searchable[] = [];

  for (const p of products) {
    const baseWords = [...extractWords(p.name), ...extractWords(p.description), ...p.features.flatMap(extractWords)];
    const extra = productKeywords[p.slug] || [];
    items.push({
      type: 'product',
      slug: p.slug,
      name: p.name,
      badge: p.badge,
      description: p.description,
      features: p.features,
      keywords: [...new Set([...baseWords, ...extra])],
    });
  }

  for (const s of services) {
    const baseWords = [...extractWords(s.title), ...extractWords(s.description), ...s.features.flatMap(extractWords)];
    const extra = serviceKeywords[s.slug] || [];
    items.push({
      type: 'service',
      slug: s.slug,
      name: s.title,
      badge: '',
      description: s.description,
      features: s.features,
      keywords: [...new Set([...baseWords, ...extra])],
    });
  }

  return items;
}

const searchIndex = buildSearchIndex();

function searchItems(query: string): Searchable[] {
  const q = normalize(query).replace(/[^\w\s]/g, ' ').trim();
  if (!q) return [];
  const queryWords = q.split(/\s+/).filter((w) => w.length >= 3);
  if (queryWords.length === 0) return [];

  const scored = searchIndex.map((item) => {
    let score = 0;
    for (const qw of queryWords) {
      for (const kw of item.keywords) {
        if (isCloseMatch(qw, kw)) {
          score += kw === qw ? 3 : 2; // exact match scores higher
        }
      }
    }
    return { item, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.item);
}

function formatItem(item: Searchable): Message {
  const features = item.features.map((f) => `• ${f}`).join('\n');
  const prefix = item.badge ? `${item.badge} ${item.name}` : item.name;
  const linkBase = item.type === 'product' ? '/produtos' : '/servicos';
  const label = item.type === 'product' ? `Ver ${item.name}` : `Ver ${item.name}`;
  return {
    role: 'bot',
    text: `${prefix}\n\n${item.description}\n\n${item.type === 'product' ? 'Características:' : 'O que incluímos:'}\n${features}${item.type === 'product' ? `\n\nPreço: Sob consulta` : ''}`,
    links: [{ label, to: `${linkBase}/${item.slug}` }],
  };
}

function findResponse(query: string): Message {
  const q = normalize(query);

  if (!q.trim()) return { role: 'bot', text: 'Por favor escreva uma pergunta.' };

  // Greetings
  if (/\b(ola|oi|bom dia|boa tarde|boa noite|hello|hi|hey)\b/.test(q)) {
    return { role: 'bot', text: greetings[Math.floor(Math.random() * greetings.length)] };
  }

  // Contact info
  if (/(contacto|telefone|email|whatsapp|localizacao|morada|nuit|endereco|contactar)/.test(q)) {
    if (/email/.test(q)) return { role: 'bot', text: `O nosso email é: ${company.email}` };
    if (/telefone|whatsapp|ligar|chamar|celular|movel/.test(q)) return { role: 'bot', text: `Pode contactar-nos pelo telefone/WhatsApp: ${company.phone}` };
    if (/localizacao|morada|onde|endereco/.test(q)) return { role: 'bot', text: `Estamos localizados em ${company.location}.` };
    if (/nuit/.test(q)) return { role: 'bot', text: `Para informações sobre NUIT, contacte-nos diretamente.`, links: [{ label: 'Página de Contacto', to: '/contacto' }] };
    return { role: 'bot', text: `Pode contactar-nos por:\n📞 ${company.phone}\n✉️ ${company.email}\n📍 ${company.location}`, links: [{ label: 'Página de Contacto', to: '/contacto' }] };
  }

  // Price
  if (/(preco|custo|quanto|valor|orcamento|comprar|preços|precos)/.test(q)) {
    return { role: 'bot', text: 'Todos os nossos produtos e serviços têm preço "Sob consulta". Para um orçamento personalizado, contacte-nos via WhatsApp ou através do formulário de contacto.', links: [{ label: 'Contactar', to: '/contacto' }] };
  }

  // List all products
  if (/(produtos?|catalogo|o que vendem|o que produzem|que produtos)/.test(q) && !/(servico|servicos)/.test(q)) {
    const list = products.map((p) => `${p.badge} ${p.name}`).join('\n');
    return { role: 'bot', text: `Temos os seguintes produtos:\n${list}`, links: [{ label: 'Ver Produtos', to: '/produtos' }] };
  }

  // List all services
  if (/(servico|servicos|o que fazem|servicos oferecem|que servicos)/.test(q) && !/(produto|produtos)/.test(q)) {
    const list = services.map((s) => `• ${s.title}`).join('\n');
    return { role: 'bot', text: `Oferecemos os seguintes serviços:\n${list}`, links: [{ label: 'Ver Serviços', to: '/servicos' }] };
  }

  // Both
  if (/(tudo|todos|geral|resumo|sobre a empresa|o que fazem|ambos)/.test(q)) {
    const plist = products.map((p) => p.name).join(', ');
    const slist = services.map((s) => s.title).join(', ');
    return { role: 'bot', text: `Resumo:\n\nProdutos: ${plist}\n\nServiços: ${slist}`, links: [{ label: 'Produtos', to: '/produtos' }, { label: 'Serviços', to: '/servicos' }] };
  }

  // Fuzzy search across all items
  const results = searchItems(query);
  if (results.length > 0) {
    // If multiple results from different types, show top match but mention others
    if (results.length === 1) {
      return formatItem(results[0]);
    }
    // Multiple matches: show top result + mention others
    const top = results[0];
    const others = results.slice(1, 4);
    const otherNames = others.map((o) => o.name).join(', ');
    const response = formatItem(top);
    return {
      ...response,
      text: response.text + `\n\nEncontrei também: ${otherNames}. Pergunte sobre qualquer um para saber mais.`,
    };
  }

  // Default / fallback
  return {
    role: 'bot',
    text: 'Não encontrei informação específica sobre isso. Posso ajudar com:\n• Produtos (milho, arroz, feijão, batata-doce, sementes)\n• Serviços (insumos, estufas, irrigação, produção, publicidade)\n• Contactos e orçamentos\n\nTente perguntar sobre um produto ou serviço específico!',
    links: [{ label: 'Falar com a equipa', to: '/contacto' }],
  };
}

const quickQuestions = [
  'Quais produtos têm?',
  'Que serviços oferecem?',
  'Falar sobre irrigação',
  'Contactos',
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'bot', text: greetings[0] }]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    setMessages([{ role: 'bot', text: greetings[Math.floor(Math.random() * greetings.length)] }]);
    setInput('');
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text };
    const botMsg = findResponse(text);
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-cream-50 shadow-lg transition-all hover:scale-110 hover:bg-green-800"
        aria-label="Abrir chatbot"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 left-6 z-50 flex h-[500px] max-h-[70vh] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-2xl ring-1 ring-green-200">
          {/* Header */}
          <div className="flex items-center gap-3 bg-green-800 px-5 py-4 text-cream-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="font-600 text-sm">Assistente Seminal</p>
              <p className="text-xs text-cream-100/60">Online · Responde agora</p>
            </div>
            <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-full bg-green-700/50 px-3 py-1.5 text-xs font-500 text-cream-100/80 transition-colors hover:bg-green-700 hover:text-cream-50" title="Recomeçar conversa">
              <RotateCcw className="h-3.5 w-3.5" />
              Reiniciar
            </button>
            <button onClick={() => setOpen(false)} className="text-cream-100/70 transition-colors hover:text-cream-50" aria-label="Fechar chat">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="hide-scrollbar flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === 'user' ? 'bg-green-600 text-cream-50' : 'bg-white text-green-800 ring-1 ring-green-100'}`}>
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  {msg.links && (
                    <div className="mt-2 space-y-1">
                      {msg.links.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg bg-green-100 px-3 py-1.5 text-xs font-600 text-green-700 transition-colors hover:bg-green-200"
                        >
                          {link.label} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick questions */}
          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-500 text-green-700 transition-colors hover:bg-green-200"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-green-100 p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escreva a sua pergunta..."
                className="flex-1 rounded-full border border-green-200 bg-cream-50 px-4 py-2.5 text-sm text-green-900 placeholder:text-green-800/30 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-cream-50 transition-colors hover:bg-green-500 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
