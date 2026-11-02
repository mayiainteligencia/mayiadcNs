import { useExplorer } from './ExplorerContext';
import { AgentesPanel, KpiBadge, ModuloHeader, ServiciosList } from './compartido/ExplorerShared';
import { MODULOS } from '../../domain/explorer/modulos';
import { BentoItem } from '../../ui/layouts/BentoGrid';
import { BarChart } from '../../ui/charts/charts';
import { Card } from '../../ui/widgets';

export function ModuloNube({ onNavegar }: { onNavegar: (ruta: string) => void }) {
  const { respuestas } = useExplorer();
  const info = MODULOS[2];

  // Regla de nube sugerida
  const residencia = respuestas[3];
  let nubeSugerida = 'FLAI Soberana';
  if (residencia === 'onprem') nubeSugerida = 'Híbrida';
  else if (residencia === 'nube_publica') nubeSugerida = 'Híbrida soberana';

  // Barras de capacidad (Hoy 60, +3m 72, +6m 85, +12m 94)
  const datosCapacidad = [
    { label: 'Hoy', valores: [60] },
    { label: '+3 meses', valores: [72] },
    { label: '+6 meses', valores: [85] },
    { label: '+12 meses', valores: [94] },
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
        <KpiBadge etiqueta="Nube Sugerida" valor={nubeSugerida} destacado sub="Arquitectura recomendada" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Capacidad Preparada" valor="Tier III+" sub="Ultra baja latencia" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Ahorro Operativo" valor="32%" sub="Optimización FinOps" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Control de Datos" valor="100% Soberano" sub="Jurisdicción local" />
      </BentoItem>

      {/* Gráfica de Capacidad */}
      <BentoItem size="lg">
        <Card titulo="Proyección de Capacidad y Cargas de Trabajo (Cómputo & IA)">
          <div style={{ height: '260px' }}>
            <BarChart data={datosCapacidad} formato={v => `${v}%`} series={['Capacidad Operativa']} />
          </div>
        </Card>
      </BentoItem>

      {/* Agentes */}
      <BentoItem size="lg">
        <AgentesPanel agentes={info.agentes} />
      </BentoItem>

      {/* 10 Servicios */}
      <BentoItem size="full">
        <ServiciosList servicios={info.servicios} titulo="Servicios de Nube Soberana, IaaS y FLAI" />
      </BentoItem>
    </>
  );
}
