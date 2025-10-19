import { IRequestConnectionsResponse, IRequestMetricsResponse, IRequestResponse } from '@/src/core/dto/requests/requests.dto';
import { getCurrentUserId } from '@/src/lib/utils/getCurrentUserId';
import { IRequestMetrics, IRequests } from '@/src/core/models/requests/requests.model';
import apiClient from '../apiClient';

// Función para obtener métricas de solicitudes de conexión de un usuario por su ID
export const getRequestMetricsByUserId = async (userId: number): Promise<IRequestMetrics> => {
  try {
    const response: IRequestMetricsResponse = await apiClient(
      `RequestsGet/GetRequestById/${userId}`, {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
    });

    if (response && response?.message === "Success") {
      return response.data.response;
    } else {
      throw new Error(response?.message || 'Error al obtener métricas de las solicitudes');
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRequestsByUserId = async (userId: number): Promise<IRequests[]> => {
  try {
    const response: IRequestResponse = await apiClient(
      `RequestsGet/GetRequestMessagesById/${userId}`, {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
    }
    );

    if (response?.message === "Success") {
      return response.data.response;
    } else {
      throw new Error(response?.message || 'Error al obtener solicitudes');
    }
  } catch (error) {
    console.error("Error obteniendo solicitudes:", error);
    throw error;
  }
};

export const getCheckRequestConnection = async (currentUserId: number, requestUserId: number): Promise<boolean> => {
  try {
    const response: IRequestConnectionsResponse = await apiClient(
      `RequestsGet/GetRequestViewDetails?currectId=${currentUserId}&requestId=${requestUserId}`,
      {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
      }
    );

    if (response?.message === "Success") {
      return response.data.response;
    } else {
      throw new Error(response?.message || 'Error al obtener estado de la conexión');
    }
  } catch (err) {
    console.error("Error al verificar conexión:", err);
    throw err;
  }
};

export const postConnectionRequest = async (idReceivingUser: number, message: string) => {
  const idRequestingUser = getCurrentUserId();

  const requestBody = {
    disponibilitySchedule: "string",
    description: message,
    idReceivingUser,
    idRequestingUser,
  };

  try {
    const response = await apiClient('RequestsPost/PostRequestCreate', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const patchRequestById = async (idRequest: number, idStateRequest: number) => {
  try {
    const response = await apiClient(`RequestsPatch/PatchRequestState/${idRequest}`,
      {
        method: 'PATCH',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idStateRequest }),
      }
    );

    console.log('Estado de la solicitud actualizado:', response.details);
    return response;
  } catch (error) {
    console.error('Error al hacer el PATCH:', error);
    throw error;
  }
};