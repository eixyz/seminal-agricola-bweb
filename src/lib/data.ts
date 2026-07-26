export const company = {
  name: 'SEMINAL AGRICOLA, SU, LDA',
  shortName: 'SEMINAL AGRÍCOLA',
  subtitle: 'SU, LDA · Agronegócio',
  tagline: 'Agronegócio · Moçambique',
  // nuit: '401811974',
  phone: '+258 86 560 2805',
  phoneRaw: '+258865602805',
  email: 'seminalagricola@gmail.com',
  location: 'Maputo, Moçambique',
  whatsapp: 'https://wa.me/258865602805',
  whatsappGreeting: 'https://wa.me/258865602805?text=Olá,%20gostaria%20de%20mais%20informações.',
};

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
      '/images/equipments/Sementes_e_equipamentos.jpg',
      '/images/equipments/Sementes_e_equipamentos2.jpg',
      '/images/equipments/Grade_Disponivel.jpg',
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
    images: ['/images/equipments/Sementes_e_equipamentos2.jpg', '/images/equipments/Adubos1.jpg'],
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
    images: ['/images/equipments/Adubos2.jpg', '/images/equipments/Grade_Disponivel.jpg'],
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
    images: ['/images/sombrite/Hidroponico.png', '/images/equipments/Sementes_e_equipamentos.jpg'],
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
    image: '/images/equipments/Grade_Disponivel.jpg',
    gallery: ['/images/equipments/Grade_Disponivel.jpg', '/images/equipments/Sementes_e_equipamentos.jpg'],
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

export type NewsArticle = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  content: { heading: string; body: string }[];
  gallery?: string[];
  isDownload?: boolean;
};

