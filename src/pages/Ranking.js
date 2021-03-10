import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const rankedLadder = localStorage.getItem('ranking') !== null ? JSON.parse(localStorage.getItem('ranking')) : [];
    if (rankedLadder.length === 0) return <li>Nenhum registro</li>;
    return (
      <div>
        <h1>Ranking</h1>
        <ol>
          {rankedLadder.map(
            (rank, index) => (
              <li key={`${rank.name}_${rank.score}_${index + 1}`}>
                <div>
                  <img data-testid={`profile-picture-${index + 1}`} src={rank.imageUrl} alt={`${rank.name} grAvatar`} />
                </div>
                <div>
                  <div>
                    <span data-testid={`${rank.name}-${index + 1}`}>
                      {`${rank.name}`}
                    </span>
                    <span> pontuou </span>
                    <span data-testid={`score-${index}`} className="rank-score">
                      {`${rank.score}`}
                    </span>
                  </div>
                </div>
              </li>
            ),
          )}
        </ol>
      </div>
    );
  }
}

export default Ranking;
