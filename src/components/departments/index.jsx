import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableFooter,
  CircularProgress,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  ArrowUpwardOutlined,
  ArrowDownwardOutlined,
  SearchRounded,
  EditOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from "../../utils/api.functions";
import Swal from "sweetalert2";
import AddDialog from "../departmentDialog";
import { UserContext } from "../../utils/userContext";

const DepartmentsTable = () => {
  const { user } = useContext(UserContext);

  const [query, setQuery] = useState({
    limit: 10,
    page: 1,
    sortBy: "createdAt",
    sortType: "ASC",
    search: "",
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [addedData, setAddedData] = useState({});
  const [addedDataError, setAddedDataError] = useState({});

  const handleSortBy = (field, type) => {
    setQuery({
      ...query,
      sortBy: field,
      sortType: type,
    });
  };

  const fetchData = () => {
    setLoading(true);
    getDepartments(query)
      .then((data) => {
        setData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [query]);
  const [open, setOpen] = useState(false);
  const [editingDepartment, seteditingDepartment] = useState(null);

  const handleOpen = (emp) => {
    if (emp) {
      seteditingDepartment(emp);
    } else {
      seteditingDepartment(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setAddedData({});
    setAddedDataError({});
    setOpen(false);
  };
  const handleDeleteDepartment = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete department ?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "YES",
      cancelButtonText: "NO",
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        deleteDepartment(id).then((res) => {
          fetchData();
          Swal.fire({
            title: res.message ?? "Deleted Successfully",
            icon: "success",
          });
        });
      }
    });
  };
  const handleSave = () => {
    if (editingDepartment) {
      updateDepartment(editingDepartment.id, addedData)
        .then((res) => {
          fetchData();
          setAddedDataError({});
          handleClose();
        })
        .catch((error) => {
          setAddedDataError({ ...error.response.data.errors });
        });
    } else {
      createDepartment(addedData)
        .then((res) => {
          fetchData();
          setAddedDataError({});
          handleClose();
        })
        .catch((error) => {
          setAddedDataError({ ...error.response.data.errors });
        });
    }
  };

  return (
    <>
      {user.role === "ADMIN" && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          Add Department
        </Button>
      )}

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={7} style={{ textAlign: "center" }}>
                <TextField
                  value={query.search}
                  onChange={(e) =>
                    setQuery({ ...query, search: e.target.value })
                  }
                  label="Search"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRounded />
                      </InputAdornment>
                    ),
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>Name </div>
                  <div>
                    <IconButton
                      disabled={
                        query.sortBy === "name" && query.sortType === "DESC"
                      }
                      onClick={() => handleSortBy("name", "DESC")}
                    >
                      <ArrowUpwardOutlined />
                    </IconButton>
                    <IconButton
                      disabled={
                        query.sortBy === "name" && query.sortType === "ASC"
                      }
                      onClick={() => handleSortBy("name", "ASC")}
                    >
                      <ArrowDownwardOutlined />
                    </IconButton>
                  </div>
                </div>
              </TableCell>
              {user.role === "ADMIN" && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: "center" }}>
                  <CircularProgress color="secondary" />
                </TableCell>
              </TableRow>
            ) : data.rows?.length > 0 ? (
              <>
                {data?.rows?.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell>{dept.name ?? "---"}</TableCell>
                    {user.role === "ADMIN" && (
                      <TableCell>
                        <IconButton
                          variant="outlined"
                          color="primary"
                          onClick={() => handleOpen(dept)}
                          sx={{ mr: 1, mt: 2 }}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteDepartment(dept.id)}
                          sx={{ mr: 1, mt: 2 }}
                        >
                          <DeleteOutline />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: "center" }}>
                  NO Departments
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                {data.count > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={() =>
                        setQuery({
                          ...query,
                          page: query.page - 1,
                        })
                      }
                      disabled={query.page === 1}
                      variant="contained"
                      color="secondary"
                    >
                      Prev
                    </Button>
                    <span>
                      Page {query.page} of {Math.ceil(data.count / query.limit)}
                    </span>
                    <Button
                      onClick={() =>
                        setQuery({
                          ...query,
                          page: query.page + 1,
                        })
                      }
                      disabled={
                        query.page === Math.ceil(data.count / query.limit)
                      }
                      variant="contained"
                      color="secondary"
                    >
                      Next
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <AddDialog
        open={open}
        setOpen={setOpen}
        editingDepartment={editingDepartment}
        handleSave={handleSave}
        handleClose={handleClose}
        addedData={addedData}
        setAddedData={setAddedData}
        addedDataError={addedDataError}
      />
    </>
  );
};

export default DepartmentsTable;
