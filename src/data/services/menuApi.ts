import { Comida } from "@/domain/entities/Comida";
import axios from 'axios'

const MENU_ENDPOINT = "https://platziblog-124e6-default-rtdb.firebaseio.com/Menu/.json"

export async function obtenerMenuConFetch(): Promise<Comida[]>{
    console.log('[FETCH] GET',MENU_ENDPOINT);
    const response = await fetch(MENU_ENDPOINT);

    if(!response.ok){
        throw new Error(`Error HTTP con fetch: ${response.status}`);
    }

    const data: Comida[] =await response.json();
    console.log('[FECTH] DATA',data);
    return data
}

export async function obtenerMenuConAxios(): Promise<Comida[]>{
    console.log('[AXIOS] GET',MENU_ENDPOINT);
   
   const response= await axios.get<Comida[]>(MENU_ENDPOINT)
   
    console.log('[AXIOS] Status',response.status);
    console.log('[AXIOS] Data',response.data);
    return response.data
}


