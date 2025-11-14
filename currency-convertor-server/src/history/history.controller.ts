import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HistoryService } from './history.service';
import { CreateHistoryDto, HistoryResponseDto } from '../dto/history.dto';
import { IpAddress } from '../decorators/ip-address.decorator';

@ApiTags('history')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  @ApiOperation({ summary: 'Save a conversion history record' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: HistoryResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createHistory(
    @IpAddress() ipAddress: string,
    @Body() createHistoryDto: CreateHistoryDto,
  ): Promise<HistoryResponseDto> {
    return await this.historyService.createHistory(ipAddress, createHistoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get conversion history for current IP' })
  @ApiResponse({
    status: 200,
    description:
      'Returns all conversion history for the requesting IP address.',
    type: [HistoryResponseDto],
  })
  async getHistory(
    @IpAddress() ipAddress: string,
  ): Promise<HistoryResponseDto[]> {
    return await this.historyService.getHistoryByIp(ipAddress);
  }
}
