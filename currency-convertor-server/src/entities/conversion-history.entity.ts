import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('conversion_history')
export class ConversionHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 45 })
  ip_address: string;

  @Column({ type: 'varchar', length: 10 })
  base_currency: string;

  @Column({ type: 'decimal', precision: 18, scale: 6 })
  base_price: number;

  @Column({ type: 'varchar', length: 10 })
  conversion_currency: string;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    transformer: {
      to: (value: number | string) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  conversion_price: number;

  @Column({ type: 'date', nullable: true })
  historical_date: Date | null;

  @Column({ type: 'decimal', precision: 18, scale: 10 })
  exchange_rate: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
