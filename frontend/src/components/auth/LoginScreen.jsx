import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { authStartLogin, authStartRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: 'brian.magario@gmail.com',
        lPassword: ''
    });
    const { lEmail, lPassword } = formLoginValues;
    
    
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: 'Bri',
        rEmail: 'brian2.magario@gmail.com',
        rPassword: '',
        rPassword2: ''
    });
    const { rName, rEmail, rPassword, rPassword2 } = formRegisterValues; 

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(authStartLogin(lEmail, lPassword));
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if(rPassword !== rPassword2) {
            Swal.fire({
                title: 'Error',
                text: 'Passwords do not match',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } else {
            dispatch(authStartRegister(rName, rEmail, rPassword));
        }
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                                name="rPassword"
                                value={ rPassword }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter the password again" 
                                name="rPassword2"
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Register" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}