import { IUser } from "../users/users.model";

// Traducir al inglés

export interface IRequestMetricsDetails {
    conteoCanceladas: number;
    ultimaCancelada: string | null;
    conteoAceptadas: number;
    ultimaAceptada: string | null;
    conteoEnviadas: number;
    ultimoEnviado: string | null;
    conteoPendientes: number;
    ultimaPendiente: string | null;
    conteoConexiones: string;
}

// Traducir al inglés y cambiar 'solicitudes' por 'metrics'
// OJO, que cuando decimos Metrics, esta no es una entidad, 
// solo es una consulta hecha a la entidad 'Requests'

export interface IRequestMetrics {
  idUsuario: number;
  nombreUsuario: string;
  solicitudes: IRequestMetricsDetails;
}

export interface IRequests {
    id: number;
    description: string;
    idRequestingUser: number;
    idReceivingUser: number;
    userNameReceiving: string;
    userNameRequesting: string;
}

// ----------------------------------------------------------------------------------------

// Traer los registros si el userId enviado en la request getRequestsByUserId(userId: number)
// GET coincide con requestingUser.id o receivingUser.id. Petición asociada al 
// ENDPOINT `ReportGet/GetReportById/${reportId}`

// Además, debe traer todo el historial siempre, asi sean 1000... registros, puesto que es un chat.
// Actualmente, al responder la solicitud en el PUT de 
// patchRequestById(idRequest: number, idStateRequest: number) se quita del Array de la response, 
// lo cual no tiene sentido.

// idStateRequest = 1 (Esperar) 
      // Equivalente a pendientes desde la perspectiva del receivingUser 
      // Equivalente a enviados desde la perspectiva del requestingUser
          // (esto solo será determinante en las RequestsMetrics)
// idStateRequest = 2 (Aceptar)
      // Equivalente a que receivingUser acepte
// idStateRequest = 3 (Rechazar)
      // Equivalente a que receivingUser rechace

// CAMBIAR ENDPOINT DE CHECKEO DE CONEXIÓN:
// Actualmente solo devuelve 'true' si hace conexión, y 'false' si no.
// Es mejor que devuelva un objeto con 
//  {
    // idStateRequest: number;
    // requestingUser: IUser;
    // receivingUser: IUser;
//  }

// NOTA: También añadir createdAt y updatedAt, para así saber cuando se respondió a la
// request (pues con el patchRequestById(idRequest: number, idStateRequest: number)
// se actualizaría este registro por única vez) y cuando se solicitó

// AHORA... en caso de querer añadir un chat, se deberá de crear otra entidad, llamada
// Messages, y esta contendrá registros de los mensajes que se vayan enviando, ahí si
// de la manera corta, y para traer los mensajes, en este caso se traerían todos los 
// registros que coincidad con requestingUser.id y receivingUser.id de forma simultanea
// en una funcion getRequestsByUserId(firstUserId: number, secondUserId: number)


// ES DECIR, debe hacerse de manera que se compruebe:

    // Traeme los registros en Messages 
    // WHERE (firstUserId == requestingUser.id || firstUserId == receivingUser.id) &&
    // (secondUserId == requestingUser.id || secondUserId == receivingUser.id)

export interface IMessagesNEW {
    id: number;
    content: string;
    requestingUser: IUser;
    receivingUser: IUser;
}

export interface IRequestsNEW {
    id: number;
    description: string;
    requestingUser: IUser;
    receivingUser: IUser;
    idStateRequest: number;
    createdAt: string;
    updatedAt: string | null;
}
