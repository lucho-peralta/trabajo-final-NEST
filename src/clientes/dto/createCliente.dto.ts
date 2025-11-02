import { IsNotEmpty, IsEmail, IsString, IsNumberString,MinLength, IsOptional, Length} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateClienteDto {
  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  @IsNumberString({}, { message: 'El DNI debe contener solo números' })
  @Length(8, 8, { message: 'El DNI debe tener 8 dígitos' })
  @Transform(({ value }) => value.trim())
  dni: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @Transform(({value}) => value.trim().toLowerCase())
  nombre: string;

  @IsNotEmpty({ message: 'El telefono es obligatorio' })
  @IsNumberString({}, { message: 'El teléfono debe contener solo números' })
  @Transform(({value}) => value.trim().toLowerCase())
  @Length(10, 10, { message: 'El teléfono debe tener 10 caracteres' })
  telefono: string;

  @IsNotEmpty({ message: 'La direccion es obligatoria' })
  @IsString({ message: 'La dirección debe ser un texto' })
  @MinLength(4, { message: 'La direccion debe tener 4 caracteres como mínimo' })
  @Transform(({value}) => value.trim().toLowerCase())
  direccion: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  @Transform(({value}) => value.trim().toLowerCase())
  mail?: string;
}