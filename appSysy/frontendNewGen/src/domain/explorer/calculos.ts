import { PREGUNTAS } from './catalogo';
import type { KpisCalculados, PrioridadId } from './types';

export function obtenerPuntaje(respuestas: Record<number, string>, idPregunta: number): number {
  const opcionId = respuestas[idPregunta];
  if (!opcionId) return 50; // Respuesta sin contestar: vale 50 puntos
  const pregunta = PREGUNTAS.find(p => p.id === idPregunta);
  if (!pregunta) return 50;
  const opcion = pregunta.opciones.find(o => o.id === opcionId);
  return opcion?.puntaje ?? 50;
}

export function calcularKPIs(respuestas: Record<number, string>, prioridad?: PrioridadId): KpisCalculados {
  const sistemas = obtenerPuntaje(respuestas, 4);
  const respaldos = obtenerPuntaje(respuestas, 5);
  const op247 = obtenerPuntaje(respuestas, 6);
  const nube = obtenerPuntaje(respuestas, 7);
  const ciber = obtenerPuntaje(respuestas, 8);
  const ia = obtenerPuntaje(respuestas, 9);
  const datos = obtenerPuntaje(respuestas, 10);

  // Fórmulas especificadas
  const madurez = Math.round((datos + nube + ciber + ia) / 4);
  const continuidad = Math.round((respaldos + op247 + sistemas) / 3);
  const valorDato = Math.round((datos + ia) / 2);

  const riesgoNum = Math.round((100 - ciber + (100 - respaldos)) / 2);
  let riesgo: 'Bajo' | 'Medio' | 'Alto' = 'Alto';
  if (riesgoNum < 35) riesgo = 'Bajo';
  else if (riesgoNum < 65) riesgo = 'Medio';

  const promedioGeneral = (madurez + valorDato + continuidad) / 3;
  const roiCalculado = (promedioGeneral - 50) / 2.8 + 10;
  const roi = Math.max(6, Math.round(roiCalculado * 10) / 10);

  // Servicios recomendados:
  // Parte de 3 y suma 1 por cada puntaje (ciber, respaldos, IA, nube) bajo 60,
  // más 1 si la prioridad es IA o ROI, con tope de 8.
  let cuentaServicios = 3;
  if (ciber < 60) cuentaServicios += 1;
  if (respaldos < 60) cuentaServicios += 1;
  if (ia < 60) cuentaServicios += 1;
  if (nube < 60) cuentaServicios += 1;
  if (prioridad === 'ia' || prioridad === 'roi') cuentaServicios += 1;
  cuentaServicios = Math.min(8, Math.max(3, cuentaServicios));

  // Lista de textos específicos de servicios recomendados según puntajes
  const lista: string[] = [];
  if (respaldos < 70) lista.push('DRP y Backup gestionado');
  if (ciber < 70) lista.push('SOC IA y Ciberseguridad');
  if (nube < 75) lista.push('Nube FLAI / Arquitectura híbrida');
  if (op247 < 70) lista.push('NOC 24/7 y SLA');
  if (datos < 70) lista.push('Gobierno de datos');
  if (ia < 80) lista.push('AI Factory y agentes de IA');

  // Si quedan menos de 3, agregar Business Case ejecutivo u otros
  if (lista.length < 3) {
    if (!lista.includes('Business Case ejecutivo')) lista.push('Business Case ejecutivo');
    if (!lista.includes('Arquitectura de Alta Disponibilidad')) lista.push('Arquitectura de Alta Disponibilidad');
    if (!lista.includes('Optimización FinOps')) lista.push('Optimización FinOps');
  }

  // Ajustar al número calculado
  const serviciosRecomendados = lista.slice(0, cuentaServicios);

  return {
    madurez,
    riesgo,
    riesgoNum,
    continuidad,
    valorDato,
    roi,
    serviciosRecomendadosCount: cuentaServicios,
    serviciosRecomendados,
  };
}
