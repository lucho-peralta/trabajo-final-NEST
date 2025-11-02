import { Controller, Get, Param, BadRequestException, Post, Body, Patch, Delete} from '@nestjs/common';
import { MascotaService } from './mascota.service';
import { CreateMascotaDto } from './dto/createMascota.dto';
import { UpdateMascotaDto } from './dto/updateMascota.dto';

@Controller('mascotas')
export class MascotaController {
  constructor(private readonly mascotaService: MascotaService) {}

  @Get()
  getAll() {
    return this.mascotaService.getAll();
  }

  @Get('activos')
  getAllActivos() {
    return this.mascotaService.getAllActivos();
  }

  @Get('inactivos')
  getAllInactivos() {
    return this.mascotaService.getAllInactivos();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const idNum = Number(id);
    if (isNaN(idNum) || idNum < 1) {
      throw new BadRequestException('El ID ingresado debe ser un número entero mayor a cero');
    }

    return this.mascotaService.getById(idNum);
  }

  @Post()
  createMascota(@Body() mascotaNueva: CreateMascotaDto) {
    return this.mascotaService.createMascota(mascotaNueva);
  }

  @Patch(':id')
  updateMascota(@Param('id') id: string, @Body() cambios: UpdateMascotaDto) {
    const idNum = Number(id);
    if (isNaN(idNum) || idNum < 1) {
      throw new BadRequestException('El ID ingresado debe ser un número entero mayor a cero');
    }

    return this.mascotaService.updateMascota(idNum, cambios);
  }

  @Delete(':id')
  deleteMascota(@Param('id') id: string) {
    const idNum = Number(id);
    if (isNaN(idNum) || idNum < 1) {
      throw new BadRequestException('El ID ingresado debe ser un número entero mayor a cero');
    }

    return this.mascotaService.deleteMascota(idNum);
  }
}