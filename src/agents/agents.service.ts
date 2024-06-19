import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAgentDto } from './createAgent.dto';
import { Agent } from './agent.entity';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent)
    private repo: Repository<Agent>,
  ) {}

  create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const agent = this.repo.create(createAgentDto);
    return this.repo.save(agent);
  }

  async getAll(): Promise<Agent[]> {
    const agents = await this.repo.find();
    return agents;
  }

  async getById(id: number): Promise<Agent> {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }
  async findByEmail(email: string) {
    return await this.repo.findOneBy({ email });
  }
  async update(id: number, attrs: Partial<Agent>) {
    const agent = await this.repo.findOneBy({ id: id });
    if (!agent) {
      throw new NotFoundException('could not found agent');
    }
    Object.assign(agent, attrs);
    return this.repo.save(agent);
  }

  async remove(id: number) {
    const agent = await this.repo.findOneBy({ id: id });
    if (!agent) {
      throw new NotFoundException('could not found agent');
    }
    return this.repo.remove(agent);
  }
}
