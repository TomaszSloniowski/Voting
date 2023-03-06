import { Candidate, Voter, VotingCard } from "../types/Voting.types";
import { useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface VoteProps {
  voters: Voter[];
  candidates: Candidate[];
  onVote: (value: VotingCard) => void;
}

export const Vote: React.FC<VoteProps> = ({ voters, candidates, onVote }) => {
  const [selectedVoter, setSelectedVoter] = useState<string>("");
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsSubmitDisabled(selectedVoter === "" || selectedCandidate === "");
  }, [selectedVoter, selectedCandidate]);

  return (
    <>
      <FormControl variant="standard" sx={{ marginLeft: 6, minWidth: 230 }}>
        <InputLabel id="voter-label">I am</InputLabel>
        <Select
          labelId="voter-label"
          id="voter-label"
          value={selectedVoter}
          onChange={(event) => setSelectedVoter(event.target.value)}
          label="I am"
        >
          {voters.map((voter) => (
            <MenuItem value={voter.id}>{voter.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ marginLeft: 6, marginRight: 6, minWidth: 230 }}>
        <InputLabel id="candidate-label">Select candidate</InputLabel>
        <Select
          labelId="candidate-label"
          id="candidate-label"
          value={selectedCandidate}
          onChange={(event) => setSelectedCandidate(event.target.value)}
          label="Select candidate"
        >
          {candidates.map((candidate) => (
            <MenuItem value={candidate.id}>{candidate.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onVote({ voterId: selectedVoter, candidateId: selectedCandidate })}
        disabled={isSubmitDisabled}
      >
        Submit
      </Button>
    </>
  );
};
