import React , {useContext, useEffect, useState} from  'react'
import axios from 'axios'
const AppContext = React.createContext();
const allMealUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"

const getFavoritesFromLocalStorage = () =>{
    let favorites= localStorage.getItem('favorites');
    if(favorites){
        favorites = JSON.parse(localStorage.getItem('favorites'));
    }
    else{
        favorites=[];
    }
    return favorites;
}

function AppProvider({children}) {
    const [meals,setMeals] = useState([])
    const [loading,setLoading] = useState(false);
    const [searchTerm , setSearchTerm] =useState('');
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState('')
    const [favorites,setFavorites] = useState(getFavoritesFromLocalStorage());

    const addToFavorites  = (idMeal) => {
      //  console.log(idMeal);
        const meal = meals.find((meal) => meal.idMeal===idMeal);
        const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
        if(alreadyFavorite) return ;
        const updateFavorites = [...favorites,meal];
        setFavorites(updateFavorites)
        localStorage.setItem('favorites', JSON.stringify(updateFavorites))
     }

     const removeFromFavorites = (idMeal) =>{
        const updateFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
        setFavorites(updateFavorites)
        localStorage.setItem('favorites', JSON.stringify(updateFavorites))
     }
    const fetchRandomMeal = ( ) =>{
        fetchMeal(randomMealUrl);
    }
    const fetchMeal = async(url) =>{
        setLoading(true);
        try{
            
        const {data} = await axios(url)
        if(data.meals)
        {
            setMeals(data.meals);
        }
        else{
            setMeals([]);
        }
        
       
        // console.log(data);
        }
        catch (error){
            console.log(error);
        }
        setLoading(false);

    } 
   
    const selectMeal = (idMeal,favoriteMeal) =>{
        let meal;
        if(favoriteMeal)
        {
            meal  = favorites.find((meal) => meal.idMeal === idMeal);

        }
        else{
            meal  = meals.find((meal) => meal.idMeal === idMeal)
        }
       
        setSelectedMeal(meal)
        setShowModal(true);

    }
    const closeModal = () =>{
        setShowModal(false)
    }
  
    useEffect(() => {
       
        fetchMeal(allMealUrl); 
     },[])
    useEffect(() => {
       if(!searchTerm) return
       fetchMeal(`${allMealUrl}${searchTerm}`); 
    },[searchTerm])
    return(
        <AppContext.Provider value={{loading,meals,setSearchTerm,fetchRandomMeal,showModal,selectedMeal,selectMeal,closeModal,addToFavorites,removeFromFavorites,favorites}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
     return  useContext(AppContext);
}

export {AppContext, AppProvider};