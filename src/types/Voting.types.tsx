export interface Person {
  id: string;
  name: string;
}

export interface Voter extends Person {
  hasVoted: boolean;
}

export interface Candidate extends Person {
  votes: number;
}

export enum PersonType {
  voter,
  candidate,
}

export interface TableColumn {
  id: string;
  name: string;
  label: string;
}

export interface VotingCard {
  voterId: string;
  candidateId: string;
}

export const VotersColumns: TableColumn[] = [
  {
    id: "1",
    name: "id",
    label: "Id",
  },
  {
    id: "2",
    name: "name",
    label: "Name",
  },
  {
    id: "3",
    name: "hasVoted",
    label: "Has voted",
  },
];

export const CandidatesColumns: TableColumn[] = [
  {
    id: "1",
    name: "id",
    label: "Id",
  },
  {
    id: "2",
    name: "name",
    label: "Name",
  },
  {
    id: "3",
    name: "votes",
    label: "Votes",
  },
];

export enum AlertType {
  success = "success",
  error = "error",
  alreadyVoted = "error",
}
