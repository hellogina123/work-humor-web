import React from 'react';
import styled from 'styled-components';

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const RatingContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 20px 0;
`;

const StarButton = styled.button<{ active: boolean; disabled: boolean }>`
  background: none;
  border: none;
  font-size: 24px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ active }) => (active ? '#ffd700' : '#ccc')};
  transition: color 0.2s;

  &:hover {
    color: ${({ disabled, active }) =>
      disabled ? (active ? '#ffd700' : '#ccc') : '#ffd700'};
  }
`;

const Rating: React.FC<RatingProps> = ({ value, onChange, disabled = false }) => {
  return (
    <RatingContainer>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarButton
          key={star}
          active={star <= value}
          disabled={disabled}
          onClick={() => !disabled && onChange(star)}
        >
          ★
        </StarButton>
      ))}
    </RatingContainer>
  );
};

export default Rating; 