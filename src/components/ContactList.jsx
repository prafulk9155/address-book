import React, { useState, useEffect } from "react";
import { post } from "../services/api.service";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Container,
  Pagination,
  Modal,
  Dropdown,
  Form,
  Card,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSort, FaSortUp, FaSortDown, FaFilter, FaSignOutAlt, FaAddressBook } from "react-icons/fa";
import "./List.css";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const contactsPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      await fetchGroups(); 
      await fetchContacts(); 
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [currentPage, sortField, sortOrder, selectedGroup, searchText]);

  const fetchContacts = async () => {
    try {
      const data = await post("contacts/list", {
        start: (currentPage - 1) * contactsPerPage,
        count: contactsPerPage,
        sortBy: sortField,
        sortOrder: sortOrder,
        filters: {
          group_name: selectedGroup,
        },
        searchText,
      });

      toast.dismiss(); 

      if (data.error) {
        setError(data.message);
        toast.error(data.message);
      } else {
        setContacts(data.contacts);
        setTotalContacts(data.total);
      }
    } catch (error) {
      setError("An error occurred while fetching contacts.");
      toast.error("An error occurred while fetching contacts.");
      console.error("Error fetching contacts:", error);
    }
  };

  const handleClearFilter = () => {
    setSelectedGroup(null);
    fetchContacts();
    setShowFilterModal(false);
  };

  const fetchGroups = async () => {
    try {
      const data = await post("contacts/getGroup");
      if (data.error) {
        console.error(data.message);
      } else {
        setGroups(data.groups);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
      toast.error("Error fetching groups.");
    }
  };

  const handleDelete = async (id) => {
    const payload = { id };
    try {
      const response = await post(`contacts/delete`, payload);

      toast.dismiss(); 

      if (response.error) {
        console.error(response.message);
        toast.error(response.message);
      } else {
        fetchContacts();
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Network error. Please try again.");
    }
  };

  const totalPages = Math.ceil(totalContacts / contactsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleShowFilter = () => {
    setShowFilterModal(true);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setShowFilterModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  return (
    <Container>
      <div className="card list-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Contacts</h2>
          <div className="d-flex flex-column flex-md-row align-items-center mb-3">
  <Link to="/contact-form" className="btn btn-primary mb-2 mb-md-0">
    <FaAddressBook className="me-1" /> Add Contact
  </Link>
  <Button variant="info" className="mb-2 mb-md-0 ms-md-2" onClick={handleShowFilter}>
    <FaFilter /> Filter by Group
  </Button>
  {selectedGroup && (
    <Button
      variant="secondary"
      className="mb-2 mb-md-0 ms-md-2"
      onClick={handleClearFilter}
    >
      Clear Filter
    </Button>
  )}
</div>

        </div>

        <div className="card-body">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search by name, email, or phone"
              value={searchText}
              onChange={handleSearchChange}
            />
          </Form.Group>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Desktop and larger screens */}
          <div className="d-none d-md-block">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                    Full Name
                    {sortField === "name" &&
                      (sortOrder === "asc" ? (
                        <FaSortUp style={{ color: "green" }} />
                      ) : (
                        <FaSortDown style={{ color: "green" }} />
                      ))}
                    {sortField !== "name" && <FaSort style={{ color: "grey" }} />}
                  </th>
                  <th onClick={() => handleSort("dob")} style={{ cursor: "pointer" }}>
                    DOB
                    {sortField === "dob" &&
                      (sortOrder === "asc" ? (
                        <FaSortUp style={{ color: "green" }} />
                      ) : (
                        <FaSortDown style={{ color: "green" }} />
                      ))}
                    {sortField !== "dob" && <FaSort style={{ color: "grey" }} />}
                  </th>
                  <th>Contact Number</th>
                  <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                    Email
                    {sortField === "email" &&
                      (sortOrder === "asc" ? (
                        <FaSortUp style={{ color: "green" }} />
                      ) : (
                        <FaSortDown style={{ color: "green" }} />
                      ))}
                    {sortField !== "email" && <FaSort style={{ color: "grey" }} />}
                  </th>
                  <th>Website</th>
                  <th onClick={() => handleSort("group_name")} style={{ cursor: "pointer" }}>
                    Group
                    {sortField === "group_name" &&
                      (sortOrder === "asc" ? (
                        <FaSortUp style={{ color: "green" }} />
                      ) : (
                        <FaSortDown style={{ color: "green" }} />
                      ))}
                    {sortField !== "group_name" && <FaSort style={{ color: "grey" }} />}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((contact, index) => (
                    <tr key={contact.id}>
                      <td>{(currentPage - 1) * contactsPerPage + index + 1}</td>
                      <td>{contact.name || "-"}</td>
                      <td>{contact.dob || "-"}</td>
                      <td>{contact.phone || "-"}</td>
                      <td>{contact.email || "-"}</td>
                      <td>
                        {contact.website ? (
                          <a href={contact.website} target="_blank" rel="noopener noreferrer">
                            {contact.website}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>{contact.group_name || "-"}</td>
                      <td>
                        <Link to={`/edit/${contact.id}`} className="btn btn-warning btn-sm me-2">
                          Edit
                        </Link>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(contact.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-danger">
                      No contacts available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* Mobile view */}
          <div className="d-block d-md-none">
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <Card className="mb-3" key={contact.id}>
                  <Card.Body>
                    <Card.Title>{contact.name || "-"}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Contact Details</Card.Subtitle>
                    <Card.Text>
                      <strong>DOB:</strong> {contact.dob || "-"}<br />
                      <strong>Phone:</strong> {contact.phone || "-"}<br />
                      <strong>Email:</strong> {contact.email || "-"}<br />
                      <strong>Website:</strong>{" "}
                      {contact.website ? (
                        <a href={contact.website} target="_blank" rel="noopener noreferrer">
                          {contact.website}
                        </a>
                      ) : (
                        "-"
                      )}
                      <br />
                      <strong>Group:</strong> {contact.group_name || "-"}
                    </Card.Text>
                    <div className="d-flex justify-content-end">
                      <Link to={`/edit/${contact.id}`} className="btn btn-warning btn-sm me-2">
                        Edit
                      </Link>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(contact.id)}>
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div className="text-center text-danger">
                No contacts available
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center me-2">
          <Button variant="danger">
            <FaSignOutAlt className="me-1" />
            <a href="/" className="text-white">
              Logout
            </a>
          </Button>
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>

        <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Select Group to Filter Contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedGroup || "Select a group"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {groups.map((group) => (
                  <Dropdown.Item
                    key={group.group_name}
                    onClick={() => handleGroupSelect(group.group_name)}
                  >
                    {group.group_name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          closeOnClick
          draggable
          pauseOnHover
        />
      </div>
    </Container>
  );
};

export default ContactList;
