// import useState and useEffect
import { useState, useEffect } from 'react';

// import Link
import { Link } from 'react-router';

// import api
import Api from '../../services/api';

// import js cookie
import Cookies from 'js-cookie';

interface User {
    id: number;
    name: string;
    email: string;
}

export default function UserIndex() {

    // define state "users"
    const [users, setUsers] = useState<User[]>([]);

    // define method "fetchUsers"
    const fetchData = async () => {

        // get token from cookies
        const token = Cookies.get('token');

        if (token) {
            // set authorization header
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            try {
                // fetch data from API with Axios
                const response = await Api.get('/api/users');
                // assign response data to state "users"
                setUsers(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        }
    }

    // run hook useEffect
    useEffect(() => {
        // call method "fetchData"
        fetchData();
    }, []);

    // define method "deleteUser"
    const deleteUser = async (id: number) => {

        // get token from cookies
        const token = Cookies.get('token');

        if (token) {
            // set authorization header
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            try {
                // delete data from API with Axios
                await Api.delete(`/api/users/${id}`);
                // call method "fetchData"
                fetchData();
            } catch (error) {
                console.error("There was an error deleting the user!", error);
            }
        }
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/users/create" className="btn btn-md btn-success rounded shadow-sm border-0 mb-3">ADD NEW USER</Link>
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">FULL NAME</th>
                                        <th scope="col">EMAIL ADDRESS</th>
                                        <th scope="col" style={{ width: '15%' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.length > 0
                                            ? users.map((user, index) => (
                                                <tr key={index}>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td className="text-center">
                                                        <Link to={`/users/edit/${user.id}`} className="btn btn-sm btn-primary rounded-sm shadow-sm border-0 me-2">EDIT</Link>
                                                        <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger rounded-sm shadow-sm border-0">DELETE</button>
                                                    </td>
                                                </tr>
                                            ))
                                            : <tr>
                                                <td colSpan={4} className="text-center">
                                                    <div className="alert alert-danger mb-0">
                                                        Data Belum Tersedia!
                                                    </div>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
