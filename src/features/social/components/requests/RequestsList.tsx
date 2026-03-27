'use client'
import styled, { keyframes } from 'styled-components'
import { useState } from 'react'
import { IRequestsListProps } from '../../types/social.type'
import { timeAgo } from '@/src/lib/utils/timeAgoFormatter'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { IRequests } from '@/src/core/models/requests/requests.model'
import ModalRequestViewer from '@/src/shared/ui/organisms/modals/ModalRequestViewer'

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  gap: 12px;
  display: flex;
  flex-direction: column;
  animation: ${appear} 1s ease forwards;
`

const RequestItem = styled.div<{ $answered?: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.bgTertiary};
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  gap: 12px;
  text-align: left;
  opacity: ${({ $answered }) => ($answered ? 0.6 : 1)};
`

const Avatar = styled.button`
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  flex-shrink: 0;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 22px;
  overflow: hidden;
  box-shadow: inset 0 0 8px 4px #22222225;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.bgDark};
    filter: blur(4px); 
    transform: scale(1.1);
    z-index: 0;
  }

  svg {
    position: relative;
    z-index: 1;
  }
`

const RequestInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const RequestName = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textGrey};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`

const RequestDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textGrey};
  font-weight: 400;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const RequestTimeStamp = styled.p`
  color: ${({ theme }) => theme.colors.textGrey};
  font-size: 12px;
`

const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`

const ActionButton = styled.button<{ $variant: 'accept' | 'reject' }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: all 0.6s ease;

  background: ${({ $variant }) =>
    $variant === 'accept'
      ? 'rgba(74, 222, 128, 0.15)'
      : 'rgba(239, 68, 68, 0.15)'};

  color: ${({ $variant }) =>
    $variant === 'accept' ? '#4ade80' : '#ef4444'};

  &:hover {
    transform: scale(1.05);
    background: ${({ $variant }) =>
    $variant === 'accept'
      ? 'rgba(74, 222, 128, 0.5)'
      : 'rgba(239, 68, 68, 0.5)'};

    color: ${({ $variant }) =>
    $variant === 'accept' ? '#1C6336' : '#A12B2B'};
  }
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
`

const EmptyTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #fafafa;
  margin: 0;
`

const EmptySubtitle = styled.p`
  font-size: 14px;
  color: #a8a8a8;
  margin: 0;
  text-align: center;
  max-width: 260px;
  line-height: 1.4;
`

const ResponseBadge = styled.div<{ $type: 'accepted' | 'rejected' }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;

  color: ${({ $type }) =>
    $type === 'accepted' ? '#4ade80' : '#ef4444'};

  background: ${({ $type }) =>
    $type === 'accepted'
      ? 'rgba(74, 222, 128, 0.1)'
      : 'rgba(239, 68, 68, 0.1)'};
`

const RequestsList = ({ requests, onAccept, onReject }: IRequestsListProps) => {
  const [selectedRequest, setSelectedRequest] = useState<IRequests | null>(null)

  const openModalRequester = (req: IRequests) => {
    setSelectedRequest(req)
  }

  if (!requests || requests.length === 0) {
    return (
      <Container>
        <EmptyState>
          <EmptyTitle>Sin solicitudes</EmptyTitle>
          <EmptySubtitle>
            Cuando alguien te envíe una solicitud, aparecerá aquí.
          </EmptySubtitle>
        </EmptyState>
      </Container>
    )
  }

  const pendingRequests = requests.filter((r) => r.idStateRequest === 1)
  const answeredRequests = requests.filter((r) => r.idStateRequest !== 1)

  return (
    <Container>
      {pendingRequests.map((req) => (
        <RequestItem key={req.id}
        >
          <Avatar
            type="button"
            onClick={() => openModalRequester(req)}
            aria-label={`Ver detalle de Solicitud de ${req.userNameRequesting}`
            }
          >
            <FaRegEye />
          </Avatar>
          <RequestInfo>
            <RequestName>{req.userNameRequesting}</RequestName>
            <RequestDescription>{req.description}</RequestDescription>
            <RequestTimeStamp>
              {timeAgo(req.createdAt || new Date().toISOString())}
            </RequestTimeStamp>
          </RequestInfo>
          <ActionsContainer>
            <ActionButton
              $variant="accept"
              onClick={() => onAccept(req.id)}
              aria-label="Aceptar solicitud"
            >
              ✔
            </ActionButton>

            <ActionButton
              $variant="reject"
              onClick={() => onReject(req.id)}
              aria-label="Rechazar solicitud"
            >
              ✖
            </ActionButton>
          </ActionsContainer>
        </RequestItem>
      ))}

      {answeredRequests.map((req) => (
        <RequestItem key={req.id} $answered>
          <Avatar>
            <FaRegEyeSlash />
          </Avatar>
          <RequestInfo>
            <RequestName>{req.userNameRequesting}</RequestName>
          </RequestInfo>
          <ResponseBadge $type={req.idStateRequest === 2 ? 'accepted' : 'rejected'}>
            {req.idStateRequest === 2 ? 'Aceptada' : 'Rechazada'}
          </ResponseBadge>
        </RequestItem>
      ))}

      <ModalRequestViewer
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </Container>
  )
}

export default RequestsList;