import { useEffect, useState } from "react";    

const useFetch = (url, options = {}) => {
    const [response, setResponse] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            try {
                setIsPending(true);
                const { signal } = abortController;

                const res = await fetch(url, { ...options, signal });
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const json = await res.json();
                setResponse(json);
            } catch (err) {
                if (err.name !== "AbortError") { // Ignore abort errors
                    setError(err.message || "An error occurred");
                }
            } finally {
                setIsPending(false);
            }
        };

        fetchData();

        // Cleanup function to abort fetch if the component unmounts
        return () => {
            abortController.abort();
        };
    }, [url, options]); // Re-run if URL or options change

    return { response, isPending, error };
};

export default useFetch;
