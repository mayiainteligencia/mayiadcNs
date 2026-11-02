import { describe, expect, it } from 'vitest';
import { calcularKPIs, obtenerPuntaje } from './calculos';

describe('Cálculos del Explorer - DC Inteligente', () => {
  it('aplica 50 puntos a preguntas no contestadas', () => {
    const respuestasVacias = {};
    expect(obtenerPuntaje(respuestasVacias, 4)).toBe(50);
    expect(obtenerPuntaje(respuestasVacias, 8)).toBe(50);
  });

  it('calcula KPIs con respuestas por omisión', () => {
    const respuestas = {
      4: 'parcial', // 55
      5: 'parcial', // 55
      6: 'si_247',  // 85
      7: 'hibrida', // 85
      8: 'parcial', // 55
      9: 'evaluando', // 60
      10: 'parcial', // 60
    };

    const kpis = calcularKPIs(respuestas, 'proteger_datos');

    // Madurez = (datos + nube + ciber + ia) / 4 = (60 + 85 + 55 + 60) / 4 = 65
    expect(kpis.madurez).toBe(65);

    // Continuidad = (respaldos + op247 + sistemas) / 3 = (55 + 85 + 55) / 3 = 65
    expect(kpis.continuidad).toBe(65);

    // Valor del dato = (datos + ia) / 2 = (60 + 60) / 2 = 60
    expect(kpis.valorDato).toBe(60);

    // Riesgo = (100 - 55 + 100 - 55) / 2 = 45 -> 'Medio'
    expect(kpis.riesgoNum).toBe(45);
    expect(kpis.riesgo).toBe('Medio');

    // ROI = ((madurez + valorDato + continuidad) / 3 - 50) / 2.8 + 10
    // Promedio = 63.33 -> (13.33 / 2.8) + 10 = ~14.8x
    expect(kpis.roi).toBeGreaterThanOrEqual(6);

    // Servicios entre 3 y 8
    expect(kpis.serviciosRecomendadosCount).toBeGreaterThanOrEqual(3);
    expect(kpis.serviciosRecomendadosCount).toBeLessThanOrEqual(8);
  });

  it('respeta el piso mínimo de 6 para el ROI incluso en escenarios muy bajos', () => {
    const respuestasBajas = {
      4: 'no', // 25
      5: 'no', // 20
      6: 'no_247', // 40
      7: 'no_se', // 35
      8: 'no', // 25
      9: 'no', // 30
      10: 'no', // 30
    };

    const kpis = calcularKPIs(respuestasBajas, 'costos');
    expect(kpis.roi).toBe(6);
    expect(kpis.riesgo).toBe('Alto');
  });

  it('agrega servicio extra si la prioridad es IA o ROI', () => {
    const respuestas = {
      4: 'si_total', // 85
      5: 'si_probado', // 90
      6: 'si_247', // 85
      7: 'hibrida', // 85
      8: 'si_soc', // 85
      9: 'si_prod', // 90
      10: 'si_organizados', // 90
    };

    const kpisBase = calcularKPIs(respuestas, 'nube');
    const kpisIA = calcularKPIs(respuestas, 'ia');
    expect(kpisIA.serviciosRecomendadosCount).toBe(kpisBase.serviciosRecomendadosCount + 1);
  });
});
