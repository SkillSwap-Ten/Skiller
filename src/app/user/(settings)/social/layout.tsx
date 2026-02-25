'use client'
import styled from 'styled-components'
import SocialSidebar from '@/src/features/social/SocialSidebar';
import ChatWindow from '@/src/features/social/chat/ChatWindow';
import React, { useState, useCallback, useEffect } from 'react'
import { IChats, IMessages, IRequests } from "@/src/core/models/requests/requests.model";
import { getChatsByUserId, getMessagesByChatId, getRequestsByUserId, patchRequestById } from '@/src/app/api/requests/requests';
import { getAuthData } from "@/src/lib/utils/getAuthData";
import { toast } from "react-toastify";
import { MOCK_CHATS, MOCK_MESSAGES, MOCK_REQUESTS } from '@/src/app/mock-data';

import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LayoutWrapper = styled.div`
  display: flex;
  height: 100dvh;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0;
  padding: 54px 0;
`

const SidebarWrapper = styled.div<{ $isChatOpen: boolean }>`
  width: 400px;
  max-width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition: transform 2s ease;

  @media (max-width: 768px) {
    width: 100%;
    transform: ${({ $isChatOpen }) =>
    $isChatOpen ? "translateX(-100%)" : "translateX(0)"};
    transition: transform 2s ease-in-out;
  }
`

const MainContent = styled.div<{ $isChatOpen: boolean }>`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 2s ease-in-out;

  @media (max-width: 768px) {
    padding:  54px 0;
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.bgPrimary};
    z-index: 2;

    transform: ${({ $isChatOpen }) =>
    $isChatOpen ? "translateX(0)" : "translateX(100%)"};
    transition: transform 2s ease-in-out;
  }
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.textNeutral};
  gap: 16px;
  padding: 40px;
`

const EmptyIcon = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.textNeutral};
  display: flex;
  align-items: center;
  justify-content: center;
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

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ---------------- STATE ----------------
  const [activeTab, setActiveTab] = useState<"mensajes" | "solicitudes">(
    "mensajes"
  );
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const [chats, setChats] = useState<IChats[]>([]);
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [requestsData, setRequestsData] = useState<IRequests[]>([]);

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
    setMessages(MOCK_MESSAGES);
  }, []);

  // ---------------- FETCH REQUESTS ----------------
  const fetchRequests = useCallback(async () => {
    if (!currentUserId) return;
    //const data = await getRequestsByUserId(currentUserId);
    //setRequestsData(data);
    setRequestsData(MOCK_REQUESTS);

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

  const selectedChat = chats.find((c) => c.id === selectedChatId);

  const isChatOpen = !!selectedChatId;

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

      setRequestsData((prev) =>
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

      setRequestsData((prev) =>
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
        <LayoutWrapper>
          <SidebarWrapper style={{ overflowY: 'scroll' }} $isChatOpen={false}>
            <SocialSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              selectedChatId={selectedChatId || undefined}
              onSelectChat={handleSelectChat}
              chats={chats}
              requests={requestsData}
              onAccept={handleAccept}
              onReject={handleReject}
              loading={loading}
              error={error}
            />
          </SidebarWrapper>
          <Disappear>
            <EmptyState>
              <EmptyIcon>
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
              </EmptyIcon>
              <EmptyTitle>Tu propio <Emphasis>@feed</Emphasis> social</EmptyTitle>
              <EmptySubtitle>
                Envia mensajes privados y gestiona solicitudes de conexión.
              </EmptySubtitle>
              <SocialText>Compartir y conectar</SocialText>
            </EmptyState>
          </Disappear>
        </LayoutWrapper>
      </SkeletonTheme>
    );
  }

  // ---------------- ERROR ----------------
  if (error) {
    return (
      <LayoutWrapper>
        <SidebarWrapper style={{ overflowY: 'scroll' }} $isChatOpen={false}>
          <SocialSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedChatId={selectedChatId || undefined}
            onSelectChat={handleSelectChat}
            chats={chats}
            requests={requestsData}
            onAccept={handleAccept}
            onReject={handleReject}
            loading={loading}
            error={error}
          />
        </SidebarWrapper>
        <Disappear>
          <EmptyState>
            <EmptyIcon>
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
            </EmptyIcon>
            <EmptyTitle>Tu propio <Emphasis>@feed</Emphasis> social</EmptyTitle>
            <EmptySubtitle>
              Envia mensajes privados y gestiona solicitudes de conexión.
            </EmptySubtitle>
            <SocialText>Compartir y conectar</SocialText>
          </EmptyState>
        </Disappear>
      </LayoutWrapper>
    );
  }

  // ---------------- RENDER ----------------
  return (
    <LayoutWrapper>
      <SidebarWrapper $isChatOpen={isChatOpen}>
        <SocialSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedChatId={selectedChatId || undefined}
          onSelectChat={handleSelectChat}
          chats={chats}
          requests={requestsData}
          onAccept={handleAccept}
          onReject={handleReject}
          loading={loading}
          error={error}
        />
      </SidebarWrapper>

      <MainContent $isChatOpen={isChatOpen}>
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            messages={messages}
            refreshMessages={() => fetchMessages(selectedChat.id)}
            onBack={handleBackFromChat}
          />
        ) : (
          <EmptyState>
            <EmptyIcon>
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
            </EmptyIcon>
            <EmptyTitle>Tu propio <Emphasis>@feed</Emphasis> social</EmptyTitle>
            <EmptySubtitle>
              Envia mensajes privados y gestiona solicitudes de conexión.
            </EmptySubtitle>
            <SocialText>Compartir y conectar</SocialText>
          </EmptyState>
        )}
      </MainContent>
    </LayoutWrapper>
  );
}