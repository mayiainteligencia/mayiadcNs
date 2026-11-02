import {
  Activity, ArrowRight, BarChart3, Cloud, Cpu, Database, LifeBuoy, MessageSquareText,
  ShieldAlert, ShieldCheck, Sparkles, Stethoscope, TrendingUp, UserCheck, ClipboardList,
} from 'lucide-react';
import { useExplorer } from './ExplorerContext';
import { GUIA, PREOCUPACIONES } from '../../domain/explorer/guia';
import { MODULOS } from '../../domain/explorer/modulos';
import { BentoItem } from '../../ui/layouts/BentoGrid';
import { branding } from '../../ui/theme/branding';
import { BrainCanvas } from '../../ui/widgets/BrainCanvas';
import logoMayiaNext from '../../../assets/mayiaxNext.png';
import logoMayiaNextDark from '../../../assets/mayiaxNext_dark.png';
import { Card, KpiCard } from '../../ui/widgets';
import './ValueExplorerHome.css';

const ICONOS_MODULOS: Record<string, typeof Activity> = {
  explorerDiagnostico: Stethoscope,
  explorerValorDato: Database,
  explorerNube: Cloud,
  explorerNOC: Activity,
  explorerSOC: ShieldCheck,
  explorerDRP: LifeBuoy,
  explorerAIFactory: Cpu,
  explorerROI: TrendingUp,
};

const PASOS = [
  { icono: ClipboardList, titulo: 'Responda 10 preguntas', texto: 'Su rol, su prioridad y el estado actual de su infraestructura. Toma 3 minutos.' },
  { icono: BarChart3, titulo: 'Reciba su ruta', texto: 'Madurez, riesgo, continuidad, ROI preliminar y los servicios que realmente necesita.' },
  { icono: UserCheck, titulo: 'Hable con un especialista', texto: 'Un experto de MAYIA × NextStream prepara su business case en 24 horas.' },
];

const CONFIANZA = [
  { valor: '99.95%', etiqueta: 'SLA de disponibilidad' },
  { valor: '24/7', etiqueta: 'NOC y SOC con IA' },
  { valor: '100%', etiqueta: 'Datos soberanos en México' },
  { valor: '8', etiqueta: 'Soluciones integradas' },
];

function Titulo({ eyebrow, titulo, sub }: { eyebrow: string; titulo: string; sub?: string }) {
  return (
    <BentoItem size="full">
      <div className="land-title">
        <span className="land-title__eyebrow">{eyebrow}</span>
        <h2>{titulo}</h2>
        {sub && <p>{sub}</p>}
      </div>
    </BentoItem>
  );
}

