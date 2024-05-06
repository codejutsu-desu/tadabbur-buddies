// user.ts
export interface User {
  id: number;
  created_at: string;
  name: string;
  password: string;
  country: string;
}

// comment.ts
export interface Comment {
  id: number;
  created_at: string;
  avatar: string;
  name: string;
  text: string;
  vote: number;
}
