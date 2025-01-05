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
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../../utils/api.functions";
import AddDialog from "../employeeDialog";
import Swal from "sweetalert2";
import { UserContext } from "../../utils/userContext";

const EmployeesTable = () => {
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
    getEmployees(query)
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
  const [editingEmployee, seteditingEmployee] = useState(null);

  const handleOpen = (emp) => {
    if (emp) {
      seteditingEmployee(emp);
    } else {
      seteditingEmployee(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setAddedData({});
    setAddedDataError({});
    setOpen(false);
  };
  const handleDeleteEmployee = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete Employee ?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "YES",
      cancelButtonText: "NO",
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        deleteEmployee(id).then((res) => {
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
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, addedData)
        .then((res) => {
          fetchData();
          setAddedDataError({});
          handleClose();
        })
        .catch((error) => {
          setAddedDataError({ ...error.response.data.errors });
        });
    } else {
      createEmployee(addedData)
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
          Add Employee
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
                  <div>First Name </div>
                  <div>
                    <IconButton
                      disabled={
                        query.sortBy === "first_name" &&
                        query.sortType === "DESC"
                      }
                      onClick={() => handleSortBy("first_name", "DESC")}
                    >
                      <ArrowUpwardOutlined />
                    </IconButton>
                    <IconButton
                      disabled={
                        query.sortBy === "first_name" &&
                        query.sortType === "ASC"
                      }
                      onClick={() => handleSortBy("first_name", "ASC")}
                    >
                      <ArrowDownwardOutlined />
                    </IconButton>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>Last Name </div>
                  <div>
                    <IconButton
                      disabled={
                        query.sortBy === "last_name" &&
                        query.sortType === "DESC"
                      }
                      onClick={() => handleSortBy("last_name", "DESC")}
                    >
                      <ArrowUpwardOutlined />
                    </IconButton>
                    <IconButton
                      disabled={
                        query.sortBy === "last_name" && query.sortType === "ASC"
                      }
                      onClick={() => handleSortBy("last_name", "ASC")}
                    >
                      <ArrowDownwardOutlined />
                    </IconButton>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>Email </div>
                  <div>
                    <IconButton
                      disabled={
                        query.sortBy === "email" && query.sortType === "DESC"
                      }
                      onClick={() => handleSortBy("email", "DESC")}
                    >
                      <ArrowUpwardOutlined />
                    </IconButton>
                    <IconButton
                      disabled={
                        query.sortBy === "email" && query.sortType === "ASC"
                      }
                      onClick={() => handleSortBy("email", "ASC")}
                    >
                      <ArrowDownwardOutlined />
                    </IconButton>
                  </div>
                </div>
              </TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>Hire Date </div>
                  <div>
                    <IconButton
                      disabled={
                        query.sortBy === "hire_date" &&
                        query.sortType === "DESC"
                      }
                      onClick={() => handleSortBy("hire_date", "DESC")}
                    >
                      <ArrowUpwardOutlined />
                    </IconButton>
                    <IconButton
                      disabled={
                        query.sortBy === "hire_date" && query.sortType === "ASC"
                      }
                      onClick={() => handleSortBy("hire_date", "ASC")}
                    >
                      <ArrowDownwardOutlined />
                    </IconButton>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>Salary </div>
                  <div>
                    <IconButton
                      disabled={
                        query.sortBy === "salary" && query.sortType === "DESC"
                      }
                      onClick={() => handleSortBy("salary", "DESC")}
                    >
                      <ArrowUpwardOutlined />
                    </IconButton>
                    <IconButton
                      onClick={() => handleSortBy("salary", "ASC")}
                      disabled={
                        query.sortBy === "salary" && query.sortType === "ASC"
                      }
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
                {data?.rows?.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>{emp.first_name ?? "---"}</TableCell>
                    <TableCell>{emp.last_name ?? "---"}</TableCell>
                    <TableCell>{emp.email ?? "---"}</TableCell>
                    <TableCell>{emp.department?.name ?? "---"}</TableCell>
                    <TableCell>
                      {emp.hire_date
                        ? new Date(emp.hire_date).toLocaleDateString("en-EG", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "---"}
                    </TableCell>
                    <TableCell>{emp.salary ?? "---"}</TableCell>
                    {user.role === "ADMIN" && (
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleOpen(emp)}
                          sx={{ mr: 1, mt: 2 }}
                        >
                          <EditOutlined />
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteEmployee(emp.id)}
                          sx={{ mr: 1, mt: 2 }}
                        >
                          <DeleteOutline />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: "center" }}>
                  NO Employees
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
        editingEmployee={editingEmployee}
        handleSave={handleSave}
        handleClose={handleClose}
        addedData={addedData}
        setAddedData={setAddedData}
        addedDataError={addedDataError}
      />
    </>
  );
};

export default EmployeesTable;
