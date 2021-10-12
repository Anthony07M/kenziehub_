import './style.css'
import {Button, TextField, MenuItem, Select, InputLabel} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form' 
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import api from '../../services/api'

const FormRegister = () => {

    const schema = yup.object().shape({
        name: yup.string().required("Nome obrigatório"),
        email: yup.string().email("email inválido").required("campo obrigatório"),
        password: yup.string().min(6, "deve conter pelo menos 6 dítios").required("Informe uma senha"),
        contact: yup.string().required("contado obrigatório"),
        bio: yup.string().required("Campo obrigatório"),
        course_module: yup.string().required("Modulo Obrigatório")

    })
    const {register, reset, handleSubmit, formState: {errors}, } = useForm({resolver: yupResolver(schema)})
    
    
    const onSubmit = (data) => {
        api.post('/users', data)
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
        
        reset()
    }

    return (
        <div className = 'container'>
            <form className = 'form-register' onSubmit = {handleSubmit(onSubmit)} >
            
                <TextField 
                    label = 'Nome'
                    variant = 'outlined'
                    color = 'secondary'
                    margin = 'normal'
                    required
                    {...register("name")}
                    />


                <TextField
                    label = 'Email'
                    type = 'email'
                    variant = 'outlined'
                    color = 'secondary'
                    margin = 'normal'
                    required
                    {...register("email")}
                    />

                <TextField
                    label = 'Senha'
                    type = 'password'
                    variant = 'outlined'
                    color = 'secondary'
                    margin = 'normal'
                    required
                    {...register("password")}
                    />

                <TextField
                    label = 'Contado'
                    variant = 'outlined'
                    color = 'secondary'
                    margin = 'normal'
                    required
                    {...register("contact")}
                    />

                <TextField
                    label = 'Bio'
                    variant = 'outlined'
                    color = 'secondary'
                    margin = 'normal'
                    required
                    {...register("bio")}
                    />

                <InputLabel>Módulo do curso</InputLabel>
                 <Select  {...register("course_module")} required >
                    <MenuItem value = 'ção ao Frontend'>Introdução ao Frontend</MenuItem>
                    <MenuItem value = 'Frontend Avançado'>Frontend Avançado</MenuItem>
                    <MenuItem value = 'Introdução ao Backend'>Introdução ao Backend</MenuItem>
                    <MenuItem value = 'Backend Avançado'>Backend Avançado</MenuItem>
               </Select>

                <Button type = 'submit' variant="contained" color = 'secondary'>Cadastrar</Button>
                <p>Ja tem cadastro ? Faça <Link to = '/' >login</Link></p>
            </form>
        </div>
    )
}

export default FormRegister;