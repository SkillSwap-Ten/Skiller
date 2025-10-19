// LOGICA ERRONEA: A los dos GET de Reports les falta el '/api' al inicio

// LOGICA ERRONEA: Actualmente se envia actionTaken como si fuera la descripción
// de la accion, pero en realidad actionTaken solo tiene 3 tipos, que son los
// mismo del estado de cuenta del usuario que ha sido reportado:

    // 1. Activo, 2. Inactivo, 3. Suspendido

        // A. Por lo tanto se debe de agregar los atributos idActionTaken: number,
        // que representa los numeros de arriba.

        // B. Cambiar la columna de la tabla actiontaken por actionDetails: string

        // C. Y por ultimo, agregar una nueva tabla llama actionTaken: string,
        // que deberá de cumplir con los nombres descritos arriba

// RECORDAR: state y idState estan bien, pero por favor asegurarse de que:

    // 1. Pendiente, 2. Revisión, 3. Resuelto

// ------------------------------------------------------------------------------

// AJUSTES FINALES: docker-compose.yml, adjuntar cambios en rama hotfix, README y assets

export interface IReport {
  id?: number;
  titleReport?: string;
  description?: string;
  dateReport?: Date | null;

  idActionTaken?: number;
  actionTaken?: string;
  actionDetails?: string;

  idState?: number;
  state?: string;

  idUser?: number;
  user?: string;

  idReportedUser?: number;
  reportedUser?: string;
}

export interface IReportsState {
  reports: IReport[];
  loading: boolean;
  error: string | null;
}