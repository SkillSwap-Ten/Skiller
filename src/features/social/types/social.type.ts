import { IChats, IMessages, IRequests } from "@/src/core/models/requests/requests.model"
import { IUser } from "@/src/core/models/users/users.model"

export type TabType = 'mensajes' | 'solicitudes'

export interface ISidebarSocialProps {
    activeTab: TabType
    onTabChange: (tab: TabType) => void
    selectedChatId?: number
    onSelectChat: (id: number) => void
    chats: IChats[]
    requests: IRequests[]
    onAccept: (id: number) => void
    onReject: (id: number) => void
    loading: boolean;
    error: string | null;
}

export interface IChatWindowProps {
    chat: IChats
    messages: IMessages[]
    refreshMessages: () => void
    onBack?: () => void
}

export interface IChatsListProps {
    chats: IChats[]
    selectedChatId?: number
    onSelectChat: (id: number) => void
}

export interface IChatHeaderProps {
    user: IUser
    onBack?: () => void
}

export interface IRequestsListProps {
    requests: IRequests[]
    onAccept: (id: number) => void
    onReject: (id: number) => void
}

export interface IModalRequestProps {
    request: IRequests | null
    onClose: () => void
    isOpen: boolean
}