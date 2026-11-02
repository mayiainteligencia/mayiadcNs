import { CheckCircle2 } from 'lucide-react';
import { useExplorer } from './ExplorerContext';
import { AgentesPanel, ModuloHeader, ServiciosList } from './compartido/ExplorerShared';
import { MODULOS } from '../../domain/explorer/modulos';
import { obtenerPuntaje } from '../../domain/explorer/calculos';
import { BentoItem } from '../../ui/layouts/BentoGrid';
import { RadarChart } from '../../ui/charts/charts';
import { Card } from '../../ui/widgets';

export function ModuloValorDato({ onNavegar }: { onNavegar: (ruta: string) => void }) {
  const { respuestas, kpis } = useExplorer();
  const info = MODULOS[1];

  const pCiber = obtenerPuntaje(respuestas, 8);
  const pCont = obtenerPuntaje(respuestas, 6);
  const pDatos = obtenerPuntaje(respuestas, 10);
  const pIA = obtenerPuntaje(respuestas, 9);
  const pValor = Math.min(100, Math.round(kpis.valorDato * 1.05));

  const radarData = [
    { dimension: 'Protección', valor: pCiber },
    { dimension: 'Disponibilidad', valor: pCont },
    { dimension: 'Organización', valor: pDatos },
    { dimension: 'Inteligencia', valor: pIA },
    { dimension: 'Valor de Negocio', valor: pValor },
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

      {/* Radar de 5 dimensiones */}
      <BentoItem size="lg">
        <Card titulo="Madurez del Dato (Radar 5 Dimensiones)">
          <div style={{ padding: '8px 0', display: 'flex', justifyContent: 'center' }}>
            <RadarChart data={radarData} size={320} />
          </div>
        </Card>
      </BentoItem>

      {/* Beneficios Estratégicos */}
      <BentoItem size="lg">
        <Card titulo="Beneficios del Dato como Activo de Negocio">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(info.beneficios ?? []).map((b, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  background: 'var(--surface2)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                }}
              >
                <CheckCircle2 size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 500 }}>{b}</span>
              </div>
            ))}
          </div>
        </Card>
      </BentoItem>

      {/* Agentes Especializados */}
      <BentoItem size="md">
        <AgentesPanel agentes={info.agentes} />
      </BentoItem>

      {/* Servicios del Módulo */}
      <BentoItem size="xl">
        <ServiciosList servicios={info.servicios} />
      </BentoItem>
    </>
  );
}
