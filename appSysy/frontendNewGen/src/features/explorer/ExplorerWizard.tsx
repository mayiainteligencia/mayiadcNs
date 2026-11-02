import { useState, type FormEvent } from 'react';
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, FileText,
  RotateCcw, Send, ShieldAlert, Sparkles, UserCheck, X
} from 'lucide-react';
import { useExplorer } from './ExplorerContext';
import { PERFILES, PREGUNTAS, PRIORIDADES } from '../../domain/explorer/catalogo';
import type { PerfilId, PrioridadId } from '../../domain/explorer/types';
import { BentoItem } from '../../ui/layouts/BentoGrid';
import { Gauge } from '../../ui/charts/charts';
import { Card, KpiCard, Modal } from '../../ui/widgets';
import './ExplorerWizard.css';

interface Props {
  onNavegar: (ruta: string) => void;
}

export function ExplorerWizard({ onNavegar }: Props) {
  const {
    perfilId,
    perfil,
    setPerfilId,
    prioridadId,
    prioridad,
    setPrioridadId,
    respuestas,
    setRespuesta,
    marcarDiagnostico,
    guardarLead,
    kpis,
  } = useExplorer();

  // Pasos: 1 Perfil, 2 Prioridad, 3 Preguntas (con subpaso 0..9), 4 Resultado, 5 Contacto
  const [paso, setPaso] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [preguntaIdx, setPreguntaIdx] = useState(0);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);

  // Formulario de contacto
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cargo, setCargo] = useState(perfil.titulo);
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tamano, setTamano] = useState('');
  const [comentarios, setComentarios] = useState('');

  // Pregunta actual del paso 3
  const preguntaActual = PREGUNTAS[preguntaIdx];
  const totalPreguntas = PREGUNTAS.length;
  const progresoPct = Math.round(((preguntaIdx + 1) / totalPreguntas) * 100);

  // Industria precargada de pregunta 1
  const opcionIndustria = PREGUNTAS[0].opciones.find(o => o.id === respuestas[1]);
  const industriaPrecargada = opcionIndustria?.texto ?? 'Tecnología / Servicios';

  const avanzarPregunta = () => {
    if (preguntaIdx < totalPreguntas - 1) {
      setPreguntaIdx(i => i + 1);
    } else {
      marcarDiagnostico();
      setPaso(4);
    }
  };

  const retrocederPregunta = () => {
    if (preguntaIdx > 0) {
      setPreguntaIdx(i => i - 1);
    } else {
      setPaso(2);
    }
  };

  const enviarContacto = (e: FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !empresa.trim() || !cargo.trim() || !correo.trim()) {
      alert('Por favor complete todos los campos obligatorios (*).');
      return;
    }

    guardarLead({
      nombre,
      empresa,
      cargo,
      correo,
      telefono,
      industria: industriaPrecargada,
      tamano,
      prioridad: prioridad.titulo,
      comentarios,
    });

    setModalConfirmacion(true);
  };

  const cerrarModalYVolver = () => {
    setModalConfirmacion(false);
    onNavegar('explorer');
  };

  return (
    <>
      {/* Cabecera del Wizard con indicador de paso */}
      <BentoItem size="full">
        <Card>
          <div className="wiz-header">
            <div className="wiz-header__top">
              <button className="wiz-header__back" onClick={() => onNavegar('explorer')}>
                <ArrowLeft size={16} />
                <span>Volver al Explorer</span>
              </button>
              <div className="wiz-steps">
                {[
                  { num: 1, label: 'Perfil' },
                  { num: 2, label: 'Prioridad' },
                  { num: 3, label: 'Diagnóstico' },
                  { num: 4, label: 'Resultado' },
                  { num: 5, label: 'Contacto' },
                ].map(s => (
                  <div
                    key={s.num}
                    className={`wiz-step ${paso === s.num ? 'is-active' : paso > s.num ? 'is-done' : ''}`}
                    onClick={() => {
                      if (paso > s.num) setPaso(s.num as any);
                    }}
                  >
                    <span className="wiz-step__circle">
                      {paso > s.num ? <Check size={12} /> : s.num}
                    </span>
                    <span className="wiz-step__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </BentoItem>

      {/* ================= PASO 1: PERFIL ================= */}
      {paso === 1 && (
        <BentoItem size="full">
          <Card>
            <div className="wiz-body">
              <span className="wiz-tag">PASO 1 DE 5</span>
              <h2 className="wiz-title">¿Qué rol mejor describe su posición?</h2>
              <p className="wiz-subtitle">
                Adaptamos las métricas, el lenguaje de negocio y las recomendaciones según sus responsabilidades ejecutivas.
              </p>

              <div className="wiz-perfiles-grid">
                {PERFILES.map(p => (
                  <div
                    key={p.id}
                    className={`wiz-perfil-card ${perfilId === p.id ? 'is-selected' : ''}`}
                    onClick={() => setPerfilId(p.id)}
                  >
                    <div className="wiz-perfil-card__top">
                      <strong className="wiz-perfil-card__title">{p.titulo}</strong>
                      {perfilId === p.id && <CheckCircle2 size={18} className="wiz-check" />}
                    </div>
                    <span className="wiz-perfil-card__sub">{p.subtitulo}</span>
                    <p className="wiz-perfil-card__msg">
                      <em>«{p.mensaje}»</em>
                    </p>
                  </div>
                ))}
              </div>

              <div className="wiz-footer">
                <button className="cta-btn" onClick={() => setPaso(2)}>
                  <span>Continuar a Prioridades</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </Card>
        </BentoItem>
      )}

      {/* ================= PASO 2: PRIORIDAD ================= */}
      {paso === 2 && (
        <BentoItem size="full">
          <Card>
            <div className="wiz-body">
              <span className="wiz-tag">PASO 2 DE 5</span>
              <h2 className="wiz-title">¿Cuál es su prioridad estratégica principal?</h2>
              <p className="wiz-subtitle">
                Seleccione el foco de mayor impacto para su operación tecnológica en los próximos 12 meses.
              </p>

              <div className="wiz-prioridades-grid">
                {PRIORIDADES.map(pr => (
                  <div
                    key={pr.id}
                    className={`wiz-prio-card ${prioridadId === pr.id ? 'is-selected' : ''}`}
                    onClick={() => setPrioridadId(pr.id)}
                  >
                    <div className="wiz-prio-card__top">
                      <strong className="wiz-prio-card__title">{pr.titulo}</strong>
                      {prioridadId === pr.id && <CheckCircle2 size={18} className="wiz-check" />}
                    </div>
                    <p className="wiz-prio-card__desc">{pr.descripcion}</p>
                  </div>
                ))}
              </div>

              <div className="wiz-footer wiz-footer--between">
                <button className="cta-btn cta-btn--sec" onClick={() => setPaso(1)}>
                  <ArrowLeft size={16} />
                  <span>Anterior</span>
                </button>
                <button className="cta-btn" onClick={() => { setPaso(3); setPreguntaIdx(0); }}>
                  <span>Iniciar Diagnóstico (10 Preguntas)</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </Card>
        </BentoItem>
      )}

      {/* ================= PASO 3: DIAGNÓSTICO (10 PREGUNTAS) ================= */}
      {paso === 3 && preguntaActual && (
        <BentoItem size="full">
          <Card>
            <div className="wiz-body">
              <div className="wiz-progress">
                <div className="wiz-progress__text">
                  <span className="wiz-tag">PREGUNTA {preguntaIdx + 1} DE {totalPreguntas}</span>
                  <span className="wiz-progress__pct">{progresoPct}% completado</span>
                </div>
                <div className="wiz-progress__bar">
                  <div className="wiz-progress__fill" style={{ width: `${progresoPct}%` }} />
                </div>
              </div>

              <h2 className="wiz-title">{preguntaActual.pregunta}</h2>
              <p className="wiz-subtitle">
                {preguntaActual.tienePuntaje
                  ? 'Esta respuesta califica los indicadores de continuidad, riesgo y madurez tecnológica.'
                  : 'Esta información contextualiza el dimensionamiento de arquitectura.'}
              </p>

              <div className="wiz-opciones-list">
                {preguntaActual.opciones.map(op => {
                  const elegida = respuestas[preguntaActual.id] === op.id;
                  return (
                    <div
                      key={op.id}
                      className={`wiz-opcion-item ${elegida ? 'is-selected' : ''}`}
                      onClick={() => setRespuesta(preguntaActual.id, op.id)}
                    >
                      <div className="wiz-opcion-item__radio">
                        {elegida && <div className="wiz-opcion-item__dot" />}
                      </div>
                      <span className="wiz-opcion-item__text">{op.texto}</span>
                      {op.puntaje !== undefined && (
                        <span className="wiz-opcion-item__score">
                          {op.puntaje >= 80 ? 'Nivel Alto' : op.puntaje >= 50 ? 'Nivel Medio' : 'Requiere Refuerzo'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="wiz-footer wiz-footer--between">
                <button className="cta-btn cta-btn--sec" onClick={retrocederPregunta}>
                  <ArrowLeft size={16} />
                  <span>Anterior</span>
                </button>
                <button className="cta-btn" onClick={avanzarPregunta}>
                  <span>{preguntaIdx === totalPreguntas - 1 ? 'Ver Resultado' : 'Siguiente'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </Card>
        </BentoItem>
      )}

      {/* ================= PASO 4: RESULTADO ================= */}
      {paso === 4 && (
        <>
          <BentoItem size="full">
            <Card>
              <div className="wiz-result-hero">
                <span className="wiz-tag">DIAGNÓSTICO EJECUTIVO PRELIMINAR</span>
                <h2 className="wiz-title">Su Ruta MAYIA DATACENTER Recomendada</h2>
                <div className="wiz-result-rol-box">
                  <strong>Como {perfil.titulo}:</strong>
                  <span> lo importante es enfocar la estrategia en <em>{perfil.mensaje}</em>.</span>
                </div>
              </div>
            </Card>
          </BentoItem>

          {/* 5 KPIs calculados */}
          <BentoItem size="k2">
            <KpiCard etiqueta="Madurez Digital" valor={`${kpis.madurez}%`} sub="Promedio estratégico" />
          </BentoItem>
          <BentoItem size="k2">
            <KpiCard etiqueta="Continuidad" valor={`${kpis.continuidad}%`} sub="Sistemas críticos & SLA" />
          </BentoItem>
          <BentoItem size="k2">
            <KpiCard etiqueta="Valor del Dato" valor={`${kpis.valorDato}%`} sub="Gobierno & IA" />
          </BentoItem>
          <BentoItem size="k2">
            <KpiCard
              etiqueta="Nivel de Riesgo"
              valor={kpis.riesgo}
              sub={`${kpis.riesgoNum}% índice crítico`}
              icono={<ShieldAlert size={20} />}
            />
          </BentoItem>
          <BentoItem size="k2">
            <KpiCard etiqueta="ROI Preliminar" valor={`${kpis.roi}x`} sub="Retorno mínimo estimado" />
          </BentoItem>
          <BentoItem size="k2">
            <KpiCard etiqueta="Servicios Clave" valor={String(kpis.serviciosRecomendadosCount)} sub="Recomendados para usted" />
          </BentoItem>

          {/* Servicios Recomendados */}
          <BentoItem size="lg">
            <Card titulo="Servicios Sugeridos según su Diagnóstico">
              <div className="wiz-services-list">
                {kpis.serviciosRecomendados.map((srv, i) => (
                  <div key={srv} className="wiz-srv-item">
                    <span className="wiz-srv-num">0{i + 1}</span>
                    <strong className="wiz-srv-name">{srv}</strong>
                    <span className="wiz-srv-badge">Prioridad Alta</span>
                  </div>
                ))}
              </div>
            </Card>
          </BentoItem>

          {/* Beneficios Ejecutivos */}
          <BentoItem size="lg">
            <Card titulo="Beneficios Ejecutivos Proyectados">
              <div className="wiz-benefits-list">
                {[
                  'Visibilidad ejecutiva de su infraestructura.',
                  'Reducción de riesgos críticos y brechas de seguridad.',
                  'Continuidad operativa garantizada con SLA 99.95%.',
                  'Decisiones estratégicas con datos confiables y soberanos.',
                  `Foco estratégico en: ${prioridad.titulo}.`,
                ].map((b, i) => (
                  <div key={i} className="wiz-benefit-item">
                    <CheckCircle2 size={18} className="wiz-check" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </Card>
          </BentoItem>

          {/* Botones de acción */}
          <BentoItem size="full">
            <Card>
              <div className="wiz-footer wiz-footer--between">
                <button
                  className="cta-btn cta-btn--sec"
                  onClick={() => { setPaso(3); setPreguntaIdx(0); }}
                >
                  <RotateCcw size={16} />
                  <span>Editar respuestas</span>
                </button>
                <button className="cta-btn" onClick={() => setPaso(5)}>
                  <Sparkles size={16} />
                  <span>Solicitar diagnóstico ejecutivo MAYIA DATACENTER</span>
                </button>
              </div>
            </Card>
          </BentoItem>
        </>
      )}

      {/* ================= PASO 5: CONTACTO ================= */}
      {paso === 5 && (
        <BentoItem size="full">
          <Card>
            <div className="wiz-body">
              <span className="wiz-tag">PASO 5 DE 5</span>
              <h2 className="wiz-title">Reciba su diagnóstico ejecutivo</h2>
              <p className="wiz-subtitle">
                Un especialista de la alianza estratégica MAYIA × NextStream preparará su business case personalizado y hoja de ruta tecnológica.
              </p>

              <form className="wiz-form" onSubmit={enviarContacto}>
                <div className="wiz-form__row">
                  <label className="wiz-field">
                    <span className="wiz-field__lbl">Nombre completo *</span>
                    <input
                      className="wiz-field__input"
                      required
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      placeholder="Ej. Ing. Roberto Mendoza"
                    />
                  </label>
                  <label className="wiz-field">
                    <span className="wiz-field__lbl">Empresa *</span>
                    <input
                      className="wiz-field__input"
                      required
                      value={empresa}
                      onChange={e => setEmpresa(e.target.value)}
                      placeholder="Ej. Grupo Financiero del Norte"
                    />
                  </label>
                </div>

                <div className="wiz-form__row">
                  <label className="wiz-field">
                    <span className="wiz-field__lbl">Cargo / Posición *</span>
                    <input
                      className="wiz-field__input"
                      required
                      value={cargo}
                      onChange={e => setCargo(e.target.value)}
                      placeholder="Ej. Director de Tecnología"
                    />
                  </label>
                  <label className="wiz-field">
                    <span className="wiz-field__lbl">Correo corporativo *</span>
                    <input
                      type="email"
                      className="wiz-field__input"
                      required
                      value={correo}
                      onChange={e => setCorreo(e.target.value)}
                      placeholder="nombre@empresa.com"
                    />
                  </label>
                </div>

                <div className="wiz-form__row">
                  <label className="wiz-field">
                    <span className="wiz-field__lbl">Teléfono de contacto</span>
                    <input
                      type="tel"
                      className="wiz-field__input"
                      value={telefono}
                      onChange={e => setTelefono(e.target.value)}
                      placeholder="+52 (55) 1234-5678"
                    />
                  </label>
                  <label className="wiz-field">
                    <span className="wiz-field__lbl">Industria</span>
                    <input
                      className="wiz-field__input"
                      readOnly
                      value={industriaPrecargada}
                    />
                  </label>
                </div>

                <div className="wiz-form__row">
                  <label className="wiz-field">
                    <span className="wiz-field__lbl">Tamaño de empresa</span>
                    <input
                      className="wiz-field__input"
                      value={tamano}
                      onChange={e => setTamano(e.target.value)}
                      placeholder="Ej. 250 a 1,000 empleados"
                    />
                  </label>
                  <label className="wiz-field">
                    <span className="wiz-field__lbl">Prioridad estratégica</span>
                    <input
                      className="wiz-field__input"
                      readOnly
                      value={prioridad.titulo}
                    />
                  </label>
                </div>

                <label className="wiz-field">
                  <span className="wiz-field__lbl">Comentarios o requerimientos específicos</span>
                  <textarea
                    className="wiz-field__textarea"
                    rows={3}
                    value={comentarios}
                    onChange={e => setComentarios(e.target.value)}
                    placeholder="Describa brevemente iniciativas activas, fechas límite o sistemas prioritarios..."
                  />
                </label>

                <div className="wiz-footer wiz-footer--between">
                  <button type="button" className="cta-btn cta-btn--sec" onClick={() => setPaso(4)}>
                    <ArrowLeft size={16} />
                    <span>Regresar a Resultados</span>
                  </button>
                  <button type="submit" className="cta-btn">
                    <Send size={16} />
                    <span>Enviar Solicitud Ejecutiva</span>
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </BentoItem>
      )}

      {/* Modal de confirmación al enviar Lead */}
      {modalConfirmacion && (
        <Modal titulo="Solicitud Recibida" onCerrar={cerrarModalYVolver}>
          <div className="wiz-modal">
            <div className="wiz-modal__icon">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="wiz-modal__title">¡Información registrada exitosamente!</h3>
            <p className="wiz-modal__copy">
              Hemos registrado su información. Un especialista de MAYIA DATACENTER × NextStream preparará su diagnóstico ejecutivo y se pondrá en contacto en las próximas 24 horas.
            </p>

            <div className="wiz-modal__summary">
              <div className="wiz-modal__item">
                <span className="lbl">Nombre:</span>
                <strong>{nombre}</strong>
              </div>
              <div className="wiz-modal__item">
                <span className="lbl">Cargo:</span>
                <strong>{cargo}</strong>
              </div>
              <div className="wiz-modal__item">
                <span className="lbl">Empresa:</span>
                <strong>{empresa}</strong>
              </div>
              <div className="wiz-modal__item">
                <span className="lbl">Correo:</span>
                <strong>{correo}</strong>
              </div>
              {telefono && (
                <div className="wiz-modal__item">
                  <span className="lbl">Teléfono:</span>
                  <strong>{telefono}</strong>
                </div>
              )}
              <div className="wiz-modal__item">
                <span className="lbl">Prioridad:</span>
                <strong style={{ color: 'var(--accent)' }}>{prioridad.titulo}</strong>
              </div>
            </div>

            <button className="cta-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={cerrarModalYVolver}>
              <span>Finalizar y volver al Explorer</span>
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
