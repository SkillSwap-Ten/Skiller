'use client'
import { ISidebarSocialProps } from '@/src/features/social/types/social.type'
import NoContentContainer from '@/src/shared/ui/organisms/containers/NoContentContainer'
import RequestsList from '@/src/features/social/components/requests/RequestsList'
import styled from 'styled-components'
import ChatList from '@/src/features/social/components/chat/ChatList'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.borderBottombar};
  padding: 1rem;
  gap: 1rem;

  & h1 {
    margin: 0;
    height: min-content;
    translate: 0 1rem;
    font-size: 70px;
    opacity: 0.15;
    padding-left: 1rem;
    color: ${({ theme }) => theme.colors.textGrey};
  }
`

const Banner = styled.article`
  background-color: ${({ theme }) => theme.colors.bgTertiary};
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-radius: 10px;
  width: 100%;
  min-height: 120px;
`

const BannerBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const TabsContainer = styled.div`
  display: flex;
  padding: 0 16px;
`

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding-bottom: 14px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textOrange : theme.colors.textTertiary};
  border-bottom: 2px solid
    ${({ $active, theme }) =>
    $active ? theme.colors.textOrange : theme.colors.textTertiary};
  transition: all 0.3s ease;
`

const SidebarSocial = ({ activeTab, onTabChange, selectedChatId, onSelectChat,
  chats, requests, onAccept, onReject, loading, error }: ISidebarSocialProps) => {
  if (loading) {
    return (
      <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e0e0e0">
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, borderRight: '1px solid #DDDDDD' }}>

          {/* Banner */}
          <Skeleton height={120} borderRadius={20} />

          {/* Tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: 20 }}>
            <Skeleton width={120} height={20} />
            <Skeleton width={120} height={20} />
          </div>

          {/* Search */}
          <Skeleton height={36} borderRadius={30} />

          {/* Chat list */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              {/* Avatar */}
              <Skeleton circle width={56} height={56} />

              {/* Text */}
              <div style={{ flex: 1 }}>
                <Skeleton height={16} width="60%" />
                <Skeleton height={12} width="40%" style={{ marginTop: 8 }} />
              </div>
            </div>
          ))}
        </div>
      </SkeletonTheme>
    )
  }

  if (error) {
    return (
      <SidebarContainer>
        <Banner>
          <BannerBody>
            <h1>Social</h1>
          </BannerBody>
        </Banner>

        <TabsContainer>
          <Tab
            $active={activeTab === 'mensajes'}
            onClick={() => onTabChange('mensajes')}
          >
            Mensajes
          </Tab>

          <Tab
            $active={activeTab === 'solicitudes'}
            onClick={() => onTabChange('solicitudes')}
          >
            Solicitudes
          </Tab>
        </TabsContainer>
        <NoContentContainer error={error} />
      </SidebarContainer>
    )
  }

  return (
    <SidebarContainer>
      <Banner>
        <BannerBody>
          <h1>Social</h1>
        </BannerBody>
      </Banner>

      <TabsContainer>
        <Tab
          $active={activeTab === 'mensajes'}
          onClick={() => onTabChange('mensajes')}
        >
          Mensajes
        </Tab>

        <Tab
          $active={activeTab === 'solicitudes'}
          onClick={() => onTabChange('solicitudes')}
        >
          Solicitudes
        </Tab>
      </TabsContainer>

      {activeTab === 'mensajes' && (
        <ChatList
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={onSelectChat}
        />
      )}

      {activeTab === 'solicitudes' && (
        <RequestsList
          requests={requests}
          onAccept={onAccept}
          onReject={onReject}
        />
      )}
    </SidebarContainer>
  )
}

export default SidebarSocial;