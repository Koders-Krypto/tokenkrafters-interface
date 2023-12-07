"use client";
import { useState } from "react";
import { Tokens } from "../constants/tokens";
export default function SelectChain() {
  return (
    <select
      className="text-black bg-primary focus:outline-none rounded-full pl-4 input px-6 pr-8 py-2"
      name="tokens"
      id="tokens"
    >
      <option value={"Sort"}>Sort by</option>
      {Tokens?.map((token, i) => {
        return (
          <option key={i} value={token.name}>
            {token.name}
          </option>
        );
      })}
    </select>
  );
}
