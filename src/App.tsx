import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { quotes as initialQuotes, Quote } from './data/quotes';
import QuoteCard from './components/QuoteCard/QuoteCard';
import TopQuotes from './components/TopQuotes/TopQuotes';
import Button from './components/Button/Button';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: #f0f2f5;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #1a1a1a;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 18px;
  margin-bottom: 5px;
`;

const RatingHint = styled.span`
  color: #666;
  font-size: 14px;
  font-style: italic;
  margin-left: 10px;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
`;

const UserCount = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
`;

const App: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [viewedCount, setViewedCount] = useState(0);
  const [showTopQuotes, setShowTopQuotes] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [viewedQuotes, setViewedQuotes] = useState<Set<number>>(new Set());
  const [userCount, setUserCount] = useState<number>(0);

  const currentQuote = quotes[currentQuoteIndex];

  const getRandomUnviewedQuoteIndex = (): number => {
    const unviewedQuotes = quotes
      .map((quote, index) => ({ quote, index }))
      .filter(({ index }) => !viewedQuotes.has(index));
    
    if (unviewedQuotes.length === 0) {
      // 如果所有語錄都看過了，重置已看過的集合
      setViewedQuotes(new Set());
      return Math.floor(Math.random() * quotes.length);
    }
    
    const randomIndex = Math.floor(Math.random() * unviewedQuotes.length);
    return unviewedQuotes[randomIndex].index;
  };

  const handleRate = (rating: number) => {
    const updatedQuotes = quotes.map((quote) =>
      quote.id === currentQuote.id
        ? {
            ...quote,
            rating: ((quote.rating * quote.votes + rating) / (quote.votes + 1)),
            votes: quote.votes + 1,
          }
        : quote
    );
    setQuotes(updatedQuotes);
    setViewedCount((prev) => prev + 1);
    setHasRated(true);
    setViewedQuotes(prev => new Set([...prev, currentQuoteIndex]));
  };

  const handleNext = () => {
    const nextIndex = getRandomUnviewedQuoteIndex();
    setCurrentQuoteIndex(nextIndex);
    setHasRated(false);
  };

  const handleExit = () => {
    window.close();
  };

  const handleContinue = () => {
    setShowTopQuotes(false);
    setCurrentQuoteIndex(getRandomUnviewedQuoteIndex());
    setViewedCount(0);
    setHasRated(false);
  };

  useEffect(() => {
    // 從 localStorage 讀取使用者計數
    const storedCount = localStorage.getItem('userCount');
    const count = storedCount ? parseInt(storedCount, 10) : 0;
    setUserCount(count);

    // 檢查是否是新使用者
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      // 如果是新使用者，增加計數
      const newCount = count + 1;
      setUserCount(newCount);
      localStorage.setItem('userCount', newCount.toString());
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  useEffect(() => {
    if (viewedCount >= 3) {
      setShowTopQuotes(true);
    }
  }, [viewedCount]);

  return (
    <AppContainer>
      <Header>
        <Title>職場幽默語錄</Title>
        <Subtitle>工作鬱悶嗎</Subtitle>
      </Header>

      <MainContent>
        {!showTopQuotes ? (
          <>
            <QuoteCard
              quote={currentQuote}
              onRate={handleRate}
              disabled={hasRated}
            />
            {!hasRated && (
              <RatingHint>請為這則語錄評分，幫助我們改進內容！</RatingHint>
            )}
            {hasRated && (
              <ButtonContainer>
                {viewedCount >= 3 ? (
                  <>
                    <Button onClick={() => setShowTopQuotes(true)}>
                      查看最高評分
                    </Button>
                    <Button variant="secondary" onClick={handleContinue}>
                      繼續觀看
                    </Button>
                    <Button variant="danger" onClick={handleExit}>
                      離開
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleNext}>
                    {currentQuoteIndex < quotes.length - 1 ? '下一則' : '重新開始'}
                  </Button>
                )}
              </ButtonContainer>
            )}
          </>
        ) : (
          <>
            <TopQuotes quotes={quotes} />
            <ButtonContainer>
              <Button onClick={handleContinue}>繼續觀看</Button>
              <Button variant="danger" onClick={handleExit}>離開</Button>
            </ButtonContainer>
          </>
        )}
      </MainContent>
      <UserCount>已有 {userCount} 位使用者體驗過</UserCount>
    </AppContainer>
  );
};

export default App;
