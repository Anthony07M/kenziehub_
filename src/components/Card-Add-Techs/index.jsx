import './style.css'
import { TextField, MenuItem, Select, Button, InputLabel } from "@material-ui/core"
import { useForm } from "react-hook-form";
import api from '../../services/api'
import {useState} from 'react'


const AddTech = ({state, setState}) => {

    const { register, handleSubmit,reset } = useForm()
    const [token, setToken] = useState(() => {
        const localToken = localStorage.getItem("@kenziehub:token") || "";
        return JSON.parse(localToken);
      });

     

    const onSubmit = (data) => {

        api.post("users/techs", data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((res) => console.log(res))
       
        setState(false)
        reset() 
    }
    return (
        <div className = 'container-form-add-tech'>
            <form  onSubmit = {handleSubmit(onSubmit)} className = 'form-tech'>
            <TextField 
                label = 'Tecnologia'
                type = 'text'
                variant = 'outlined'
                color = 'secondary'
                margin = 'normal'
                required
                {...register("title")}
            />
            <InputLabel>Status</InputLabel>
            <Select  {...register("status")} required>
                <MenuItem value = 'Iniciante'>Iniciante</MenuItem>
                <MenuItem value = 'Intermidiário'>Intermidiário</MenuItem>
                <MenuItem value = 'Avançado'>Avançado</MenuItem>
            </Select>
            <Button type = 'submit' variant = 'contained' color = 'secondary'>Cadastrar</Button>
        </form>
        </div>
    )
}
export default AddTech;