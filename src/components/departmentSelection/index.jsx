import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import { getDepartments } from "../../utils/api.functions";

function PaginatedSelect({ handleSelectChange, selectedValue }) {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ count: 0, rows: [] });

  const fetchData = () => {
    getDepartments({ limit, page }).then((data) => {
      setData(data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Department</InputLabel>
        <Select
          value={selectedValue}
          onChange={handleSelectChange}
          label="Departments"
        >
          {data.rows.map((department, index) => (
            <MenuItem key={index} value={department.id}>
              {department.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Pagination
        count={Math.ceil(data.count ? data.count / limit : 0)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "20px" }}
      />
    </div>
  );
}

export default PaginatedSelect;
