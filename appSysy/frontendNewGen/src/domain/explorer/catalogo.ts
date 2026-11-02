import type { Perfil, Prioridad, Pregunta } from './types';

export const PERFILES: Perfil[] = [
  {
    id: 'ceo',
    titulo: 'Dirección General (CEO)',
    subtitulo: 'Visión estratégica y crecimiento empresarial',
    mensaje: 'crecimiento, resiliencia, control, velocidad de decisión, ventaja estratégica',
  },
  {
    id: 'cto',
    titulo: 'CTO / CIO',
    subtitulo: 'Liderazgo tecnológico y arquitectura de sistemas',
    mensaje: 'arquitectura, control, disponibilidad, interoperabilidad, seguridad, escalamiento',
  },
  {
    id: 'cfo',
    titulo: 'CFO / Dirección Financiera',
    subtitulo: 'Optimización de inversión y retorno de capital',
    mensaje: 'ROI, eficiencia operativa, mitigación de pérdidas, priorización de inversión, business case',
  },
  {
    id: 'ciso',
    titulo: 'CISO / Seguridad de la Información',
    subtitulo: 'Protección de activos, mitigación y cumplimiento normativo',
    mensaje: 'visibilidad, priorización, protección, evidencia, gobierno de riesgo',
  },
  {
    id: 'operaciones',
    titulo: 'Operaciones e Infraestructura',
    subtitulo: 'Continuidad operativa y soporte crítico',
    mensaje: 'disponibilidad, soporte, prevención, continuidad, capacidad de respuesta',
  },
  {
    id: 'innovacion',
    titulo: 'Innovación / Transformación Digital',
    subtitulo: 'Habilitación de IA y nuevos modelos de valor',
    mensaje: 'IA aplicada, monetización de datos, automatización y nuevos modelos de negocio',
  },
  {
    id: 'gobierno',
    titulo: 'Gobierno / Institución Pública',
    subtitulo: 'Soberanía del dato y servicios al ciudadano',
    mensaje: 'soberanía del dato, cumplimiento, continuidad de servicios ciudadanos',
  },
];

export const PRIORIDADES: Prioridad[] = [
  { id: 'proteger_datos', titulo: 'Proteger datos', descripcion: 'Blindar la soberanía, integridad y respaldo de la información crítica.' },
  { id: 'nube', titulo: 'Migrar a nube', descripcion: 'Modernizar infraestructura con arquitectura híbrida y soberana.' },
  { id: 'continuidad', titulo: 'Mejorar continuidad', descripcion: 'Asegurar tolerancia a fallas y capacidad de recuperación inmediata.' },
  { id: 'ciberseguridad', titulo: 'Fortalecer ciberseguridad', descripcion: 'Detección proactiva con IA y respuesta ante incidentes.' },
  { id: 'monitoreo', titulo: 'Monitorear infraestructura', descripcion: 'Visibilidad integral 24/7 y observabilidad de servicios críticos.' },
  { id: 'ia', titulo: 'Activar IA', descripcion: 'Implementar agentes, analítica predictiva y modelos empresariales.' },
  { id: 'costos', titulo: 'Reducir costos', descripcion: 'Optimizar consumo de infraestructura y eficiencia operativa FinOps.' },
  { id: 'roi', titulo: 'Generar ROI con datos', descripcion: 'Monetizar los activos de información e impulsar decisiones fundamentadas.' },
  { id: 'crecimiento', titulo: 'Preparar para crecimiento', descripcion: 'Escalar capacidad de procesamiento y disponibilidad elástica.' },
];

