import { IsString, IsOptional, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExchangeRateQueryDto {
  @ApiProperty({
    description: 'Date in YYYY-MM-DD format',
    example: '2021-01-01',
    pattern: '^\\d{4}-\\d{2}-\\d{2}$',
  })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  date: string;

  @ApiPropertyOptional({
    description: 'Base currency code',
    example: 'USD',
  })
  @IsOptional()
  @IsString()
  base_currency?: string;

  @ApiPropertyOptional({
    description: 'Target currency',
    example: 'EUR',
  })
  @IsOptional()
  @IsString()
  currencies?: string;
}

export class LatestExchangeRateQueryDto {
  @ApiPropertyOptional({
    description: 'Base currency code',
    example: 'USD',
  })
  @IsOptional()
  @IsString()
  base_currency?: string;

  @ApiPropertyOptional({
    description: 'Target currency',
    example: 'EUR',
  })
  @IsOptional()
  @IsString()
  currencies?: string;
}
