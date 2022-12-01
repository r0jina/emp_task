import { alpha, Button, Grid, InputBase, styled } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { MagnifyingGlass, Plus } from "phosphor-react";
import UserTable from "./Datagrid";
import { useState } from "react";

const UserList = ({ crud }) => {
  const outletContext = useOutletContext();

  useEffect(() => {
    const setTextFn = outletContext[0];
    setTextFn("Userlist");
  }, [outletContext]);

  const [array, setArray] = useState([]);
  const [values, setValues] = useState({});

  return (
    <Grid
      container
      // width="100vw"
      paddingInline="50px"
      className=""
      // height="100vw"
      display="flex"
      flexDirection="column"
    >
      <Grid item lg={10} marginTop="10px">
        <UserTable />
      </Grid>
    </Grid>
  );
};

export default UserList;