export const PREGUNTAS: Pregunta[] = [
  {
    id: 1,
    clave: 'industria',
    pregunta: '¿En qué industria opera su organización?',
    tienePuntaje: false,
    opciones: [
      { id: 'finanzas', texto: 'Finanzas / Banca' },
      { id: 'retail', texto: 'Retail / Consumo Masivo' },
      { id: 'manufactura', texto: 'Manufactura / Industrial' },
      { id: 'salud', texto: 'Salud / Farmacéutica' },
      { id: 'gobierno', texto: 'Gobierno / Sector Público' },
      { id: 'otro', texto: 'Otra industria' },
    ],
  },
  {
    id: 2,
    clave: 'sedes',
    pregunta: '¿Cuántas sedes u operaciones activas tiene?',
    tienePuntaje: false,
    opciones: [
      { id: 'una', texto: 'Una sola sede central' },
      { id: '2_5', texto: '2 a 5 sedes u operaciones' },
      { id: '6_20', texto: '6 a 20 sedes distribuidas' },
      { id: 'mas_20', texto: 'Más de 20 sedes / Multiregión' },
    ],
  },
  {
    id: 3,
    clave: 'residencia_datos',
    pregunta: '¿Dónde residen actualmente sus datos corporativos?',
    tienePuntaje: false,
    opciones: [
      { id: 'onprem', texto: 'On-premise (Data center propio / local)' },
      { id: 'nube_publica', texto: 'Nube pública (AWS, Azure, GCP)' },
      { id: 'mixto', texto: 'Mixto (Híbrido / Co-ubicación)' },
      { id: 'no_seguro', texto: 'No estoy seguro / Disperso' },
    ],
  },
  {
    id: 4,
    clave: 'sistemas_criticos',
    pregunta: '¿Sus sistemas críticos operan en alta disponibilidad comprobada?',
    tienePuntaje: true,
    opciones: [
      { id: 'si_total', texto: 'Sí, totalmente redundante', puntaje: 85 },
      { id: 'parcial', texto: 'Parcialmente implementado', puntaje: 55 },
      { id: 'no', texto: 'No cuentan con alta disponibilidad', puntaje: 25 },
    ],
  },
  {
    id: 5,
    clave: 'respaldos_drp',
    pregunta: '¿Cuenta con respaldos automáticos y DRP probado periódicamente?',
    tienePuntaje: true,
    opciones: [
      { id: 'si_probado', texto: 'Sí, probado y con simulacros recientes', puntaje: 90 },
      { id: 'parcial', texto: 'Parcialmente / Solo backups sin DRP completo', puntaje: 55 },
      { id: 'no', texto: 'No se cuenta con DRP estructurado', puntaje: 20 },
    ],
  },
  {
    id: 6,
    clave: 'operacion_247',
    pregunta: '¿Su modelo de negocio o infraestructura requiere operación continua 24/7?',
    tienePuntaje: true,
    opciones: [
      { id: 'si_247', texto: 'Sí, continuidad operativa 24/7 obligatoria', puntaje: 85 },
      { id: 'no_247', texto: 'No, opera en horarios extendidos de oficina', puntaje: 40 },
    ],
  },
  {
    id: 7,
    clave: 'tipo_nube',
    pregunta: '¿Qué tipo de arquitectura de nube o infraestructura utiliza?',
    tienePuntaje: true,
    opciones: [
      { id: 'hibrida', texto: 'Híbrida (On-premise + Nube interconectada)', puntaje: 85 },
      { id: 'privada', texto: 'Nube Privada dedicada', puntaje: 75 },
      { id: 'publica', texto: 'Nube Pública únicamente', puntaje: 70 },
      { id: 'onprem', texto: 'Tradicional On-Premise únicamente', puntaje: 55 },
      { id: 'no_se', texto: 'No está estandarizado / Desconocido', puntaje: 35 },
    ],
  },
  {
    id: 8,
    clave: 'ciberseguridad',
    pregunta: '¿Mide, audita y gestiona activamente riesgos de ciberseguridad?',
    tienePuntaje: true,
    opciones: [
      { id: 'si_soc', texto: 'Sí, con SOC, monitoreo continuo y SIEM', puntaje: 85 },
      { id: 'parcial', texto: 'Parcialmente con herramientas básicas de endpoint/firewall', puntaje: 55 },
      { id: 'no', texto: 'No contamos con gestión formal de ciberseguridad', puntaje: 25 },
    ],
  },
  {
    id: 9,
    clave: 'ia_analitica',
    pregunta: '¿Tiene proyectos activos de IA, modelos predictivos o analítica avanzada?',
    tienePuntaje: true,
    opciones: [
      { id: 'si_prod', texto: 'Sí, modelos o agentes en producción activa', puntaje: 90 },
      { id: 'evaluando', texto: 'Evaluando casos de uso o pruebas de concepto (PoC)', puntaje: 60 },
      { id: 'no', texto: 'No hemos comenzado con IA', puntaje: 30 },
    ],
  },
  {
    id: 10,
    clave: 'datos_organizados',
    pregunta: '¿Sus datos corporativos están unificados y organizados para decisiones?',
    tienePuntaje: true,
    opciones: [
      { id: 'si_organizados', texto: 'Sí, repositorio centralizado y gobierno de datos', puntaje: 90 },
      { id: 'parcial', texto: 'Parcialmente en silos por departamento', puntaje: 60 },
      { id: 'no', texto: 'No, datos dispersos y sin estandarización', puntaje: 30 },
    ],
  },
];
