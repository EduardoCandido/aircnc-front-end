import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

import lixeira from '../../assets/trash-solid.svg';

export default function Dashboard({history}){
    const [spots, setSpots] = useState([]);

    useEffect(()=>{

        async function loadSpots(){
            const user_id = localStorage.getItem('user');

            const response = await api.get('/dashboard',{
                headers: { user_id }
            });

            setSpots(response.data);

            console.log(response.data);

        }

        loadSpots();
    }, []);

    function deleteSpot(spotID){
        const  spot_id  = spotID;

        console.log(spot_id);

        api.delete(`/spots/${spot_id}`);

        window.location.reload();
    }
    return (
        <>

            <ul className="spot-list">
                {spots.map(spot=>(
                    <li key={spot.id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})`}}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price? `R$${spot.price}/dia`: 'GRATUITO' } 
                        <img src={lixeira} alt="excluir" onClick={()=>deleteSpot(spot.id)}/></span>
                    </li>
                ))}
            </ul>
            <Link to='/new'><button className="btn"> Cadastrar novo Spot</button></Link>
        </>
    )
}