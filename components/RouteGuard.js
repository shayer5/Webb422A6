import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

export default function RouteGuard(props) {
    const router = useRouter();
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const updateAtoms = useCallback(async () => {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }, [setFavouritesList, setSearchHistory]);

    const authCheck = useCallback((url) => {
        const path = url.split('?')[0];
        if (!PUBLIC_PATHS.includes(path) && !localStorage.getItem('token')) {
            console.log(`Redirecting to login because the path ${path} is protected.`);
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        updateAtoms();     
        authCheck(router.pathname);
        const handleRouteChange = (url) => {
            authCheck(url);
            updateAtoms();
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [authCheck, router.events, router.pathname, updateAtoms]);

    return <>{props.children}</>;
}
