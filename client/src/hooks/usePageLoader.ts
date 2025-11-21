import { useCallback, useState } from "react";

export function usePageLoader() {
    const [loading, setLoading] = useState(true);

    const startLoading = useCallback(() => setLoading(true), []);

    const stopLoading = useCallback(() => setLoading(false), []);

    return { loading, startLoading, stopLoading };

}