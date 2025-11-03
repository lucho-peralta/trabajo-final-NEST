import { Controller, Get, Param, Post, Body, Patch, Delete,NotFoundException } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { CreateHistorialDto } from './dto/createHistorial.dto';
import { UpdateHistorialDto } from './dto/updateHistorial.dto';

@Controller('historial')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  @Get()
  getAll() {
    return this.historialService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {

    const idNum = Number(id);

    if (isNaN(idNum) || !Number.isInteger(idNum) || idNum <= 0) {
     throw new NotFoundException('El ID ingresado debe ser un número entero mayor a cero');
    }
    return this.historialService.getById(idNum);
  }

  @Post()
  createHistorial(@Body() dto: CreateHistorialDto) {
    return this.historialService.createHistorial(dto);
  }

  @Patch(':id')
  updateHistorial(@Param('id') id: string, @Body() dto: UpdateHistorialDto) {
    const idNum = Number(id);

    if (isNaN(idNum) || !Number.isInteger(idNum) || idNum <= 0) {
     throw new NotFoundException('El ID ingresado debe ser un número entero mayor a cero');
    }

    return this.historialService.updateHistorial(idNum, dto);
  }

  @Delete(':id')
  deleteHistorial(@Param('id') id: string) {
    const idNum = Number(id);
    if (isNaN(idNum) || !Number.isInteger(idNum) || idNum <= 0) {
      throw new NotFoundException('El ID ingresado debe ser un número entero mayor a cero');
    }

    return this.historialService.deleteHistorial(idNum);
  }
}