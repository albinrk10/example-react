import { obtenerMenuConAxios, obtenerMenuConFetch } from "@/data/services/menuApi";
import { Comida } from "@/domain/entities/Comida";
import { ComidaCard } from "@/presentation/components/ComidaCard";
import { ErrorView, LoadingView } from "@/presentation/components/StateViews";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TipoConsumo = 'fetch' | 'axios' | null;

export default function InicioRouter() {

  //stados
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tipoCosumo, setTipoConsumo] = useState<TipoConsumo>(null);

  //funcionalidad
  const cargarConFetch = async () => {
    try {
      setLoading(true);
      setError(null);
      setTipoConsumo('fetch')

      const data =await obtenerMenuConFetch();
      setComidas(data)
    } catch (e) {
      console.log('Error fetch', e)
      setError('Nose pudo cargar el menu usando fetch')
    } finally {
      setLoading(false);
    }
  }

  const cargarConAxios = async () => {
    try {
      setLoading(true);
      setError(null);
      setTipoConsumo('axios')

      const data =await obtenerMenuConAxios();
      setComidas(data)
    } catch (e) {
      console.log('Error axios', e)
      setError('Nose pudo cargar el menu usando axios')
    } finally {
      setLoading(false);
    }
  }

 return(
  <SafeAreaView className="flex-1 bg-slate-50">
    <View className="flex-1 px-5 pt-4">
    <Text className="text-xs font-extrabold tracking-widest text-indigo-600">
      SEMANA 6 - GET BASICO
    </Text>
    <Text className="mt-1 text-3xl font-black text-slate-900">
      Consumo de endpoint
    </Text>
    <Text  className=" mt-1 text-slate-500">
      La misma API se consume con fetch y Axios
    </Text>

      <View className="my-4 flex-row gap-3">
     <TouchableOpacity className="flex-1 rounded-xl bg-slate-900 p-4" onPress={cargarConFetch}>
      <Text className="text-center font-extrabold text-white">
        Get con fecth
      </Text>
     </TouchableOpacity>
     //axios
      <TouchableOpacity className="flex-1 rounded-xl bg-indigo-600 p-4" onPress={cargarConAxios}>
      <Text className="text-center font-extrabold text-white">
        Get con axios
      </Text>
     </TouchableOpacity>
    </View>

     {tipoCosumo && !loading && !error &&(
      <Text className="">
         Datos Cargando con {tipoCosumo ==='fetch' ? 'fetch': 'axios'}
      </Text>
     )}

     {loading && <LoadingView/>}

     {error && !loading &&(
       <ErrorView
       mensaje={error}
       onReintentar={tipoCosumo== 'axios'? cargarConAxios : cargarConFetch}
       />
     )}

     {!loading && !error &&(
      <FlatList
      data={comidas}
      keyExtractor={(item) =>item.nombre}
      contentContainerStyle={{paddingBottom:24,paddingTop:8}}
      renderItem={({item}) => <ComidaCard comida={item}/>}
      ListEmptyComponent={
        <Text className="mt-8 text-center text-slate-500">
          Presiona un Boton para consumir el endpoint 
        </Text>
      }
      />
     )}

    </View>

  

  </SafeAreaView>
 )






}