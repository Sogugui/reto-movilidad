import React, { useEffect, useState, useRef, useContext } from 'react'
import axios from 'axios'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as ttmaps from "@tomtom-international/web-sdk-maps";
<<<<<<< HEAD
import tt, { LngLat, setLngLat } from "@tomtom-international/web-sdk-services";
=======
import tt, { LngLat,setLngLat } from "@tomtom-international/web-sdk-services";
import {useNavigate} from 'react-router-dom'
>>>>>>> 9bb1fe04c7d19a6820bde7f8fcf5c65150dc2f1f

import { useDebounce } from 'use-debounce'
import './Home.css';
import { authContext } from '../../../context/authContext';
import { data } from 'autoprefixer';
// import { data } from 'autoprefixer';

const TOMTOMAPIKEY = process.env.REACT_APP_APIKEY

function Home() {
  //Context
<<<<<<< HEAD
  const { userName, setUserName } = useContext(authContext)
  console.log('esto es el userName:', userName)
  const { userGoogle, setUserGoogle } = useContext(authContext)
=======
 const {userName,setUserName}=useContext(authContext)

 const {userGoogle,setUserGoogle}= useContext(authContext)
>>>>>>> 9bb1fe04c7d19a6820bde7f8fcf5c65150dc2f1f

  //Estado para peticion a api propia
  const [distance, setDistance] = useState();
  const [trenEmision, setTrenEmision] = useState();
  const [metroEmision, setMetroEmision] = useState();
  const [motoEmision, setMotoEmision] = useState();
  const [busEmision, setBusEmision] = useState();
  const [cocheEmision, setCocheEmision] = useState();
  //  const [painted,setPainted]= useState(false)

 const [showSidebar, setShowSidebar] = useState(false)

  //States
  const [startLatitude, setStartLatitude] = useState("");
  const [startLongitude, setStartLongitude] = useState("");
  const [destinationLatitude, setDestinationLatitude] = useState("");
  const [destinationLongitude, setDestinationLongitude] = useState("");
  const [result, setResult] = useState({});
  const mapElement = useRef();
  const [mapZoom, setMapZoom] = useState(10);
  const [map, setMap] = useState({});
  const [input, setInput] = useState("")
  const [input2, setInput2] = useState("")
<<<<<<< HEAD
  const [debouncedText] = useDebounce(input, 500);
  const [debouncedText2] = useDebounce(input2, 500);
  const [center, setCenter] = useState(["-3.6886008", "40.4069749"])
=======
  const [debouncedText] = useDebounce(input, 200); //almacenamos el valor del input
  const  [debouncedText2]=  useDebounce(input2, 200);
  const [center,setCenter] = useState(["-3.6886008", "40.4069749"])
>>>>>>> 9bb1fe04c7d19a6820bde7f8fcf5c65150dc2f1f


  const getAddress = async () => {
    try {
      const data = await axios.get(` https://api.tomtom.com/search/2/geocode/${input}.json?storeResult=false&typeahead=true&limit=1&countrySet=ES&lat=40.4165&lon=-3.70256&view=Unified&key=${TOMTOMAPIKEY}`)
      const lat = data.data.results[0].position.lat.toString()
      const lon = data.data.results[0].position.lon.toString()

      setStartLatitude(lon)
      setStartLongitude(lat)

      return data
    } catch (error) {
      console.log(error);
    }
  }

<<<<<<< HEAD

  const getAddress2 = async () => {
    try {
      const data2 = await axios.get(` https://api.tomtom.com/search/2/geocode/${input2}.json?storeResult=false&typeahead=true&limit=1&countrySet=ES&lat=40.4165&lon=-3.70256&view=Unified&key=${TOMTOMAPIKEY}`)

      const lat = data2.data.results[0].position.lat.toString()
      const lon = data2.data.results[0].position.lon.toString()

      setDestinationLatitude(lon)
      setDestinationLongitude(lat)

      return data2
    } catch (error) {
      console.log(error);
    }
  }

  const getPolution = async () => {

    const polution = await axios.get(` https://xinmye.pythonanywhere.com/estimar?distance=${distance}`)
    console.log('esto es polution', polution);

    //trae distancia en metros
    const tren = polution.data.resultado[3].tren.value*distance/1000
    const metro = polution.data.resultado[4].metro.value*distance/1000
    const moto = polution.data.resultado[1].moto.value*distance/1000
    const bus = polution.data.resultado[5].bus.value*distance/1000
    const coche = polution.data.resultado[0].coche.value*distance/1000

    console.log(tren, metro, moto, bus, coche)
    setTrenEmision(tren)
    setMetroEmision(metro)
    setMotoEmision(moto)
    setBusEmision(bus)
    setCocheEmision(coche)
    
    console.log('esto es emisionessss', trenEmision, metroEmision, motoEmision, busEmision, cocheEmision)

  }



=======
>>>>>>> 9bb1fe04c7d19a6820bde7f8fcf5c65150dc2f1f
  useEffect(() => {
    getAddress()
    getAddress2()
    calculateRoute()


    let map = ttmaps.map({
      key: `${TOMTOMAPIKEY}`,
      container: mapElement.current,
      center: center,
      zoom: mapZoom
    });

    setMap(map);

<<<<<<< HEAD
    return () => map


=======
       return () => map
    
    
>>>>>>> 9bb1fe04c7d19a6820bde7f8fcf5c65150dc2f1f
  }, [debouncedText, debouncedText2]);



  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleChange2 = (e) => {
    setInput2(e.target.value)
  }

  const calculateRoute = () => {
    tt.services
      .calculateRoute({
        key: `${TOMTOMAPIKEY}`,
        routeType: "eco",
        locations: `${startLatitude},${startLongitude}:${destinationLatitude},${destinationLongitude}`
      })
      .then(function (routeData) {
        console.log(routeData.toGeoJson());
        const data = routeData.toGeoJson();
        setResult(data);
        console.log("soy data de calculateRoute", data);
        const direction = routeData.toGeoJson().features[0].geometry.coordinates;
        const distance = data.features[0].properties.summary.lengthInMeters
        setDistance(distance)
        console.log(distance);
        map.addLayer({
          id: Math.random().toString(),
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "LineString",
                    properties: {},
                    coordinates: direction
                  }
                }
              ]
            }
          },
          layout: {
            "line-cap": "round",
            "line-join": "round"
          },
          paint: {
            "line-color": "#B4C43B",
            "line-width": 6
          }
        })

        map.setCenter([parseFloat(startLatitude), parseFloat(startLongitude)]);
        map.on('data', () => {
          let div = document.createElement('div')
          div.innerHTML = '<p>You´re here!</p>'

          let popup = new ttmaps.Popup({
            offset: 35,
          }).setDOMContent(div)

          const element = document.createElement('div')
          element.className = 'marker'

          let marker = new ttmaps.Marker({
            width: 32,
            height: 32,
            anchor: 'bottom',
            color: '#B4C43B',
          }).setLngLat([Number(startLatitude), Number(startLongitude)]).setPopup(popup)

          marker.addTo(map)

          // MarkerDestination:
          map.on('data', () => {
            let div2 = document.createElement('div')
            div2.innerHTML = '<p>This is your destiny!</p>'

            let popup2 = new ttmaps.Popup({
              offset: 35,
            }).setDOMContent(div2)

            const element = document.createElement('div')
            element.className = 'marker'

            let markerDestination = new ttmaps.Marker({
              width: 32,
              height: 32,
              anchor: 'bottom',
              color: '#B4C43B',

            }).setLngLat([Number(destinationLatitude), Number(destinationLongitude)]).setPopup(popup2)

            markerDestination.addTo(map)
            markerDestination.off('remove', () => calculateRoute())
          })

        })
      })
      .catch((err) => { console.log(err) }
      )
