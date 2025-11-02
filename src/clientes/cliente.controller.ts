import { Controller, Get, Param, NotFoundException, Post, Body, Patch} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/createCliente.dto';
import { UpdateClienteDto } from './dto/updateCliente.dto';

@Controller('clientes')  
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}   

  @Get()
  getAll() {
    return this.clienteService.getAll();
  }

  @Get(':id')
  getbyId(@Param('id') id: string) {
    
    const idNum = Number(id);

    if (isNaN(idNum) || idNum < 1){
      throw new NotFoundException('El ID ingresado debe ser un numero entero mayor a cero');
    }

    return this.clienteService.getById(idNum);
  }

  @Post()
  create(@Body() clienteDto: CreateClienteDto) {
    return this.clienteService.createCliente(clienteDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() clienteDto: UpdateClienteDto) {
    const idNum = Number(id);

    if (isNaN(idNum) || idNum < 1) {
      throw new NotFoundException( 'El ID ingresado debe ser un número entero mayor a cero');
    }

    return this.clienteService.updateCliente(idNum, clienteDto);
  }

  
 


}





