import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { calcularKPIs } from '../../domain/explorer/calculos';
import { PERFILES, PRIORIDADES } from '../../domain/explorer/catalogo';
import type { KpisCalculados, Lead, Perfil, PerfilId, Prioridad, PrioridadId } from '../../domain/explorer/types';

interface ExplorerContextType {
  perfilId: PerfilId;
  perfil: Perfil;
  setPerfilId: (id: PerfilId) => void;
  prioridadId: PrioridadId;
  prioridad: Prioridad;
  setPrioridadId: (id: PrioridadId) => void;
  respuestas: Record<number, string>;
  setRespuesta: (idPregunta: number, opcionId: string) => void;
  limpiarRespuestas: () => void;
  lead: Lead | null;
  guardarLead: (l: Lead) => void;
  kpis: KpisCalculados;
  /** true cuando el usuario ya llegó al resultado del diagnóstico (KPIs personalizados). */
  diagnosticoHecho: boolean;
  marcarDiagnostico: () => void;
}

const STORAGE_KEY = 'dc_inteligente_explorer_state';

const ExplorerContext = createContext<ExplorerContextType | null>(null);

export function ExplorerProvider({ children }: { children: ReactNode }) {
  const [perfilId, setPerfilIdState] = useState<PerfilId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.perfilId) return parsed.perfilId;
      }
    } catch { /* noop */ }
    return 'ceo';
  });

  const [prioridadId, setPrioridadIdState] = useState<PrioridadId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.prioridadId) return parsed.prioridadId;
      }
    } catch { /* noop */ }
    return 'proteger_datos';
  });

  const [respuestas, setRespuestas] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.respuestas) return parsed.respuestas;
      }
    } catch { /* noop */ }
    // Respuestas iniciales por omisión para tener datos realistas
    return {
      1: 'finanzas',
      2: '2_5',
      3: 'mixto',
      4: 'parcial',
      5: 'parcial',
      6: 'si_247',
      7: 'hibrida',
      8: 'parcial',
      9: 'evaluando',
      10: 'parcial',
    };
  });

  const [lead, setLead] = useState<Lead | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.lead) return parsed.lead;
      }
    } catch { /* noop */ }
    return null;
  });

  const [diagnosticoHecho, setDiagnosticoHecho] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return !!JSON.parse(saved).diagnosticoHecho;
    } catch { /* noop */ }
    return false;
  });

  // Guardar en localStorage ante cambios
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ perfilId, prioridadId, respuestas, lead, diagnosticoHecho })
      );
    } catch { /* noop */ }
  }, [perfilId, prioridadId, respuestas, lead, diagnosticoHecho]);

  const perfil = useMemo(
    () => PERFILES.find(p => p.id === perfilId) ?? PERFILES[0],
    [perfilId]
  );

  const prioridad = useMemo(
    () => PRIORIDADES.find(p => p.id === prioridadId) ?? PRIORIDADES[0],
    [prioridadId]
  );

  const setRespuesta = (idPregunta: number, opcionId: string) => {
    setRespuestas(prev => ({ ...prev, [idPregunta]: opcionId }));
  };

  const limpiarRespuestas = () => {
    setRespuestas({});
  };

  const guardarLead = (nuevoLead: Lead) => {
    setLead(nuevoLead);
  };

  const kpis = useMemo(
    () => calcularKPIs(respuestas, prioridadId),
    [respuestas, prioridadId]
  );

  return (
    <ExplorerContext.Provider
      value={{
        perfilId,
        perfil,
        setPerfilId: setPerfilIdState,
        prioridadId,
        prioridad,
        setPrioridadId: setPrioridadIdState,
        respuestas,
        setRespuesta,
        limpiarRespuestas,
        lead,
        guardarLead,
        kpis,
        diagnosticoHecho,
        marcarDiagnostico: () => setDiagnosticoHecho(true),
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
}

export function useExplorer() {
  const ctx = useContext(ExplorerContext);
  if (!ctx) {
    throw new Error('useExplorer debe ser utilizado dentro de un ExplorerProvider');
  }
  return ctx;
}
