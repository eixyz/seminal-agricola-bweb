export const company = {
  name: 'SEMINAL AGRICOLA, SU, LDA',
  shortName: 'SEMINAL AGRÍCOLA',
  subtitle: 'SU, LDA · Agronegócio',
  tagline: 'Agronegócio · Moçambique',
  nuit: '401811974',
  phone: '+258 86 560 2805',
  phoneRaw: '+258865602805',
  email: 'seminalagricola@gmail.com',
  location: 'Maputo, Moçambique',
  whatsapp: 'https://wa.me/258865602805',
  whatsappGreeting: 'https://wa.me/258865602805?text=Olá,%20gostaria%20de%20mais%20informações.',
};

export const imgBase = 'https://raw.githubusercontent.com/eixyz/eloviada_projects/main/agro/images';

export type Product = {
  slug: string;
  name: string;
  badge: string;
  description: string;
  features: string[];
  images: string[];
  price: string;
};

export const products: Product[] = [
  {
    slug: 'milho',
    name: 'Milho',
    badge: '🌽 Cereal',
    description:
      'Milho seco de produção própria, colhido e processado com rigoroso controlo de qualidade. Disponível a granel ou em embalagens de 5 a 50 kg, adequado para consumo humano e ração animal.',
    features: [
      'Apresentação: granel ou embalado (5, 10, 25 e 50 kg)',
      'Certificado de origem disponível',
      'Rastreabilidade completa desde o campo',
      'Apto para consumo humano e ração animal',
      'Entrega nacional — retalho, grossistas e hotéis',
      'Produzido com práticas agrícolas sustentáveis',
    ],
    images: [
      `${imgBase}/market/Colheita_de_Milho_Campo_da_Seminal_Agricola.jpg`,
      `${imgBase}/market/Campo_de_Producao_de_Milho_da_Seminal_Agricola.jpg`,
      `${imgBase}/market/Cultura_de_Milho_campo_da_Seminal_Agricola.jpg`,
    ],
    price: 'Sob consulta',
  },
  {
    slug: 'arroz',
    name: 'Arroz & Cereais',
    badge: '🌾 Cereais',
    description:
      'Arroz e outros cereais de produção própria, com garantia de qualidade e origem. Disponíveis em diferentes embalagens conforme a necessidade do cliente.',
    features: [
      'Arroz polido e integral',
      'Outros cereais disponíveis',
      'Entrega nacional',
      'Opções de embalagem flexíveis',
    ],
    images: [`${imgBase}/market/Campo_de_Producao_de_Milho_da_Seminal_Agricola.jpg`],
    price: 'Sob consulta',
  },
  {
    slug: 'feijao',
    name: 'Feijão',
    badge: '🫘 Leguminosa',
    description:
      'Feijão de qualidade superior, seleccionado e embalado com cuidado. Rico em proteínas e ideal para consumo familiar ou institucional.',
    features: [
      'Diferentes variedades',
      'Seleção e calibragem rigorosa',
      'Embalagens de 1 a 50 kg',
      'Disponível a granel',
    ],
    images: [`${imgBase}/market/Cultura_de_Beterraba_campo_de_producao_da_Seminal_Agricola.jpg`],
    price: 'Sob consulta',
  },
  {
    slug: 'batata',
    name: 'Batata-doce',
    badge: '🥔 Tuber',
    description:
      'Batata-doce de produção própria, colhida no ponto ideal de maturação. Disponível em diferentes variedades — roxa e branca — com entrega nacional.',
    features: [
      'Variedades roxa e branca',
      'Colheita no ponto de maturação',
      'Entrega por encomenda',
      'Qualidade de mercado garantida',
    ],
    images: [`${imgBase}/market/Batata_roxa_e_branca_para_o_mercado.jpg`],
    price: 'Sob consulta',
  },
  {
    slug: 'sementes',
    name: 'Sementes',
    badge: '🌱 Insumo',
    description:
      'Sementes certificadas e melhoradas, adaptadas às condições locais. Alta taxa de germinação (>90%) para milho, feijão, hortícolas e outras culturas.',
    features: [
      'Variedades melhoradas e OPV',
      'Germinação >90%',
      'Certificadas e rastreadas',
      'Apoio técnico incluído',
    ],
    images: ['/images/equipments/Sementes_e_equipamentos.jpg', '/images/equipments/Sementes_e_equipamentos2.jpg'],
    price: 'Sob consulta',
  },
];

