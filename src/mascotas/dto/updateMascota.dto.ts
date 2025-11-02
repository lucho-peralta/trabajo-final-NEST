import { IsInt, IsOptional, IsString, Min, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateMascotaDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser texto' })
  @Transform(({ value }) => value.trim().toLowerCase())
  nombre?: string;

  @IsOptional()
  @IsString({ message: 'La especie debe ser texto' })
  @Transform(({ value }) => value.trim().toLowerCase())
  especie?: string;

  @IsOptional()
  @IsString({ message: 'La raza debe ser texto' })
  @Transform(({ value }) => value.trim().toLowerCase())
  raza?: string;

  @IsOptional()
  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(1, { message: 'La edad debe ser mayor que 0' })
  edad?: number;

  @IsOptional()
  @IsString({ message: 'El sexo debe ser texto' })
  @Transform(({ value }) => value.trim().toLowerCase())
  @Matches(/^(macho|hembra)$/, {message: 'El sexo debe ser "macho" o "hembra"'})
  sexo?: string;

  @IsOptional()
  @IsInt({ message: 'El ID del cliente debe ser un número entero' })
  @Min(1, { message: 'El ID del cliente debe ser mayor que 0' })
  clienteId?: number;

  @IsOptional()
  @IsString({ message: 'El estado activo debe ser activo o inactivo' })
  @Transform(({ value }) => value.trim().toLowerCase())
  @Matches(/^(activo|inactivo)$/, { message: 'El estado debe ser "activo" o "inactivo"'})
  estado?: 'activo' | 'inactivo';
}