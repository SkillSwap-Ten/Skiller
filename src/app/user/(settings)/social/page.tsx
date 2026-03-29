'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MOCK_CHATS, MOCK_MESSAGES, MOCK_REQUESTS } from '@/src/app/mock-data';

// --------------------------------------------------------------------------------------------- //
// -------------------------------------- FASE BETA -------------------------------------------- //
// --------------------------------------------------------------------------------------------- //

import styled from 'styled-components'
import ChatWindow from '@/src/features/social/components/chat/ChatWindow';
import SidebarSocial from '@/src/shared/ui/organisms/sidebars/SidebarSocial';
import { useState, useCallback, useEffect, useRef } from 'react'
import { IChats, IMessages, IRequests } from "@/src/core/models/requests/requests.model";
import { getChatsByUserId, getMessagesByChatId, getRequestsByUserId, patchRequestById } from '@/src/app/api/requests/requests';
import { getAuthData } from "@/src/lib/utils/getAuthData";
import { IoChatbubbleOutline } from 'react-icons/io5';
import { toast } from "react-toastify";

import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PageWrapper = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  width: 100%;
  height: 100dvh;
  min-height: 548px;
  padding: 54px 0 !important;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const ContentViewport = styled.div`
  flex: 1;
  width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const SliderTrack = styled.div<{ $isChatOpen: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 0;
  will-change: transform;
  transition: transform 1200ms cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 768px) {
    width: 100%;
    transform: ${({ $isChatOpen }) =>
    $isChatOpen
      ? "translateX(-100%)"
      : "translateX(0)"
  };
  }
`

const SidebarWrapper = styled.div`
  width: 400px;
  max-width: 100%;
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 768px) {
    width: 100%;
    flex: 0 0 100%;
  }
`;

const MainContent = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bgPrimary};
  min-height: 0;

  @media (max-width: 768px) {
    width: 100%;
    flex: 0 0 100%;
  }
`

const EmptyState = styled.div<{ $isChatOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.textNeutral};
  gap: 16px;
  padding: 40px;

  @media (max-width: 768px) {
    width: 100%;
    display: none;
  }
`

const EmptyIcon = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.textNeutral};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`

const EmptyTitle = styled.h2`
  font-size: 22px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textNeutral};
  margin: 0;
`

const Emphasis = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textOrange};
  margin: 0;
`

const EmptySubtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textGrey};
  margin: 0;
  text-align: center;
  line-height: 1.5;
`

const SocialText = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.textNeutral};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textNeutral};
  background: ${({ theme }) => theme.colors.bgTertiary};
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  margin-top: 8px;
  transition: 1s ease-in-out;
`

const Disappear = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 2s ease-in-out;

  @media (max-width: 768px) {
    display: none;
  }
