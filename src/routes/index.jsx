import { Switch, Route, Redirect } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import { useState } from 'react'
import { useEffect } from 'react'


const Routes = () => {

    const [autenticado, setAutenticado] = useState(false)

    useEffect(() => {
        const token =  JSON.parse(localStorage.getItem("@kenziehub:token"))
        if(token){
            setAutenticado(true)
        }
    }, [autenticado])

    const RouteHome = () => {
        return autenticado ? (<Home/>): (<Redirect to = '/'/>)
    }
  

    return (
        <Switch>
            <Route exact path = '/'>
                    <Login autenticado = {autenticado} setAutenticado = {setAutenticado} />
            </Route>

            <Route path = '/register'>
                <Register/>
            </Route>

            <RouteHome path = '/home'/>

        </Switch>

    )
}

export default Routes;