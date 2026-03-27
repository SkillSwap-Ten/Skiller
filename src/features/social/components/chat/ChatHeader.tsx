'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa'
import { isValidImageUrl } from '@/src/lib/utils/imageValidator'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { IChatHeaderProps } from '@/src/features/social/types/social.type'
import ButtonFeature from '@/src/shared/ui/atoms/buttons/ButtonFeature'
import ModalTips from '@/src/shared/ui/organisms/modals/ModalTips'
import ModalReport from '@/src/shared/ui/organisms/modals/ModalReport'
import styled from 'styled-components'
import NavLink from '@/src/shared/ui/atoms/links/NavLinks'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderBottombar};
  gap: 12px;
  height: 54px;
  flex-shrink: 0;
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

const Avatar = styled.div<{ $urlImage: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  background-image: url(${(props) => props.$urlImage});
  background-size: cover;
  background-position: center;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};
`

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: none;
  border: none;
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
  text-transform: capitalize;
  text-align: start;
  max-width: 32vw;

  @media (min-width: 360px) {
    max-width: 40vw;
  }
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

const HeaderNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  a {
    padding: 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }
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

const ChatHeader = ({ user, isMobile = false, onBack }: IChatHeaderProps) => {
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
        <HeaderNavigation>
          {onBack && (
            <BackButton
              onClick={onBack}
              aria-label="Volver"
            >
              <MdOutlineArrowBackIosNew />
            </BackButton>
          )}

          <NavLink hover={{ transform: 'scale(1.01)', transition: '0.4s' }} href={`/user/detail/u/${user.id}`} label="DETALLE" >
            <Avatar $urlImage={imageUrl} />
            <UserInfo>
              <UserName>{user.name}</UserName>
              <UserHandle>{user.category}</UserHandle>
            </UserInfo>
          </NavLink>
        </HeaderNavigation>

        <HeaderActions>
          <TipsButton type="button" onClick={openModalTips} aria-label="Control Button">
            <FaShieldAlt />
          </TipsButton>

          <ReportButton type="button" onClick={openModalReport} aria-label="Control Button">
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

export default ChatHeader;