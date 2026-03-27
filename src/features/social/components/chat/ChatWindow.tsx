'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { getAuthData } from '@/src/lib/utils/getAuthData'
import { postMessage } from '@/src/app/api/requests/requests'
import { isValidImageUrl } from '@/src/lib/utils/imageValidator'
import { IoSend } from 'react-icons/io5'
import { IChatWindowProps } from '../../types/social.type'
import ChatHeader from './ChatHeader'
import styled from 'styled-components'

const WindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  min-height: 0;
  flex: 1;
`

const MessagesArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overscroll-behavior: contain;
`

const MessageRow = styled.div<{ $isOwn: boolean }>`
  display: flex;
  justify-content: ${({ $isOwn }) =>
        $isOwn ? 'flex-end' : 'flex-start'};
  align-items: flex-end;
  gap: 8px;
`

const MessageBubble = styled.div<{ $isOwn: boolean }>`
  max-width: 65%;
  padding: 10px 14px;
  border-radius: 20px;
  font-size: 14px;
  line-height: 1.4;
  color: ${({ $isOwn, theme }) =>
        $isOwn ? theme.colors.textWhite : theme.colors.textSecondary};
  background: ${({ $isOwn, theme }) =>
        $isOwn ? theme.colors.textOrange : theme.colors.bgDark};
  word-wrap: break-word;
`

const SenderAvatar = styled.div<{ $urlImage: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  flex-shrink: 0;
  background-image: url(${(props) => props.$urlImage});
  background-size: cover;
  background-position: center;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
`

const InputArea = styled.div`
  padding: 12px 16px;
  flex-shrink: 0;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.bgDark};
  border-radius: 22px;
  padding: 8px 16px;
  gap: 12px;
`

const MessageInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textGrey};
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textGrey};
  }
`

const SendButton = styled.button<{ $hasText: boolean }>`
  background: none;
  border: none;
  cursor: ${({ $hasText }) =>
        $hasText ? 'pointer' : 'default'};
  color: ${({ $hasText, theme }) =>
        $hasText ? theme.colors.textOrange : theme.colors.textGrey};
  transition: color 0.4s ease;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`

const DateDivider = styled.div`
  align-self: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textGrey};
  margin: 12px 0;
`

const MessageCounter = styled.div<{ $low: boolean }>`
  flex-shrink: 0;
  font-size: 12px;
  padding: 4px 16px;
  color: ${({ $low, theme }) =>
    $low ? theme.colors.textOrange : theme.colors.textGrey};
`

const LimitReached = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textGrey};
  background-color: ${({ theme }) => theme.colors.bgOrange};
`

const LimitTitle = styled.h4`
  margin: 8px 0;
  color: ${({ theme }) => theme.colors.textOrange};
`

const LimitText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textOrange};
`

const LimitIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.textOrange};
`

const ChatWindow = ({ chat, messages, refreshMessages, isMobile = false, onBack }: IChatWindowProps) => {
    const [newMessage, setNewMessage] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const currentUserId = getAuthData('id')

    const [avatarUrl, setAvatarUrl] = useState<string>(
        '/img/default-picture-full.webp'
    )

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
        })
    }, [])

    useEffect(() => {
        const checkImageUrl = (url: string) => {
            const img = new Image()
            img.src = url

            img.onerror = () => {
                setAvatarUrl('/img/default-picture-full.webp')
            }

            img.onload = () => {
                setAvatarUrl(url)
            }
        }

        if (
            chat?.otherUserUrlImage &&
            isValidImageUrl(chat.otherUserUrlImage)
        ) {
            checkImageUrl(chat.otherUserUrlImage)
        } else {
            setAvatarUrl('/img/default-picture-full.webp')
        }
    }, [chat?.otherUserUrlImage])

    useEffect(() => {
        scrollToBottom()
    }, [messages, scrollToBottom])

    const handleSend = async () => {
        if (!newMessage.trim()) return

        await postMessage(
            chat.id,
            chat.otherUserId,
            newMessage
        )

        setNewMessage('')
        refreshMessages()
    }

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const MAX_MESSAGES = 10

    const sentMessages = messages.filter(
        (msg) => msg.senderId === currentUserId
    ).length

    const remaining = MAX_MESSAGES - sentMessages
    const limitReached = remaining <= 0

    const formatMessageDate = (dateString: string) => {
        const date = new Date(dateString)

        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    }

    const isDifferentDay = (
        current: string,
        previous?: string
    ) => {
        if (!previous) return true

        const currentDate = new Date(current).toDateString()
        const previousDate = new Date(previous).toDateString()

        return currentDate !== previousDate
    }

    return (
        <WindowContainer>
            <ChatHeader
                user={{
                    id: chat.otherUserId,
                    name: chat.otherUserName,
                    urlImage: chat.otherUserUrlImage,
                }}
                isMobile={isMobile}
                onBack={onBack}
            />

            <MessagesArea>
                {messages.map((msg, index) => {
                    const isOwn = msg.senderId === currentUserId
                    const previousMessage = messages[index - 1]

                    const showDateDivider = isDifferentDay(
                        msg.createdAt,
                        previousMessage?.createdAt
                    )

                    return (
                        <React.Fragment key={msg.id}>
                            {showDateDivider && (
                                <DateDivider>
                                    {formatMessageDate(msg.createdAt)}
                                </DateDivider>
                            )}

                            <MessageRow $isOwn={isOwn}>
                                {!isOwn && (
                                    <SenderAvatar $urlImage={avatarUrl} />
                                )}

                                <MessageBubble $isOwn={isOwn}>
                                    {msg.content}
                                </MessageBubble>
                            </MessageRow>
                        </React.Fragment>
                    )
                })}

                <div ref={messagesEndRef} />
            </MessagesArea>

            <MessageCounter $low={remaining <= 5 && remaining > 0}>
                {remaining > 0
                    ? `${remaining} mensaje${remaining === 1 ? '' : 's'} restante${remaining === 1 ? '' : 's'} de ${MAX_MESSAGES}`
                    : ''}
            </MessageCounter>

            {limitReached ? (
                <LimitReached>
                    <LimitIcon>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                        </svg>
                    </LimitIcon>

                    <LimitTitle>Límite de mensajes alcanzado</LimitTitle>

                    <LimitText>
                        Has enviado tus {MAX_MESSAGES} mensajes disponibles en esta conversación.
                        No puedes enviar más mensajes por el momento.
                    </LimitText>
                </LimitReached>
            ) : (
                <InputArea>
                    <InputWrapper>
                        <MessageInput
                            placeholder="Envía un mensaje..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />

                        <SendButton
                            $hasText={!!newMessage.trim()}
                            onClick={handleSend}
                            disabled={!newMessage.trim()}
                        >
                            <IoSend />
                        </SendButton>
                    </InputWrapper>
                </InputArea>
            )}
        </WindowContainer>
    )
}

export default ChatWindow;
