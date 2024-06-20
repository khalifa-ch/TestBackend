import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAgentDto } from './dto/createAgent.dto';
import { AgentsService } from './agents.service';
import { UpdateAgentDto } from './dto/updateAgent.dto';
import { JwtGuard } from 'src/guard/jwt-auth.guard';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@UseGuards(JwtGuard)
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.create(createAgentDto);
  }
  @Get('/destination-groups')
  async getDistinctDestinationGroups(): Promise<string[]> {
    return this.agentsService.findDistinctDestinationGroups();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const agent = await this.agentsService.getById(parseInt(id));
    if (!agent) {
      throw new NotFoundException('agent not found');
    }
    return agent;
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.agentsService.findAll(paginationQuery);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.agentsService.remove(parseInt(id));
  }
  @Patch('/:id')
  Update(@Param('id') id: string, @Body() body: UpdateAgentDto) {
    return this.agentsService.update(parseInt(id), body);
  }
  
}
