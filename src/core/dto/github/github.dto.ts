export interface IUserGitHubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
}

export interface IGitHubRepo {
  language: string | null;
}