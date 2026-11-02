import { useEffect, useState } from 'react';
import { CalendarDays, LogOut, Moon, Sun } from 'lucide-react';
import type { Sesion } from '../../domain/auth/types';
import { buscarDestino, destinosDe, SECCIONES_POR_ROL } from '../../domain/navegacion/secciones';
import { NOTIFICACIONES_MOCK } from '../../infrastructure/notificaciones/notificacionesMock';
import { ExplorerProvider } from '../explorer/ExplorerContext';
import { MayiaChat } from '../asistente/MayiaChat';
import { VISTAS } from '../vistas/registro';
import { BentoGrid } from '../../ui/layouts/BentoGrid';
import { DashboardLayout } from '../../ui/layouts/DashboardLayout';
import { branding } from '../../ui/theme/branding';
import { useTema } from '../../ui/theme/useTema';
import { Avatar, Chip, IconButton, MayiaOrb, NotificationsMenu, SearchBox, Tabs, ToastProvider } from '../../ui/widgets';
import { ModuloCierre } from '../explorer/compartido/ExplorerShared';

interface Props { sesion: Sesion; onSalir?: () => void }

const fecha = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });

/** Contenedor principal de DC Inteligente: cabecera, sidebar, bento grid y asistente MAYIA. */
export function Shell({ sesion, onSalir }: Props) {
  const { tema, alternar } = useTema();
  const secciones = SECCIONES_POR_ROL[sesion.rol] ?? SECCIONES_POR_ROL.ceo;
  const destinos = destinosDe(secciones);
  const [seccionId, setSeccionId] = useState(secciones[0].id);
  const [subId, setSubId] = useState(secciones[0].subsecciones[0]?.id ?? '');
  const [mayiaAbierta, setMayiaAbierta] = useState(false);
  const seccion = secciones.find(s => s.id === seccionId) ?? secciones[0];
  const Vista = VISTAS[seccion.id] ?? VISTAS.explorer;
  const esModulo = seccion.id.startsWith('explorer') && !['explorer', 'explorerWizard'].includes(seccion.id);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [seccion.id]);

  const navegar = (destino: string) => {
    const [s, sub] = destino.split(':');
    const sec = secciones.find(x => x.id === s);
    if (!sec) return;
    setSeccionId(sec.id);
    setSubId(sub ?? sec.subsecciones[0]?.id ?? '');
  };

  // Color de acento para Canvas de MAYIA
  const acento = tema === 'oscuro' ? branding.marca.neonVerde : branding.marca.esmeralda;

  return (
    <ExplorerProvider>
      <ToastProvider>
        <DashboardLayout
          items={secciones}
          activo={seccion.id}
          titulo={seccion.titulo}
          onNavegar={navegar}
          buscador={<SearchBox placeholder="Buscar módulo o servicio…" buscar={q => buscarDestino(destinos, q)} onElegir={navegar} />}
          subnav={seccion.subsecciones.length > 0 && <Tabs items={seccion.subsecciones} activo={subId} onChange={setSubId} />}
          acciones={<>
            <span className="dash__ocultar-movil"><Chip icono={<CalendarDays size={14} />}>{fecha}</Chip></span>
            <MayiaOrb acento={acento} onClick={() => setMayiaAbierta(true)} />
            <IconButton label={tema === 'claro' ? 'Modo oscuro' : 'Modo claro'} onClick={alternar}>
              {tema === 'claro' ? <Moon size={18} /> : <Sun size={18} />}
            </IconButton>
            <NotificationsMenu items={NOTIFICACIONES_MOCK} />
            <span className="dash__ocultar-movil">
              <Avatar iniciales="DC" titulo="DC Inteligente · Sesión Ejecutiva" />
            </span>
            {onSalir && <IconButton label="Salir" onClick={onSalir}><LogOut size={18} /></IconButton>}
          </>}
        >
          <BentoGrid auto>
            {Vista && <Vista key={`${seccion.id}:${subId}`} subId={subId} rol={sesion.rol} onNavegar={navegar} onAbrirMayia={() => setMayiaAbierta(true)} />}
            {esModulo && <ModuloCierre ruta={seccion.id} onNavegar={navegar} />}
          </BentoGrid>
        </DashboardLayout>
        <MayiaChat
          abierto={mayiaAbierta}
          onCerrar={() => setMayiaAbierta(false)}
          secciones={destinos}
          onNavegar={navegar}
          acento={acento}
          nombre="MAYIA"
        />
      </ToastProvider>
    </ExplorerProvider>
  );
}
