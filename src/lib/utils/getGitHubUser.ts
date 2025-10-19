export function getGitHubUser(url: string | URL | undefined | null): { isSuccess: boolean; user: string } {
    // Validar que la URL sea válida
    if (!url) {
        return { isSuccess: false, user: "" };
    }

    // Convertir URL a string si es un objeto URL
    const urlString = url instanceof URL ? url.href : url;

    const cleanedUrl = urlString.replace(/\/+$/, "");

    const segments = cleanedUrl.split("/");
    const user = segments[segments.length - 1] || "";

    // Retornar objeto con resultado
    return { isSuccess: true, user };
}
