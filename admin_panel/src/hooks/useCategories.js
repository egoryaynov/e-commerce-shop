import {useHttp} from "./useHttp";
import {useEffect, useState} from "react";
import {CategoryApi} from "../api/CategoryApi";

export const useCategories = () => {
    const {isLoading, request} = useHttp()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const options = new CategoryApi()
        options.getCategories()

        request(options).then(r => {
            setCategories(r.categories)
        })
    }, [request])

    return {isLoading, setCategories, categories}
}