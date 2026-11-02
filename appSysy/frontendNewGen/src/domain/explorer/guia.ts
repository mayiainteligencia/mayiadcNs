/** Contenido persuasivo: del problema del cliente a la contratación. */

export interface GuiaModulo {
  /** Pregunta que el ejecutivo se hace hoy. */
  dolor: string;
  /** Señales de que el módulo le conviene. */
  sintomas: string[];
  /** Lo que obtiene al contratarlo. */
  resultado: string;
  /** Siguiente módulo sugerido en la ruta. */
  siguiente?: string;
}

export const GUIA: Record<string, GuiaModulo> = {
  explorerDiagnostico: {
    dolor: '¿Sabe exactamente en qué punto está su infraestructura y qué le falta?',
    sintomas: ['No hay una medición clara de madurez digital', 'Las inversiones de TI se deciden por urgencia, no por prioridad', 'Dirección pide un diagnóstico y nadie lo tiene'],
    resultado: 'Un mapa de 8 dimensiones con sus brechas y la ruta de servicios que realmente necesita.',
    siguiente: 'explorerValorDato',
  },
  explorerValorDato: {
    dolor: '¿Cuánto vale su información y qué tan protegida y aprovechada está?',
    sintomas: ['Los datos viven en silos por departamento', 'Reportes distintos dan números distintos', 'Hay datos valiosos que nadie explota'],
    resultado: 'Su dato convertido en activo: gobernado, protegido y listo para generar decisiones y valor.',
    siguiente: 'explorerNube',
  },
  explorerNube: {
    dolor: '¿Su infraestructura puede crecer, procesar IA y mantener el control de sus datos?',
    sintomas: ['Servidores al límite o equipo obsoleto', 'La nube pública se volvió cara o poco controlable', 'Los datos sensibles deben quedarse en México'],
    resultado: 'Nube soberana e híbrida con capacidad bajo demanda y costos bajo control (FinOps).',
    siguiente: 'explorerNOC',
  },
  explorerNOC: {
    dolor: '¿Se entera de una falla antes que sus clientes?',
    sintomas: ['Caídas o lentitud sin causa clara', 'Nadie vigila la operación de noche y fines de semana', 'No existe un SLA medible con proveedores'],
    resultado: 'Monitoreo 24/7 con SLA 99.95%, soporte especializado y visibilidad en tiempo real.',
    siguiente: 'explorerSOC',
  },
  explorerSOC: {
    dolor: '¿Podría detectar y detener un ataque hoy mismo?',
    sintomas: ['Solo hay antivirus y firewall básicos', 'No se miden vulnerabilidades ni accesos', 'Auditorías y cumplimiento causan estrés'],
    resultado: 'SOC con IA que detecta, responde y deja evidencia para auditorías y cumplimiento.',
    siguiente: 'explorerDRP',
  },
  explorerDRP: {
    dolor: '¿Cuánto tiempo y cuántos datos perdería su empresa si hoy falla todo?',
    sintomas: ['Hay respaldos pero nunca se han probado', 'No se conoce el RTO/RPO real', 'Una sola sede concentra la operación'],
    resultado: 'Recuperación probada con RTO/RPO definidos, respaldo inmutable y plan ejecutivo de contingencia.',
    siguiente: 'explorerAIFactory',
  },
  explorerAIFactory: {
    dolor: '¿Quiere usar IA pero no sabe por dónde empezar?',
    sintomas: ['Pruebas aisladas que no llegan a producción', 'No hay casos de uso priorizados por área', 'Los datos no están listos para IA'],
    resultado: 'Agentes, modelos predictivos y automatización en casos de uso con retorno medible.',
    siguiente: 'explorerROI',
  },
  explorerROI: {
    dolor: '¿Cómo justifica esta inversión ante dirección y finanzas?',
    sintomas: ['Falta un business case en lenguaje financiero', 'No se sabe qué priorizar primero', 'Cuesta comparar escenarios de inversión'],
    resultado: 'Un caso de negocio por escenarios, con ROI, riesgo mitigado y tiempos de implementación.',
    siguiente: 'explorerWizard',
  },
};

export interface Preocupacion {
  id: string;
  frase: string;
  ruta: string;
  modulo: string;
}

/** "¿Qué le preocupa hoy?": cada frase lleva al módulo que la resuelve. */
export const PREOCUPACIONES: Preocupacion[] = [
  { id: 'caidas', frase: 'Mis sistemas se caen o van lentos', ruta: 'explorerNOC', modulo: 'NOC y Operación' },
  { id: 'ataque', frase: 'Me preocupa un ciberataque', ruta: 'explorerSOC', modulo: 'SOC IA y Ciberseguridad' },
  { id: 'desastre', frase: 'No sé si podría recuperarme de un desastre', ruta: 'explorerDRP', modulo: 'DRP y Continuidad' },
  { id: 'datos', frase: 'Mis datos están dispersos y sin valor', ruta: 'explorerValorDato', modulo: 'Valor del Dato' },
  { id: 'ia', frase: 'Quiero IA pero no sé por dónde empezar', ruta: 'explorerAIFactory', modulo: 'AI Factory' },
  { id: 'costos', frase: 'Mi infraestructura es cara o se quedó corta', ruta: 'explorerNube', modulo: 'Nube, IaaS y FLAI' },
  { id: 'roi', frase: 'Necesito justificar la inversión', ruta: 'explorerROI', modulo: 'ROI y Business Case' },
  { id: 'nose', frase: 'No sé qué necesito', ruta: 'explorerWizard', modulo: 'Diagnóstico ejecutivo' },
];
