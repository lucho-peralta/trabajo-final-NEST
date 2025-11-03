import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { dbService } from 'src/db/dbService';
import { CreateHistorialDto } from './dto/createHistorial.dto';
import { UpdateHistorialDto } from './dto/updateHistorial.dto';

@Injectable()
export class HistorialService {
  
  getAll() {
    const datos = dbService.leerDB();

    if (!Array.isArray(datos.historialMascotas) || datos.historialMascotas.length === 0) {
      throw new NotFoundException('No hay historial registrado');
    }

    return datos.historialMascotas;
  }

  getById(id: number) {
    
    const datos = dbService.leerDB();

    const historial = datos.historialMascotas.find(historial => historial.id === id);

    if (!historial) {
      throw new NotFoundException(`No existe historial con ID ${id}`);
    }

    return historial;
  }

  createHistorial(dto: CreateHistorialDto) {

    const datos = dbService.leerDB();

    if (!Array.isArray(datos.historialMascotas)) {
      datos.historialMascotas = [];
    }

    const mascotaExiste = datos.mascotas.some(mascota => mascota.id === dto.mascotaId);

    if (!mascotaExiste) {
      throw new BadRequestException(`No existe una mascota con id ${dto.mascotaId}`);
    }

    const fecha = new Date(dto.fecha);
    const ahora = new Date();

    if (fecha > ahora) {
     throw new BadRequestException('La fecha no puede ser futura');
    }

    if (dto.proximaAplicacion) {
      const proxima = new Date(dto.proximaAplicacion);

      if (proxima <= ahora) {
        throw new BadRequestException('La próxima aplicación debe ser una fecha futura');
      }
    }

    const duplicado = datos.historialMascotas.find( historial => historial.mascotaId === dto.mascotaId && historial.fecha === dto.fecha && historial.tipo === dto.tipo);

    if (duplicado) {
      throw new BadRequestException('Historial duplicado para esa mascota y fecha');
    }

    let nuevoId = 1;
    for (const historial of datos.historialMascotas) {
      if (historial.id >= nuevoId) {
        nuevoId = historial.id + 1;
      }
    }

    const nuevoHistorial = {
      id: nuevoId,
      mascotaId: dto.mascotaId,
      fecha: dto.fecha,
      tipo: dto.tipo,
      descripcion: dto.descripcion ?? '',
      tratamiento: dto.tratamiento ?? '',
      proximaAplicacion: dto.proximaAplicacion ?? '',
      resultado: dto.resultado ?? '',
      observacion: dto.observacion ?? '',
    };

    datos.historialMascotas.push(nuevoHistorial);

    dbService.guardarDB(datos);

    return nuevoHistorial;
  }

  updateHistorial(id: number, dto: UpdateHistorialDto) {
    const datos = dbService.leerDB();
    const historial = datos.historialMascotas.find(historial => historial.id === id);

    if (!historial) {
      throw new NotFoundException(`No existe historial con ID ${id}`);
    }

   const ahora = new Date();

    if (dto.mascotaId && dto.mascotaId !== historial.mascotaId) {
     const mascotaExiste = datos.mascotas.some(mascota => mascota.id === dto.mascotaId);
     if (!mascotaExiste) {
        throw new BadRequestException(`No existe una mascota con id ${dto.mascotaId}`);
     }
     historial.mascotaId = dto.mascotaId;
    }

   if (dto.fecha && dto.fecha !== historial.fecha) {
     const fecha = new Date(dto.fecha);
     if (fecha > ahora) {
       throw new BadRequestException('La fecha no puede ser futura');
     }
     historial.fecha = dto.fecha;
    }

   if (dto.proximaAplicacion && dto.proximaAplicacion !== historial.proximaAplicacion) {
      const proxima = new Date(dto.proximaAplicacion);

      if (proxima <= ahora) {
        throw new BadRequestException('La próxima aplicación debe ser una fecha futura');
     }
      historial.proximaAplicacion = dto.proximaAplicacion;
    }

    if (dto.tipo && dto.tipo !== historial.tipo) {
      historial.tipo = dto.tipo;
    }

    if (dto.descripcion && dto.descripcion !== historial.descripcion) {
      historial.descripcion = dto.descripcion;
    }

    if (dto.tratamiento && dto.tratamiento !== historial.tratamiento) {
      historial.tratamiento = dto.tratamiento;
    }

   if (dto.resultado && dto.resultado !== historial.resultado) {
      historial.resultado = dto.resultado;
    }

   if (dto.observacion && dto.observacion !== historial.observacion) {
      historial.observacion = dto.observacion;
    }

    dbService.guardarDB(datos);

    return historial;
  }



  deleteHistorial(id: number) {
    const datos = dbService.leerDB();
    const indice = datos.historialMascotas.findIndex(historial => historial.id === id);

    if (indice === -1) {
      throw new NotFoundException(`No existe historial con ID ${id}`);
    }

    const historialEliminado = datos.historialMascotas.splice(indice, 1)[0];

    dbService.guardarDB(datos);

    return historialEliminado;
  }
}