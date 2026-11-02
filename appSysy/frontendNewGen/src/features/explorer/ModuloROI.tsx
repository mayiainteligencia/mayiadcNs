import { useExplorer } from './ExplorerContext';
import { AgentesPanel, KpiBadge, ModuloHeader, ServiciosList } from './compartido/ExplorerShared';
import { MODULOS } from '../../domain/explorer/modulos';
import { BentoItem } from '../../ui/layouts/BentoGrid';
import { BarList } from '../../ui/charts/charts';
import { Card } from '../../ui/widgets';

export function ModuloROI({ onNavegar }: { onNavegar: (ruta: string) => void }) {
  const { kpis, perfil } = useExplorer();
  const info = MODULOS[7];

  // 4 Bloques cuantitativos
  const reduccionRiesgo = kpis.riesgo === 'Alto' ? '-45%' : kpis.riesgo === 'Medio' ? '-28%' : '-12%';
  const eficienciaPotencial = `${Math.round(kpis.madurez / 4)}%`;
  const valorDatosTexto = kpis.valorDato >= 70 ? 'Alto potencial de monetización' : kpis.valorDato >= 45 ? 'Moderado con necesidad de gobierno' : 'En desarrollo inicial';
  const inversionSugerida =
    kpis.serviciosRecomendadosCount <= 3 ? 'Focal (Quick-Wins)' : kpis.serviciosRecomendadosCount <= 5 ? 'Modular (Fase 1 y 2)' : 'Programa Integral de Transformación';

  const tiempoImplementacion = kpis.serviciosRecomendadosCount <= 4 ? '3 a 6 meses' : '6 a 9 meses';

  // 3 Escenarios de ROI (Barras horizontales)
  const escenariosROI = [
    {
      label: 'Escenario 1: Protección & Continuidad Crítica',
      valor: Math.max(6, Math.round((kpis.roi - 4) * 10) / 10),
      texto: `${Math.max(6, Math.round((kpis.roi - 4) * 10) / 10)}x ROI`,
    },
    {
      label: 'Escenario 2: Nube Soberana & NOC/SOC 24/7',
      valor: kpis.roi,
      texto: `${kpis.roi}x ROI`,
    },
    {
      label: 'Escenario 3: AI Factory & Automatización de Datos',
      valor: Math.round((kpis.roi + 8) * 10) / 10,
      texto: `${Math.round((kpis.roi + 8) * 10) / 10}x ROI`,
    },
  ];

  return (
    <>
      <ModuloHeader
        numero={info.numero}
        titulo={info.titulo}
        deQueTrata={`Business case estratégico formulado para la perspectiva de ${perfil.titulo}: ${perfil.mensaje}.`}
        onVolver={() => onNavegar('explorer')}
        onDiagnostico={() => onNavegar('explorerWizard')}
      />

      {/* 4 Badges */}
      <BentoItem size="k3">
        <KpiBadge etiqueta="ROI Preliminar" valor={`${kpis.roi}x`} destacado sub="Retorno mínimo estimado" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Riesgo Mitigado" valor={reduccionRiesgo} sub="Reducción de pérdidas" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Tiempo Implementación" valor={tiempoImplementacion} sub="Entrega por etapas" />
      </BentoItem>
      <BentoItem size="k3">
        <KpiBadge etiqueta="Servicios Priorizados" valor={String(kpis.serviciosRecomendadosCount)} sub="Plan de acción sugerido" />
      </BentoItem>

      {/* 4 Bloques de Análisis */}
      <BentoItem size="full">
        <Card titulo={`Perspectiva Financiera y Operativa para ${perfil.titulo}`}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'var(--surface2)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>1. RIESGO REDUCIDO</span>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)', margin: '4px 0' }}>{reduccionRiesgo}</div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Mitigación de costos por inactividad no programada y brechas de seguridad.</span>
            </div>

            <div style={{ background: 'var(--surface2)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>2. EFICIENCIA POTENCIAL</span>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)', margin: '4px 0' }}>{eficienciaPotencial}</div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ahorro estimado en gastos operativos por automatización y optimización FinOps.</span>
            </div>

            <div style={{ background: 'var(--surface2)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>3. VALOR DE DATOS</span>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', margin: '8px 0' }}>{valorDatosTexto}</div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Índice de aprovechamiento corporativo de los activos de información.</span>
            </div>

            <div style={{ background: 'var(--surface2)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>4. INVERSIÓN SUGERIDA</span>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent)', margin: '8px 0' }}>{inversionSugerida}</div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Modelo de contratación recomendado según complejidad y requerimientos.</span>
            </div>
          </div>
        </Card>
      </BentoItem>

      {/* Gráfica de 3 Escenarios de ROI */}
      <BentoItem size="lg">
        <Card titulo="Escenarios de Retorno de Inversión (ROI)">
          <BarList items={escenariosROI} />
        </Card>
      </BentoItem>

      {/* Agentes */}
      <BentoItem size="lg">
        <AgentesPanel agentes={info.agentes} />
      </BentoItem>

      {/* Servicios recomendados personalizados */}
      <BentoItem size="full">
        <ServiciosList servicios={kpis.serviciosRecomendados} titulo="Servicios Recomendados en su Business Case" />
      </BentoItem>
    </>
  );
}
