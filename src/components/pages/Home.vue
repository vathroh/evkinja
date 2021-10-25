<template>
    <div>
        <h1>Home Page</h1>
        <button @click="getLogout">Logout</button>
        <h1>Authenticated: {{ authenticated }}</h1>
        <p>Name: {{ user.name }}</p>
        <div> 
            Loading : {{ data.isLoading }}
        </div>
        <div v-if="data.isLoading">
            <img src="images/animations/loading-21.gif" />
        </div>

        <div v-for="district in data.districts" :key="district.id" >
            <h5 @click="getPersonnelsByCity(district.kode_kab)">{{ district.nama_kab }}</h5>
        <table>
            <thead>
                <th>No.</th>
                <th>Nama</th>
                <th>Jabatan</th>
                <th>Tim</th>
                <th>Kabupaten</th>
            </thead>
            <tbody v-for="(personnel, index) in data.personnels" :key="personnel.id">
                <tr v-if="personnel.district_code == district.kode_kab">
                    <td>{{ index+1 }}</td>
                    <td>{{ personnel.name }}</td>
                    <td>{{ personnel.position }}</td>
                    <td>{{ personnel.team }}</td>
                    <td>{{ personnel.district }}</td>
                </tr>
            </tbody>
        </table>
    </div>
        <pre>{{ data.personnels }}</pre>

    </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
    name:  'Home',

    setup() {

        const router = useRouter()
        const store = useStore()
        const authenticated = computed( () => store.state.authenticated)
        const user = reactive(computed( () => store.state.user))
  
        const data = reactive({
            districts :[],
            personnels: [],
            isLoading:  false
        })

        onMounted(
            async () => {
            data.isLoading = true
                try {
                    const response = await fetch('http://localhost:8000/api/user', {
                    headers :  { 'Content-Type': 'application/json' },
                    credentials: 'include'
                    })

                    const content = await response.json()

                    store.commit('setAuth', true)
                    store.commit('setUserId', content.id)
                    store.commit('setUserName', content.name)
                    localStorage.setItem('authenticated', 'true')

                } catch(e) {

                    store.commit('setAuth', false)
                    localStorage.removeItem('authenticated')

                }

                const responseDistricts = await fetch('http://localhost:8000/api/zone/districts', {
                    headers:  {'Content-Type' : 'application/json'},
                    credentials: 'include'
                })
                
                data.districts = await responseDistricts.json()

                await getPersonnels()
                data.isLoading = false
            }

        )

        const getPersonnelsByCity = (a) => { 
            data.personnels.filter( s => s.district_code == a )
            console.log('hai')
        }

        const getPersonnels = async () => {
            const responseGetPersonnels = await fetch('http://localhost:8000/api/zone/personnels', {
                    headers:  {'Content-Type' : 'application/json'},
                    credentials: 'include'
            })
            data.personnels = await responseGetPersonnels.json()
            /*
            await data.personnels.sort((a,b) => {
                if(a.district == b.district){
                    if(a.team == b.team){
                        return a.job_title_sort - b.job_title_sort
                    }
                    return a.team > b.team ? 1 : -1
                }
                return a.district_code - b.district_code
            })
             */
        }

        const getLogout = async () => {
            await fetch('http://localhost:8000/api/logout', {
                method:  'POST',
                headers:  {'Content-Type' :  'application/json'},
                credentials :  'include'
            })
            .then( () => {
                router.push('/login')
            })
        }


        return {
            getLogout, getPersonnels, getPersonnelsByCity, authenticated, user, data
        }
    }
}
</script>
