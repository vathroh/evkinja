import { createStore } from 'vuex'

export default createStore({
    state: {
        authenticated: false,
        extent: false,
        user: {
            id: '',
            name: '',
            role: ''
        },
        data: {
            summary: {},
            recapitulation:{}
        }

    },
    mutations: {
        setRole: (state, value) => state.user.role = value,
        setExtent: (state, value) => state.extent = value,
        setAuth: (state, auth) => state.authenticated = auth,
        setUserId: (state, value) => state.user.id = value,
        setUserName: (state, value) => state.user.name = value,
        setRecapitulation: (state, value) => state.data.recapitulation = value
    },
    actions: {
    },
    modules:{}
})

