import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

const StyledButton = styled.button<{ variant: string }>`
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  background-color: ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return '#007bff';
      case 'secondary':
        return '#6c757d';
      case 'danger':
        return '#dc3545';
      default:
        return '#007bff';
    }
  }};
  color: white;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
}) => {
  return (
    <StyledButton onClick={onClick} variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button; 