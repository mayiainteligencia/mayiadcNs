import { useExplorer } from './ExplorerContext';
import { AgentesPanel, KpiBadge, ModuloHeader, ServiciosList } from './compartido/ExplorerShared';
import { MODULOS } from '../../domain/explorer/modulos';
import { BentoItem } from '../../ui/layouts/BentoGrid';
import { BarList, Gauge } from '../../ui/charts/charts';
import { Card } from '../../ui/widgets';

export function ModuloSOC({ onNavegar }: { onNavegar: (ruta: string) => void }) {
  const { respuestas, kpis } = useExplorer();
  const info = MODULOS[4];

  // Exposición: 78% si alto, 52% si medio, 28% si bajo
  const exposicion = kpis.riesgo === 'Alto' ? 78 : kpis.riesgo === 'Medio' ? 52 : 28;
  const cobertura = 100 - exposicion;

  const respCiber = respuestas[8];
  const nivelMonitoreo =
    respCiber === 'si_soc' ? 'SOC Continuo 24/7' : respCiber === 'parcial' ? 'Parcial / Perimetral' : 'Vulnerable / Básico';

  // 6 Prioridades de protección
  const prioridadesProteccion = [
    { label: 'Identidades y Accesos (IAM)', valor: 75, texto: '75%' },
    { label: 'Endpoints y Servidores', valor: 68, texto: '68%' },
    { label: 'Red y Perímetro', valor: 72, texto: '72%' },
    { label: 'SIEM & Correlación de Eventos', valor: kpis.madurez, texto: `${kpis.madurez}%` },
    { label: 'DLP (Prevención de Fuga de Datos)', valor: kpis.valorDato, texto: `${kpis.valorDato}%` },
    { label: 'Cumplimiento Normativo (ISO/PCI)', valor: 60, texto: '60%' },
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

      {/* 4 Badges */}
      <BentoItem size="k3">
        <KpiBadge etiqueta="Índice de Exposición" valor={`${exposicion}%`} destacado sub="Vulnerabilidad proyectada" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Monitoreo Actual" valor={nivelMonitoreo} sub="Capacidad declarada" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Cobertura Estimada" valor={`${cobertura}%`} sub="Activos bajo supervisión" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Prioridad Estratégica" valor="Alta" sub="Protección crítica" />
      </BentoItem>

      {/* 6 Prioridades de Protección */}
      <BentoItem size="lg">
        <Card titulo="Prioridades de Blindaje y Protección">
          <BarList items={prioridadesProteccion} />
        </Card>
      </BentoItem>

      {/* Círculos de Cobertura y Exposición */}
      <BentoItem size="k3">
        <Card titulo="Cobertura del SOC">
          <div style={{ padding: '12px 0' }}>
            <Gauge valor={cobertura} etiqueta="Cobertura" />
          </div>
        </Card>
      </BentoItem>

      <BentoItem size="k3">
        <Card titulo="Nivel de Exposición">
          <div style={{ padding: '12px 0' }}>
            <Gauge valor={exposicion} etiqueta="Exposición" />
          </div>
        </Card>
      </BentoItem>

      {/* Agentes */}
      <BentoItem size="md">
        <AgentesPanel agentes={info.agentes} />
      </BentoItem>

      {/* 11 Servicios */}
      <BentoItem size="xl">
        <ServiciosList servicios={info.servicios} titulo="Servicios del SOC IA y Ciberseguridad" />
      </BentoItem>
    </>
  );
}
