// Definition of types used in the application

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserData {
  name?: string;
  email?: string;
  new_password?: string;
  current_password?: string;
}

// Define the project types

export interface ProjectData {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;

  startDate: string;
  endDate: string;

  createdAt: string;
  updatedAt: string;

  owner: User;
  ownerId: string;
}

// Define the stage types

export interface StageData {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
}

export interface Stage {
  id: string;
  name: string;
  description?: string;

  startDate: string;
  endDate: string;

  createdAt: string;
  updatedAt: string;

  projectId: string;
}

// Define the task types

export interface TaskData {
  name: string;
  description?: string;

  startDate: Date;
  endDate: Date;

  indexAtStage: number;
  stageId: string;
}

export interface Task {
  id: string;
  name: string;
  description?: string;

  startDate: string;
  endDate: string;

  createdAt: string;
  updatedAt: string;

  indexAtStage: number;
  stageId: string;
  projectId: string;
}
