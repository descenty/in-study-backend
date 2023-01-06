import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) { }

  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  async findAll() {
    return await this.prisma.course.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prisma.course.findUniqueOrThrow({
        where: {
          id
        }
      });
    }
    catch (error) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
  }

  async findByCreatorId(creatorId: number) {
    try {
      return await this.prisma.course.findMany({
        where: {
          creatorId
        }
      });
    }
    catch (error) {
      throw new NotFoundException(`Course with creatorId ${creatorId} not found`);
    }
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
