import './style.css'
import { Button} from '@material-ui/core'
import { useState, useEffect } from 'react'
import AddTech from '../../components/Card-Add-Techs'
import Techs from '../../components/CardTechs'
import api from '../../services/api'
import {toast} from 'react-toastify'

const Home = () => {

    const [show, setShow] = useState()

    const [techs, setTechs] = useState(() => {
        const techsUser = localStorage.getItem("@kenziehub:techs") || ""
        return JSON.parse(techsUser)
    })
    

    const logout = () => {
        localStorage.clear()
        return window.location.reload() 
    }
    
    const id =  JSON.parse(localStorage.getItem("@kenziehub:id"));

    useEffect(() => {
        api.get(`/users/${id}`)
        .then((res) => setTechs(res.data.techs))
        .catch((e) => console.log(e))
    }, [techs])


    const delet = () => {
        toast.warning("Tec. deletada")
        api.delete('/users')
    }
    
    return (

        <div className = 'container-home'>

            <div className = 'header'>
            <Button 
                    variant = 'contained'
                    color = 'secondary'
                    onClick = {() => setShow(true)}
                >
                    Cadastrar Tecnologia
                </Button>
                <Button 
                    variant = 'contained'
                    color = 'primary'
                    onClick = {() => logout()}
                >
                    Sair
                </Button>
            </div>
            <div className = 'main'>
                <label>TCNOLOGIAS: </label>
                {show && <AddTech state = {show} setState  = {setShow}/> }
                <Techs list = {techs} func = {() => delet()}/>
            </div>
        </div>
    )
}

export default Home;