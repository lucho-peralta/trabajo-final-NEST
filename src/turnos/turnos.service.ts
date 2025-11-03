import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { dbService } from 'src/db/dbService';
import { CreateTurnoDto } from './dto/createTurno.dto';
import { UpdateTurnoDto } from './dto/updateTurno.dto';
import { TurnoModel } from './turno.model';
import { MascotaService } from 'src/mascotas/mascota.service';

@Injectable()
export class TurnosService {
  constructor(private readonly mascotaService: MascotaService) {}

  getAll() {

    const datos = dbService.leerDB();

    if (!Array.isArray(datos.turnos) || datos.turnos.length === 0) {
      throw new NotFoundException('No hay turnos registrados');
    }

    return datos.turnos;
  }

  getById(id: number) {

    const datos = dbService.leerDB();

    const turnoEncontrado = datos.turnos.find(turno=> turno.id === id);

    if (!turnoEncontrado) {
      throw new NotFoundException(`No existe un turno con ID ${id}`);
    }

    return turnoEncontrado;
  }

  getPendientes() {

    const datos = dbService.leerDB();

    const pendientes = datos.turnos.filter((turno) => turno.estado === 'pendiente');

    if (!pendientes){
      throw new NotFoundException('No existen turnos pendientes');
    }
    return pendientes;
  }

  getRealizados() {

    const datos = dbService.leerDB();

    const realizados = datos.turnos.filter( turno => turno.estado === 'realizado');

    if (!realizados){
      throw new NotFoundException('No existen turnos ya realizados');
    }

    return realizados;
  }

  create(dto: CreateTurnoDto) {

    const datos = dbService.leerDB();

    if (!Array.isArray(datos.turnos)) {
      datos.turnos = [];
    }

    const fechaTurno = new Date(dto.fecha);
    const hoy = new Date();

    if (fechaTurno < hoy) {
      throw new BadRequestException('No se pueden agendar turnos en fechas pasadas');
    }

    const mascota = this.mascotaService.getById(dto.mascotaId);

    if (!mascota) {
      throw new NotFoundException(`No existe mascota con ID ${dto.mascotaId}`);
    }

    const turnoExistente = datos.turnos.find( turno => turno.fecha === dto.fecha && turno.mascotaId === dto.mascotaId);

    if (turnoExistente) {
      throw new BadRequestException('Ya existe un turno para esta mascota en esa fecha');
    }

    let nuevoId = 1;

    for (const turno of datos.turnos) {
      if (turno.id >= nuevoId) {
        nuevoId = turno.id + 1;
      }
    }

    const nuevoTurno: TurnoModel = {
      id: nuevoId,
      fecha: dto.fecha,
      motivo: dto.motivo,
      mascotaId: dto.mascotaId,
      estado: dto.estado,
    };

    datos.turnos.push(nuevoTurno);

    dbService.guardarDB(datos);

    return nuevoTurno;
  }

  update(id: number, updateTurnoDto: UpdateTurnoDto) {
    const datos = dbService.leerDB();

    const turno = datos.turnos.find((turno) => turno.id === id);

    if (!turno) {
      throw new NotFoundException(`No existe un turno con ID ${id}`);
    }

    if (updateTurnoDto.fecha) {
      const turnoInvalido = datos.turnos.find((otroTurno) => {
        if (otroTurno.id !== id && otroTurno.mascotaId === updateTurnoDto.mascotaId && otroTurno.fecha === updateTurnoDto.fecha) {
          return true;
        }
        return false;
      });

      if (turnoInvalido) {
        throw new BadRequestException('Ya existe un turno para esta mascota en esa fecha');
      }

      turno.fecha = updateTurnoDto.fecha;
    }

    if (updateTurnoDto.motivo) {
      turno.motivo = updateTurnoDto.motivo;
    }

    if (updateTurnoDto.mascotaId) {
      turno.mascotaId = updateTurnoDto.mascotaId;
    }

    if (updateTurnoDto.estado) {
      turno.estado = updateTurnoDto.estado;
    }

    dbService.guardarDB(datos);

    return turno;
  }

  delete(id: number) {
    const datos = dbService.leerDB();

    const indice = datos.turnos.findIndex((turno) => turno.id === id);

    if (indice === -1) {
      throw new NotFoundException(`No existe un turno con ID ${id}`);
    }

    const turnoEliminado = datos.turnos.splice(indice, 1)[0];

    dbService.guardarDB(datos);

    return turnoEliminado;
  }
}