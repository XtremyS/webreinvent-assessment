export interface User {
  id: number;
  first: string;
  last: string;
  dob: string;
  age: number;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

export interface CommonLoaderProps {
  imgStyle?: string;
}

export interface PrivateRouteProps {
  children: any;
}

export interface AlertBoxProps {
  message: string;
  duration: number;
  onClose: () => void;
  position: string;
  type: string;
}

export interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface UserCardProps {
  user: User;
  isOpen: boolean;
  onToggle: () => void;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export interface UserListProps {
  users: User[];
  setUsers: (users: User[]) => void;
}
export interface UserState {
  isAuthenticated: boolean;
  authToken: any;
}
