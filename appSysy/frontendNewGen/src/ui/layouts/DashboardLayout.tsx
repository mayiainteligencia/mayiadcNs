import { Fragment, useState, type ReactNode } from 'react';
import {
  Menu, X, LayoutDashboard, Database, Cloud, Activity, ShieldCheck,
  LifeBuoy, Cpu, TrendingUp, ClipboardCheck, Sparkles, Stethoscope,
  PanelLeftClose, PanelLeftOpen, Server
} from 'lucide-react';
import logoMayiaNext from '../../../assets/mayiaxNext.png';
import logoMayiaNextDark from '../../../assets/mayiaxNext_dark.png';
import { IconButton, Panel } from '../widgets';
import './DashboardLayout.css';

const ICONOS = {
  inicio: Sparkles,
  dashboard: LayoutDashboard,
  diagnostico: Stethoscope,
  dato: Database,
  nube: Cloud,
  noc: Activity,
  soc: ShieldCheck,
  drp: LifeBuoy,
  ia: Cpu,
  roi: TrendingUp,
  wizard: ClipboardCheck,
  PanelLeftClose,
  PanelLeftOpen,
};

export type IconoSeccionKey = keyof typeof ICONOS;
export interface ItemMenu { id: string; titulo: string; icono: IconoSeccionKey; grupo?: string }

interface Props {
  items: ItemMenu[];
  activo: string;
  titulo: string;
  onNavegar: (id: string) => void;
  /** Buscador de la cabecera (se oculta en pantallas chicas). */
  buscador?: ReactNode;
  /** Acciones de la derecha de la cabecera. */
  acciones?: ReactNode;
  /** Barra bajo la cabecera (p. ej. subsecciones como pestañas). */
  subnav?: ReactNode;
  /** Bloque extra al pie del sidebar. */
  pie?: ReactNode;
  children?: ReactNode;
}

/** Sidebar de color de marca + tarjeta de cabecera + área de contenido. En móvil el sidebar es un cajón. */
const KEY_COLAPSO = 'dcinteligente:sidebar-colapsado';

export function DashboardLayout({ items, activo, titulo, onNavegar, buscador, acciones, subnav, pie, children }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [colapsado, setColapsado] = useState(() => { try { return localStorage.getItem(KEY_COLAPSO) === '1'; } catch { return false; } });
  const alternarColapso = () => setColapsado(c => {
    try { localStorage.setItem(KEY_COLAPSO, c ? '0' : '1'); } catch { /* noop */ }
    return !c;
  });
  const ir = (id: string) => { onNavegar(id); setAbierto(false); };

  return (
    <div className={`dash ${colapsado ? 'is-collapsed' : ''}`}>
      <div className={`dash__scrim ${abierto ? 'is-open' : ''}`} onClick={() => setAbierto(false)} />
      <aside className={`dash__side ${abierto ? 'is-open' : ''}`}>
        <div className="dash__brand">
          <div className="dash__brand-box" onClick={() => ir('explorer')} style={{ cursor: 'pointer' }} title="MAYIA DATACENTER × NextStream">
            <img src={logoMayiaNext} alt="MAYIA x NextStream" className="dash__logo-img dash__logo-img--light" />
            <img src={logoMayiaNextDark} alt="MAYIA x NextStream" className="dash__logo-img dash__logo-img--dark" />
          </div>
          <button className="dash__collapse" aria-label={colapsado ? 'Expandir menú' : 'Colapsar menú'} onClick={alternarColapso}>
            {colapsado ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
          <button className="dash__close" aria-label="Cerrar menú" onClick={() => setAbierto(false)}><X size={20} /></button>
        </div>
        <nav className="dash__nav">
          {items.map(({ id, titulo: t, icono, grupo }, i) => {
            const Icono = ICONOS[icono];
            const mostrarGrupo = grupo && grupo !== items[i - 1]?.grupo;
            return (
              <Fragment key={id}>
                {mostrarGrupo && <span className="dash__group">{grupo}</span>}
                <button className={`dash__item ${id === activo ? 'is-active' : ''}`} onClick={() => ir(id)} title={t} aria-current={id === activo ? 'page' : undefined}>
                  <Icono size={18} /><span>{t}</span>
                </button>
              </Fragment>
            );
          })}
        </nav>
        {pie && <div className="dash__foot">{pie}</div>}
      </aside>

      <div className="dash__main">
        <Panel className="dash__header">
          <IconButton label="Menú" className="dash__burger" onClick={() => setAbierto(true)}><Menu size={20} /></IconButton>
          <h1 className="dash__title">{titulo}</h1>
          {buscador && <div className="dash__buscador">{buscador}</div>}
          <div className="dash__actions">{acciones}</div>
        </Panel>
        {subnav && <div className="dash__subnav">{subnav}</div>}
        <div className="dash__content">{children}</div>
      </div>
    </div>
  );
}
