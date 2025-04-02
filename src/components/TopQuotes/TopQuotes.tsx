import React from 'react';
import styled from 'styled-components';
import { Quote } from '../../data/quotes';
import QuoteCard from '../QuoteCard/QuoteCard';

interface TopQuotesProps {
  quotes: Quote[];
}

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 12px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const TopQuotes: React.FC<TopQuotesProps> = ({ quotes }) => {
  const topQuotes = [...quotes]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <Container>
      <Title>最高評分語錄</Title>
      {topQuotes.map((quote) => (
        <QuoteCard
          key={quote.id}
          quote={quote}
          onRate={() => {}}
          disabled
        />
      ))}
    </Container>
  );
};

export default TopQuotes; 