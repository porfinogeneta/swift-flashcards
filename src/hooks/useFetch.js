import {useEffect, useState} from "react";

export const useFetch = (url) => {
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
                const data = await res.json()
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
    }, [url])
    return { data, isPending, error}
}