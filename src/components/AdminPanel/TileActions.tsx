import * as React from "react";
import {
  Alert,
  AlertColor,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { Edit, DeleteForever } from "@mui/icons-material";
import axios from "axios";
import theme from "../../colors/palette";
import { ITileActions } from "../../models/componentFacto";

const defaultSnackbarState = { open: false, severity: "info", message: "" };

export default function TileActions(params: ITileActions) {
  const [snackbarState, setSnackbarState] =
    React.useState(defaultSnackbarState);
  const [remove, setRemove] = React.useState(false);

  const handleSetOpenForm = () => {
    params.openForm!(true);
  };
  const openConfirmation = () => {
    setRemove(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarState(defaultSnackbarState);
  };

  const cancelRemovePartner = () => {
    setRemove(false);
  };

  async function deleteEntity() {
    axios
      .delete(params.api!)
      .then((response) => {
        setSnackbarState({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        setRemove(false);
      })
      .catch((error) => {
        setSnackbarState({
          open: true,
          severity: "error",
          message: error.response.data.message,
        });
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity as AlertColor}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
      <Stack direction="row" spacing={2} mt={2} justifyContent="space-evenly">
        <Button
          size="small"
          variant="contained"
          color="red"
          onClick={openConfirmation}
        >
          <DeleteForever />
        </Button>
        <Button
          size="small"
          variant="contained"
          color="green"
          onClick={handleSetOpenForm}
        >
          <Edit />
        </Button>
      </Stack>
      <Dialog open={remove} onClose={cancelRemovePartner}>
        <DialogContent>
          <DialogContentText>
            Voulez vous supprimer cet élement ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelRemovePartner} autoFocus>
            Non
          </Button>
          <Button onClick={deleteEntity}>Oui</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
