import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import PaginatedSelect from "../departmentSelection";

export default function AddDialog({
  open,
  editingEmployee,
  handleSave,
  handleClose,
  addedData,
  setAddedData,
  addedDataError,
}) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{`${
        editingEmployee ? "Add" : "Edit"
      } Employee`}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          value={addedData?.first_name ?? editingEmployee?.first_name}
          onChange={(e) =>
            setAddedData((prev) => ({ ...prev, first_name: e.target.value }))
          }
        />
        <p style={{ color: "red" }}>{addedDataError.first_name}</p>

        <TextField
          autoFocus
          margin="dense"
          label="Last Name"
          type="text"
          fullWidth
          value={addedData?.last_name ?? editingEmployee?.last_name}
          onChange={(e) =>
            setAddedData((prev) => ({ ...prev, last_name: e.target.value }))
          }
        />
        <p style={{ color: "red" }}>{addedDataError.last_name}</p>

        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={addedData?.email ?? editingEmployee?.email}
          onChange={(e) =>
            setAddedData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <p style={{ color: "red" }}>{addedDataError.email}</p>

        <PaginatedSelect
          handleSelectChange={(ev) => {
            setAddedData((prev) => ({
              ...prev,
              department_id: ev.target.value,
            }));
          }}
          selectedValue={
            addedData?.department_id ?? editingEmployee?.department_id
          }
        />
        <p style={{ color: "red" }}>{addedDataError.department_id}</p>

        <TextField
          margin="dense"
          label="Hire Date"
          type="date"
          fullWidth
          value={
            addedData?.hire_date || editingEmployee?.hire_date
              ? new Date(addedData?.hire_date || editingEmployee.hire_date)
                  .toISOString()
                  .split("T")[0]
              : ""
          }
          onChange={(e) =>
            setAddedData((prev) => ({ ...prev, hire_date: e.target.value }))
          }
        />
        <p style={{ color: "red" }}>{addedDataError.hire_date}</p>
        <TextField
          autoFocus
          margin="dense"
          label="Salary"
          type="text"
          fullWidth
          value={addedData?.salary ?? editingEmployee?.salary}
          onChange={(e) =>
            setAddedData((prev) => ({ ...prev, salary: e.target.value }))
          }
        />
        <p style={{ color: "red" }}>{addedDataError.salary}</p>
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