<<<<<<< HEAD
  }
  return (
    <>
      <div className='homeContainer'>
        <div ref={mapElement} className="mapDiv">
        </div>
        <div className="controllsDiv">
          <div>
            <section className="userWhere">
              {({ userName } || { userGoogle }) ? <h5 className="userName">¡Hola, {`${userName}`}!</h5>
=======
}

const navigate = useNavigate();
const navigateHome = () => {
  // navigate to /
  navigate('/');
};

const getPolution= async()=>{

  const  polution  = await axios.get(` https://xinmye.pythonanywhere.com/estimar?distance=${distance}`)
  console.log(polution);
}

const toggleBar = () =>{
  showSidebar
    ? setShowSidebar(false)
    : setShowSidebar(true)
}
function cambiar(){
  // let contenedor=document.getElementById("searchContainer"); //búsca ruta y pinta
  let contenedor2=document.getElementById("infoRuta"); //saca datos rutas
  let boton=document.getElementsById("buscar"); //buscar ruta y pinta
  let boton2=document.getElementsById("volver"); //vuelve a buscador
  if (boton.id=='buscar'){
    contenedor2.style.display = 'flex'
  }else if(boton2.id=="volver"){
    contenedor2.style.display = 'none'
  }else{console.log("Esto no tira")}
}

  return (
    <>
    <div className='homeContainer'>
      <div ref={mapElement}  className="mapDiv">
      </div>
      <div className="controllsDiv">
          <div>
            <section className="userWhere">
              {({userName} || { userGoogle }) ? <h5 className="userName">¡Hola!</h5>
>>>>>>> 9bb1fe04c7d19a6820bde7f8fcf5c65150dc2f1f
                : <h5 className="userName">¡Bienvenido!</h5>}
              <h4 className="whereTo">¿A dónde vas?</h4>
              <section className="sectionInputs">

                <label htmlFor="origin"></label>
                <input
                  className="originInput"
                  type="text"
                  name="origin"
                  value={input}
                  placeholder="Introduce tu origen"
                  onChange={(e) => handleChange(e)}
                />
                <hr className="hr" />
              </section>
              <section className="sectionInputs">
                <label htmlFor="destination"></label>
                <input
                  className="destinyInput"
                  type="text"
                  name="destination"
                  value={input2}
                  placeholder="Introduce tu destino"
                  onChange={(e) => handleChange2(e)}
                />
                <hr className="hr" />
              </section>
            </section>
          </div>
<<<<<<< HEAD
          <button className="searchRoute" onClick={getPolution} >Buscar</button>

        </div>
      </div>
=======
          <div className="searchContainer">
          <div className="searchRoute z-0"  onClick={calculateRoute}>
              <button id="buscar" onClick={getPolution} className=' bg-greenSearch  text-blackController w-[108px] h-[30px]'
              >Buscar</button>
              <button onClick={toggleBar} className="bg-blue-400 w-[100px] h-[30px] "></button>
              {/* <div className="controllsDiv text-neutro"> */}
              <div id='infoRuta' className={`controllsDiv text-neutro 
     
      `
    }
      >        
                <div className='mitadSuperior flex flex-col'>
                <span className='distanceTransport flex flex-row'>
                <p>Distancia: 700 km</p>
                <img src="" alt="tren" />45min
                </span>
                <span className='flex flex-row'>
                <img src="" alt="HOJA DE MIERDA" /> 
                <p>Ruta mas ecologica</p>
                </span>
                <hr />
                </div>
                <div className='mitadInferior flex flex-col'>
                <span className='distanceTransport flex flex-row'>
                <p>Distancia: 700 km</p>
                <img src="" alt="coche " />45min
                </span>
                <span className='flex flex-row'>
                <img src="" alt="exclamacion de mierda" /> 
                <p>3100 g de emisiones </p>
                </span>
                <hr />
                </div>
                <button className='bg-blue-400 w-[100px] h-[30px] z-0 ' id="volver" onClick={toggleBar} >Volver atrás</button>
              </div>
        </div>
        </div>
  </div>
</div>
>>>>>>> 9bb1fe04c7d19a6820bde7f8fcf5c65150dc2f1f
    </>
  )
}
export default Home;



// function cambiar(){
//   let contenedor=document.getElementById("searchContainer"); //búsca ruta y pinta
//   let contenedor2=document.getElementById("infoContainer"); //saca datos rutas
//   let boton=document.getElementsById("buscar"); //buscar ruta y pinta
//   let boton2=document.getElementsById("volver"); //vuelve a buscador
//   if (boton[0].id=='buscar'){
//     contenedor2.style.display = 'flex'
//   } else {
//     contenedor2.style.display = 'none'
//   }
// }