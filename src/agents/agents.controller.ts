import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAgentDto } from './dto/createAgent.dto';
import { AgentsService } from './agents.service';
import { UpdateAgentDto } from './dto/updateAgent.dto';
import { JwtGuard } from 'src/guard/jwt-auth.guard';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          cb(new BadRequestException('Only image files are allowed!'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createAgentDto: CreateAgentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createAgentDto.photo = file.path.replace('uploads', '');
    }
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
