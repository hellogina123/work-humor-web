import React from 'react';
import styled from 'styled-components';
import { Quote } from '../../data/quotes';
import Rating from '../Rating/Rating';

interface QuoteCardProps {
  quote: Quote;
  onRate: (rating: number) => void;
  disabled?: boolean;
}

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px;
  max-width: 600px;
  width: 100%;
`;

const QuoteText = styled.div`
  white-space: pre-line;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: left;

  &::first-line {
    background-color: #fff3cd;
    padding: 2px 4px;
    border-radius: 4px;
  }
`;

const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  onRate,
  disabled = false,
}) => {
  return (
    <Card>
      <QuoteText>{quote.text}</QuoteText>
      <Rating
        value={quote.rating}
        onChange={onRate}
        disabled={disabled}
      />
    </Card>
  );
};

export default QuoteCard; 