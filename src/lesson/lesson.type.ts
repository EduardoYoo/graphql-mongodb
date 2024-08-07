import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StudentType } from 'src/student/student.type';

//Type will be named 'Lesson' instead of 'LessonType'
@ObjectType('Lesson') //Makes GraphQL aware of this class as a Type
export class LessonType {
  @Field((type) => ID) //Makes GraphQL aware of this class as a field
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field((type) => [StudentType])
  students: string[];
}
