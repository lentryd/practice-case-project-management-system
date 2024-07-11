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
  id: number;
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

  created_at: string;
  updated_at: string;

  owner: User;
  owner_id: string;
}

// Define the stage types

export interface StageData {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
}

export interface Stage {
  id: string;
  name: string;
  description?: string;

  startDate: string;
  endDate: string;

  created_at: string;
  updated_at: string;

  project_id: string;
}

// Define the task types

export interface TaskData {
  name: string;
  description?: string;
  stageId: string;
}

export interface Task {
  id: string;
  name: string;
  description?: string;

  created_at: string;
  updated_at: string;

  stage_id: string;
  project_id: string;
}
