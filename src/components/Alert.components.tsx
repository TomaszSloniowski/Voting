import { Alert, Snackbar } from "@mui/material";
import { AlertType } from "../types/Voting.types";

interface AlertProps {
  open: boolean;
  onClose: () => void;
  type?: AlertType;
}

export const AlertSnackbar: React.FC<AlertProps> = ({ open, type, onClose }) => {
  const getAlertText = () => {
    switch (type) {
      case AlertType.success:
        return "The operation was successful!";
      case AlertType.alreadyVoted:
        return "The operation failed. You have already voted!";
      case AlertType.error:
        return "The operation failed";
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {getAlertText()}
      </Alert>
    </Snackbar>
  );
};
