import React, { MouseEventHandler }from "react";

export interface IButtonProps {
    type: "submit" | "button" | "reset";
    label?: string;   
    icon?: React.ReactNode;
    value?: string;         
    onClick?: MouseEventHandler<HTMLButtonElement>; 
    className?: string; 
    disabled?: boolean; 
    children?: React.ReactNode;
  }

export type IButtonAuthProps = {
  className?: string;
  type?: 'button' | 'submit' | 'reset'; 
  disabled?: boolean;
  onClick?: () => void; 
  children: React.ReactNode; 
};