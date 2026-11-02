import type { ComponentType } from 'react';
import type { VistaProps } from './compartido/util';
import { ValueExplorerHome } from '../explorer/ValueExplorerHome';
import { ExplorerWizard } from '../explorer/ExplorerWizard';
import { ModuloDiagnostico } from '../explorer/ModuloDiagnostico';
import { ModuloValorDato } from '../explorer/ModuloValorDato';
import { ModuloNube } from '../explorer/ModuloNube';
import { ModuloNOC } from '../explorer/ModuloNOC';
import { ModuloSOC } from '../explorer/ModuloSOC';
import { ModuloDRP } from '../explorer/ModuloDRP';
import { ModuloAIFactory } from '../explorer/ModuloAIFactory';
import { ModuloROI } from '../explorer/ModuloROI';

/** id de sección → vista. */
export const VISTAS: Record<string, ComponentType<any>> = {
  explorer: ValueExplorerHome,
  explorerDiagnostico: ModuloDiagnostico,
  explorerValorDato: ModuloValorDato,
  explorerNube: ModuloNube,
  explorerNOC: ModuloNOC,
  explorerSOC: ModuloSOC,
  explorerDRP: ModuloDRP,
  explorerAIFactory: ModuloAIFactory,
  explorerROI: ModuloROI,
  explorerWizard: ExplorerWizard,
};
