export interface Task {
  _id: string;
  title: string;
  description: string;
  dificult: string;
  completed: boolean;
  score: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    username: string;
    profileImage?: string;
  };
}

export interface TaskGetResult {
  success: boolean;
  error?:string;
  tasks?: Task[];
}