`

const SocialPage = () => {
  const [activeTab, setActiveTab] = useState<"mensajes" | "solicitudes">("mensajes");
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState<IChats[]>([]);
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [requests, setRequests] = useState<IRequests[]>([]);

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---------------- GET AUTH DATA ----------------
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = getAuthData("id");

      if (!id) {
        setError("ID de usuario no encontrado");
        setLoading(false);
        return;
      }

      setCurrentUserId(id);
    }
  }, []);

  // ---------------- FETCH CHATS ----------------
  const fetchChats = useCallback(async () => {
    if (!currentUserId) return;
    //const data = await getChatsByUserId(currentUserId);
    //setChats(data);
    setChats(MOCK_CHATS);

  }, [currentUserId]);

  // ---------------- FETCH MESSAGES ----------------
  const fetchMessages = useCallback(async (chatId: number) => {
    //const data = await getMessagesByChatId(chatId);
    //setMessages(data);
    const filtered = MOCK_MESSAGES.filter(m => m.chatId === chatId);
    setMessages(filtered);
  }, []);

  // ---------------- FETCH REQUESTS ----------------
  const fetchRequests = useCallback(async () => {
    if (!currentUserId) return;
    //const data = await getRequestsByUserId(currentUserId);
    //setRequests(data);
    setRequests(MOCK_REQUESTS);

  }, [currentUserId]);

  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    if (!currentUserId) return;

    const init = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchChats(), fetchRequests()]);
      } catch (err) {
        console.error(err);
        setError("Error cargando datos");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [currentUserId, fetchChats, fetchRequests]);

  // ---------------- CHAT HANDLERS ----------------
  const handleSelectChat = useCallback(
    async (chatId: number) => {
      setSelectedChatId(chatId);
      await fetchMessages(chatId);
    },
    [fetchMessages]
  );

  const handleBackFromChat = useCallback(() => {
    setSelectedChatId(null);
  }, []);

  const selectedChat = chats.find((c) => Number(c.id) === Number(selectedChatId));
  const isChatOpen = !!selectedChatId;

  useEffect(() => {
    if (!sidebarRef.current) return;

    sidebarRef.current.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto"
    });
  }, [isChatOpen]);

  // ---------------- REQUEST PATCH ----------------
  const updateRequestState = async (
    idRequest: number,
    idStateRequest: number
  ) => {
    try {
      return await patchRequestById(idRequest, idStateRequest);
    } catch (error) {
      console.error("Error al hacer el PATCH:", error);
      throw error;
    }
  };

  // ---------------- ACCEPT ----------------
  const handleAccept = async (id: number) => {
    try {
      await updateRequestState(id, 2);

      setRequests((prev) =>
        prev.filter((request) => request.id !== id)
      );

      toast.success("¡Solicitud aceptada con éxito!");

      // Refrescamos chats por si se creó uno nuevo
      await fetchChats();
    } catch (error) {
      console.error("Error al aceptar:", error);
      toast.error("Error al aceptar la solicitud.");
    }
  };

  // ---------------- REJECT ----------------
  const handleReject = async (id: number) => {
    try {
      await updateRequestState(id, 3);

      setRequests((prev) =>
        prev.filter((request) => request.id !== id)
      );

      toast.warning("¡Solicitud rechazada con éxito!");
    } catch (error) {
      console.error("Error al rechazar:", error);
      toast.error("Error al rechazar la solicitud.");
    }
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
        <PageWrapper>
          <ContentViewport>
            <SliderTrack $isChatOpen={false}>
              <SidebarWrapper>
                <SidebarSocial
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  selectedChatId={selectedChatId || undefined}
                  onSelectChat={handleSelectChat}
                  chats={chats}
                  requests={requests}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  loading={loading}
                  error={error}
                />
              </SidebarWrapper>
              <Disappear>
                <EmptyState $isChatOpen={true}>
                  <EmptyIcon>
                    <IoChatbubbleOutline />
                  </EmptyIcon>
                  <EmptyTitle>Tu propio <Emphasis>@feed</Emphasis> social</EmptyTitle>
                  <EmptySubtitle>
                    Envia mensajes privados y gestiona solicitudes de conexión.
                  </EmptySubtitle>
                  <SocialText>Compartir y conectar</SocialText>
                </EmptyState>
              </Disappear>
            </SliderTrack>
          </ContentViewport>
        </PageWrapper>
      </SkeletonTheme>
    );
  }

  // ---------------- ERROR ----------------
  if (error) {
    return (
      <PageWrapper>
        <ContentViewport>
          <SliderTrack $isChatOpen={false}>
            <SidebarWrapper>
              <SidebarSocial
                activeTab={activeTab}
                onTabChange={setActiveTab}
                selectedChatId={selectedChatId || undefined}
                onSelectChat={handleSelectChat}
                chats={chats}
                requests={requests}
                onAccept={handleAccept}
                onReject={handleReject}
                loading={loading}
                error={error}
              />
            </SidebarWrapper>
            <Disappear>
              <EmptyState $isChatOpen={true}>
                <EmptyIcon>
                  <IoChatbubbleOutline />
                </EmptyIcon>
                <EmptyTitle>Tu propio <Emphasis>@feed</Emphasis> social</EmptyTitle>
                <EmptySubtitle>
                  Envia mensajes privados y gestiona solicitudes de conexión.
                </EmptySubtitle>
                <SocialText>Compartir y conectar</SocialText>
              </EmptyState>
            </Disappear>
          </SliderTrack>
        </ContentViewport>
      </PageWrapper>
    );
  }

  // ---------------- RENDER ----------------
  return (
    <PageWrapper>
      <ContentViewport>
        <SliderTrack $isChatOpen={isChatOpen}>

          <SidebarWrapper ref={sidebarRef}>
            <SidebarSocial
              activeTab={activeTab}
              onTabChange={setActiveTab}
              selectedChatId={selectedChatId || undefined}
              onSelectChat={handleSelectChat}
              chats={chats}
              requests={requests}
              onAccept={handleAccept}
              onReject={handleReject}
              loading={loading}
              error={error}
            />
          </SidebarWrapper>

          <MainContent>
            {selectedChat ? (
              <ChatWindow
                chat={selectedChat}
                messages={messages}
                refreshMessages={() =>
                  fetchMessages(selectedChat.id)
                }
                onBack={handleBackFromChat}
              />
            ) : (
              <EmptyState $isChatOpen={isChatOpen}>
                <EmptyIcon>
                  <IoChatbubbleOutline />
                </EmptyIcon>
                <EmptyTitle>Tu propio <Emphasis>@feed</Emphasis> social</EmptyTitle>
                <EmptySubtitle>
                  Envia mensajes privados y gestiona solicitudes de conexión.
                </EmptySubtitle>
                <SocialText>Compartir y conectar</SocialText>
              </EmptyState>
            )}
          </MainContent>

        </SliderTrack>
      </ContentViewport>
    </PageWrapper>
  );
}

export default SocialPage;
