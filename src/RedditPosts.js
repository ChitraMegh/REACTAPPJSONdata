import React, { useEffect, useState } from 'react';

const RedditCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.reddit.com/r/reactjs.json');
        const json = await response.json();
        setCards(json.data.children);
      } catch (error) {
        console.error('Error fetching Reddit data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {cards.map((card) => {
        const { data } = card;
        return (
          <div key={data.id} className="card">
            <h2>{data.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: data.selftext_html }} />
            <a href={data.url} target="_blank" rel="noopener noreferrer">
              {data.url}
            </a>
            <p>Score: {data.score}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RedditCards;
