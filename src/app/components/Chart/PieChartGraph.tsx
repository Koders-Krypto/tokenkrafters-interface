"use client";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Polygon", value: 1000, color: "bg-[#8247E5]" },
  { name: "Arbitirum", value: 400, color: "bg-[#213147]" },
  { name: "Celo", value: 100, color: "bg-[#FBCC5C]" },

  { name: "Base", value: 50, color: "bg-[#024FF6]" },
];
const COLORS = ["#8247E5", "#213147", "#FBCC5C", "#024FF6"];

export default function PieChartGraph() {
  return (
    <div>
      <div style={{ width: 300, height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-4 px-4">
        {data.map((item, k) => {
          return (
            <div
              key={k}
              className="flex flex-row items-center justify-start gap-2"
            >
              <span className={`${item.color} h-3 w-3 rounded-full`}></span>
              <h3>{item.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
