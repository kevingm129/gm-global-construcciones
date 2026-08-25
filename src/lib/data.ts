/**
 * Fuente única de contenido real de la empresa.
 * Origen: docs/AUDITORIA-TECNICA.md, docs/ARQUITECTURA-INFORMACION.md, docs/COPY.md
 * (Fases 0-2, aprobadas). Ningún dato aquí es inventado — donde no hay información
 * real se usa literalmente "[AGREGAR INFORMACIÓN REAL]".
 */

export const company = {
  legalName: "GM Global Construcciones S.A.S.",
  shortName: "GM Global Construcciones",
  tagline: "Creamos futuro",
  nit: "901.762.520-6",
  address: {
    street: "Carrera 92 # 58c-27",
    city: "Cartagena de Indias",
    region: "Bolívar",
    postalCode: "130001",
    country: "Colombia",
  },
  phones: ["+57 318 6668908", "+57 315 1569656"],
  emails: ["info@gmglobalconstrucciones.co", "admin@gmglobalconstrucciones.co"],
  social: {
    facebook: "https://www.facebook.com/gmglobalconstrucciones",
    instagram: "https://www.instagram.com/gmglobalconstrucciones",
    linkedin: "https://www.linkedin.com/company/gm-global-construcciones",
  },
  responseTime: "Nos comunicaremos con usted en menos de 24 horas hábiles.",
} as const;

export type Service = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const services: Service[] = [
  {
    slug: "estructura",
    name: "Estructura",
    description:
      "Diseño y construcción de estructuras resistentes con concreto reforzado, acero estructural y mampostería. Cumplimiento NSR-10 para proyectos residenciales, comerciales e industriales.",
    image: "/images/servicios/estructura.webp",
  },
  {
    slug: "plomeria",
    name: "Plomería",
    description:
      "Instalación y mantenimiento de sistemas hidráulicos, sanitarios y de agua caliente. Detección de fugas, mantenimiento preventivo e instalación de griferías y equipos sanitarios.",
    image: "/images/servicios/plomeria.webp",
  },
  {
    slug: "mamposteria",
    name: "Mampostería",
    description:
      "Muros, paredes y estructuras con ladrillo, bloque de concreto y piedra natural. Casas, muros de carga, divisiones interiores, fachadas y cerramientos con técnicas tradicionales y modernas.",
    image: "/images/servicios/obragr.webp",
  },
  {
    slug: "panete",
    name: "Pañete",
    description:
      "Pañetes y revoques para paredes y techos interiores y exteriores. Mortero de cemento, yeso y mezclas personalizadas. Acabados liso, rugoso, rústico y texturizado según su proyecto.",
    image: "/images/servicios/alistado.webp",
  },
  {
    slug: "alistado-pisos",
    name: "Alistado de pisos",
    description:
      "Nivelación y preparación de superficies lisas y resistentes ideales para cerámica, porcelanato y pintura epóxica. Mejora la adherencia de revestimientos y optimiza la durabilidad del acabado final.",
    image: "/images/servicios/alistado.webp",
  },
  {
    slug: "enchapes",
    name: "Enchapes",
    description:
      "Instalación de cerámica, gres, piedra natural, mármol y mosaicos decorativos en cocinas, baños, fachadas y pisos. Alta durabilidad, fácil mantenimiento y estética personalizada.",
    image: "/images/servicios/enchape.webp",
  },
  {
    slug: "estucos-pintura",
    name: "Estucos y pintura",
    description:
      "Acabados finos con estucos tradicional, veneciano y acrílico. Pintura vinílica, acrílica, esmaltes e impermeabilizantes para interiores y exteriores. Preparación previa de superficies garantizada.",
    image: "/images/servicios/pintura.webp",
  },
  {
    slug: "construcciones-livianas",
    name: "Construcciones livianas",
    description:
      "Muros, tabiques y techos en drywall, superboard y perfilería metálica. Rapidez en ejecución, reducción de costos y flexibilidad en diseño. Divisiones, ampliaciones, cielorrasos y fachadas livianas.",
    image: "/images/servicios/cliviana.webp",
  },
  {
    slug: "gestion-proyectos",
    name: "Gestión de proyectos",
    description:
      "Gestión completa de proyectos residenciales, comerciales e institucionales. Coordinación de todas las disciplinas constructivas para garantizar calidad, cumplimiento de cronograma y satisfacción total del cliente.",
    image: "/images/servicios/g-proyectos.webp",
  },
  {
    slug: "remodelaciones",
    name: "Remodelaciones",
    description:
      "Transformación de espacios existentes con soluciones constructivas integrales. Remodelación de cocinas, baños, fachadas y áreas comunes para mejorar funcionalidad, estética y valor de su propiedad.",
    image: "/images/servicios/remodelaciones.webp",
  },
  {
    slug: "aseo",
    name: "Aseo grueso y fino",
    description:
      "Ejecutamos servicios de aseo grueso y fino en viviendas, oficinas y espacios comerciales. Nuestro equipo de profesionales se asegura de que cada área esté limpia y en perfectas condiciones para garantizar un entorno saludable y agradable.",
    image: "/images/servicios/aseo.webp",
  },
];

