import type { Rol } from '../auth/types';
import { norm } from '../comun/texto';
import type { IconoSeccionKey } from '../../ui/layouts/DashboardLayout';

export interface SubSeccion { id: string; titulo: string }
export interface Seccion {
  id: string;
  titulo: string;
  alias: string[];
  icono: IconoSeccionKey;
  /** Etiqueta de grupo en el sidebar (se muestra cuando cambia respecto al ítem anterior). */
  grupo?: string;
  subsecciones: SubSeccion[];
}
export interface Destino { id: string; titulo: string; alias: string[] }

export const SECCIONES_EXPLORER: Seccion[] = [
  {
    id: 'explorer',
    titulo: 'AI Value Explorer',
    alias: ['inicio', 'home', 'resumen', 'explorer', 'principal'],
    icono: 'inicio',
    subsecciones: [],
  },
  {
    id: 'explorerDiagnostico',
    titulo: 'Diagnóstico Empresa',
    alias: ['diagnostico', 'madurez', 'brechas', 'partida', 'evaluacion'],
    icono: 'diagnostico',
    grupo: 'Descubra',
    subsecciones: [],
  },
  {
    id: 'explorerValorDato',
    titulo: 'Valor del Dato',
    alias: ['datos', 'valor', 'gobierno', 'monetizacion', 'data'],
    icono: 'dato',
    subsecciones: [],
  },
  {
    id: 'explorerNube',
    titulo: 'Nube, IaaS y FLAI',
    alias: ['nube', 'cloud', 'iaas', 'flai', 'soberana', 'hibrida', 'servidores'],
    icono: 'nube',
    grupo: 'Infraestructura',
    subsecciones: [],
  },
  {
    id: 'explorerNOC',
    titulo: 'NOC y Operación',
    alias: ['noc', 'monitoreo', 'sla', 'soporte', '24/7', 'disponibilidad', 'operacion'],
    icono: 'noc',
    subsecciones: [],
  },
  {
    id: 'explorerSOC',
    titulo: 'SOC IA y Ciberseguridad',
    alias: ['soc', 'ciberseguridad', 'seguridad', 'ciso', 'amenazas', 'siem', 'ciber'],
    icono: 'soc',
    grupo: 'Proteja',
    subsecciones: [],
  },
  {
    id: 'explorerDRP',
    titulo: 'DRP y Continuidad',
    alias: ['drp', 'continuidad', 'backup', 'recuperacion', 'resiliencia', 'contingencia'],
    icono: 'drp',
    subsecciones: [],
  },
  {
    id: 'explorerAIFactory',
    titulo: 'AI Factory',
    alias: ['ia', 'ai', 'factory', 'agentes', 'modelos', 'analitica', 'rag'],
    icono: 'ia',
    grupo: 'Crezca',
    subsecciones: [],
  },
  {
    id: 'explorerROI',
    titulo: 'ROI y Business Case',
    alias: ['roi', 'business case', 'retorno', 'inversion', 'cfo', 'financiero'],
    icono: 'roi',
    subsecciones: [],
  },
  {
    id: 'explorerWizard',
    titulo: 'Diagnóstico Ejecutivo',
    alias: ['wizard', 'cuestionario', 'preguntas', 'solicitar', 'formulario', 'contacto'],
    icono: 'wizard',
    grupo: 'Acción',
    subsecciones: [],
  },
];

// Vista unificada para todos los usuarios
export const SECCIONES_POR_ROL: Record<Rol, Seccion[]> = {
  ceo: SECCIONES_EXPLORER,
  planner: SECCIONES_EXPLORER,
};

/** Secciones + subsecciones aplanadas, para el buscador y el asistente. */
export const destinosDe = (secciones: Seccion[]): Destino[] =>
  secciones.flatMap(s => [
    { id: s.id, titulo: s.titulo, alias: s.alias },
    ...s.subsecciones.map(x => ({ id: `${s.id}:${x.id}`, titulo: `${x.titulo} · ${s.titulo}`, alias: [] as string[] })),
  ]);

/** Coincidencia por título o alias, sin acentos ni mayúsculas. */
export function buscarDestino(destinos: Destino[], q: string): Destino[] {
  const t = norm(q).trim();
  if (!t) return [];
  return destinos.filter(s => [s.titulo, ...s.alias].some(a => norm(a).includes(t)));
}
