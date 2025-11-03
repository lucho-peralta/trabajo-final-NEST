import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateHistorialDto {
  @IsOptional()
  @IsInt({ message: 'El ID de la mascota debe ser un número entero' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor que 0' })
  mascotaId?: number;

  @IsOptional()
  @IsString({ message: 'La fecha debe tener formato ISO' })
  @Transform(({ value }) => value.trim())
  fecha?: string;

  @IsOptional()
  @IsString({ message: 'El tipo debe ser texto' })
  @Transform(({ value }) => value.trim().toLowerCase())
  tipo?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  @Transform(({ value }) => value.trim())
  descripcion?: string;

  @IsOptional()
  @IsString({ message: 'El tratamiento debe ser texto' })
  @Transform(({ value }) => value.trim())
  tratamiento?: string;

  @IsOptional()
  @IsString({ message: 'La próxima aplicación debe ser texto' })
  @Transform(({ value }) => value.trim())
  proximaAplicacion?: string;

  @IsOptional()
  @IsString({ message: 'El resultado debe ser texto' })
  @Transform(({ value }) => value.trim())
  resultado?: string;

  @IsOptional()
  @IsString({ message: 'La observación debe ser texto' })
  @Transform(({ value }) => value.trim())
  observacion?: string;
}