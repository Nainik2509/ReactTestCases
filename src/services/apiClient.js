const apiClient = {

    getHomes: () => {
        return fetch(`https://run.mocky.io/v3/4213147a-9fb6-4973-bbe4-648cbc5f9a49`)
            .then(response => response.json())
    },

    bookHome: (home, checkIn, checkOut) => {
        // return Promise.resolve()
        return fetch(`https://run.mocky.io/v3/59372fe6-04f1-48e6-bb40-aa1aaa442956`)
            .then(response => response.json())
    }
}

export default apiClient