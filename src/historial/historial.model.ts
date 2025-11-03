export class HistorialModel {
  id: number;
  mascotaId: number;
  fecha: string; // formato "2025-11-03"
  tipo: string;
  descripcion: string;
  tratamiento?: string;
  proximaAplicacion?: string;
  resultado?: string;
  observacion?: string;
}