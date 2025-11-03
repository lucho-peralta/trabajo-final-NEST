export class HistorialModel {
  id: number;
  mascotaId: number;
  fecha: string; // formato ISO: "2025-11-03"
  tipo: 'vacuna' | 'tratamiento' | 'diagnostico' | 'chequeo' | 'otro';
  descripcion: string;
  tratamiento?: string;
  proximaAplicacion?: string;
  resultado?: string;
  observacion?: string;
}