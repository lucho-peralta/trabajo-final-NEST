import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { dbService } from 'src/db/dbService';
import { CreateClienteDto } from './dto/createCliente.dto';
import { UpdateClienteDto } from './dto/updateCliente.dto';
import { ClienteModel } from './cliente.model';
import { direccionTieneNumero } from 'src/utils/validaciones';



@Injectable()
export class ClienteService {

  getAll() {
  const datos = dbService.leerDB();
  if (!datos.clientes || datos.clientes.length === 0) {
    throw new NotFoundException('No hay clientes registrados');
  }
  return datos.clientes;
}

 getById(id: number) {
    const datos = dbService.leerDB();
    const clienteEncontrado = datos.clientes.find(cliente => cliente.id === id);

    if (!clienteEncontrado) {
     throw new NotFoundException(`No existe un cliente con ID ${id}`);
    }

    return clienteEncontrado;
  }


  createCliente(clienteNuevo: CreateClienteDto) {
  const datos = dbService.leerDB();

  if (!Array.isArray(datos.clientes)) {
    datos.clientes = [];
  }

  const existeCliente = datos.clientes.some(cliente => cliente.dni === clienteNuevo.dni);
  if (existeCliente) {
    throw new BadRequestException(`Ya existe un cliente con el número de DNI ingresado: ${clienteNuevo.dni}`);
  }

  if (!direccionTieneNumero(clienteNuevo.direccion)) {
    throw new BadRequestException('La dirección debe incluir al menos un número');
  }

  let nuevoId = 1;
  for (const cliente of datos.clientes) {
    if (cliente.id >= nuevoId) {
      nuevoId = cliente.id + 1;
    }
  }

  const nuevoCliente: ClienteModel = {
    id: nuevoId,
    dni: clienteNuevo.dni,
    nombre: clienteNuevo.nombre,
    telefono: clienteNuevo.telefono,
    mail: clienteNuevo.mail ?? '',
    direccion: clienteNuevo.direccion,
    estado: clienteNuevo.estado ?? 'activo',
  };

  datos.clientes.push(nuevoCliente);
  dbService.guardarDB(datos);
  return nuevoCliente;
  }

  updateCliente(id: number, clienteUpdate: UpdateClienteDto) {
  const datos = dbService.leerDB();
  const cliente = datos.clientes.find((cliente) => cliente.id === id);

  if (!cliente) {
    throw new NotFoundException(`No existe un cliente con ID ${id}`);
  }

  if (clienteUpdate.dni) {
    if (clienteUpdate.dni !== cliente.dni) {
      const existeClienteConMismoDni = datos.clientes.find( otroCliente => otroCliente.dni === clienteUpdate.dni);

      if ( existeClienteConMismoDni && existeClienteConMismoDni.id !== cliente.id ) {
        throw new BadRequestException( `Ya existe un cliente con el DNI ${clienteUpdate.dni}`);
      }
      cliente.dni = clienteUpdate.dni;
    }
  }

  if (clienteUpdate.telefono && clienteUpdate.telefono !== cliente.telefono) {
    cliente.telefono = clienteUpdate.telefono;
  }

  if (clienteUpdate.nombre && clienteUpdate.nombre !== cliente.nombre) {
    cliente.nombre = clienteUpdate.nombre;
  }

  if (clienteUpdate.mail && clienteUpdate.mail !== cliente.mail) {
    cliente.mail = clienteUpdate.mail;
  }

  if (clienteUpdate.direccion && clienteUpdate.direccion !== cliente.direccion) {
    if (!direccionTieneNumero(clienteUpdate.direccion)) {
      throw new BadRequestException( 'La dirección debe incluir al menos un número');
    }
    cliente.direccion = clienteUpdate.direccion;
  }

  if (clienteUpdate.estado && clienteUpdate.estado !== cliente.estado) {
    cliente.estado = clienteUpdate.estado;
  }

  dbService.guardarDB(datos);
  return cliente;
  }


}






