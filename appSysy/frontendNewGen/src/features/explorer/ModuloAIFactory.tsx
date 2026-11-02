import { Bot, Cpu, Sparkles } from 'lucide-react';
import { useExplorer } from './ExplorerContext';
import { AgentesPanel, KpiBadge, ModuloHeader, ServiciosList } from './compartido/ExplorerShared';
import { MODULOS } from '../../domain/explorer/modulos';
import { BentoItem } from '../../ui/layouts/BentoGrid';
import { Card } from '../../ui/widgets';

export function ModuloAIFactory({ onNavegar }: { onNavegar: (ruta: string) => void }) {
  const { kpis } = useExplorer();
  const info = MODULOS[6];

  // 7 Casos de uso por área
  const casosDeUso = [
    { area: 'Dirección General', caso: 'AI Decision Room', desc: 'Simulación de escenarios estratégicos y síntesis ejecutiva en tiempo real.' },
    { area: 'Finanzas & Tesorería', caso: 'Forecasting & Detección de Anomalías', desc: 'Predicción de flujo de caja y auditoría continua de transacciones.' },
    { area: 'Operaciones & Infraestructura', caso: 'Mantenimiento Predictivo', desc: 'Anticipación de fallas en servidores, red y consumo energético.' },
    { area: 'Comercial & Ventas', caso: 'Lead Scoring & Churn Predictivo', desc: 'Priorización inteligente de oportunidades y retención de clientes clave.' },
    { area: 'Recursos Humanos', caso: 'Análisis de Rotación & Skills Mapping', desc: 'Gestión de talento, mapeo de habilidades y clima laboral asistido.' },
    { area: 'Legal & Cumplimiento', caso: 'RAG Contractual & Auditoría', desc: 'Búsqueda semántica, revisión de cláusulas y alertas normativas.' },
    { area: 'Ciberseguridad', caso: 'Correlación de Eventos con IA', desc: 'Detección de patrones de ataque sigilosos y respuesta automatizada.' },
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
        <KpiBadge etiqueta="AI Readiness" valor={`${kpis.valorDato}%`} destacado sub="Nivel de preparación de datos" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="ROI Proyectado" valor={`${kpis.roi}x`} sub="Retorno en iniciativas de IA" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Casos de Uso" valor="7 Áreas" sub="Mapeados y priorizados" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Agentes Recomendados" valor="3 Agentes" sub="Arquitectura lista para despliegue" />
      </BentoItem>

      {/* Casos de Uso por Área */}
      <BentoItem size="lg">
        <Card titulo="7 Casos de Uso de IA por Área Corporativa">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {casosDeUso.map(c => (
              <div
                key={c.area}
                style={{
                  background: 'var(--surface2)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {c.area}
                </span>
                <strong style={{ fontSize: '14px', color: 'var(--text)' }}>{c.caso}</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{c.desc}</span>
              </div>
            ))}
          </div>
        </Card>
      </BentoItem>

      {/* Agentes */}
      <BentoItem size="lg">
        <AgentesPanel agentes={info.agentes} />
      </BentoItem>

      {/* 12 Servicios */}
      <BentoItem size="full">
        <ServiciosList servicios={info.servicios} titulo="Servicios de la AI Factory (Desde PoC hasta Producción)" />
      </BentoItem>
    </>
  );
}
