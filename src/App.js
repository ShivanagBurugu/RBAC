import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import "./App.css";

function App() {
  const [view, setView] = useState("users");
  const [roles, setRoles] = useState(
    () =>
      JSON.parse(localStorage.getItem("roles")) || [
        { roleName: "Admin", permissions: ["Read", "Write", "Delete"] },
        { roleName: "User", permissions: ["Read"] },
      ]
  );
  const [users, setUsers] = useState(
    () =>
      JSON.parse(localStorage.getItem("users")) || [
        {
          name: "Alice",
          email: "alice@example.com",
          role: "Admin",
          status: "Active",
        },
        {
          name: "Bob",
          email: "bob@example.com",
          role: "User",
          status: "Inactive",
        },
      ]
  );

  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addRole = (role) => {
    setRoles([...roles, role]);
  };

  const updateRole = (index, updatedRole) => {
    const updatedRoles = roles.map((role, i) =>
      i === index ? updatedRole : role
    );
    setRoles(updatedRoles);
    setUsers(
      users.map((user) =>
        user.role === roles[index].roleName
          ? { ...user, role: updatedRole.roleName }
          : user
      )
    );
  };

  const deleteRole = (index) => {
    const roleName = roles[index].roleName;
    setRoles(roles.filter((_, i) => i !== index));
    setUsers(
      users.map((user) =>
        user.role === roleName ? { ...user, role: "" } : user
      )
    );
  };

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const updateUser = (index, updatedUser) => {
    const updatedUsers = users.map((user, i) =>
      i === index ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const deleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={() => setView("users")}>
                User Management
              </Nav.Link>
              <Nav.Link href="#" onClick={() => setView("roles")}>
                Role Management
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="main-container">
        {view === "users" ? (
          <UserManagement
            roles={roles}
            users={users}
            addUser={addUser}
            updateUser={updateUser}
            deleteUser={deleteUser}
          />
        ) : (
          <RoleManagement
            roles={roles}
            addRole={addRole}
            updateRole={updateRole}
            deleteRole={deleteRole}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
