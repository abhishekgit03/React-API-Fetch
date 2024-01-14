import { createContext, useContext, useReducer,useEffect } from "react";
import reducer from "../reducer";
const AppContext=createContext();  //context creation

const initialState=
    {
        isLoading:true,
        query:"Latest news",
        nbPages:0,
        page:0,
        hits:[]
    }
let apiurl="https://newsapi.in/newsapi/search.php?key=MkbliPyW2idojivMlNfK3ILW46UIKn"

//create a provider function
const AppProvider =({children})=>
{
    const [state, dispatch] = useReducer(reducer,initialState)
    const fetchApi=async(url)=>
    {
        dispatch({type:"SET_LOADING"})
        try{
            const res= await fetch(url);
            const data= await res.json();
            console.log(data.News)
            dispatch({
                type: "GET_STORIES",
                payload:{
                    hits:data.News,
                    nbPages:20
                }
            })
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const removePost = (postid)=>
    {
        dispatch({type:"REMOVE_POST", payload: postid})
    }

    const searchPost=(searchquery)=>
    {
        dispatch({type: "SEARCH_QUERY", payload: searchquery})
    }

    useEffect(()=>
    {
        const url=`${apiurl}&q=${state.query ==="" ? "Globalnews" : state.query}`
        console.log(url)
       fetchApi(url);
    },[state.query]);

    return(
        <AppContext.Provider value={{...state,removePost,searchPost}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext= ()=>
{
    return useContext(AppContext)
}
export {AppContext,AppProvider,useGlobalContext};