export type ServiceCategory = {
  slug: string;
  name: string;
  intro: string;
  serviceSlugs: string[];
};

/**
 * Agrupación de los 11 servicios reales en 5 categorías — decisión de
 * arquitectura de información (docs/ARQUITECTURA-INFORMACION.md §2),
 * no un dato factual. Revisable si el cliente pide otra agrupación.
 */
export const serviceCategories: ServiceCategory[] = [
  {
    slug: "construccion",
    name: "Construcción",
    intro: "[AGREGAR INFORMACIÓN REAL]",
    serviceSlugs: ["estructura", "gestion-proyectos"],
  },
  {
    slug: "obra-civil",
    name: "Obra civil",
    intro: "[AGREGAR INFORMACIÓN REAL]",
    serviceSlugs: ["alistado-pisos"],
  },
  {
    slug: "mamposteria",
    name: "Mampostería",
    intro: "[AGREGAR INFORMACIÓN REAL]",
    serviceSlugs: ["mamposteria"],
  },
  {
    slug: "acabados",
    name: "Acabados",
    intro: "[AGREGAR INFORMACIÓN REAL]",
    serviceSlugs: ["panete", "enchapes", "estucos-pintura"],
  },
  {
    slug: "remodelacion",
    name: "Remodelación",
    intro: "[AGREGAR INFORMACIÓN REAL]",
    serviceSlugs: ["remodelaciones", "construcciones-livianas", "plomeria", "aseo"],
  },
];

export type Project = {
  slug: string;
  name: string;
  location: string;
  duration: string | null;
  label: string;
  summary: string;
  tags: string[];
  status: "Entregado" | "En ejecución";
  image: string;
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "ksyar-constructores",
    name: "Ksyar Constructores S.A.S",
    location: "Cartagena, Bolívar",
    duration: null,
    label: "Residencial completo",
    summary:
      "Proyecto integral desde fase inicial hasta entrega final. Obra gris, acabados, construcciones livianas y plomería. Coordinación efectiva de todas las disciplinas constructivas.",
    tags: ["Obra gris", "Acabados"],
    status: "Entregado",
    image: "/images/proyectos-R/proyecto1.webp",
  },
  {
    slug: "lazuli-towers",
    name: "Lazuli Towers",
    location: "Cartagena, Bolívar",
    duration: "4 meses",
    label: "Obra gris · Acabados",
    summary:
      "Mampostería estructural, pañetes internos y externos, estuco plástico y pintura arquitectónica de acabado final. Cumplimiento riguroso del cronograma establecido.",
    tags: ["Mampostería", "Pañetes", "Acabados interiores"],
    status: "Entregado",
    image: "/images/proyectos-R/proyecto3.webp",
  },
  {
    slug: "doral-suites",
    name: "Doral Suites",
    location: "Cartagena, Bolívar",
    duration: "8 meses",
    label: "Infraestructura · Acabados",
    summary:
      "Mampostería, pañetes, alistado de pisos, impermeabilización, bordillos y andenes. 100% de actividades cumplidas. Cero accidentes laborales durante todo el proyecto.",
    tags: ["Obra gris", "Impermeabilización", "Urbanismo"],
    status: "Entregado",
    image: "/images/proyectos-R/proyecto4.webp",
  },
  {
    slug: "iglesia-mision-boston",
    name: "Iglesia Cristiana Misión Boston",
    location: "Cartagena, Bolívar",
    duration: "1 mes",
    label: "Construcción liviana",
    summary:
      "Acondicionamiento interior con cielos rasos en drywall y PVC. Ejecución ágil, terminaciones de alta calidad estética sin interferir con la funcionalidad del espacio.",
    tags: ["Drywall", "Cielorrasos PVC"],
    status: "Entregado",
    image: "/images/proyectos-R/proyecto2.webp",
  },
  {
    slug: "el-tesillo",
    name: "Almacén y restaurante El Tesillo",
    location: "Cartagena, Bolívar",
    duration: null,
    label: "Obra completa",
    summary:
      "Mampostería, pañetes, cumplimiento total de cronograma y especificaciones técnicas. Entrega de espacios funcionales con acabados de alta calidad.",
    tags: ["Obra completa", "Estructura", "Obra gris"],
    status: "En ejecución",
    image: "/images/proyectos-R/proyecto7.webp",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Trabajar con GM Global Construcciones S.A.S. fue una experiencia fluida y eficiente. Sus conocimientos en obra gris y acabados se reflejan en la calidad del trabajo entregado. Estamos satisfechos con su puntualidad y atención a nuestros requerimientos.",
    author: "Ksyar Constructores S.A.S.",
    role: "Proyecto residencial completo · Cartagena",
    initials: "KC",
  },
  {
    quote:
      "GM Global Construcciones S.A.S. demostró un gran nivel de experiencia en nuestros trabajos de mampostería. Su enfoque detallado y cumplimiento con los plazos acordados nos dio la confianza para seguir colaborando en futuros proyectos.",
    author: "Lazuli Towers",
    role: "Obra gris y acabados interiores · Cartagena",
    initials: "LT",
  },
  {
    quote:
      "El equipo de GM Global Construcciones S.A.S. superó nuestras expectativas. La ejecución de las construcciones livianas fue impecable, logrando un espacio seguro y acogedor para nuestra comunidad. Agradecemos su compromiso y calidad en cada detalle.",
    author: "Iglesia Cristiana Misión Boston",
    role: "Construcciones livianas · Cartagena",
    initials: "MB",
  },
];

