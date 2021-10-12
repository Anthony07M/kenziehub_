import './style.css'
import {TextField, Button} from '@material-ui/core'
import { Link, Redirect, useHistory } from 'react-router-dom'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import api from '../../services/api'
import {toast} from 'react-toastify'


const FormLogin = ({autenticado, setAutenticado}) => {
    
    const schema = yup.object().shape({
        email: yup.string().email("email inválido").required("Email obrigatório"),
        password: yup.string().required("senha obrigatório")
    })


    const {register, handleSubmit, reset, formState: {errors}} = useForm({resolver: yupResolver(schema)})


    const onSubmit = (data) => {
        api.post('/sessions', data)
        .then((response) => {
            
            const {token, user} = response.data
            const {id} = response.data.user
            localStorage.clear()
            localStorage.setItem("@kenziehub:token", JSON.stringify(token))
            localStorage.setItem("@kenziehub:id", JSON.stringify(id))
            localStorage.setItem("@kenziehub:techs", JSON.stringify(user.techs))
            toast.success('Seja bem vindo')
            setAutenticado(true)
            reset()
            return <Redirect to = '/home'/>

        })
        .catch((err) => toast.error("email ou senha incorretos"))
    }

    return(
        <>
            <form className = 'form-login' onSubmit = {handleSubmit(onSubmit)} >

                <TextField
                    type = 'email'
                    label = 'Email'
                    margin = 'normal'
                    variant = 'outlined'
                    {...register("email")}
                    />
                    {errors.email?.message}

                <TextField
                    type = 'password'
                    label = 'Senha'
                    margin = 'normal'
                    variant = 'outlined'
                    {...register("password")}
                    />
                    {errors.password?.message}
                <Button type = 'submit' variant = 'contained' color= 'secondary' >Entrar</Button>
                <p>Ainda não tem conta ? <Link to = '/register'>registre-se</Link></p>
            </form>
        </>
    )
}

export default FormLogin;