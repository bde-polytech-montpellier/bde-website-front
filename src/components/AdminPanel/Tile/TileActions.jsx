import * as React from "react";
import {
  Alert,
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
import theme from "../../../colors/palette";

const defaultSnackbarState = { open: false, severity: "info", message: "" };

export default function TileActions({ api, entity, Form, setInfo }) {
  const [snackbarState, setSnackbarState] =
    React.useState(defaultSnackbarState);
  const [openForm, setOpenForm] = React.useState(false);
  const [remove, setRemove] = React.useState(false);

  const handleSetOpenForm = () => {
    setOpenForm(true);
  };
  const openConfirmation = () => {
    setRemove(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    else setSnackbarState(defaultSnackbarState);
  };

  const cancelRemovePartner = () => {
    setRemove(false);
  };

  async function deleteEntity() {
    axios
      .delete(api)
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
        <Alert onClose={handleSnackbarClose} severity={snackbarState.severity}>
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
        {/* Form */}
      </Stack>
      <Form
        action="Modifier"
        open={openForm}
        setOpen={setOpenForm}
        setValues={setInfo}
        partnerObject={entity}
        clubObject={entity}
        eventObject={entity}
        goodieObject={entity}
      ></Form>
      {/* Remove confirmation */}
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
