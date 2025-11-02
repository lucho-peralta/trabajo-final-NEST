import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { dbService } from 'src/db/dbService';
import { CreateClienteDto } from './dto/createCliente.dto';
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
  

createCliente(clienteDto: CreateClienteDto) {
  const datos = dbService.leerDB();

  if (!Array.isArray(datos.clientes)) {
    datos.clientes = [];
  }

  const existeCliente = datos.clientes.some(cliente => cliente.telefono === clienteDto.telefono);
  if (existeCliente) {
    throw new BadRequestException(`Ya existe un cliente con el número de teléfono: ${clienteDto.telefono}`);
  }

  if (!direccionTieneNumero(clienteDto.direccion)) {
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
    nombre: clienteDto.nombre,
    telefono: clienteDto.telefono,
    mail: clienteDto.mail ?? '',
    direccion: clienteDto.direccion,
    activo: true,
  };

  datos.clientes.push(nuevoCliente);
  dbService.guardarDB(datos);
  return nuevoCliente;
}


}






