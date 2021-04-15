import {useCallback, useState} from 'react'

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async ({
                                           url,
                                           method = 'GET',
                                           body = null,
                                           headers = {},
                                           contentType = 'application/json',
                                           isFormData = false
                                       }) => {
        setIsLoading(true)

        const makeRequest = async () => {
            if (body && !isFormData) {
                body = JSON.stringify(body)
            }
            if (contentType) {
                headers['Content-Type'] = contentType
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            return data
        }

        try {
            return await makeRequest()
        } catch (e) {
            setError(e.message)
            throw e
        } finally {
            setIsLoading(false)
        }
    }, [])

    const clearError = () => {
        setError(null)
    }

    return {isLoading, request, error, clearError}
}