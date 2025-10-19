'use client';
import React from "react";
import styled from "styled-components";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../features/auth/authSlice"; 
import { IButtonProps } from "@/src/shared/types/atoms/button.type";
import { clearStorage } from "@/src/lib/utils/storageCleaner";

const Button = styled.button`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: end !important;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: 0.3s;
  width: 100%;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  color: ${({ theme }) => theme.colors.textGray};

  &:hover {
    background-color:${({ theme }) => theme.colors.bgBanner};
  }

  svg {
    margin-right: 10px;
  }

  @media (max-width: 790px) {
    padding: 10px 5px;
  }
`;

const LogoutButton: React.FC<IButtonProps> = ({ children, type }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    clearStorage();

    localStorage.setItem("currentPage", "AUTH");
    localStorage.setItem('theme', 'light');

    globalThis.dispatchEvent(new Event('storage'));

    router.push("/auth");
    router.refresh();
  };

  return (
    <Button type={type} onClick={handleLogout}>
      {children} Cerrar sesión
    </Button>
  );
};

export default LogoutButton;