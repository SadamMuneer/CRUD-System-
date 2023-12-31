import { useState } from "react";
import { Button, Col, FormLabel, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Crud() {
  const initialData = [];

  const [crudData, setCrudData] = useState({
    items: initialData,
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      phoneNumber: "",
    },
    editMode: false,
    editItemId: null,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setCrudData({
      ...crudData,
      formData: {
        ...crudData.formData,
        [name]: value,
      },
    });
  }

  function handleAdd() {
    const { formData, items, editMode, editItemId } = crudData;
    if (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.gender.trim() !== "" &&
      formData.phoneNumber.trim() !== ""
    ) {
      if (editMode && editItemId !== null) {
        const updatedItems = items.map((item) =>
          item.id === editItemId ? { ...formData, id: editItemId } : item
        );
        setCrudData({
          ...crudData,
          items: updatedItems,
          formData: {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            phoneNumber: "",
          },
          editMode: false,
          editItemId: null,
        });
        toast.success("Data updated successfully");
      } else {
        const newItem = {
          id: items.length + 1,
          ...formData,
        };
        setCrudData({
          ...crudData,
          items: [...items, newItem],
          formData: {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            phoneNumber: "",
          },
        });
        toast.success("Data added successfully");
      }
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleAdd();
    }
  }

  function handleEdit(id) {
    const selectedItem = crudData.items.find((item) => item.id === id);
    if (selectedItem) {
      setCrudData({
        ...crudData,
        formData: { ...selectedItem },
        editMode: true,
        editItemId: id,
      });
    }
  }

  function handleDelete(id) {
    const updatedItems = crudData.items.filter((item) => item.id !== id);
    setCrudData({
      ...crudData,
      items: updatedItems,
      editMode: false,
      editItemId: null,
    });
    toast.success("Data deleted successfully");
  }

  return (
    <div className="maindiv">
      <h1 className="text-center fw-bold">Contact Page</h1>
      <div>
        <Row>
          <Col>
            <FormLabel className="mb-0 py-2">First Name:</FormLabel>
            <input
              className="allinputs"
              type="text"
              name="firstName"
              value={crudData.formData.firstName}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="First Name"
            />
          </Col>
          <Col>
            <FormLabel className="mb-0 py-2">Last Name:</FormLabel>
            <input
              className="allinputs"
              type="text"
              name="lastName"
              value={crudData.formData.lastName}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Last Name"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormLabel className="mb-0 py-2">Email:</FormLabel>
            <input
              className="allinputs"
              type="text"
              name="email"
              value={crudData.formData.email}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Email"
            />
          </Col>
          <Col>
            <FormLabel className="mb-0 py-2">Gender:</FormLabel>
            <input
              className="allinputs"
              type="text"
              name="gender"
              value={crudData.formData.gender}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Gender"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormLabel className="mb-0 py-2">Phone Number:</FormLabel>
            <input
              className="allinputs"
              type="text"
              name="phoneNumber"
              value={crudData.formData.phoneNumber}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Phone Number"
            />
          </Col>
        </Row>
        <div className="submitbutton">
          <Button onClick={() => handleAdd()}>Submit</Button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className="tableheading py-2">First Name</th>
            <th className="tableheading py-2">Last Name</th>
            <th className="tableheading py-2">Email</th>
            <th className="tableheading py-2">Gender</th>
            <th className="tableheading py-2">Phone Number</th>
            <th className="tableheading py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {crudData.items.map((item) => (
            <tr key={item.id}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
              <td>{item.phoneNumber}</td>
              <td>
                <Button onClick={() => handleEdit(item.id)}>Edit</Button>
                <Button onClick={() => handleDelete(item.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default Crud;
