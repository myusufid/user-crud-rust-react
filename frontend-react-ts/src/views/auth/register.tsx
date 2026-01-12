// import useState
import { useState } from 'react';

// import useNavigate
import { useNavigate } from 'react-router';

// import api
import Api from '../../services/api';

export default function Register() {

    // define state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // define state validation
    const [validation, setValidation] = useState<any>([]);

    // define navigate
    const navigate = useNavigate();

    // method "register"
    const register = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await Api.post('/api/register', {
                name: name,
                email: email,
                password: password
            });

            // redirect to login page
            navigate('/login');

        } catch (error: any) {
            // assign error to state validation
            setValidation(error.response.data.data);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4>REGISTER</h4>
                            <hr />
                            <form onSubmit={register}>
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
                                    <label className="form-label fw-bold">Password</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                                    {
                                        validation.password && (
                                            <div className="alert alert-danger mt-2">
                                                {validation.password[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <button type="submit" className="btn btn-primary w-100">REGISTER</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
