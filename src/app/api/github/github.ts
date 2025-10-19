import { IGitHubRepo } from "../../../core/dto/github/github.dto";

// Obtener datos del perfil de GitHub
export const getGitHubProfile = async (urlGithub: string) => {
  try {
    const response = await fetch("/api/github/profile", {
      method: "POST",
      body: JSON.stringify({ urlGithub }),
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching GitHub profile:", error);
    throw error;
  }
};

// Obtener repositorios de GitHub
export const getGitHubRepos = async (urlGithub: string): Promise<IGitHubRepo[]> => {
  try {
    const response = await fetch("/api/github/repos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urlGithub }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} al obtener repos de GitHub`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getGitHubRepos:", error);
    return [];
  }
};

