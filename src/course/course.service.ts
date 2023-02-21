import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Sql } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  async findAll(userId?: number) {
    const courses = await this.prisma.course.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        rating: true,
        image: true,
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!userId) return courses;
    const userCourses = await this.prisma.userCourse.findMany({
      select: {
        courseId: true,
      },
      where: {
        userId,
      },
    });
    return courses.map((course) => ({
      ...course,
      enrolled: userCourses
        .map((userCourse) => userCourse.courseId)
        .includes(course.id),
    }));
  }

  async findAllCreator(creatorId?: number) {
    return await this.prisma.$queryRaw`
      select "Course".id, title, price, rating, image, count("userId") as users from "UserCourse"
      inner join "Course" on "UserCourse"."courseId" = "Course".id
      where "creatorId" = ${creatorId}
      group by "Course".id
      `;
  }

  async findOne(id: number, userId?: number) {
    try {
      const course = await this.prisma.course.findUniqueOrThrow({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          rating: true,
          createdAt: true,
          updatedAt: true,
          image: true,
          lessons: {
            select: {
              id: true,
              title: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          creator: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      if (!userId) return course;
      return {
        ...course,
        isCreator: course.creator.id == userId,
        enrolled: this.prisma.userCourse.findFirst({
          where: {
            userId,
            courseId: id,
          },
        })
          ? true
          : false,
      };
    } catch (error) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
  }

  async findByCreatorId(creatorId: number) {
    try {
      return await this.prisma.course.findMany({
        where: {
          creatorId,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        `Course with creatorId ${creatorId} not found`,
      );
    }
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }

  async enroll(userId: number, courseId: number) {
    if (
      await this.prisma.userCourse.findFirst({
        where: {
          userId,
          courseId,
        },
      })
    )
      throw new BadRequestException(
        `User with id ${userId} already enrolled in course with id ${courseId}`,
      );
    return await this.prisma.userCourse.create({
      data: {
        userId,
        courseId,
      },
    });
  }
}
