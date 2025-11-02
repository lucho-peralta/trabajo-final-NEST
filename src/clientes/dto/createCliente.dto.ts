import { IsNotEmpty, IsEmail, IsString, IsOptional, Length} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateClienteDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @Transform(({value}) => value.trim().toLowerCase())
  nombre: string;

  @IsNotEmpty({ message: 'El telefono es obligatorio' })
  @IsString({ message: 'El teléfono debe ser un texto' })
  @Transform(({value}) => value.trim().toLowerCase())
  @Length(10, 10, { message: 'El teléfono debe tener 10 caracteres' })
  telefono: string;

  @IsNotEmpty({ message: 'El telefono es obligatorio' })
  @IsString({ message: 'La dirección debe ser un texto' })
  @Transform(({value}) => value.trim().toLowerCase())
  direccion: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  @Transform(({value}) => value.trim().toLowerCase())
  mail?: string;
}