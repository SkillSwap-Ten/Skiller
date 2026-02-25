import { LuSend } from 'react-icons/lu';
// ------------------------------------------------------------------------------

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
    idReceivingUser: number;
    idRequestingUser: number;
    userNameReceiving: string;
    userNameRequesting: string;

    urlImageReceiving: string;
    urlImageRequesting: string;
    idStateRequest?: number // 1 = Pendiente, 2 = Aceptada, 3 = Rechazada
    createdAt?: string
    updatedAt?: string | null
}

// ----------------------------------------------------------------------------------------

// idStateRequest = 1 (Esperar) 
// Equivalente a pendientes desde la perspectiva del receivingUser 
// Equivalente a enviados desde la perspectiva del requestingUser
// (esto solo será determinante en las RequestsMetrics)
// idStateRequest = 2 (Aceptar)
// Equivalente a que receivingUser acepte
// idStateRequest = 3 (Rechazar)
// Equivalente a que receivingUser rechace

// ----------------------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------------------

// AHORA... en caso de querer añadir un chat, se deberá de crear otra entidad, llamada
// Messages, y esta contendrá registros de los mensajes que se vayan enviando,
//  y para traer los mensajes, en este caso se traerían todos los 
// registros que coincidad con requestingUser.id y receivingUser.id de forma simultanea
// en una funcion getRequestsByUserId(userId: number)

// ES DECIR, debe hacerse de manera que se compruebe:

// Traeme los registros en Messages 
// donde (senderId = userId y receiverId = otherUserId) o (senderId = otherUserId y receiverId = userId)
// Y luego se ordenen por fecha de creación, para así mostrar el chat de manera cronológica
// y luego se agrupan por chatId, para así mostrar cada chat con su respectivo historial

// TAMBIEN debe de hacerse que cada vez que se acepte una solicitud, se cree un nuevo chat entre el 
// requestingUser y el receivingUser, para así tener un historial de mensajes asociado a esa conexión.

// ----------------------------------------------------------------------------------------

export interface IMessages {
    id: number
    content: string
    senderId: number
    senderUrlImage: string
    senderName?: string
    receiverId: number
    receiverUrlImage: string
    receiverName?: string
    chatId: number
    createdAt: string
}

export interface IChats {
    id: number;
    otherUserId: number;
    otherUserName: string;
    otherUserUrlImage: string;
    lastMessage: string;
    lastMessageDate: string;
    unanswered: boolean
}