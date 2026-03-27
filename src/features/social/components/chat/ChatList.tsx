'use client'
import styled, { keyframes } from 'styled-components'
import { useEffect, useState } from 'react'
import { isValidImageUrl } from '@/src/lib/utils/imageValidator'
import { IChatsListProps } from '../../types/social.type'
import { LuSearch } from 'react-icons/lu'
import { timeAgo } from '@/src/lib/utils/timeAgoFormatter'

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

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.bgDark};
  border-radius: 32px;
  padding: 8px 12px;
  gap: 8px;
`

const SearchField = styled.input`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textGrey};
  font-size: 14px;
  width: 100%;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textGrey};
  }
`

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.bgTertiary};
  border-radius: 8px;
  padding: 8px;
  animation: ${appear} 1s ease forwards;
`

const ChatItem = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.bgDark : 'transparent'};
  border: none;
  cursor: pointer;
  gap: 12px;
  transition: 0.6s ease-in-out;
  text-align: left;
`

const Avatar = styled.div<{ $urlImage: string }>`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  flex-shrink: 0;
  background-image: url(${(props) => props.$urlImage});
  background-size: cover;
  background-position: center;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
`

const ChatInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const ChatName = styled.p<{ $unanswered: boolean }>`
  font-size: 14px;
  font-weight: ${({ $unanswered }) =>
    $unanswered ? '700' : '600'} !important;
  color: ${({ $unanswered, theme }) =>
    $unanswered ? theme.colors.textSecondary : theme.colors.textGrey};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`

const ChatPreview = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`

const ChatPreviewText = styled.p<{ $unanswered: boolean }>`
  font-size: 14px;
  color: ${({ $unanswered, theme }) =>
    $unanswered ? theme.colors.textSecondary : theme.colors.textGrey};
  font-weight: ${({ $unanswered }) =>
    $unanswered ? '500' : '400'} !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ChatTimeStamp = styled.p`
  color: ${({ theme }) => theme.colors.textGrey};
  font-size: 12px;
`

const UnansweredDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.textOrange};
  flex-shrink: 0;
`

const ChatList = ({ chats, selectedChatId, onSelectChat }: IChatsListProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [validatedImages, setValidatedImages] = useState<
    Record<number, string>
  >({})

  useEffect(() => {
    const validateImage = (chatId: number, url?: string) => {
      if (!url || !isValidImageUrl(url)) {
        setValidatedImages((prev) => ({
          ...prev,
          [chatId]: '/img/default-picture-full.webp',
        }))
        return
      }

      const img = new Image()
      img.src = url

      img.onload = () => {
        setValidatedImages((prev) => ({
          ...prev,
          [chatId]: url,
        }))
      }

      img.onerror = () => {
        setValidatedImages((prev) => ({
          ...prev,
          [chatId]: '/img/default-picture-full.webp',
        }))
      }
    }

    chats.forEach((chat) => {
      validateImage(chat.id, chat.otherUserUrlImage)
    })
  }, [chats])

  const filteredChats = chats.filter((chat) =>
    chat.otherUserName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <SearchInput>
        <LuSearch />
        <SearchField
          placeholder="Buscar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchInput>

      <Container>
        {filteredChats.map((chat) => (
          <ChatItem
            key={chat.id}
            $active={chat.id === selectedChatId}
            onClick={() => onSelectChat(chat.id)}
          >
            <Avatar
              $urlImage={
                validatedImages[chat.id] ||
                '/img/default-picture-full.webp'
              }
            />

            <ChatInfo>
              <ChatName $unanswered={chat.unanswered}>
                {chat.otherUserName}
              </ChatName>

              <ChatPreview>
                <ChatPreviewText $unanswered={chat.unanswered}>
                  {chat.lastMessage}
                </ChatPreviewText>
                <ChatTimeStamp>
                  {timeAgo(chat.lastMessageDate)}
                </ChatTimeStamp>
              </ChatPreview>
            </ChatInfo>

            {chat.unanswered && <UnansweredDot />}
          </ChatItem>
        ))}
      </Container>
    </>
  )
}

export default ChatList;