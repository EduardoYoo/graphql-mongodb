import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  //Get student by ID
  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOneBy({ id });
  }

  //Get all students
  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  //Create new student
  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        //Find all students with id that match what is in the studentIds array
        id: {
          $in: studentIds,
        } as any,
      },
    });
  }
}
