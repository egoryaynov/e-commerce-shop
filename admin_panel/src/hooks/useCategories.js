import {useHttp} from "./useHttp";
import {useEffect, useState} from "react";
import {CategoryApi} from "../api/CategoryApi";
import {useIsMounted} from "./useIsMounted";

export const useCategories = () => {
    const {isLoading, request} = useHttp()
    const [categories, setCategories] = useState([])
    const isMounted = useIsMounted()
    
    // todo fix "Can't perform a React state update on an unmounted component."
    useEffect(() => {
        const options = new CategoryApi()
        options.getCategories()

        request(options).then(r => {
            if (isMounted.current) setCategories(r.categories)
        })
    }, [])

    return {isLoading, setCategories, categories}
}