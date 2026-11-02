import { useExplorer } from './ExplorerContext';
import { AgentesPanel, ModuloHeader, ServiciosList } from './compartido/ExplorerShared';
import { MODULOS } from '../../domain/explorer/modulos';
import { PREGUNTAS } from '../../domain/explorer/catalogo';
import { obtenerPuntaje } from '../../domain/explorer/calculos';
import { BentoItem } from '../../ui/layouts/BentoGrid';
import { BarList, Gauge } from '../../ui/charts/charts';
import { Card } from '../../ui/widgets';

export function ModuloDiagnostico({ onNavegar }: { onNavegar: (ruta: string) => void }) {
  const { respuestas, kpis } = useExplorer();
  const info = MODULOS[0];

  // Cálculo de las 8 dimensiones
  const pInfra = obtenerPuntaje(respuestas, 4);
  const pNube = obtenerPuntaje(respuestas, 7);
  const pCont = Math.round((obtenerPuntaje(respuestas, 5) + obtenerPuntaje(respuestas, 6)) / 2);
  const pCiber = obtenerPuntaje(respuestas, 8);
  const pDatos = obtenerPuntaje(respuestas, 10);
  const pIA = obtenerPuntaje(respuestas, 9);
  const pGobierno = Math.round((pDatos + pCiber) / 2);
  const pROI = Math.min(100, Math.round(kpis.roi * 10));

  const dimensiones = [
    { label: 'Infraestructura', valor: pInfra, texto: `${pInfra} pts` },
    { label: 'Nube / IaaS', valor: pNube, texto: `${pNube} pts` },
    { label: 'Continuidad', valor: pCont, texto: `${pCont} pts` },
    { label: 'Ciberseguridad', valor: pCiber, texto: `${pCiber} pts` },
    { label: 'Datos / Inteligencia', valor: pDatos, texto: `${pDatos} pts` },
    { label: 'Inteligencia Artificial', valor: pIA, texto: `${pIA} pts` },
    { label: 'Gobierno de Datos', valor: pGobierno, texto: `${pGobierno} pts` },
    { label: 'ROI Potencial', valor: pROI, texto: `${pROI} pts` },
  ];

  return (
    <>
      <ModuloHeader
        numero={info.numero}
        titulo={info.titulo}
        deQueTrata={info.deQueTrata}
        onVolver={() => onNavegar('explorer')}
        onDiagnostico={() => onNavegar('explorerWizard')}
      />

      {/* 3 Círculos KPIs */}
      <BentoItem size="third">
        <Card titulo="Madurez Digital">
          <div style={{ padding: '12px 0' }}>
            <Gauge valor={kpis.madurez} etiqueta="Madurez" />
          </div>
        </Card>
      </BentoItem>

      <BentoItem size="third">
        <Card titulo="Continuidad Operativa">
          <div style={{ padding: '12px 0' }}>
            <Gauge valor={kpis.continuidad} etiqueta="Continuidad" />
          </div>
        </Card>
      </BentoItem>

      <BentoItem size="third">
        <Card titulo="Valor del Dato">
          <div style={{ padding: '12px 0' }}>
            <Gauge valor={kpis.valorDato} etiqueta="Valor Dato" />
          </div>
        </Card>
      </BentoItem>

      {/* 8 Dimensiones de Madurez */}
      <BentoItem size="lg">
        <Card
          titulo="Evaluación por Dimensión (0 a 100)"
          derecha={
            <button className="cta-btn" style={{ padding: '6px 14px', fontSize: '12px' }} onClick={() => onNavegar('explorerWizard')}>
              Generar diagnóstico preliminar
            </button>
          }
        >
          <BarList items={dimensiones} />
        </Card>
      </BentoItem>

      {/* Agentes y Servicios */}
      <BentoItem size="lg">
        <AgentesPanel agentes={info.agentes} />
        <div style={{ marginTop: '16px' }}>
          <ServiciosList servicios={info.servicios} />
        </div>
      </BentoItem>

      {/* Estado de las 10 Preguntas */}
      <BentoItem size="full">
        <Card
          titulo="Preguntas del Diagnóstico Breve"
          derecha={
            <button className="cta-btn cta-btn--sec" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => onNavegar('explorerWizard')}>
              Responder en Wizard
            </button>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
            {PREGUNTAS.map(p => {
              const respId = respuestas[p.id];
              const op = p.opciones.find(o => o.id === respId);
              return (
                <div key={p.id} style={{ background: 'var(--surface2)', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700 }}>PREGUNTA 0{p.id}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 600, margin: '4px 0' }}>{p.pregunta}</div>
                  <div style={{ fontSize: '12px', color: op ? 'var(--text)' : 'var(--text-muted)' }}>
                    Respuesta: <strong>{op ? op.texto : 'Sin contestar (50 pts)'}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </BentoItem>
    </>
  );
}
