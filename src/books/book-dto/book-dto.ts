import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'Year' })
  year: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'Page Count' })
  pageCount: number;

  @IsInt()
  @ApiProperty({ type: Number, description: 'Page Read' })
  pageRead: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean, description: 'Reading' })
  reading: boolean;
}
