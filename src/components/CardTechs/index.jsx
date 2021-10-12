import './style.css'
import {AiOutlineDelete} from 'react-icons/ai'
import api from '../../services/api'
import { useState } from 'react';


const CardTechs = ({list, func}) => {
    const [token, setToken] = useState(() => {
        const localToken = localStorage.getItem("@kenziehub:token") || "";
        return JSON.parse(localToken);
      });
    

    const delet = (id) => {
        api.delete("users/techs/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })        
    }
    return (
        <ul>
            {list.map((tech) => {
              return  <li key = {tech.id}>
                    <span className = 'title'        > {tech.title}</span>
                    <span className = 'status'      > {tech.status}</span>
                    <span className =  'icon-delete'> <AiOutlineDelete onClick = {() => delet(tech.id)}/></span>
                </li>
            })}
        </ul>
    )
}

export default CardTechs;