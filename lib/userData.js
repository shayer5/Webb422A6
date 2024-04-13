import { getToken } from './authenticate'; 

export async function addToFavourites(id) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${getToken()}`
        }
    });

    return response.status === 200 ? await response.json() : [];
}

export async function removeFromFavourites(id) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${getToken()}`
        }
    });

    return response.status === 200 ? await response.json() : [];
}

export async function getFavourites() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${getToken()}`
        }
    });

    return response.status === 200 ? await response.json() : [];
}

export async function addToHistory(id) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${getToken()}`
        }
    });

    return response.status === 200 ? await response.json() : [];
}

export async function removeFromHistory(id) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${getToken()}`
        }
    });

    return response.status === 200 ? await response.json() : [];
}

export async function getHistory() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${getToken()}`
        }
    });

    return response.status === 200 ? await response.json() : [];
}