export const news: NewsArticle[] = [
  {
    slug: 'nova-safra-milho-2026',
    tag: 'Produção',
    title: 'Nova Safra de Milho 2026',
    excerpt:
      'Colheita recorde este ano, com foco em sustentabilidade e qualidade. Conheça as práticas agrícolas que tornaram possível este resultado.',
    image: '/images/equipments/Sementes_e_equipamentos.jpg',
    date: '15 de Janeiro de 2026',
    author: 'Equipa Seminal Agrícola',
    readTime: '4 min de leitura',
    content: [
      {
        heading: 'Uma Safra Recorde',
        body: 'A Seminal Agrícola orgulha-se de anunciar uma colheita recorde de milho na safra 2026. Com mais de 50 hectares cultivados, a produção deste ano superou as expectativas, graças a um conjunto de práticas agrícolas sustentáveis e tecnologia de ponta aplicada em todas as fases do ciclo produtivo.',
      },
      {
        heading: 'Práticas Sustentáveis',
        body: 'Adoptámos a rotação de culturas, o uso controlado de fertilizantes orgânicos e sistemas de irrigação gota-a-gota que reduziram o consumo de água em 40%. Estas práticas não só aumentaram a produtividade como também preservaram a saúde do solo para as próximas safras.',
      },
      {
        heading: 'Rastreabilidade e Qualidade',
        body: 'Cada lote de milho é rastreado desde o campo até ao armazém, garantindo a origem e a qualidade do produto. Os grãos são seleccionados, secos e armazenados em condições óptimas, disponíveis em embalagens de 5 a 50 kg ou a granel.',
      },
      {
        heading: 'Disponibilidade',
        body: 'O milho da safra 2026 está disponível para retalho, grossistas e instituições. Para encomendas ou mais informações, contacte-nos através do WhatsApp ou do formulário de contacto.',
      },
    ],
    gallery: [
      '/images/equipments/Sementes_e_equipamentos.jpg',
      '/images/equipments/Sementes_e_equipamentos2.jpg',
      '/images/equipments/Grade_Disponivel.jpg',
    ],
  },
  {
    slug: 'irrigacao-solar-future-pump',
    tag: 'Irrigação',
    title: 'Novos Sistemas de Irrigação Solar',
    excerpt:
      'Implementamos bombas solares Future Pump em parceria com produtores locais, reduzindo custos e aumentando produtividade.',
    image: '/images/irrigation/Bomba_Solar_Future_Pump.jpg',
    date: '8 de Fevereiro de 2026',
    author: 'Departamento Técnico',
    readTime: '5 min de leitura',
    content: [
      {
        heading: 'Energia Solar ao Serviço da Agricultura',
        body: 'Em parceria com a Future Pump, a Seminal Agrícola instalou 15 sistemas de bombagem solar em propriedades de produtores parceiros na região de Maputo. Estes sistemas eliminam os custos de combustível fóssil e reduzem a pegada de carbono, oferecendo uma solução sustentável e económica para a irrigação.',
      },
      {
        heading: 'Como Funciona',
        body: 'As bombas solares Future Pump utilizam painéis fotovoltaicos para captar energia solar, que alimenta uma bomba submersível que extrai água de poços ou furos. O sistema funciona automaticamente durante o dia, sem necessidade de operador, e inclui um controlador inteligente que optimiza o caudal conforme a disponibilidade de energia solar.',
      },
      {
        heading: 'Resultados em Números',
        body: 'Os produtores que adoptaram o sistema relataram uma redução de 70% nos custos de operação comparado a bombas a gasolina, e um aumento de 30% na produtividade devido à maior disponibilidade de água durante a época seca.',
      },
      {
        heading: 'Para Quem?',
        body: 'Os sistemas são ideais para produtores em zonas remotas sem acesso à rede eléctrica, com baixo custo de manutenção e operação silenciosa. A Seminal Agrícola oferece instalação completa, formação e assistência técnica pós-venda.',
      },
    ],
    gallery: [
      '/images/irrigation/Bomba_Solar_Future_Pump.jpg',
      '/images/irrigation/Kit_de_Irrigacao_por_Gota_a_gota1.jpg',
      '/images/irrigation/Kit_de_Irrigacao_por_Gota_a_gota2.jpg',
    ],
  },
  {
    slug: '10-estufas-instaladas',
    tag: 'Infraestrutura',
    title: '10 Estufas Instaladas Este Ano',
    excerpt:
      'A Seminal Agrícola concluiu a instalação de 10 novas estruturas de sombrite e estufa para produtores parceiros na região de Maputo.',
    image: '/images/equipments/Grade_Disponivel.jpg',
    date: '20 de Março de 2026',
    author: 'Equipa de Campo',
    readTime: '3 min de leitura',
    content: [
      {
        heading: 'Cultivo Protegido em Expansão',
        body: 'A Seminal Agrícola concluiu com sucesso a instalação de 10 novas estruturas de estufa e sombrite para produtores parceiros na região de Maputo. Este projecto representa um investimento significativo na modernização da agricultura local e na protecção das culturas contra as condições climáticas adversas.',
      },
      {
        heading: 'Tipos de Estruturas',
        body: 'Foram instaladas estufas tipo túnel para hortícolas e estruturas de sombrite com diferentes densidades (30% a 75%), adaptadas às necessidades específicas de cada cultura e localização. Algumas estruturas incluem sistemas hidropónicos integrados para maximizar a eficiência.',
      },
      {
        heading: 'Impacto nos Produtores',
        body: 'Com as novas estruturas, os produtores parceiros conseguem agora cultivar durante todo o ano, independentemente da época seca ou chuvosa. A protecção contra pragas e condições extremas resultou num aumento significativo na qualidade e quantidade da produção.',
      },
    ],
    gallery: [
      '/images/sombrite/Hidroponico.png',
      '/images/equipments/Grade_Disponivel.jpg',
    ],
  },
  {
    slug: 'panfleto-servicos-2026',
    tag: 'Publicidade',
    title: 'Panfleto de Serviços 2026',
    excerpt:
      'Descarregue o nosso panfleto actualizado com todos os serviços disponíveis para a safra 2026. Inclui promoções especiais para novos clientes.',
    image: '/images/adds/Panfeto_dos_servicos.jpg',
    date: '1 de Abril de 2026',
    author: 'Departamento de Marketing',
    readTime: '1 min de leitura',
    content: [
      {
        heading: 'Panfleto Actualizado',
        body: 'Está disponível para download o nosso panfleto de serviços actualizado para a safra 2026. O documento inclui informações detalhadas sobre todos os serviços que oferecemos: insumos e equipamentos, estufas e sombrite, sistemas de irrigação, produção e mercado, e publicidade.',
      },
      {
        heading: 'Promoções Especiais',
        body: 'O panfleto inclui promoções exclusivas para novos clientes, descontos em pacotes de serviços e condições especiais para produtores que aderirem aos nossos sistemas de irrigação solar durante o primeiro trimestre de 2026.',
      },
      {
        heading: 'Como Descarregar',
        body: 'Clique no botão de download abaixo para obter o panfleto em formato de imagem. Para uma versão impressa ou mais informações, contacte-nos através do WhatsApp ou email.',
      },
    ],
    isDownload: true,
  },
];

export const heroSlides = [
  '/images/irrigation/Sistema_de_Irrigacao_por_aspersores1.jpg',
  '/images/equipments/Sementes_e_equipamentos.jpg',
  '/images/irrigation/Kit_de_Irrigacao_por_Gota_a_gota1.jpg',
  '/images/sombrite/Hidroponico.png',
  '/images/equipments/Grade_Disponivel.jpg',
  '/images/equipments/Adubos1.jpg',
];