export function ValueExplorerHome({ onNavegar, onAbrirMayia }: { onNavegar: (id: string) => void; onAbrirMayia?: () => void }) {
  const { kpis, perfil, prioridad, diagnosticoHecho } = useExplorer();
  const irAModulos = () => document.getElementById('modulos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      {/* 1 · HERO */}
      <BentoItem size="full">
        <Card>
          <div className="land-hero">
            <div className="land-hero__text">
              <div className="land-hero__brand-header">
                <img src={logoMayiaNext} alt="MAYIA DATACENTER × NextStream" className="land-hero__logo land-hero__logo--light" />
                <img src={logoMayiaNextDark} alt="MAYIA DATACENTER × NextStream" className="land-hero__logo land-hero__logo--dark" />
                <span className="land-hero__badge"><span className="land-dot" /> ALIANZA ESTRATÉGICA OFICIAL</span>
              </div>
              <h1 className="land-hero__title">
                El centro de datos <span>más inteligente</span> de México y Latinoamérica
              </h1>
              <p className="land-hero__lead">
                ¿No sabe qué necesita contratar? Descúbralo en 3 minutos. Evaluamos su infraestructura, su riesgo y el valor de sus datos,
                y le decimos exactamente por dónde empezar.
              </p>
              <div className="land-hero__cta">
                <button className="cta-btn land-cta-big" onClick={() => onNavegar('explorerWizard')}>
                  <Sparkles size={18} /><span>Descubrir qué necesito</span>
                </button>
                <button className="cta-btn cta-btn--sec land-cta-big" onClick={irAModulos}>
                  <span>Explorar las 8 soluciones</span><ArrowRight size={16} />
                </button>
              </div>
            </div>
            <div className="land-hero__visual" aria-hidden="true">
              <BrainCanvas accent={branding.marca.neonVerde} height={280} nodes={260} />
            </div>
          </div>
          <div className="land-trust">
            {CONFIANZA.map(c => (
              <div key={c.etiqueta} className="land-trust__item">
                <strong>{c.valor}</strong><span>{c.etiqueta}</span>
              </div>
            ))}
          </div>
        </Card>
      </BentoItem>

      {/* MAYIA: solo en esta pantalla; en las demás queda el orbe del encabezado */}
      <BentoItem size="full">
        <button type="button" className="land-nudge land-mayia" onClick={onAbrirMayia}>
          <MessageSquareText size={20} />
          <span>
            <strong>Pregúntele a MAYIA, su asesor de infraestructura crítica.</strong>{' '}
            Pulse y hable sobre NOC, SOC, DRP o IA · diga <strong>«MAYIA»</strong> para enviar.
          </span>
          <ArrowRight size={16} />
        </button>
      </BentoItem>

      {/* 2 · ¿QUÉ LE PREOCUPA? */}
      <Titulo
        eyebrow="EMPIECE POR SU PROBLEMA"
        titulo="¿Qué le preocupa hoy?"
        sub="Elija la frase que más se parece a su situación. Le mostramos la solución y cuánto le conviene."
      />
      <BentoItem size="full">
        <div className="land-worries">
          {PREOCUPACIONES.map(p => (
            <button key={p.id} className="land-worry" onClick={() => onNavegar(p.ruta)}>
              <span className="land-worry__q">{p.frase}</span>
              <span className="land-worry__go">{p.modulo} <ArrowRight size={14} /></span>
            </button>
          ))}
        </div>
      </BentoItem>

      {/* 3 · SU DIAGNÓSTICO EN VIVO */}
      <Titulo
        eyebrow="SU DIAGNÓSTICO EN VIVO"
        titulo={diagnosticoHecho ? `Su resultado como ${perfil.titulo}` : 'Así se vería su diagnóstico'}
        sub={diagnosticoHecho
          ? `Prioridad: ${prioridad.titulo}. Estos indicadores se actualizan con sus respuestas.`
          : 'Valores ilustrativos. Responda el diagnóstico y estos números se convierten en los suyos.'}
      />
      <BentoItem size="k2"><KpiCard etiqueta="Madurez Digital" valor={`${kpis.madurez}%`} sub={diagnosticoHecho ? 'Su resultado' : 'Ilustrativo'} icono={<BarChart3 size={20} />} /></BentoItem>
      <BentoItem size="k2"><KpiCard etiqueta="Riesgo" valor={kpis.riesgo} sub={`${kpis.riesgoNum}% exposición`} icono={<ShieldAlert size={20} />} /></BentoItem>
      <BentoItem size="k2"><KpiCard etiqueta="Continuidad" valor={`${kpis.continuidad}%`} sub="SLA y respaldo" icono={<Activity size={20} />} /></BentoItem>
      <BentoItem size="k2"><KpiCard etiqueta="Valor del Dato" valor={`${kpis.valorDato}%`} sub="Gobierno e IA" icono={<Database size={20} />} /></BentoItem>
      <BentoItem size="k2"><KpiCard etiqueta="ROI Preliminar" valor={`${kpis.roi}x`} sub="Retorno estimado" icono={<TrendingUp size={20} />} /></BentoItem>
      <BentoItem size="k2"><KpiCard etiqueta="Servicios" valor={String(kpis.serviciosRecomendadosCount)} sub="Recomendados" icono={<Sparkles size={20} />} /></BentoItem>
      {!diagnosticoHecho && (
        <BentoItem size="full">
          <button className="land-nudge" onClick={() => onNavegar('explorerWizard')}>
            <MessageSquareText size={18} />
            <span><strong>Personalice estos números:</strong> responda 10 preguntas y vea su ruta recomendada.</span>
            <ArrowRight size={16} />
          </button>
        </BentoItem>
      )}

      {/* 4 · CÓMO FUNCIONA */}
      <Titulo eyebrow="CÓMO FUNCIONA" titulo="De la duda a su plan en 3 pasos" />
      {PASOS.map((p, i) => {
        const Icono = p.icono;
        return (
          <BentoItem key={p.titulo} size="third">
            <Card>
              <div className="land-step">
                <span className="land-step__num">0{i + 1}</span>
                <span className="land-step__icon"><Icono size={22} /></span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </div>
            </Card>
          </BentoItem>
        );
      })}

      {/* 5 · SOLUCIONES */}
      <div id="modulos" className="bento__item bento--full land-anchor">
        <div className="land-title">
          <span className="land-title__eyebrow">8 SOLUCIONES, UNA SOLA ALIANZA</span>
          <h2>Explore y descubra cuál necesita</h2>
          <p>Cada módulo comienza con la pregunta que usted se hace hoy y termina con lo que obtiene al contratarlo.</p>
        </div>
      </div>
      {MODULOS.map(mod => {
        const Icono = ICONOS_MODULOS[mod.ruta] ?? Activity;
        const guia = GUIA[mod.ruta];
        return (
          <BentoItem key={mod.id} size="k3">
            <Card>
              <button className="mod-card" onClick={() => onNavegar(mod.ruta)}>
                <div className="mod-card__top">
                  <span className="mod-card__num">0{mod.numero}</span>
                  <span className="mod-card__icon"><Icono size={20} /></span>
                </div>
                <h3 className="mod-card__title">{mod.titulo}</h3>
                <p className="mod-card__q">{guia?.dolor}</p>
                <p className="mod-card__desc">{mod.descripcionCorta}</p>
                <span className="mod-card__btn">{mod.ruta === 'explorerDiagnostico' ? 'Iniciar diagnóstico' : 'Explorar'} <ArrowRight size={15} /></span>
              </button>
            </Card>
          </BentoItem>
        );
      })}

      {/* 6 · CTA FINAL */}
      <BentoItem size="full">
        <Card>
          <div className="home-banda">
            <div className="home-banda__text">
              <span className="home-banda__tag">ALIANZA ESTRATÉGICA MAYIA × NEXTSTREAM</span>
              <p className="home-banda__copy">
                MAYIA DATACENTER integra infraestructura de máxima disponibilidad en México, nube soberana, conectividad NextStream,
                NOC 24/7, SOC IA, DRP georredundante y AI Factory. Deje de adivinar: pida su diagnóstico ejecutivo.
              </p>
            </div>
            <button className="cta-btn home-banda__btn land-cta-big" onClick={() => onNavegar('explorerWizard')}>
              <Sparkles size={18} /><span>Solicitar diagnóstico ejecutivo</span>
            </button>
          </div>
        </Card>
      </BentoItem>
    </>
  );
}
