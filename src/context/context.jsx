import { createContext, useContext, useReducer,useEffect } from "react";
import reducer from "../reducer";
const AppContext=createContext();  //context creation

const initialState=
    {
        isLoading:true,
        query:"HTML",
        nbPages:0,
        page:0,
        hits:[]
    }
let apiurl="https://hn.algolia.com/api/v1/search?"

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
            console.log(data)
            dispatch({
                type: "GET_STORIES",
                payload:{
                    hits:data.hits,
                    nbPages:data.nbPages
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
       fetchApi(`${apiurl}query=${state.query}&page=${state.page}`);
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