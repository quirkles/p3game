"use client";

import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Heading from "@/components/presentational/Heading";
import { selectSessionUser } from "@/store/slices/sessionUser";
import { getColor } from "@/styles/colors";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${getColor("blue")};
  border-bottom: 1px solid #e0e0e0;
  color: ${getColor("white")};
`;

const UserInfo = styled.div`
  font-size: 1rem;
`;

export function Header() {
  // Access the session user from the Redux store
  const sessionUser = useSelector(selectSessionUser);

  return (
    <HeaderContainer>
      <Heading>My App</Heading>
      <UserInfo>
        {sessionUser.name ? `Welcome, ${sessionUser.name}` : "Welcome, Guest"}
      </UserInfo>
    </HeaderContainer>
  );
}

export default Header;
