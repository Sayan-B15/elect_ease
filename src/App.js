import React, { useState } from 'react';
import './App.css';
import CandidateList from './CandidateList';

const App = () => {
  const [numCandidates, setNumCandidates] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [winners, setWinners] = useState([]);

  const handleNumCandidatesChange = (e) => {
    setNumCandidates(parseInt(e.target.value));
    const newCandidates = Array.from({ length: parseInt(e.target.value) }, (_, index) => ({
      id: index + 1,
      name: '',
      votes: 0
    }));
    setCandidates(newCandidates);
  };

  const handleCandidateNameChange = (e, id) => {
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === id) {
        return {
          ...candidate,
          name: e.target.value
        };
      }
      return candidate;
    });
    setCandidates(updatedCandidates);
  };

  const handleVote = (id) => {
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === id) {
        return {
          ...candidate,
          votes: candidate.votes + 1
        };
      }
      return candidate;
    });
    setCandidates(updatedCandidates);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  
    const maxVotes = Math.max(...candidates.map(candidate => candidate.votes));
  
    const winningCandidates = candidates.filter(candidate => candidate.votes === maxVotes);
  
    setWinners(winningCandidates);
  };

  return (
    <div className="container">
      <h1>Elect Ease</h1>
      <label htmlFor="numCandidates">Number of Candidates:</label>
      <input type="number" id="numCandidates" value={numCandidates} onChange={handleNumCandidatesChange} />
      {numCandidates > 0 && !submitted && (
        <div>
          <CandidateList candidates={candidates} handleVote={handleVote} handleCandidateNameChange={handleCandidateNameChange} />
          <button onClick={handleSubmit}>Submit Vote</button>
        </div>
      )}
      {submitted && (
        <div className="voteTally">
          <h2>Votes Tally</h2>
          <ul>
            {candidates.map(candidate => (
              <li key={candidate.id}>
                {candidate.name}: {candidate.votes} votes
              </li>
            ))}
          </ul>
          <div className="winnerSection">
            <h2>Winner:</h2>
            {winners.length === 1 ? (
              <p>{winners[0].name} is the winner with {winners[0].votes} votes!</p>
            ) : (
              <div>
                <p>There is a tie between the following candidates:</p>
                <ul>
                  {winners.map(winner => (
                    <li key={winner.id}>{winner.name} with {winner.votes} votes</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
