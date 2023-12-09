"use client";
import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Dec 1",
    uv: 4000,
    Amount: 2400,
    amt: 2400,
  },
  {
    name: "Dec 4",
    uv: 3000,
    Amount: 1398,
    amt: 2210,
  },
  {
    name: "Dec 6",
    uv: 2000,
    Amount: 9800,
    amt: 2290,
  },
  {
    name: "Dec 9",
    uv: 2780,
    Amount: 3908,
    amt: 2000,
  },
];

export default function Chart() {
  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Amount"
            stroke="#82ca9d"
            fill="#54E8FD"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
