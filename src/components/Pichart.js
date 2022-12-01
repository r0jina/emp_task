import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "designer", value: 40 },
  { name: "marketing", value: 30 },
  { name: "developer", value: 30 },
  { name: "trainee", value: 20 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default class PiChart extends PureComponent {
  render() {
    const CustomTooltip = ({ active, payload, label }) => {
      if (active) {
        return (
          <div
            //   className="c1 bg6 f1"
            style={{
              // backgroundColor: "#ffff",
              padding: "5px",
              width: "100%",
              // border: "1px solid var(--primary-clock)",
            }}
          >
            <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
          </div>
        );
      }
      return null;
    };
    return (
      <PieChart width={500} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          //   paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="vertical"
          verticalAlign="bottom"
          align="left"
          // content={empRenderLegend}
        />
      </PieChart>
    );
  }
}