export type Constructora = {
  slug: string;
  name: string;
  logo: string;
};

/**
 * Relación comercial confirmada por el cliente el 2026-08-23
 * (docs/ARQUITECTURA-INFORMACION.md §6, ítem 3b) — autorizadas para publicarse.
 */
export const constructoras: Constructora[] = [
  { slug: "invercolombia", name: "Invercolombia", logo: "/images/clientes/cliente1.webp" },
  {
    slug: "iglesia-mision-boston",
    name: "Iglesia Cristiana Evangélica Misión Boston",
    logo: "/images/clientes/cliente2.webp",
  },
  { slug: "project-constructions", name: "Project Constructions", logo: "/images/clientes/cliente3.webp" },
  { slug: "terracolona", name: "Terracolona", logo: "/images/clientes/cliente4.webp" },
];

/**
 * Galería real sin usar en el sitio original — assets/images/galeria/ (84 fotos).
 * Nomenclatura verificada en Fase 0: galeria.webp, galeria1.webp...galeria58.webp
 * (con galeria9.jpg como única excepción en .jpg dentro de ese rango numerado),
 * y galeria59.jpg...galeria83.jpg.
 */
const webpNumbers = Array.from({ length: 58 }, (_, i) => i + 1).filter((n) => n !== 9);

export const galleryImages: string[] = [
  "galeria.webp",
  ...webpNumbers.map((n) => `galeria${n}.webp`),
  "galeria9.jpg",
  ...Array.from({ length: 83 - 59 + 1 }, (_, i) => `galeria${i + 59}.jpg`),
].map((f) => `/images/galeria/${f}`);

export const findingLevels = [
  {
    key: "critico",
    emoji: "🔴",
    label: "Crítico",
    description:
      "Hallazgo que requiere atención antes de continuar con la entrega o el siguiente paso del proceso, según el criterio técnico documentado en el informe.",
  },
  {
    key: "alta",
    emoji: "🟠",
    label: "Prioridad alta",
    description: "Hallazgo relevante que debe atenderse en el corto plazo, sin bloquear necesariamente el avance del proceso.",
  },
  {
    key: "pendiente",
    emoji: "🟡",
    label: "Pendiente",
    description: "Hallazgo identificado que queda registrado para seguimiento, sin urgencia inmediata según el alcance de la inspección.",
  },
  {
    key: "conforme",
    emoji: "🟢",
    label: "Conforme",
    description: "Aspecto revisado que no presenta observaciones dentro del alcance inspeccionado.",
  },
] as const;

export const inspectionSteps = [
  {
    title: "Agenda",
    description:
      "Coordinamos fecha, dirección y alcance de la visita según lo que necesite: inmueble nuevo antes de entrega, reinspección o punch list para constructora.",
  },
  {
    title: "Inspección",
    description:
      "Recorrido técnico y visual del inmueble siguiendo el alcance acordado, revisando los aspectos constructivos y de acabados definidos previamente con usted.",
  },
  {
    title: "Identificación",
    description:
      "Registramos cada hallazgo encontrado durante el recorrido y lo clasificamos según su nivel de atención requerida.",
  },
  {
    title: "Evidencia",
    description:
      "Cada hallazgo se documenta con fotografía y ubicación precisa dentro del inmueble, para que el informe final sea trazable y verificable.",
  },
  {
    title: "Informe",
    description:
      "Entregamos un informe organizado con los hallazgos clasificados, su evidencia y ubicación — un documento de referencia claro para conversar con la constructora o gestionar los ajustes necesarios.",
  },
  {
    title: "Reinspección",
    description:
      "Si se acordó, verificamos en una segunda visita que los hallazgos priorizados hayan sido atendidos, dejando constancia del estado final de cada uno.",
  },
  {
    title: "Cierre",
    description:
      "Entrega del informe final consolidado, con el estado de cada hallazgo — el respaldo documentado con el que usted recibe o entrega el inmueble con información, no con incertidumbre.",
  },
];

export const inspectionDisclaimer =
  "Este es un servicio de inspección visual y técnica según el alcance contratado. No constituye peritaje, certificación ni dictamen estructural.";

export const findingClassificationDisclaimer =
  "Esta clasificación es una herramienta interna de organización del trabajo de inspección de GM Global Construcciones. No constituye una certificación legal, peritaje ni dictamen estructural.";
