import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function AddDialog({
  open,
  editingDepartment,
  handleSave,
  handleClose,
  addedData,
  setAddedData,
  addedDataError,
}) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{`${
        editingDepartment ? "Add" : "Edit"
      } Department`}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={addedData?.name ?? editingDepartment?.name}
          onChange={(e) =>
            setAddedData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <p style={{ color: "red" }}>{addedDataError.name}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
