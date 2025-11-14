import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHistoryDto {
  @ApiProperty({
    description: 'Base currency code',
    example: 'USD',
  })
  @IsString()
  base_currency: string;

  @ApiProperty({
    description: 'Base price/amount',
    example: 100.5,
  })
  @IsNumber()
  base_price: number;

  @ApiProperty({
    description: 'Conversion currency code',
    example: 'EUR',
  })
  @IsString()
  conversion_currency: string;

  @ApiProperty({
    description: 'Converted price/amount',
    example: 85.42,
  })
  @IsNumber()
  conversion_price: number;

  @ApiPropertyOptional({
    description: 'Historical date in YYYY-MM-DD format (optional)',
    example: '2021-01-01',
  })
  @IsOptional()
  @IsDateString()
  historical_date?: string;

  @ApiProperty({
    description: 'Exchange rate used for conversion',
    example: 0.85,
  })
  @IsNumber()
  exchange_rate: number;
}

export class HistoryResponseDto {
  @ApiProperty({ description: 'Record ID' })
  id: string;

  @ApiProperty({ description: 'User IP address' })
  ip_address: string;

  @ApiProperty({ description: 'Base currency code' })
  base_currency: string;

  @ApiProperty({ description: 'Base price/amount' })
  base_price: number;

  @ApiProperty({ description: 'Conversion currency code' })
  conversion_currency: string;

  @ApiProperty({ description: 'Converted price/amount' })
  conversion_price: number;

  @ApiProperty({ description: 'Historical date', nullable: true })
  historical_date: Date | null;

  @ApiProperty({ description: 'Exchange rate' })
  exchange_rate: number;

  @ApiProperty({ description: 'Timestamp when record was created' })
  created_at: Date;
}
