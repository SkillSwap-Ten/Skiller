export const clearStorage = () => {
    // Borrar datos del localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("authToken");

    // Borrar datos del sessionStorage
    sessionStorage.clear();

    // Borrar cookies almacenadas
    const cookiesToRemove = ["authToken", "userRole"];

    cookiesToRemove.forEach((name) => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
};
