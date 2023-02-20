import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';
import { get } from 'http';
import { ExtendedRequest, JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll(@Req() request: ExtendedRequest) {
    return this.courseService.findAll(
      request.user ? request.user.id : undefined,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/creator')
  findAllCreator(@Req() request: ExtendedRequest) {
    return this.courseService.findAllCreator(request.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: ExtendedRequest) {
    return this.courseService.findOne(
      +id,
      request.user ? request.user.id : undefined,
    );
  }

  @Get()
  findByCreator(@Param('creator') creator: string) {
    return this.courseService.findByCreatorId(+creator);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/enroll')
  enroll(@Param('id') id: string, @Req() request: ExtendedRequest) {
    return this.courseService.enroll(request.user.id, +id);
  }
}
