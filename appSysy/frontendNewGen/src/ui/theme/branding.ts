// ÚNICO archivo de marca: cambia colores y tipografía aquí y toda la UI se actualiza.
// Alianza estratégica: MAYIA × NextStream
// "El centro de datos más inteligente de México y Latinoamérica"
export const branding = {
  nombre: 'MAYIA DATACENTER × NextStream',
  claim: 'El centro de datos más inteligente de México y Latinoamérica',
  fuentes: {
    titulo: "'Poppins', sans-serif",
    cuerpo: "'Poppins', 'Inter', sans-serif",
  },
  marca: {
    neonVerde: '#00E599',
    neonHover: '#10F4A6',
    esmeralda: '#059669',
    azulNext: '#0070F3',
    azulCiber: '#00D2FF',
    ambarAviso: '#F59E0B',
    negroFondo: '#0A0E14',
    blanco: '#FFFFFF',
  },
  temas: {
    // Claro: base platino ejecutiva, tarjetas blancas y acentos azul/esmeralda
    claro: {
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      surface2: '#F1F5F9',
      text: '#0F172A',
      textMuted: '#64748B',
      title: '#0F172A',
      border: 'rgba(15, 23, 42, 0.09)',
      accent: '#059669',
      accentHover: '#047857',
      accentBlue: '#0070F3',
      accentCyan: '#0284C7',
      accentAmber: '#D97706',
      onAccent: '#FFFFFF',
      sidebarBg: '#FFFFFF',
      sidebarText: '#475569',
      sidebarActiveText: '#059669',
      // Paleta de gráficas: esmeralda Mayia, azul NextStream, cian, ámbar, índigo
      serie1: '#059669',
      serie2: '#0070F3',
      serie3: '#0284C7',
      serie4: '#D97706',
      serie5: '#6366F1',
      serie6: '#64748B',
    },
    // Oscuro: titanio oceánico profundo, superficies ricas, títulos blancos y acentos menta/azul
    oscuro: {
      bg: '#0A0E14',
      surface: '#111722',
      surface2: '#182232',
      text: '#F8FAFC',
      textMuted: '#94A3B8',
      title: '#FFFFFF',
      border: 'rgba(255, 255, 255, 0.08)',
      accent: '#00E599',
      accentHover: '#10F4A6',
      accentBlue: '#0070F3',
      accentCyan: '#00D2FF',
      accentAmber: '#F59E0B',
      onAccent: '#03190E',
      sidebarBg: '#070A0F',
      sidebarText: '#94A3B8',
      sidebarActiveText: '#00E599',
      // Paleta de gráficas: menta Mayia, azul NextStream, cian ciber, ámbar, violeta tech
      serie1: '#00E599',
      serie2: '#0070F3',
      serie3: '#00D2FF',
      serie4: '#F59E0B',
      serie5: '#8B5CF6',
      serie6: '#94A3B8',
    },
  },
} as const;

const kebab = (k: string) => k.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
const bloque = (sel: string, t: Record<string, string>) =>
  `${sel}{${Object.entries(t).map(([k, v]) => `--${kebab(k)}:${v};`).join('')}}`;

/** Inyecta la marca como variables CSS. [data-theme] en cualquier elemento fuerza ese tema localmente. */
export function aplicarBranding() {
  const { fuentes, temas } = branding;
  const css =
    `:root{--font-title:${fuentes.titulo};--font-body:${fuentes.cuerpo};}` +
    bloque(':root, [data-theme="claro"]', temas.claro) +
    bloque('[data-theme="oscuro"]', temas.oscuro);
  let el = document.getElementById('branding') as HTMLStyleElement | null;
  if (!el) { el = document.createElement('style'); el.id = 'branding'; document.head.appendChild(el); }
  el.textContent = css;
}
