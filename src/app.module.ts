import { Module } from '@nestjs/common';

import { ClienteController } from './clientes/cliente.controller';
import { ClienteService } from './clientes/cliente.service';

import { MascotaController } from './mascotas/mascota.controller';
import { MascotaService } from './mascotas/mascota.service';

import { TurnosController } from './turnos/turnos.controller';
import { TurnosService } from './turnos/turnos.service';

import { HistorialController } from './historial/historial.controller';
import { HistorialService } from './historial/historial.service';

@Module({
  imports: [], 
  controllers: [
    ClienteController,
    MascotaController,
    TurnosController,
    HistorialController,
  ],
  providers: [
    ClienteService,
    MascotaService,
    TurnosService,
    HistorialService,
  ],
})
export class AppModule {}