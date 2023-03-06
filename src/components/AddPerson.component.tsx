import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Candidate, PersonType, Voter } from "../types/Voting.types";
import { useState } from "react";

interface AddPersonProps {
  open: boolean;
  personType?: PersonType;
  people: Voter[] | Candidate[];
  onClose: () => void;
  onConfirm: (name: string) => void;
}

export const AddPerson: React.FC<AddPersonProps> = ({ open, personType, people, onClose, onConfirm }) => {
  const [name, setName] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const title = personType === PersonType.voter ? "Add Voter" : "Add Candidate";

  const isValidName = (name: string) => {
    return !people.some((e) => e.name === name);
  };

  const handleSubmit = (name: string) => {
    if (isValidName(name)) {
      onConfirm(name);
      setName("");
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const getErrorText = () => {
    if (isError) {
      return personType === PersonType.voter ? "Voter exists" : "Candidate exists";
    } else return "";
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(event) => setName(event.target.value)}
            sx={{ width: "300px" }}
            error={isError}
            helperText={isError ? getErrorText() : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsError(false);
              setName("");
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button disabled={!name} onClick={() => handleSubmit(name)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
