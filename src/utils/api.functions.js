import Swal from "sweetalert2";
import client from "./client";

export async function login(username, password) {
  const { data } = await client.post("auth/login", {
    username,
    password,
  });
  localStorage.setItem("user", JSON.stringify(data));
  return data;
}

export function logout() {
  localStorage.removeItem("user");
}

export async function getEmployees(query) {
  const { data } = await client.get(`employees`, {
    params: {
      ...query,
    },
  });
  return data;
}

export async function createEmployee(body) {
  const { data } = await client.post("employees", { ...body });
  return data;
}

export async function updateEmployee(id, body) {
  const { data } = await client.patch(`employees/${id}`, { ...body });
  return data;
}

export async function deleteEmployee(id) {
  const { data } = await client.delete(`employees/${id}`);
  return data;
}

export async function getDepartments(query) {
  const { data } = await client.get(`departments`, {
    params: {
      ...query,
    },
  });
  return data;
}

export async function createDepartment(body) {
  const { data } = await client.post("departments", { ...body });
  return data;
}

export async function updateDepartment(id, body) {
  const { data } = await client.patch(`departments/${id}`, { ...body });
  return data;
}

export async function deleteDepartment(id) {
  const { data } = await client.delete(`departments/${id}`);
  return data;
}

export async function getDashboard(query) {
  const { data } = await client.get(`dashboard`, {
    params: {
      ...query,
    },
  });
  return data;
}
