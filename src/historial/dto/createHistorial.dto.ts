import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateHistorialDto {
  @IsInt({ message: 'El ID de la mascota debe ser un número entero' })
  @Min(1, { message: 'El ID de la mascota debe ser mayor que 0' })
  mascotaId: number;

  @IsString({ message: 'La fecha es obligatoria' })
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  @Transform(({ value }) => value.trim())
  fecha: string;

  @IsString({ message: 'El tipo es obligatorio y debe ser texto' })
  @IsNotEmpty({ message: 'El tipo es obligatorio' })
  @Transform(({ value }) => value.trim().toLowerCase())
  tipo: string;

  @IsString({ message: 'La descripción es obligatoria y debe ser texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @Transform(({ value }) => value.trim())
  descripcion: string;

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

