'use client'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IUser } from '@/src/core/models/users/users.model'
import { FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa'
import { isValidImageUrl } from '@/src/lib/utils/imageValidator'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import ButtonFeature from '@/src/shared/ui/atoms/buttons/ButtonFeature'
import ModalTips from '@/src/shared/ui/organisms/modals/ModalTips'
import ModalReport from '@/src/shared/ui/organisms/modals/ModalReport'

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderBottombar};
  gap: 12px;
  min-height: 60px;
  background: ${({ theme }) => theme.colors.bgTertiary};
`

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textGrey};
  display: flex;
  align-items: center;
  padding: 4px;
  font-size: 18px;
  opacity: 0.5;

  &:hover {
    opacity: 0.7;
  }
`

const Avatar = styled.button<{ urlImage: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  background-image: url(${(props) => props.urlImage});
  background-size: cover;
  background-position: center;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
  cursor: pointer;
`

const UserInfo = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  min-width: 0;
`

const UserName = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textGrey};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const UserHandle = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textGrey};
  margin: 0;
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const TipsButton = styled(ButtonFeature)`
  width: 2.5rem;
  height: 2.5rem;
  color: ${({ theme }) => theme.colors.textGrey};
  background: transparent;
  transition: 0.3s ease-in-out;

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: 0.4s;
    background-color: ${({ theme }) => theme.colors.bgBanner};
  }
`

const ReportButton = styled(ButtonFeature)`
  width: 2.5rem;
  height: 2.5rem;
  color: ${({ theme }) => theme.colors.textGrey};
  background: transparent;
  transition: 0.3s ease-in-out;

  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: 0.4s;
    background-color: ${({ theme }) => theme.colors.bgBanner};
  }
`

interface IChatHeaderProps {
  user: IUser
  isMobile?: boolean
  onBack?: () => void
}

export default function ChatHeader({
  user,
  isMobile = false,
  onBack,
}: IChatHeaderProps) {
  const router = useRouter()

  const [isModalReportOpen, setIsModalReportOpen] = useState(false)
  const [isModalTipsOpen, setIsModalTipsOpen] = useState(false)

  const openModalReport = () => setIsModalReportOpen(true)
  const closeModalReport = () => setIsModalReportOpen(false)

  const openModalTips = () => setIsModalTipsOpen(true)
  const closeModalTips = () => setIsModalTipsOpen(false)

  const [imageUrl, setImageUrl] = useState<string>(
    '/img/default-picture-full.webp'
  )

  useEffect(() => {
    const checkImageUrl = (url: string) => {
      const img = new Image()
      img.src = url

      img.onload = () => {
        setImageUrl(url)
      }

      img.onerror = () => {
        setImageUrl('/img/default-picture-full.webp')
      }
    }

    if (user?.urlImage && isValidImageUrl(user.urlImage)) {
      checkImageUrl(user.urlImage)
    } else {
      setImageUrl('/img/default-picture-full.webp')
    }
  }, [user?.urlImage])

  return (
    <>
      <HeaderContainer>
        {onBack && (
          <BackButton
            onClick={onBack}
            aria-label="Volver"
          >
            <MdOutlineArrowBackIosNew />
          </BackButton>
        )}

        <Avatar type="button" onClick={() => router.push(`/user/detail/u/${user.id}`)} aria-label={`Ver perfil de ${user.name}`} urlImage={imageUrl} />

        <UserInfo type="button" onClick={() => router.push(`/user/detail/u/${user.id}`)} aria-label={`Ver perfil de ${user.name}`}>
          <UserName>{user.name}</UserName>
          <UserHandle>{user.category}</UserHandle>
        </UserInfo>

        <HeaderActions>
          <TipsButton type="button" onClick={openModalTips}>
            <FaShieldAlt />
          </TipsButton>

          <ReportButton type="button" onClick={openModalReport}>
            <FaExclamationTriangle />
          </ReportButton>
        </HeaderActions>
      </HeaderContainer>

      <ModalTips isOpen={isModalTipsOpen} onClose={closeModalTips} />
      <ModalReport
        isOpen={isModalReportOpen}
        onClose={closeModalReport}
        userToInteractWith={{
          ...user,
          fullName: user.name || '',
          id: user.id || 0
        }}
      />
    </>
  )
}