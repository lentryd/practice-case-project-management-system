import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

export default class BaseTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The task name',
    example: 'Task 1',
  })
  name: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The task description',
    example: 'This is the first task',
    required: false,
  })
  description?: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The stage identifier',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  stageId: string;
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The project identifier',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  projectId: string;
}

export class CreateTaskDto extends BaseTaskDto {}
export class UpdateTaskDto extends PartialType(
  OmitType(BaseTaskDto, ['projectId']),
) {}
