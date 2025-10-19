'use client';
import styled from 'styled-components';

const FullScreenLoader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bgNotFound};
  position: fixed;
  top: 0;
  left: 0;

  & section{
    width: 100vw;
  }
`;

const NotFoundText = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  overflow: hidden;
  gap: 3rem;
  position: relative;
  width: 100vw;

  & p{
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.5;
  }
`;

const P = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 200;
  font-size: 1.2rem;
  text-align: center;
  margin: 0 2rem;
  margin-top: 2rem;
`;

const NotFoundScreen = () => {
  return (
    <FullScreenLoader>
      <div>
        <NotFoundText>
          <p>HTTP 404</p>
        </NotFoundText>
      </div>
      <section>
        <P>¡Ups! Parece que no se pudo encontrar el recurso solicitado.</P>
      </section>
    </FullScreenLoader>
  );
};

export default NotFoundScreen;
