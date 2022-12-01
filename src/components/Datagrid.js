import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  MagnifyingGlass,
  PencilSimpleLine,
  Plus,
  Trash,
  X,
} from "phosphor-react";
import { Button, Grid, Modal } from "@mui/material";
import { useState } from "react";
import { Form, Input } from "antd";
import { useEffect } from "react";

const UserTable = () => {
  var users_list = [
    {
      id: 1,
      fullName: "User1",
      designation: "react developer",
      status: "active",
      action: "",
    },
    {
      id: 2,
      fullName: "emp1",
      designation: "php developer",
      status: "active",
      action: "",
    },
    {
      id: 3,
      fullName: "xyz",
      designation: "java developer",
      status: "active",
      action: "",
    },
    {
      id: 4,
      fullName: "mno",
      designation: "laravel developer",
      status: "active",
      action: "",
    },
  ];
  const [allData, setAllData] = useState([]);

  const getUser = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const temp = await res.json();
    var data = [];
    var y;
    temp.forEach((each) => {
      y = {
        id: each.id,
        name: each.name,
        email: each.email,
        website: each.website,
      };
      data.push(y);
      setAllData(data);
    });
    console.log(data);
  };
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const [add, setAdd] = useState({
    id: Number,
    name: "",
    email: "",
    website: "",
  });
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleOpen = (id) => {
    const obj = allData.find((each) => each.id === id);
    setValues({ ...obj });

    setOpen(true);
  };

  const handleChange = (name, email, website) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      [email]: e.target.value,
      [website]: e.target.value,
    });
  };

  const handleClose = () => setOpen(false);

  const handleDeleteUser = (id) => {
    var delt = allData.filter((user) => user.id !== id);
    setAllData(delt);
    console.log(id);
  };

  const handleSubmit = () => {
    const reqIndex = allData.findIndex((each) => each.id === values.id);
    var a = allData.slice(0, reqIndex);
    var b = allData.slice(reqIndex + 1);
    var c = [];
    a.forEach((each) => {
      c.push(each);
    });
    c.push(values);
    b.forEach((each) => {
      c.push(each);
    });
    setAllData(c);
    // allData[reqIndex] = values;

    setOpen(false);
  };

  const handleCancel = () => {
    setValues({});
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    var a = allData.filter((data) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResult(a);
  };

  // add
  const [addOpen, setAddOpen] = useState(false);

  const handleAddClose = () => setAddOpen(false);

  const handleAddOpen = () => setAddOpen(true);

  const handleAddSubmit = () => {
    var x = allData.length;
    var t = {
      id: x + 1,
      name: add.name,
      email: add.email,
      website: add.website,
    };
    var w = [];
    allData.forEach((each) => w.push(each));
    w.push(t);
    setAllData(w);
    setAddOpen(false);
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "website",
      headerName: "website",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "action",
      headerName: "action",

      sortable: true,
      width: 160,
      renderCell: (params) => {
        const value = params.value;
        // console.log(params);
        return (
          <Box display="flex" flexDirection="row">
            <Button onClick={() => handleOpen(params.id)}>
              <PencilSimpleLine size={16} />
            </Button>
            <Modal open={open} onClose={handleClose}>
              <Grid container height="100vh">
                <Grid
                  item
                  lg={6}
                  marginLeft="auto"
                  marginRight="auto"
                  marginTop="auto"
                  marginBottom="auto"
                  backgroundColor="white"
                  paddingInline="50px"
                >
                  <Box
                    textAlign="center"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    marginTop="10px"
                  >
                    <p>Edit Employee</p>
                    <X size={20} weight="bold" onClick={handleClose} />
                  </Box>

                  <Form>
                    <Form.Item
                      label="Name"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      onChange={handleChange("name")}
                    >
                      <Input className="test" value={values.name} />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      onChange={handleChange("email")}
                    >
                      <Input value={values.email} />
                    </Form.Item>
                    <Form.Item
                      label="Website"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      onChange={handleChange("website")}
                    >
                      <Input value={values.website} />
                    </Form.Item>
                  </Form>
                  <Box
                    display="flex"
                    flex-direction="row"
                    gap="10px"
                    marginBottom="20px"
                  >
                    <Button
                      variant="contained"
                      style={{ textTransform: "none" }}
                      onClick={() => handleSubmit()}
                    >
                      Submit
                    </Button>
                    <Button variant="text" style={{ textTransform: "none" }}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Modal>

            <Button onClick={() => handleDeleteUser(params.id)}>
              <Trash size={16} />
            </Button>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <div className="mb-3 d-flex align-items-center searchWrapper">
        <input
          onChange={handleSearchChange}
          value={searchQuery}
          // className="w-100"
          style={{ borderRadius: "5px" }}
          placeholder="Search Customer"
          className="search"
        />
        <MagnifyingGlass color="#4062FF" size={24} className="searchicon" />
      </div>
      <Button
        variant="contained"
        className="f0 w1 f"
        style={{ gap: "10px", textTransform: "none" }}
        onClick={() => handleAddOpen()}
      >
        <Plus size={16} weight="bold" />
        Add User
      </Button>
      <Modal open={addOpen} onClose={handleAddClose}>
        <Grid container height="100vh">
          <Grid
            item
            lg={6}
            marginLeft="auto"
            marginRight="auto"
            marginTop="auto"
            marginBottom="auto"
            backgroundColor="white"
            paddingInline="50px"
          >
            <Box
              textAlign="center"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              marginTop="10px"
            >
              <p>Add Employee</p>
              <X size={20} weight="bold" onClick={handleAddClose} />
            </Box>

            <Form>
              <Form.Item
                label="Name"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onChange={(e) =>
                  setAdd((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              >
                <Input className="test" value={add.name} />
              </Form.Item>
              <Form.Item
                label="Email"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onChange={(e) =>
                  setAdd((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              >
                <Input value={add.email} />
              </Form.Item>
              <Form.Item
                label="Website"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onChange={(e) =>
                  setAdd((prev) => ({
                    ...prev,
                    website: e.target.value,
                  }))
                }
              >
                <Input value={add.website} />
              </Form.Item>
            </Form>
            <Box
              display="flex"
              flex-direction="row"
              gap="10px"
              marginBottom="20px"
            >
              <Button
                variant="contained"
                style={{ textTransform: "none" }}
                onClick={() => handleAddSubmit()}
              >
                Submit
              </Button>
              <Button variant="text" style={{ textTransform: "none" }}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Modal>
      <DataGrid
        // rows={users_list}
        rows={searchQuery !== "" ? searchResult : allData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default UserTable;
