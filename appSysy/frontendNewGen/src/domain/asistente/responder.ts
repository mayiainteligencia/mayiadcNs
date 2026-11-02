import { norm } from '../comun/texto';
import type { Destino } from '../navegacion/secciones';

export interface Respuesta { texto: string; irA?: string }

const VERBOS_NAV = ['ve al', 've a', 'ir al', 'ir a', 'entra', 'llevame', 'vamos a', 'muestrame', 'muestra', 'abre', 'abrir', 'ir'];

export function responder(texto: string, secciones: Destino[]): Respuesta {
  const t = norm(texto);

  // Navegación por coincidencia de sección o alias
  const mencionada = secciones.find(s => [s.titulo, ...s.alias].some(a => t.includes(norm(a))));
  if (mencionada && (VERBOS_NAV.some(v => t.includes(v)) || t.split(' ').length <= 3)) {
    return { texto: `Navegando a ${mencionada.titulo}.`, irA: mencionada.id };
  }

  // Respuestas consultivas inteligentes de Data Center
  if (t.includes('soc') || t.includes('ciberseguridad') || t.includes('ataque') || t.includes('amenaza')) {
    return {
      texto: 'El SOC IA monitorea eventos 24/7 con correlación inteligente, detección de anomalías y cumplimiento ISO 27001.',
      irA: 'explorerSOC',
    };
  }

  if (t.includes('noc') || t.includes('monitoreo') || t.includes('disponibilidad') || t.includes('sla')) {
    return {
      texto: 'El NOC gestionado asegura 99.95% de SLA para operaciones críticas con observabilidad en tiempo real y manos remotas.',
      irA: 'explorerNOC',
    };
  }

  if (t.includes('drp') || t.includes('backup') || t.includes('recuperacion') || t.includes('contingencia')) {
    return {
      texto: 'El módulo DRP define políticas de recuperación ante desastres con RTO de hasta 4 horas y RPO de 15 minutos con respaldo inmutable.',
      irA: 'explorerDRP',
    };
  }

  if (t.includes('nube') || t.includes('iaas') || t.includes('flai') || t.includes('soberan')) {
    return {
      texto: 'FLAI ofrece nube soberana e infraestructura híbrida en territorio nacional con interconexión de ultra baja latencia para IA.',
      irA: 'explorerNube',
    };
  }

  if (t.includes('ia') || t.includes('agente') || t.includes('inteligencia') || t.includes('factory')) {
    return {
      texto: 'AI Factory transforma tus datos en agentes ejecutivos, modelos predictivos y pipelines de automatización para tus áreas de negocio.',
      irA: 'explorerAIFactory',
    };
  }

  if (t.includes('roi') || t.includes('inversion') || t.includes('costo') || t.includes('beneficio')) {
    return {
      texto: 'El business case proyecta el retorno financiero, ahorros por mitigación de riesgo y eficiencias operativas según tu perfil.',
      irA: 'explorerROI',
    };
  }

  if (t.includes('diagnostico') || t.includes('cuestionario') || t.includes('wizard') || t.includes('evaluar')) {
    return {
      texto: 'Te llevo al diagnóstico interactivo para evaluar la madurez digital y resiliencia de tu infraestructura en 5 pasos.',
      irA: 'explorerWizard',
    };
  }

  const lista = secciones.filter(s => !s.id.includes(':')).map(s => s.titulo).join(', ');
  return { texto: `Soy MAYIA, tu asesor de DC Inteligente. Puedo llevarte a: ${lista}. Di por ejemplo «ve a SOC» o «abrir AI Factory».` };
}
