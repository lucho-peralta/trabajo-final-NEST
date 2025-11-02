import { IsInt, IsNotEmpty, IsString, Min, Matches, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMascotaDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Transform(({ value }) => value.trim().toLowerCase())
  nombre: string;

  @IsString({ message: 'La especie debe ser texto' })
  @IsNotEmpty({ message: 'La especie es obligatoria' })
  @Transform(({ value }) => value.trim().toLowerCase())
  especie: string;

  @IsString({ message: 'La raza debe ser texto' })
  @IsNotEmpty({ message: 'La raza es obligatoria' })
  @Transform(({ value }) => value.trim().toLowerCase())
  raza: string;

  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(1, { message: 'La edad debe ser mayor que 0' })
  @IsNotEmpty({ message: 'La edad es obligatoria' })
  edad: number;

  @IsString({ message: 'El sexo debe ser texto' })
  @IsNotEmpty({ message: 'El sexo es obligatorio' })
  @Transform(({ value }) => value.trim().toLowerCase())
  @Matches(/^(macho|hembra)$/, {
    message: 'El sexo debe ser "macho" o "hembra"',
  })
  sexo: string;

  @IsInt({ message: 'El ID del cliente debe ser un número entero' })
  @Min(1, { message: 'El ID del cliente debe ser mayor que 0' })
  @IsNotEmpty({ message: 'El ID del cliente es obligatorio' })
  clienteId: number;

  @IsOptional()
  @IsString({ message: 'El estado activo debe ser activo o inactivo' })
  @Transform(({ value }) => value.trim().toLowerCase())
  @Matches(/^(activo|inactivo)$/, {
    message: 'El estado debe ser "activo" o "inactivo"',
  })
  estado?: 'activo' | 'inactivo';
}