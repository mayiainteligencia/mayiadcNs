export type PerfilId = 'ceo' | 'cto' | 'cfo' | 'ciso' | 'operaciones' | 'innovacion' | 'gobierno';

export interface Perfil {
  id: PerfilId;
  titulo: string;
  subtitulo: string;
  mensaje: string;
}

export type PrioridadId =
  | 'proteger_datos'
  | 'nube'
  | 'continuidad'
  | 'ciberseguridad'
  | 'monitoreo'
  | 'ia'
  | 'costos'
  | 'roi'
  | 'crecimiento';

export interface Prioridad {
  id: PrioridadId;
  titulo: string;
  descripcion: string;
}

export interface OpcionPregunta {
  id: string;
  texto: string;
  puntaje?: number;
}

export interface Pregunta {
  id: number;
  clave: string;
  pregunta: string;
  opciones: OpcionPregunta[];
  tienePuntaje: boolean;
}

export interface Lead {
  nombre: string;
  empresa: string;
  cargo: string;
  correo: string;
  telefono?: string;
  industria?: string;
  tamano?: string;
  prioridad?: string;
  comentarios?: string;
}

export interface KpisCalculados {
  madurez: number;
  riesgo: 'Bajo' | 'Medio' | 'Alto';
  riesgoNum: number;
  continuidad: number;
  valorDato: number;
  roi: number;
  serviciosRecomendadosCount: number;
  serviciosRecomendados: string[];
}
