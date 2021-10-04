import React, { useState } from "react";
import axios from "axios";

export default function Add() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleInput = (e) => {
    if (e.target.name === "name") setName(e.target.value);
    if (e.target.name === "email") setEmail(e.target.value);
  };

  const handleClick = () => {
    const data = {
      name,
      email,
    };
    axios.post(`/api/auth/hooks`, data);
  };

  return (
    <div>
      <input
        onChange={handleInput}
        name="name"
        type="text"
        placeholder="name"
        value={name}
      />
      <input
        onChange={handleInput}
        name="email"
        type="text"
        placeholder="email"
        value={email}
      />
      <button onClick={handleClick}>Add User</button>
    </div>
  );
}
