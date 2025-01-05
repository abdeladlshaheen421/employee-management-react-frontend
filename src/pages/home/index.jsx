import { Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { getDashboard, getEmployees } from "../../utils/api.functions";
import { useEffect, useState } from "react";

export default function Home() {
  const [series, setSeries] = useState([]);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const fetchData = () => {
    getDashboard().then((res) => {
      setSeries(
        res.dashboard.map((ele) => ({
          id: ele.id,
          value: ele.count,
          label: ele.name,
        }))
      );
    });
    getEmployees({
      limit: 4,
      sortBy: "hire_date",
      sortType: "DESC",
    }).then((data) => {
      setRecentEmployees(data.rows);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <Typography style={{ fontWeight: "bold" }}>
        Departments Distribution With Total Employees{" "}
        {`${
          series.length > 0
            ? `[ ${series.reduce((acc, ele) => (acc += ele.value), 0)} ]`
            : "0"
        }`}
      </Typography>
      <PieChart
        series={[
          {
            data: series,
          },
        ]}
        title="Department Distribution"
        width={600}
        height={400}
      />
      <hr style={{ width: "100%", margin: "40px 5px" }} />
      <h3 style={{ textAlign: "center", padding: "10px" }}>
        Recent Hired Employees
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        {recentEmployees.length > 0 ? (
          recentEmployees.map((emp) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "20%",
                backgroundColor: "#ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <p>
                <span style={{ fontWeight: "bold" }}>Full Name:</span>{" "}
                {`${emp.first_name}  ${emp.last_name}`}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                {`${emp.email}`}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Salary:</span>{" "}
                {`${emp.salary}`} LE
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}> Hire Date: </span>
                {emp.hire_date
                  ? new Date(emp.hire_date).toLocaleDateString("en-EG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "---"}
              </p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}> No Employees</p>
        )}
      </div>
    </div>
  );
}
