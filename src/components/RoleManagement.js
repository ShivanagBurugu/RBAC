import React, { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import "./RoleManagement.css";

function RoleManagement({ roles, addRole, updateRole, deleteRole }) {
  const [show, setShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentRole, setCurrentRole] = useState({
    roleName: "",
    permissions: [],
  });

  const handleClose = () => {
    setShow(false);
    setEditIndex(null);
    setCurrentRole({ roleName: "", permissions: [] });
  };

  const handleShow = () => setShow(true);

  const handleSaveRole = () => {
    if (editIndex !== null) {
      updateRole(editIndex, currentRole);
    } else {
      addRole(currentRole);
    }
    handleClose();
  };

  const handleEditRole = (index) => {
    setCurrentRole(roles[index]);
    setEditIndex(index);
    handleShow();
  };

  const handleCheckboxChange = (permission) => {
    setCurrentRole((prevState) => {
      const permissions = prevState.permissions.includes(permission)
        ? prevState.permissions.filter((perm) => perm !== permission)
        : [...prevState.permissions, permission];
      return { ...prevState, permissions };
    });
  };

  return (
    <div className="role-management">
      <h2>
        <center>Role Management</center>
      </h2>
      <Button
        variant="primary"
        onClick={handleShow}
        className="add-role-button"
      >
        Add Role
      </Button>
      <Table striped bordered hover className="role-table">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={index}>
              <td>{role.roleName}</td>
              <td>{role.permissions.join(", ")}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditRole(index)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deleteRole(index)}>
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
            {editIndex !== null ? "Edit Role" : "Add Role"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role name"
                value={currentRole.roleName}
                onChange={(e) =>
                  setCurrentRole({ ...currentRole, roleName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Read"
                checked={currentRole.permissions.includes("Read")}
                onChange={() => handleCheckboxChange("Read")}
              />
              <Form.Check
                type="checkbox"
                label="Write"
                checked={currentRole.permissions.includes("Write")}
                onChange={() => handleCheckboxChange("Write")}
              />
              <Form.Check
                type="checkbox"
                label="Delete"
                checked={currentRole.permissions.includes("Delete")}
                onChange={() => handleCheckboxChange("Delete")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveRole}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RoleManagement;
