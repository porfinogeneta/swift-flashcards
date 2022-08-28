import {useEffect, useState} from "react";

// helper functions
import getRandomElemFromArray from "../helpers/getRandomElemFromArray";

export const useFetch = (url, toFetch) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            setIsPending(true)

            try {
                const res = await fetch(url, {signal: controller.signal, mode: 'cors'})
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                const fullArray = await res.json()
                const data = getRandomElemFromArray(fullArray, toFetch)
                setData(data)
                console.log(data)
                setIsPending(false)
            }catch (err) {
                setError(err.name)
                setIsPending(false)
                if (err.name === 'AbortError') {
                    console.log('Request Aborted')
                }else {
                    console.log(err.name)
                }
            }
        }

        fetchData()
        // return () => {
        //     controller.abort()
        // }
    }, [url, toFetch])
    return { data, isPending, error}
}