// Interface for the request parameters
export interface RequestParams {
  has_more: boolean;
  page: number;
  page_size: number;
}

// Interface for a user
export interface RepoWatch {
  id: string;
  repo_name: string;
  user_id: string;
  created_at: string; // ISO 8601 date string
}

// Interface for the entire response
export interface UserWatchResponse {
  request_params: RequestParams;
  watches?: RepoWatch[];
}

// Interface for a user
export interface User {
  id: string;
  username: string;
  github_id: string;
  created_at: string; // ISO 8601 date string
}

// Interface for the entire response
export interface UserResponse {
  request_params: RequestParams;
  users: User[];
}
