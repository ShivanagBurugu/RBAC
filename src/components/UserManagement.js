import React, { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import "./UserManagement.css";

function UserManagement({ roles, users, addUser, updateUser, deleteUser }) {
  const [show, setShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    role: "NULL",
  });

  const handleClose = () => {
    setShow(false);
    setEditIndex(null);
    setCurrentUser({ name: "", email: "", role: "NULL" });
  };
  const handleShow = () => setShow(true);

  const handleSaveUser = () => {
    if (editIndex !== null) {
      updateUser(editIndex, currentUser);
    } else {
      addUser(currentUser);
    }
    handleClose();
  };

  const handleEditUser = (index) => {
    setCurrentUser(users[index]);
    setEditIndex(index);
    handleShow();
  };

  return (
    <div className="user-management">
      <h2>
        <center>User Management</center>
      </h2>
      <Button
        variant="primary"
        onClick={handleShow}
        className="add-user-button"
      >
        Add User
      </Button>
      <Table striped bordered hover className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role || "NULL"}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditUser(index)}
                  className="action-button"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteUser(index)}
                  className="action-button"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIndex !== null ? "Edit User" : "Add User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={currentUser.name}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={currentUser.role}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, role: e.target.value })
                }
              >
                <option value="NULL">Select Role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.roleName}>
                    {role.roleName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserManagement;
