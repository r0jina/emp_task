import { Box, Button, Card, CardActions, Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import Example from "./BarChart";
import BarGraph from "./BarChart";
import PiChartComponent from "./Pichart";
import "../css/App.css";
import { emp_details } from "./emp_details";

const Dashboard = () => {
  const outletContext = useOutletContext();

  useEffect(() => {
    const setTextFn = outletContext[0];
    setTextFn("Dashboard");
  }, [outletContext]);

  return (
    <Grid
      container
      paddingInline="50px"
      height="calc(100vh - 70px) !important"
      overflow="auto"
      marginBottom="50px"
    >
      <p className="f2 w2 mt-3">Valued Employees</p>

      <Grid
        item
        display="flex"
        flexDirection="row"
        marginTop="20px"
        marginBottom="30px"
      >
        <Box className="mainleave">
          {emp_details.map((item, i) => (
            <Card
              key={i}
              // onClick={() => handleOpen(item)}
              id={item._id}
              className="requests f1 w2"
            >
              <div variant="primary">{item.name}</div>

              <div variant="primary" className="f0 w1 c2 date">
                {item.joindate}
              </div>
              <div variant="primary" className="reason f1 w1 c1">
                {item.details}
              </div>
            </Card>
          ))}
        </Box>
      </Grid>
      <Grid
        item
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        marginTop="auto"
        marginBottom="auto"
      >
        <Grid item className="bg_chart" lg={5.5} alignItems="center">
          <PiChartComponent />
        </Grid>
        <Grid item className="bg_chart" lg={5.5} alignItems="center">
          <BarGraph />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
