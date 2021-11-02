import { createStore } from 'vuex'

export default createStore({
    state: {
        authenticated: false,
        extent: false,
        user: {
        },
        jobTitles: {},
        data: {
            summary: {},
            recapitulation:{}
        }

    },
    mutations: {
        setHrm: (state, value) => state.user.isHrm = value,
        setAssessed: (state, value) => state.user.isAssessed = value,
        setAssessor: (state, value) => state.user.isAssessor = value,
        setExtent: (state, value) => state.extent = value,
        setAuth: (state, auth) => state.authenticated = auth,
        setUserId: (state, value) => state.user.id = value,
        setUserName: (state, value) => state.user.name = value,
        setRecapitulation: (state, value) => state.data.recapitulation = value,
        setUser: (state, obj) => state.user = obj,
        setJobTitles: (state, obj) => state.jobTitles = obj
    },
    actions: {
    },
    modules:{}
})

