import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsInt()
  @IsNotEmpty()
  pageCount: number;

  @IsInt()
  pageRead: number;

  @IsBoolean()
  @IsNotEmpty()
  reading: boolean;
}