export type Service = {
  slug: string;
  icon: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  image: string;
  gallery?: string[];
  sections?: { heading: string; body: string; list?: { title: string; desc: string }[] }[];
};

export const services: Service[] = [
  {
    slug: 'insumos',
    icon: 'ShoppingBag',
    title: 'Insumos & Equipamentos',
    short: 'Sementes, adubos, fitossanitários e equipamentos com apoio técnico.',
    description:
      'Gama completa de insumos e equipamentos agrícolas para produtores de todos os tamanhos. Marcas reconhecidas, apoio técnico no pré e pós-venda.',
    features: [
      'Sementes certificadas (>90% germinação)',
      'Fertilizantes & fitossanitários homologados',
      'Equipamentos: grades, arados, pulverizadores',
      'Fornecimento a retalho e por grosso',
    ],
    image: '/images/equipments/Adubos1.jpg',
    gallery: ['/images/equipments/Adubos1.jpg', '/images/equipments/Adubos2.jpg', '/images/equipments/Sementes_e_equipamentos.jpg', '/images/equipments/Grade_Disponivel.jpg'],
  },
  {
    slug: 'estufa',
    icon: 'Home',
    title: 'Estufas & Sombrite',
    short: 'Projecto e montagem de estufas e sombrite para todo o ano.',
    description:
      'Estruturas de estufa e sombrite permitem controlar as condições climáticas, proteger as culturas e estender o período de produção ao longo do ano.',
    features: [
      'Estufa tipo túnel para hortícolas',
      'Sombrite em diferentes densidades (30-75%)',
      'Sistemas hidropónicos integrados',
      'Instalação com irrigação integrada',
    ],
    image: '/images/sombrite/Hidroponico.png',
    gallery: ['/images/sombrite/Hidroponico.png'],
  },
  {
    slug: 'producao',
    icon: 'BarChart3',
    title: 'Produção & Mercado',
    short: 'Apoio técnico e comercial do planeamento à venda.',
    description:
      'Apoio aos produtores em todas as etapas do ciclo produtivo — desde o planeamento da safra até à venda do produto final — garantindo rentabilidade e acesso a mercados.',
    features: [
      'Planeamento de safra e rotação de culturas',
      'Boas Práticas Agrícolas (BPA)',
      'Ligação a compradores institucionais',
      'Logística e distribuição coordenada',
    ],
    image: `${imgBase}/market/Cultura_de_Milho_campo_da_Seminal_Agricola.jpg`,
  },
  {
    slug: 'irrigacao',
    icon: 'Droplets',
    title: 'Sistemas de Irrigação',
    short: 'Projecto, fornecimento e instalação com energia solar.',
    description:
      'Projectamos, fornecemos e instalamos sistemas de irrigação completos, adaptados ao tipo de cultura, topografia e disponibilidade de água. Trabalhamos com energias renováveis.',
    features: [
      'Gota-a-gota, aspersão e canhão hidráulico',
      'Pivot central para grandes áreas',
      'Bombas solares Future Pump',
      'Reservatórios e captação de água da chuva',
    ],
    image: '/images/irrigation/Kit_de_Irrigacao_por_Gota_a_gota1.jpg',
    gallery: [
      '/images/irrigation/Kit_de_Irrigacao_por_Gota_a_gota1.jpg',
      '/images/irrigation/Kit_de_Irrigacao_por_Gota_a_gota2.jpg',
      '/images/irrigation/Sistema_de_Irrigacao_por_aspersores1.jpg',
      '/images/irrigation/Sistema_de_Irrigacao_por_aspersores2.jpg',
      '/images/irrigation/Bomba_Solar_Future_Pump.jpg',
      '/images/irrigation/Sistema_de_Pivo_Central.png',
      '/images/irrigation/Canhao_Hidraulico.png',
      '/images/irrigation/Tubo_Aspersao.png',
    ],
    sections: [
      {
        heading: 'Tipos de Sistemas de Irrigação',
        body: '',
        list: [
          { title: 'Gota-a-gota', desc: 'máxima eficiência hídrica, ideal para hortícolas e culturas em estufa' },
          { title: 'Aspersão', desc: 'cobertura uniforme para pastagens, cereais e campos abertos' },
          { title: 'Canhão hidráulico', desc: 'para grandes áreas de produção extensiva' },
          { title: 'Pivot central', desc: 'sistema automático para fazendas de grande escala' },
          { title: 'Tubo de aspersão', desc: 'solução económica e versátil para médias superfícies' },
        ],
      },
      {
        heading: 'Bombagem & Energia Renovável',
        body: 'Somos parceiros da Future Pump e comercializamos bombas solares de alta eficiência que eliminam os custos de combustível. As bombas solares são ideais para zonas remotas sem rede eléctrica, com baixo custo de manutenção e operação silenciosa.',
      },
      {
        heading: 'Reservatórios & Captação de Água',
        body: 'Instalamos reservatórios de armazenamento de água e sistemas de captação de água da chuva, garantindo disponibilidade hídrica durante a época seca.',
      },
    ],
  },
  {
    slug: 'publicidade',
    icon: 'Megaphone',
    title: 'Publicidade',
    short: 'Visibilidade e promoção dos seus produtos agrícolas.',
    description:
      'Serviços de publicidade e promoção para produtores e empresas do sector agrícola. Ajudamos a dar visibilidade aos seus produtos e serviços no mercado.',
    features: [
      'Panfletos e materiais promocionais',
      'Campanhas de marketing agrícola',
      'Promoção de safra e produtos sazonais',
      'Parcerias com meios de comunicação',
    ],
    image: '/images/adds/Panfeto_dos_servicos.jpg',
    gallery: ['/images/adds/Panfeto_dos_servicos.jpg'],
  },
];

