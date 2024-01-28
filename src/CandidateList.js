import React from 'react';

const CandidateList = ({ candidates, handleVote, handleCandidateNameChange }) => {
  return (
    <div>
      <h2>Candidates</h2>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate.id}>
            <input
              type="text"
              value={candidate.name}
              onChange={(e) => handleCandidateNameChange(e, candidate.id)}
              placeholder={`Enter name for Candidate ${candidate.id}`}
            />
            <button onClick={() => handleVote(candidate.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
