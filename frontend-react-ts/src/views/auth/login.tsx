// import useState and useContext
import { useState, useContext } from 'react';

// import useNavigate
import { useNavigate } from 'react-router';

// import api
import Api from '../../services/api';

// import js cookie
import Cookies from 'js-cookie';

// import context
import { AuthContext } from '../../context/AuthContext';

export default function Login() {

    // define state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // define state validation
    const [validation, setValidation] = useState<any>([]);

    // define state loginFailed
    const [loginFailed, setLoginFailed] = useState<any>([]);

    // define navigate
    const navigate = useNavigate();

    // destructuring context
    const auth = useContext(AuthContext);
    const setIsAuthenticated = auth?.setIsAuthenticated;

    // method "login"
    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await Api.post('/api/login', {
                email: email,
                password: password
            });

            // set token to cookies
            Cookies.set('token', response.data.data.token);

            // set isAuthenticated to true
            if (setIsAuthenticated) {
                setIsAuthenticated(true);
            }

            // redirect to users index
            navigate('/users');

        } catch (error: any) {
            // assign error to state validation
            setValidation(error.response.data.data);

            // assign error to state loginFailed
            setLoginFailed(error.response.data);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4>LOGIN</h4>
                            <hr />
                            {
                                loginFailed.message && (
                                    <div className="alert alert-danger">
                                        {loginFailed.message}
                                    </div>
                                )
                            }
                            <form onSubmit={login}>
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
                                <button type="submit" className="btn btn-primary w-100">LOGIN</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
