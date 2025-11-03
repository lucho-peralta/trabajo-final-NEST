import {  Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/createTurno.dto';
import { UpdateTurnoDto } from './dto/updateTurno.dto';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Get()
  getAll() {
    return this.turnosService.getAll();
  }
  @Get('pendientes')
  getPendientes() {
    return this.turnosService.getPendientes();
  }

  @Get('realizados')
  getRealizados() {
    return this.turnosService.getRealizados();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.turnosService.getById(id);
  }

  @Post()
  create(@Body() createTurnoDto: CreateTurnoDto) {
    return this.turnosService.create(createTurnoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.turnosService.update(id, updateTurnoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.turnosService.delete(id);
  }
}