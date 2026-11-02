import type { ReactNode } from 'react';
import './BentoGrid.css';

/** Tamaños en rejilla de 12 columnas (escritorio). En tablet pasa a 6 y en móvil a 1 columna.
 *  k2 = 6 por fila, k3 = 4 por fila (útiles en modo `auto`). */
export type TamanoBento = 'k2' | 'k3' | 'kpi' | 'sm' | 'md' | 'wide' | 'lg' | 'xl' | 'side' | 'tall' | 'full' | 'huge' | 'bar' | 'strip' | 'third' | 'twothirds';

/** `auto`: las filas se ajustan al contenido (modo landing); sin `auto` las celdas tienen alto fijo (modo dashboard). */
export const BentoGrid = ({ children, auto }: { children: ReactNode; auto?: boolean }) => (
  <div className={`bento ${auto ? 'bento--auto' : ''}`}>{children}</div>
);

/** Todo widget del dashboard se monta dentro de un BentoItem: el tamaño decide cómo se adapta. */
export const BentoItem = ({ size = 'md', children }: { size?: TamanoBento; children: ReactNode }) => (
  <div className={`bento__item bento--${size}`}>{children}</div>
);
