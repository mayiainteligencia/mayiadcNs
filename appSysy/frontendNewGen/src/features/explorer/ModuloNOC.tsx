import { useExplorer } from './ExplorerContext';
import { AgentesPanel, KpiBadge, ModuloHeader, ServiciosList } from './compartido/ExplorerShared';
import { MODULOS } from '../../domain/explorer/modulos';
import { BentoItem } from '../../ui/layouts/BentoGrid';
import { Gauge, LineChart } from '../../ui/charts/charts';
import { Card } from '../../ui/widgets';

export function ModuloNOC({ onNavegar }: { onNavegar: (ruta: string) => void }) {
  const { respuestas, kpis } = useExplorer();
  const info = MODULOS[3];

  const es247 = respuestas[6] === 'si_247';
  const nivelOperacion = es247 ? 'Crítico 24/7' : 'Horario extendido';
  const riesgoIndisponibilidad = kpis.riesgo === 'Alto' ? 'Elevado (Sin redundancia)' : kpis.riesgo === 'Medio' ? 'Moderado' : 'Controlado';

  // Disponibilidad semanal Lun - Dom (fija)
  const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const datosDisponibilidad = [
    {
      nombre: 'Disponibilidad SLA (%)',
      valores: [99.98, 99.96, 99.99, 99.95, 99.97, 99.99, 99.98],
    },
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

      {/* Badges */}
      <BentoItem size="k3">
        <KpiBadge etiqueta="Nivel de Operación" valor={nivelOperacion} destacado sub="Requerimiento de negocio" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Compromiso SLA" valor="99.95%" sub="Garantía contractual" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Riesgo Indisponibilidad" valor={riesgoIndisponibilidad} sub="Impacto potencial" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Soporte Técnico" valor="24/7/365" sub="Helpdesk L1-L3 y manos remotas" />
      </BentoItem>

      {/* Gráfica de Disponibilidad */}
      <BentoItem size="lg">
        <Card titulo="Monitoreo de Disponibilidad Semanal (SLA 99.95% Benchmark)">
          <div style={{ height: '260px' }}>
            <LineChart labels={diasSemana} series={datosDisponibilidad} formato={v => `${v.toFixed(2)}%`} />
          </div>
        </Card>
      </BentoItem>

      {/* 2 Círculos de KPIs */}
      <BentoItem size="k3">
        <Card titulo="Resiliencia Operativa">
          <div style={{ padding: '12px 0' }}>
            <Gauge valor={kpis.continuidad} etiqueta="Resiliencia" />
          </div>
        </Card>
      </BentoItem>

      <BentoItem size="k3">
        <Card titulo="Madurez NOC">
          <div style={{ padding: '12px 0' }}>
            <Gauge valor={Math.min(100, Math.round(kpis.madurez * 1.1))} etiqueta="Madurez NOC" />
          </div>
        </Card>
      </BentoItem>

      {/* Agentes */}
      <BentoItem size="md">
        <AgentesPanel agentes={info.agentes} />
      </BentoItem>

      {/* 11 Servicios */}
      <BentoItem size="xl">
        <ServiciosList servicios={info.servicios} titulo="Servicios del NOC y Operación Crítica" />
      </BentoItem>
    </>
  );
}