export const partners = [
  { name: 'Agrodac LDA', src: '/images/partners/Agrodac_LDA.png' },
  { name: 'ETG Group', src: '/images/partners/etgGroup.webp' },
  { name: 'Mozatecnol', src: '/images/partners/MOZATECNOL_LOGO.png' },
  { name: 'Mega', src: '/images/partners/LOGO_MEGA.png' },
  { name: 'Industries', src: '/images/partners/LOGOS_INDUSTRIES.png' },
  { name: 'ONG', src: '/images/partners/ONG.png' },
];

export const news = [
  {
    tag: 'Produção',
    title: 'Nova Safra de Milho 2026',
    excerpt:
      'Colheita recorde este ano, com foco em sustentabilidade e qualidade. Conheça as práticas agrícolas que tornaram possível este resultado.',
    image: `${imgBase}/market/Colheita_de_Milho_Campo_da_Seminal_Agricola.jpg`,
  },
  {
    tag: 'Irrigação',
    title: 'Novos Sistemas de Irrigação Solar',
    excerpt:
      'Implementamos bombas solares Future Pump em parceria com produtores locais, reduzindo custos e aumentando produtividade.',
    image: '/images/irrigation/Bomba_Solar_Future_Pump.jpg',
  },
  {
    tag: 'Infraestrutura',
    title: '10 Estufas Instaladas Este Ano',
    excerpt:
      'A Seminal Agrícola concluiu a instalação de 10 novas estruturas de sombrite e estufa para produtores parceiros na região de Maputo.',
    image: '/images/equipments/Grade_Disponivel.jpg',
  },
  {
    tag: 'Publicidade',
    title: 'Panfleto de Serviços 2026',
    excerpt:
      'Descarregue o nosso panfleto actualizado com todos os serviços disponíveis para a safra 2026. Inclui promoções especiais para novos clientes.',
    image: '/images/adds/Panfeto_dos_servicos.jpg',
    isDownload: true,
  },
];
