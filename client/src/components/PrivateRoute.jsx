import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? <Outlet /> : <h1>Sign in to view this page</h1>;
}
