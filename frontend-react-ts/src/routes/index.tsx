//import useContext
import { useContext } from 'react';

//import context
import { AuthContext } from '../context/AuthContext';

//import react router dom
import { Routes, Route, Navigate } from "react-router";

//import view home
import Home from "../views/home/index.tsx";

//import view register
import Register from "../views/auth/register.tsx";

//import view login
import Login from "../views/auth/login.tsx";

//import view users index
import UserIndex from "../views/users/index.tsx";

//import view users create
import UserCreate from "../views/users/create.tsx";

//import view users edit
import UserEdit from "../views/users/edit.tsx";

export default function AppRoutes() {

    // Menggunakan useContext untuk mendapatkan nilai dari AuthContext
    const auth = useContext(AuthContext);

    // Menggunakan optional chaining untuk menghindari error jika auth tidak ada
    const isAuthenticated = auth?.isAuthenticated ?? false;

    return (
        <Routes>
            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/register" */}
            <Route path="/register" element={
                isAuthenticated ? <Navigate to="/users" replace /> : <Register />
            } />

            {/* route "/login" */}
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/users" replace /> : <Login />
            } />

            {/* route "/users" */}
            <Route path="/users" element={
                isAuthenticated ? <UserIndex /> : <Navigate to="/login" replace />
            } />

            {/* route "/users/create" */}
            <Route path="/users/create" element={
                isAuthenticated ? <UserCreate /> : <Navigate to="/login" replace />
            } />

            {/* route "/users/edit/:id" */}
            <Route path="/users/edit/:id" element={
                isAuthenticated ? <UserEdit /> : <Navigate to="/login" replace />
            } />
        </Routes>
    );
}
