import { IsOptional, IsString, IsDateString, IsNumber, IsPositive, MinLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTurnoDto {
  @IsOptional()
  @IsDateString({}, { message: 'La fecha debe tener formato ISO válido' })
  fecha?: string;

  @IsOptional()
  @IsString({ message: 'El motivo debe ser un texto' })
  @MinLength(3, { message: 'El motivo debe tener al menos 3 caracteres' })
  @Transform(({ value }) => value.trim().toLowerCase())
  motivo?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El ID de mascota debe ser un número' })
  @IsPositive({ message: 'El ID de mascota debe ser mayor a cero' })
  mascotaId?: number;

  @IsOptional()
  @IsString({ message: 'El estado debe ser un texto' })
  @Transform(({ value }) => value.trim().toLowerCase())
  @Matches(/^(pendiente|realizado|cancelado)$/, {message: 'El estado debe ser "pendiente", "realizado" o "cancelado"'})
  estado?: string;
}