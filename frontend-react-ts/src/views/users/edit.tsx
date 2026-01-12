// import useState and useEffect
import { useState, useEffect } from 'react';

// import useNavigate and useParams
import { useNavigate, useParams } from 'react-router';

// import api
import Api from '../../services/api';

// import js cookie
import Cookies from 'js-cookie';

export default function UserEdit() {

    // define state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // define state validation
    const [validation, setValidation] = useState<any>([]);

    // define navigate
    const navigate = useNavigate();

    // get ID from parameter URL
    const { id } = useParams();

    // method "fetchUser"
    const fetchUser = async () => {
        // get token from cookies
        const token = Cookies.get('token');

        if (token) {
            // set authorization header
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            try {
                // fetch data from API with Axios
                const response = await Api.get(`/api/users/${id}`);
                // assign data to state
                setName(response.data.data.name);
                setEmail(response.data.data.email);
            } catch (error) {
                console.error("There was an error fetching the user!", error);
            }
        }
    }

    // run hook useEffect
    useEffect(() => {
        fetchUser();
    }, []);

    // method "updateUser"
    const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // get token from cookies
        const token = Cookies.get('token');

        if (token) {
            // set authorization header
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            try {
                // send data to server
                await Api.put(`/api/users/${id}`, {
                    name: name,
                    email: email,
                    password: password
                });

                // redirect to users index
                navigate('/users');

            } catch (error: any) {
                // assign error to state validation
                setValidation(error.response.data.data);
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <form onSubmit={updateUser}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Full Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Full Name" />
                                    {
                                        validation.name && (
                                            <div className="alert alert-danger mt-2">
                                                {validation.name[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Email Address</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Address" />
                                    {
                                        validation.email && (
                                            <div className="alert alert-danger mt-2">
                                                {validation.email[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Password (Optional)</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password to change" />
                                    {
                                        validation.password && (
                                            <div className="alert alert-danger mt-2">
                                                {validation.password[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <button type="submit" className="btn btn-md btn-primary rounded shadow-sm border-0">UPDATE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
