import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAgentDto } from './dto/createAgent.dto';
import { Agent } from './agent.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { log } from 'console';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent)
    private repo: Repository<Agent>,
  ) {}

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const agentExist = await this.repo.findOne({
      where: { email: createAgentDto.email },
    });
    if (agentExist) {
      throw new NotFoundException('email  already in use');
    }
    const agent = this.repo.create(createAgentDto);
    return this.repo.save(agent);
  }

  async getAll(): Promise<Agent[]> {
    const agents = await this.repo.find();
    return agents;
  }
  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<{ data: Agent[]; total: number; page: number; limit: number }> {
    const { page, limit, searchName, startDate, endDate, destinationGroup } =
      paginationQuery;

    const queryBuilder = this.repo.createQueryBuilder('agent');

    if (searchName) {
      queryBuilder.andWhere('agent.name LIKE :searchName', {
        searchName: `%${searchName}%`,
      });
    }

    const startDatex = startDate ? new Date(startDate) : '';
    const endDatey = endDate ? new Date(endDate) : '';

    if (startDate && endDate) {
      queryBuilder.andWhere(
        'agent.registrationDate BETWEEN :startDatex AND :endDatey',
        { startDatex, endDatey },
      );
    } else if (startDate) {
      queryBuilder.andWhere('agent.registrationDate >= :startDatex', {
        startDatex,
      });
    } else if (endDate) {
      queryBuilder.andWhere('agent.registrationDate <= :endDatey', {
        endDatey,
      });
    }

    if (destinationGroup) {
      queryBuilder.andWhere('agent.destinationGroup = :destinationGroup', {
        destinationGroup,
      });
    }

    queryBuilder.skip((page - 1) * limit).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
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
  async findDistinctDestinationGroups(): Promise<string[]> {
    const result = await this.repo
      .createQueryBuilder('agent')
      .select('agent.destinationGroup')
      .distinct(true)
      .getRawMany();

    return result.map((row) => row.agent_destinationGroup);
  }
}
