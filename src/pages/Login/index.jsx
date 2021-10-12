import './style.css'
import FormLogin from '../../components/FormLogin'
import { Redirect } from 'react-router-dom'

const Login = ({autenticado, setAutenticado}) => {
    
    if(autenticado){
        return <Redirect to = '/home' />
    }

    
    return(
        <div className = 'container'>
            <FormLogin  autenticado = {autenticado} setAutenticado = {setAutenticado} />
        </div>
    )
}

export default Login;
