export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stargazersCount: number;
  forksCount: number;
  private: boolean;
  updatedAt: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
}