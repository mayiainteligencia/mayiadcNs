import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Bot, CheckCircle2, ChevronRight, Sparkles, TriangleAlert } from 'lucide-react';
import { GUIA } from '../../../domain/explorer/guia';
import { MODULOS } from '../../../domain/explorer/modulos';
import { BentoItem } from '../../../ui/layouts/BentoGrid';
import { Gauge } from '../../../ui/charts/charts';
import { Card } from '../../../ui/widgets';
import './ExplorerShared.css';

export interface ModuloHeaderProps {
  numero: number;
  titulo: string;
  deQueTrata: string;
  onVolver: () => void;
  onDiagnostico?: () => void;
  derecha?: ReactNode;
}

/** Cabecera de módulo: del problema ("¿le pasa esto?") a lo que obtiene al contratarlo. */
export function ModuloHeader({ numero, titulo, deQueTrata, onVolver, onDiagnostico, derecha }: ModuloHeaderProps) {
  const ruta = MODULOS.find(m => m.numero === numero)?.ruta ?? '';
  const guia = GUIA[ruta];

  return (
    <BentoItem size="full">
      <Card>
        <div className="mod-hero">
          <div className="mod-hero__nav">
            <button className="mod-head__back" onClick={onVolver} aria-label="Volver al Explorer">
              <ArrowLeft size={16} />
              <span>Volver al Explorer</span>
            </button>
            <span className="mod-head__tag">MÓDULO {numero} DE 8</span>
          </div>

          <div className="mod-hero__grid">
            <div className="mod-hero__main">
              <h2 className="mod-hero__title">{titulo}</h2>
              {guia && <p className="mod-hero__question">{guia.dolor}</p>}
              <p className="mod-head__desc">{deQueTrata}</p>
              <div className="mod-head__actions">
                {derecha}
                {onDiagnostico && (
                  <button className="cta-btn" onClick={onDiagnostico}>
                    <Sparkles size={16} />
                    <span>Descubrir qué necesito</span>
                  </button>
                )}
              </div>
            </div>

            {guia && (
              <div className="mod-hero__side">
                <div className="mod-hero__box">
                  <span className="mod-hero__box-title"><TriangleAlert size={14} /> Esto le conviene si…</span>
                  <ul>{guia.sintomas.map(s => <li key={s}>{s}</li>)}</ul>
                </div>
                <div className="mod-hero__box mod-hero__box--ok">
                  <span className="mod-hero__box-title"><CheckCircle2 size={14} /> Lo que obtiene</span>
                  <p>{guia.resultado}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </BentoItem>
  );
}

/** Cierre de módulo: lleva a la acción (siguiente módulo o diagnóstico ejecutivo). */
export function ModuloCierre({ ruta, onNavegar }: { ruta: string; onNavegar: (r: string) => void }) {
  const guia = GUIA[ruta];
  const sig = guia?.siguiente ? MODULOS.find(m => m.ruta === guia.siguiente) : undefined;
  return (
    <BentoItem size="full">
      <Card>
        <div className="mod-cierre">
          <div className="mod-cierre__text">
            <span className="home-banda__tag">¿LISTO PARA SABER QUÉ NECESITA?</span>
            <p className="home-banda__copy">
              Responda 10 preguntas y reciba su ruta recomendada de servicios, con ROI preliminar y un especialista asignado.
            </p>
          </div>
          <div className="mod-cierre__acts">
            {sig && (
              <button className="cta-btn cta-btn--sec" onClick={() => onNavegar(sig.ruta)}>
                <span>Siguiente: {sig.titulo}</span>
                <ArrowRight size={16} />
              </button>
            )}
            <button className="cta-btn" onClick={() => onNavegar('explorerWizard')}>
              <Sparkles size={16} />
              <span>Solicitar diagnóstico ejecutivo</span>
            </button>
          </div>
        </div>
      </Card>
    </BentoItem>
  );
}

export function AgentesPanel({ agentes }: { agentes: string[] }) {
  return (
    <Card titulo="Agentes de IA Habilitados">
      <div className="agentes-list">
        {agentes.map(agente => (
          <div key={agente} className="agente-item">
            <div className="agente-icon">
              <Bot size={18} />
            </div>
            <div className="agente-text">
              <strong className="agente-name">{agente}</strong>
              <span className="agente-status">
                <span className="agente-dot" /> En línea · Especializado
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ServiciosList({ servicios, titulo = 'Servicios del Módulo' }: { servicios: string[]; titulo?: string }) {
  return (
    <Card titulo={titulo}>
      <div className="servicios-grid">
        {servicios.map(srv => (
          <div key={srv} className="servicio-item">
            <CheckCircle2 size={16} className="servicio-check" />
            <span className="servicio-text">{srv}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function KpiBadge({
  etiqueta,
  valor,
  destacado,
  sub,
}: {
  etiqueta: string;
  valor: string;
  destacado?: boolean;
  sub?: string;
}) {
  return (
    <div className={`kpi-badge ${destacado ? 'is-destacado' : ''}`}>
      <span className="kpi-badge__lbl">{etiqueta}</span>
      <strong className="kpi-badge__val">{valor}</strong>
      {sub && <span className="kpi-badge__sub">{sub}</span>}
    </div>
  );
}

export function KpiCircle({
  valor,
  etiqueta,
  formato,
}: {
  valor: number;
  etiqueta: string;
  formato?: (v: number) => string;
}) {
  return (
    <div className="kpi-circle">
      <Gauge valor={valor} etiqueta={etiqueta} formato={formato} />
    </div>
  );
}

export function CtaButton({
  texto,
  onClick,
  icono,
  secundario,
}: {
  texto: string;
  onClick: () => void;
  icono?: ReactNode;
  secundario?: boolean;
}) {
  return (
    <button className={`cta-btn ${secundario ? 'cta-btn--sec' : ''}`} onClick={onClick}>
      {icono ?? <ChevronRight size={16} />}
      <span>{texto}</span>
    </button>
  );
}
