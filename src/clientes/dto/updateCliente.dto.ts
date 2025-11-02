import { IsOptional, IsString, IsEmail, IsNumberString, Length, MinLength, Matches} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateClienteDto {
  @IsOptional()
  @IsNumberString({}, { message: 'El DNI debe contener solo números' })
  @Length(8, 8, { message: 'El DNI debe tener 8 dígitos' })
  @Transform(({ value }) => value.trim())
  dni?: string;

  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  @Transform(({ value }) => value.trim().toLowerCase())
  nombre?: string;

  @IsOptional()
  @IsNumberString({}, { message: 'El teléfono debe contener solo números' })
  @Length(10, 10, { message: 'El teléfono debe tener 10 caracteres' })
  @Transform(({ value }) => value.trim().toLowerCase())
  telefono?: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser un texto' })
  @MinLength(4, { message: 'La dirección debe tener al menos 4 caracteres' })
  @Transform(({ value }) => value.trim().toLowerCase())
  direccion?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  @Transform(({ value }) => value.trim().toLowerCase())
  mail?: string;

  @IsOptional()
  @IsString({ message: 'El estado activo debe ser activo o inactivo' })
  @Transform(({ value }) => value.trim().toLowerCase())
  @Matches(/^(activo|inactivo)$/, {message: 'El estado debe ser "activo" o "inactivo"'})
  estado?: 'activo' | 'inactivo';
}
