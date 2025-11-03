import { IsNotEmpty, IsString, IsDateString, IsNumber, IsPositive, MinLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTurnoDto {
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  @IsDateString({}, { message: 'La fecha debe tener formato ISO válido' })
  fecha: string;

  @IsNotEmpty({ message: 'El motivo es obligatorio' })
  @IsString({ message: 'El motivo debe ser un texto' })
  @MinLength(3, { message: 'El motivo debe tener al menos 3 caracteres' })
  @Transform(({ value }) => value.trim().toLowerCase())
  motivo: string;

  @IsNotEmpty({ message: 'El ID de mascota es obligatorio' })
  @IsNumber({}, { message: 'El ID de mascota debe ser un número' })
  @IsPositive({ message: 'El ID de mascota debe ser mayor a cero' })
  mascotaId: number;

  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsString({ message: 'El estado debe ser un texto' })
  @Transform(({ value }) => value.trim().toLowerCase())
  @Matches(/^(pendiente|realizado|cancelado)$/, { message: 'El estado debe ser "pendiente", "realizado" o "cancelado"'})
  estado: string;
}