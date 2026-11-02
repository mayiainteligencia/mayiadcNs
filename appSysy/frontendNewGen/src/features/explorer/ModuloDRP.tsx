import { CheckCircle2 } from 'lucide-react';
import { useExplorer } from './ExplorerContext';
import { AgentesPanel, KpiBadge, ModuloHeader, ServiciosList } from './compartido/ExplorerShared';
import { MODULOS } from '../../domain/explorer/modulos';
import { BentoItem } from '../../ui/layouts/BentoGrid';
import { Gauge } from '../../ui/charts/charts';
import { Card } from '../../ui/widgets';

export function ModuloDRP({ onNavegar }: { onNavegar: (ruta: string) => void }) {
  const { respuestas, kpis } = useExplorer();
  const info = MODULOS[5];

  // Regla RTO/RPO según pregunta 5
  const respDRP = respuestas[5];
  let rto = '12 horas', rpo = '4 horas', madurezDRP = 'Media';
  if (respDRP === 'si_probado') {
    rto = '4 horas';
    rpo = '15 minutos';
    madurezDRP = 'Avanzada';
  } else if (respDRP === 'no') {
    rto = '48 horas';
    rpo = '24 horas';
    madurezDRP = 'Inicial / Crítico';
  }

  // 5 Pasos metodológicos
  const rutaPasos = [
    { num: '01', titulo: 'BIA (Business Impact Analysis)', desc: 'Identificación de procesos y sistemas de misión crítica.' },
    { num: '02', titulo: 'Política de Respaldo Inmutable', desc: 'Definición de ventanas de backup y almacenamiento en bóveda segura.' },
    { num: '03', titulo: 'Arquitectura DRP / DRaaS', desc: 'Replicación continua en centro de datos alterno georredundante.' },
    { num: '04', titulo: 'Pruebas de Recuperación y Conmutación', desc: 'Simulacros periódicos controlados sin afectación operativa.' },
    { num: '05', titulo: 'Plan Ejecutivo y Procedimientos', desc: 'Manuales de crisis, roles de mando y certificación de continuidad.' },
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

      {/* Badges de RTO/RPO */}
      <BentoItem size="k3">
        <KpiBadge etiqueta="RTO Proyectado" valor={rto} destacado sub="Tiempo máximo de recuperación" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="RPO Proyectado" valor={rpo} sub="Pérdida máxima de datos admisible" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Madurez DRP" valor={madurezDRP} sub="Estado del plan de contingencia" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Resiliencia Multisede" valor="Activa" sub="Replicación georredundante" />
      </BentoItem>

      {/* Ruta de 5 pasos */}
      <BentoItem size="lg">
        <Card titulo="Ruta Metodológica de Continuidad y DRP">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {rutaPasos.map(paso => (
              <div
                key={paso.num}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '12px 14px',
                  background: 'var(--surface2)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-title)', marginTop: '2px' }}>
                  {paso.num}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--text)' }}>{paso.titulo}</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{paso.desc}</span>
                </div>
              </div>
            ))}
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
        <Card titulo="Madurez DRP">
          <div style={{ padding: '12px 0' }}>
            <Gauge valor={respDRP === 'si_probado' ? 90 : respDRP === 'no' ? 25 : 60} etiqueta="Madurez DRP" />
          </div>
        </Card>
      </BentoItem>

      {/* Agentes */}
      <BentoItem size="md">
        <AgentesPanel agentes={info.agentes} />
      </BentoItem>

      {/* 11 Servicios */}
      <BentoItem size="xl">
        <ServiciosList servicios={info.servicios} titulo="Servicios de DRP, Backup y Continuidad de Negocio" />
      </BentoItem>
    </>
  );
}
