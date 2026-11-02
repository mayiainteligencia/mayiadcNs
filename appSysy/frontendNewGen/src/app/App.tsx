import { useEffect, useState } from 'react';
import type { Sesion } from '../domain/auth/types';
import { Shell } from '../features/shell/Shell';
import logoMayiaNext from '../../assets/mayiaxNext.png';
import './App.css';

const SESION_DEFECTO: Sesion = {
  usuario: 'ejecutivo@mayiadatacenter.com',
  rol: 'ceo',
};

export default function App() {
  const [cargandoSplash, setCargandoSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCargandoSplash(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  if (cargandoSplash) {
    return (
      <div className="splash-screen">
        <div className="splash-screen__content">
          <div className="splash-screen__logo-wrap">
            <img src={logoMayiaNext} alt="MAYIA x NextStream" className="splash-screen__logo-img" />
          </div>
          <h1 className="splash-screen__title">MAYIA DATACENTER</h1>
          <p className="splash-screen__subtitle">El centro de datos más inteligente de México y Latinoamérica</p>
          <div className="splash-screen__loader">
            <div className="splash-screen__bar" />
          </div>
        </div>
      </div>
    );
  }

  return <Shell sesion={SESION_DEFECTO} />;
}
