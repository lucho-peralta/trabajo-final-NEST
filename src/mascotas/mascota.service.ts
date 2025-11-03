import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { dbService } from 'src/db/dbService';
import { CreateMascotaDto } from './dto/createMascota.dto';
import { UpdateMascotaDto } from './dto/updateMascota.dto';
import { MascotaModel } from './mascota.model';

@Injectable()
export class MascotaService {

getAll() {
  const datos = dbService.leerDB();
  if (!Array.isArray(datos.mascotas) || datos.mascotas.length === 0) {
    throw new NotFoundException('No hay mascotas registradas');
  }
  return datos.mascotas;
} 

getById(id: number) {
  const datos = dbService.leerDB();
  const mascota = datos.mascotas.find(mascota=> mascota.id === id);

  if (!mascota) {
    throw new NotFoundException(`No existe una mascota con ID ${id}`);
  }

  return mascota;
}

getAllActivos() {
  const datos = dbService.leerDB();

  if (!Array.isArray(datos.mascotas) || datos.mascotas.length === 0) {
    throw new NotFoundException('No hay mascotas registradas');
  }

  const activas =  datos.mascotas.filter(mascota => mascota.estado === 'activo');

    if (activas.lenght === 0){
      throw new NotFoundException('No hay mascotas inactivas');
    }

    return activas;
  }



getAllInactivos() {
  const datos = dbService.leerDB();

  if (!Array.isArray(datos.mascotas)) {
    throw new NotFoundException('No hay mascotas registradas');
  }

  const inactivas = datos.mascotas.filter(mascota => mascota.estado === 'inactivo');

  if (inactivas.length === 0) {
    throw new NotFoundException('No hay mascotas inactivas');
  }

  return inactivas;
}


createMascota(mascotaNueva: CreateMascotaDto) {
    const datos = dbService.leerDB();

    if (!Array.isArray(datos.mascotas)) {
      datos.mascotas = [];
    }

    if (!Array.isArray(datos.clientes)) {
      throw new BadRequestException('No hay clientes registrados');
    }

    const clienteExiste = datos.clientes.some(cliente => cliente.id === mascotaNueva.clienteId,
    );

    if (!clienteExiste) {
      throw new NotFoundException( `No existe un cliente con ID ${mascotaNueva.clienteId}`);
    }

    let nuevoId = 1;
    for (const mascota of datos.mascotas) {
      if (mascota.id >= nuevoId) {
        nuevoId = mascota.id + 1;
      }
    }

    const nuevaMascota: MascotaModel = {
      id: nuevoId,
      nombre: mascotaNueva.nombre,
      especie: mascotaNueva.especie,
      raza: mascotaNueva.raza,
      edad: mascotaNueva.edad,
      sexo: mascotaNueva.sexo,
      clienteId: mascotaNueva.clienteId,
    };

    datos.mascotas.push(nuevaMascota);
    dbService.guardarDB(datos);

    return nuevaMascota;
  }


  updateMascota(id: number, mascotaUpdate: UpdateMascotaDto) {
    const datos = dbService.leerDB();

    const mascota = datos.mascotas.find(mascota => mascota.id === id);

    if (!mascota) {
      throw new NotFoundException(`No existe una mascota con ID ${id}`);
    }

    if (mascotaUpdate.nombre && mascotaUpdate.nombre !== mascota.nombre) {
     mascota.nombre = mascotaUpdate.nombre;
    }

    if (mascotaUpdate.especie && mascotaUpdate.especie !== mascota.especie) {
      mascota.especie = mascotaUpdate.especie;
    }

    if (mascotaUpdate.raza && mascotaUpdate.raza !== mascota.raza) {
      mascota.raza = mascotaUpdate.raza;
    }

    if (mascotaUpdate.edad && mascotaUpdate.edad !== mascota.edad) {
     mascota.edad = mascotaUpdate.edad;
    }

    if (mascotaUpdate.sexo && mascotaUpdate.sexo !== mascota.sexo) {
      mascota.sexo = mascotaUpdate.sexo;
    }

    if (mascotaUpdate.clienteId && mascotaUpdate.clienteId !== mascota.clienteId) {
      const clienteExiste = datos.clientes.find(cliente => cliente.id === mascotaUpdate.clienteId);

    if (!clienteExiste) {
      throw new NotFoundException(`No existe un cliente con ID ${mascotaUpdate.clienteId}`);
      }
      mascota.clienteId = mascotaUpdate.clienteId;
    }

    if (mascotaUpdate.estado && mascotaUpdate.estado !== mascota.estado) {
      mascota.estado = mascotaUpdate.estado;
    }

    dbService.guardarDB(datos);
    return mascota;
  }

  deleteMascota(id: number) {
    const datos = dbService.leerDB();
   const index = datos.mascotas.findIndex(mascota => mascota.id === id);

    if (index === -1) {
     throw new NotFoundException(`No existe una mascota con ID ${id}`);
    }
    datos.mascotas.splice(index, 1);
    dbService.guardarDB(datos);

    return { mensaje: `Mascota con ID ${id} eliminada correctamente` };
  }
}





