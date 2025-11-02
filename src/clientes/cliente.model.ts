export class ClienteModel {
  id: number;
  dni: string;
  nombre: string;
  telefono: string;
  mail: string;
  direccion: string;
  estado: 'activo' | 'inactivo';
}

