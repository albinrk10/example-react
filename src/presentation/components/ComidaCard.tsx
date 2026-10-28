import { Comida } from "@/domain/entities/Comida";
import { View,Text } from "react-native";

interface ComidaCardProps{
    comida:Comida;
}

export function ComidaCard({comida}: ComidaCardProps){
    return(
        <View className="mb-3 rounded-2xl bg-white p-4 shadow">
          <Text className="text-xl font-extrabold text-slate-900" >{comida.nombre}</Text>
          <Text className="mt-1 text-slate-500" >{comida.descripcion}</Text>
         <Text className="mt-3 font-bold text-indigo-600" >S/ {comida.precio}</Text>
   
        </View>
    )
}