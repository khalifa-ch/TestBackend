import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateAgentDto } from './createAgent.dto';
import { AgentsService } from './agents.service';
import { UpdateAgentDto } from './updateAgent.dto';
import { JwtGuard } from 'src/guard/jwt-auth.guard';



@UseGuards(JwtGuard)
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.create(createAgentDto);
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
  getAll() {
    return this.agentsService.getAll();
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
