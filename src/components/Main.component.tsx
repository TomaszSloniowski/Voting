import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  AlertType,
  Voter,
  Candidate,
  VotersColumns,
  CandidatesColumns,
  PersonType,
  VotingCard,
} from "../types/Voting.types";
import { AlertSnackbar } from "./Alert.components";
import classes from "./Main.module.css";
import { VotingTable } from "./VotingTable.component";
import AddIcon from "@mui/icons-material/Add";
import { AddPerson } from "./AddPerson.component";
import { Vote } from "./Vote.component";

export const Main = () => {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [addPersonModalOpen, setAddPersonModalOpen] = useState<boolean>(false);
  const [selectedPersonType, setSelectedPersonType] = useState<PersonType | undefined>();

  const [isAlertSnackbarOpen, seIsAlertSnackbarOpen] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertType | undefined>(undefined);

  const getVoters = () => {
    fetch("http://localhost:3000/voters")
      .then((response) => response.json())
      .then(
        (data) => {
          if (data) {
            setVoters(data);
          }
        },
        () => {
          setAlertType(AlertType.error);
        }
      );
  };

  const getCandidates = () => {
    fetch("http://localhost:3000/candidates")
      .then((response) => response.json())
      .then(
        (data) => {
          if (data) {
            setCandidates(data);
          }
        },
        () => {
          setAlertType(AlertType.error);
        }
      );
  };

  const addVoter = (value: Voter) => {
    fetch("http://localhost:3000/voters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then(
        (data) => {
          if (data) {
            setAlertType(AlertType.success);
            getVoters();
          }
        },
        () => {
          setAlertType(AlertType.error);
        }
      )
      .finally(() => {
        seIsAlertSnackbarOpen(true);
      });
  };

  const addCandidate = (value: Candidate) => {
    fetch("http://localhost:3000/candidates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then(
        (data) => {
          if (data) {
            setAlertType(AlertType.success);
            getCandidates();
          }
        },
        () => {
          setAlertType(AlertType.error);
        }
      )
      .finally(() => {
        seIsAlertSnackbarOpen(true);
      });
  };

  const updateVoterHasVoted = (value: Voter) => {
    fetch(`http://localhost:3000/voters/${value.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then(
        (data) => {
          if (data) {
            setAlertType(AlertType.success);
            getVoters();
          }
        },
        () => {
          setAlertType(AlertType.error);
        }
      )
      .finally(() => {
        seIsAlertSnackbarOpen(true);
      });
  };

  const updateCandidateVotes = (value: Candidate) => {
    fetch(`http://localhost:3000/candidates/${value.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then(
        (data) => {
          if (data) {
            setAlertType(AlertType.success);
            getCandidates();
          }
        },
        () => {
          setAlertType(AlertType.error);
        }
      )
      .finally(() => {
        seIsAlertSnackbarOpen(true);
      });
  };

  useEffect(() => {
    getVoters();
    getCandidates();
  }, []);

  const handleAddVoter = (name: string) => {
    setAddPersonModalOpen(false);
    const newVoter: Voter = {
      id: (voters.length + 1).toString(),
      name: name,
      hasVoted: false,
    };
    addVoter(newVoter);
  };

  const handleAddCandidate = (name: string) => {
    setAddPersonModalOpen(false);
    const newCandidate: Candidate = {
      id: (candidates.length + 1).toString(),
      name: name,
      votes: 0,
    };
    addCandidate(newCandidate);
  };

  const handleUpdateVotes = (voter: Voter, candidate: Candidate) => {
    updateVoterHasVoted(voter);
    updateCandidateVotes(candidate);
  };

  const getVoterById = (id: string) => {
    return voters.find((e) => e.id === id);
  };

  const getCandidateById = (id: string) => {
    return candidates.find((e) => e.id === id);
  };

  const handleVote = (value: VotingCard) => {
    const voter = getVoterById(value.voterId);
    const candidate = getCandidateById(value.candidateId);

    if (voter && voter.hasVoted) {
      setAlertType(AlertType.alreadyVoted);
      seIsAlertSnackbarOpen(true);
      return;
    }

    if (voter && candidate) {
      const voterHasVoted = { ...voter, hasVoted: true };
      const candidateWithNewVote = { ...candidate, votes: candidate.votes + 1 };
      if (voterHasVoted && candidateWithNewVote) {
        handleUpdateVotes(voterHasVoted, candidateWithNewVote);
      }
    }
  };

  return (
    <>
      <div className={classes.mainDiv}>
        <Grid container item xs={12}>
          <Grid item xs={6} className={classes.votersContainer}>
            <Grid item xs={12} className={classes.headerRow}>
              <Typography variant="h6">Voters</Typography>
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedPersonType(PersonType.voter);
                  setAddPersonModalOpen(true);
                }}
              >
                Add Voter
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.tableContainer}>
              <VotingTable columns={VotersColumns} rows={voters} />
            </Grid>
          </Grid>
          <Grid item xs={6} className={classes.canditatesContainer}>
            <Grid item xs={12} className={classes.headerRow}>
              <Typography variant="h6">Candidates</Typography>
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedPersonType(PersonType.candidate);
                  setAddPersonModalOpen(true);
                }}
              >
                Add Candidate
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.tableContainer}>
              <VotingTable columns={CandidatesColumns} rows={candidates} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="left" padding="20px 45px">
              Vote!
            </Typography>
            <Vote voters={voters} candidates={candidates} onVote={handleVote} />
          </Grid>
        </Grid>

        <AlertSnackbar open={isAlertSnackbarOpen} onClose={() => seIsAlertSnackbarOpen(false)} type={alertType} />
      </div>
      <AddPerson
        open={addPersonModalOpen}
        personType={selectedPersonType}
        people={selectedPersonType === PersonType.voter ? voters : candidates}
        onClose={() => setAddPersonModalOpen(false)}
        onConfirm={selectedPersonType === PersonType.voter ? handleAddVoter : handleAddCandidate}
      />
    </>
  );
};
