<template>
    <!-- Card -->
    <spinner :isLoading="data.isLoading" />

            <div class="card-box" v-if="role == 'hrm'">
                <div class="card">
                    <div>
                        <div class="numbers">
                            <span class="score">{{ data.summary.belumMengisi }}</span>
                            /
                            <span class="from">{{ data.summary.jumlahPersonil }}</span>
                        </div>
                        <div class="card-name">
                            Belum Mengisi
                        </div>
                    </div>
                    <div class="icon-box">
                        <i class="bi bi-thermometer"></i>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div class="numbers">
                            <span class="score">{{ data.summary.prosesMengisi }}</span>
                            /
                            <span class="from">{{ data.summary.jumlahPersonil }}</span>
                        </div>
                        <div class="card-name">
                            Proses Mengisi
                        </div>
                    </div>
                    <div class="icon-box">
                        <i class="bi bi-thermometer-half"></i>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div class="numbers">
                            <span class="score">{{ data.summary.selesaiMengisi }}</span>
                            /
                            <span class="from">{{ data.summary.jumlahPersonil }}</span>
                        </div>
                        <div class="card-name">
                            Selesai Mengisi
                        </div>
                    </div>
                    <div class="icon-box">
                        <i class="bi bi-thermometer-high"></i>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div class="numbers evaluasi">
                            <span class="score">{{ data.summary.siapEvaluasi }}</span>
                            /
                            <span class="from">{{ data.summary.jumlahPersonil }}</span>
                        </div>
                        <div class="card-name evaluasi">
                            Siap Evaluasi
                        </div>
                    </div>
                    <div class="icon-box">
                        <i class="bi bi-thermometer-low"></i>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div class="numbers evaluasi">
                            <span class="score">{{ data.summary.prosesEvaluasi }}</span>
                            /
                            <span class="from">{{ data.summary.jumlahPersonil }}</span>
                        </div>
                        <div class="card-name evaluasi">
                            Proses Evaluasi
                        </div>
                    </div>
                    <div class="icon-box">
                        <i class="bi bi-thermometer-snow"></i>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div class="numbers evaluasi">
                            <span class="score">{{ data.summary.selesaiEvaluasi }}</span>
                            /
                            <span class="from">{{ data.summary.jumlahPersonil }}</span>
                        </div>
                        <div class="card-name evaluasi">
                            Selesai Evaluasi
                        </div>
                    </div>
                    <div class="icon-box">
                        <i class="bi bi-thermometer-sun"></i>
                    </div>
                </div>
            </div> 
            
            <!-- Details -->
            <div class="details" v-if="role == 'hrm'">
                <div class="primary-card">
                    <div class="card-header">
                        <h2>Recent Orders</h2>
                        <a href="#" class="btn">View All</a>
                    </div>
                    <table>
                        <thead>
                            <tr class="text-center">
                                <td rowspan="2">No.</td>
                                <td rowspan="2">Posisi</td>
                                <td rowspan="2" class="highlight">Jumlah<br>Personil</td>
                                <td colspan="3" class="text-center">Mengisi</td>
                                <td colspan="3" class="text-center highlight">Evaluasi</td>
                            </tr>
                            <tr>
                                <td>Belum</td>
                                <td>Proses</td>
                                <td>Selesai</td>
                                <td class="highlight">Siap</td>
                                <td class="highlight">Proses</td>
                                <td class="highlight">Selesai</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(jobTitle, index) in data.jobTitles" :key="jobTitle.id">
                                <td>{{ index + 1}}</td>
                                <td>{{ jobTitle.job_title }}</td>
                                <td class="text-center highlight">{{ jobTitle.count }}</td>
                                <td class="text-center">{{ jobTitle.belumMengisi }}</td>
                                <td class="text-center">{{ jobTitle.prosesMengisi }}</td>
                                <td class="text-center">{{ jobTitle.selesaiMengisi }}</td>
                                <td class="text-center highlight">{{ jobTitle.siapEvaluasi }}</td>
                                <td class="text-center highlight">{{ jobTitle.prosesEvaluasi }}</td>
                                <td class="text-center highlight">{{ jobTitle.selesaiEvaluasi }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="secondary-card">
                    <div class="card-header">
                        <h2>Personil</h2>
                    </div>
                    <div class="list" @click="belumMengisi">
                        <h4>Belum Mengisi ( {{ data.summary.belumMengisi }} )</h4>
                    </div>
                    <table v-show="data.isBelumMengisi">
                        <tr v-for="personil in data.details.belumMengisi" :key="personil.user_id" >
                            <td width="60px">
                                <div class="img-box">
                                    <img src="images/profiles/user.jpg" alt=""/>
                                </div>
                            </td>
                            <td>
                                <h5>
                                    {{ personil.name }} <br>
                                    <span>{{ personil.jobTitle }}</span><br>
                                    <span>{{ personil.district }}</span>
                                </h5>
                            </td>
                        </tr>
                    </table>
                    <div class="list" @click="prosesMengisi">
                        <h4>Proses Mengisi ( {{data.summary.prosesMengisi }} )</h4>
                    </div>
                    <table v-show="data.isProsesMengisi">
                        <tr v-for="personil in data.details.prosesMengisi" :key="personil.user_id" >
                            <td width="60px">
                                <div class="img-box">
                                    <img src="images/profiles/user.jpg" alt=""/>
                                </div>
                            </td>
                            <td>
                                <h5>
                                    {{ personil.name }} <br>
                                    <span>{{ personil.jobTitle }}</span><br>
                                    <span>{{ personil.district }}</span>
                                </h5>
                            </td>
                        </tr>
                    </table>

                    <div class="list" @click="selesaiMengisi">
                        <h4>Selesai Mengisi ( {{ data.summary.selesaiMengisi }} )</h4>
                    </div>
                    <table v-show="data.isSelesaiMengisi">
                        <tr v-for="personil in data.details.selesaiMengisi" :key="personil.user_id" >
                            <td width="60px">
                                <div class="img-box">
                                    <img src="images/profiles/user.jpg" alt=""/>
                                </div>
                            </td>
                            <td>
                                <h5>
                                    {{ personil.name }} <br>
                                    <span>{{ personil.jobTitle }}</span><br>
                                    <span>{{ personil.district }}</span>
                                </h5>
                            </td>
                        </tr>
                    </table>
                    <div class="list" @click="siapEvaluasi">
                        <h4>Siap Dievaluasi ( {{ data.summary.siapEvaluasi }} )</h4>
                    </div>
                    <table v-show="data.isSiapEvaluasi">
                        <tr v-for="personil in data.details.siapEvaluasi" :key="personil.user_id" >
                            <td width="60px">
                                <router-link :to="`/assessment/${personil.evkinja_value_id}`">
                                <div class="img-box">
                                    <img src="images/profiles/user.jpg" alt=""/>
                                </div>
                                </router-link>
                            </td>
                            <td class="link">
                                <router-link :to="`/assessment/${personil.evkinja_value_id}`">
                                <h5>
                                    {{ personil.name }} <br>
                                    <span>{{ personil.jobTitle }}</span><br>
                                    <span>{{ personil.district }}</span>
                                </h5>
                                </router-link>
                            </td>
                        </tr>
                    </table>
                    <div class="list" @click="prosesEvaluasi">
                        <h4>Proses Dievaluasi ( {{ data.summary.prosesEvaluasi }} )</h4>
                    </div>
                    <table v-show="data.isProsesEvaluasi">
                        <tr class="link" v-for="personil in data.details.prosesEvaluasi" :key="personil.user_id" >
                            <td width="60px">
                                <router-link :to="`/assessment/${personil.evkinja_value_id}`">
                                <div class="img-box">
                                    <img src="images/profiles/user.jpg" alt=""/>
                                </div>
                                </router-link>
                            </td>
                            <td>
                                <router-link :to="`/assessment/${personil.evkinja_value_id}`">
                                <h5>
                                    {{ personil.name }} <br>
                                    <span>{{ personil.jobTitle }}</span><br>
                                    <span>{{ personil.district }}</span>
                                </h5>
                                </router-link>
                            </td>
                        </tr>
                    </table>
                    <div class="list" @click="selesaiEvaluasi">
                        <h4>Selesai Dievaluasi ( {{ data.summary.selesaiEvaluasi }} )</h4>
                    </div>
                    <table v-show="data.isSelesaiEvaluasi">
                        <tr class="link" v-for="personil in data.details.selesaiEvaluasi" :key="personil.user_id" >
                            <td width="60px">
                                <router-link :to="`/assessment/${personil.evkinja_value_id}`">
                                <div class="img-box">
                                    <img src="images/profiles/user.jpg" alt=""/>
                                </div>
                            </router-link>
                            </td>
                            <td>
                                <router-link :to="`/assessment/${personil.evkinja_value_id}`">
                                <h5>
                                    {{ personil.name }} <br>
                                    <span>{{ personil.jobTitle }}</span><br>
                                    <span>{{ personil.district }}</span>
                                </h5>
                            </router-link>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
</template>


<script>
import spinner from '../../components/Spinner'
import { onMounted, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    components:  { spinner },
    setup(){
        const store = useStore()
        const router = useRouter()
        const authenticated = computed( () => store.state.authenticated)
        const user = reactive(computed( () => store.state.user))
  
        const data = reactive({
            jobTitles : [],
            districts :[],
            summary: {
                jumlahPersonil:  0,
                belumMengisi : 0,
                prosesMengisi:  0,
                selesaiMengisi:  0,
                siapEvaluasi:  0,
                prosesEvaluasi:  0,
                selesaiEvaluasi:  0
            },
            details: {
                belumMengisi: [],
                prosesMengisi: [],
                selesaiMengisi: [],
                siapEvaluasi:  [],
                prosesEvaluasi:  [],
                selesaiEvaluasi:  []
            },
            isBelumMengisi:  false,
            isProsesMengisi:  false,
            isSelesaiMengisi:  false,
            isSiapEvaluasi:  false,
            isProsesEvaluasi:  false,
            isSelesaiEvaluasi:  false,
            isLoading:  false
        })

        onMounted(
            async () => {
                data.isLoading = true
                try {
                    const response = await fetch(process.env.VUE_APP_ROOT_API +'/user', {
                    headers :  { 'Content-Type': 'application/json' },
                    credentials: 'include'
                    })

                    const content = await response.json()

                    store.commit('setAuth', true)
                    store.commit('setUserId', content.id)
                    store.commit('setUserName', content.name)

                } catch(e) {
                    store.commit('setAuth', false)
                    localStorage.removeItem('authenticated')
                    router.push('/login')
                }

                const roleResponse = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/role', {
                    headers: { 'Content-Type': 'application/json'},
                    credentials:  'include'
                })

                const role = await roleResponse.json()
                store.commit('setRole', role.role)
                localStorage.setItem('role', role.role)

                const jobTitleResponse = await fetch(process.env.VUE_APP_ROOT_API +'/evkinja/current-job-title', {
                    headers :  { 'Content-Type': 'application/json' },
                    credentials: 'include'
                })

                data.jobTitles = await jobTitleResponse.json()
                store.commit('setRecapitulation', data.jobTitles)

                let belumMengisi = []
                data.jobTitles.map( (item) => belumMengisi.push(item.belumMengisi))
                data.summary.belumMengisi = belumMengisi.reduce( (a,b) => a+b )

                let jumlahPersonil = []
                data.jobTitles.map( (item) => jumlahPersonil.push(item.count))
                data.summary.jumlahPersonil = jumlahPersonil.reduce( (a,b) => a+b )

                let prosesMengisi = []
                data.jobTitles.map( (item) => prosesMengisi.push(item.prosesMengisi))
                data.summary.prosesMengisi = prosesMengisi.reduce( (a,b) => a+b )

                let selesaiMengisi = []
                data.jobTitles.map( (item) => selesaiMengisi.push(item.selesaiMengisi))
                data.summary.selesaiMengisi = selesaiMengisi.reduce( (a,b) => a+b )

                let siapEvaluasi = []
                data.jobTitles.map( (item) => siapEvaluasi.push(item.siapEvaluasi))
                data.summary.siapEvaluasi = siapEvaluasi.reduce( (a,b) => a+b )

                let prosesEvaluasi = []
                data.jobTitles.map( (item) => prosesEvaluasi.push(item.prosesEvaluasi))
                data.summary.prosesEvaluasi = prosesEvaluasi.reduce( (a,b) => a+b )

                let selesaiEvaluasi = []
                data.jobTitles.map( (item) => selesaiEvaluasi.push(item.selesaiEvaluasi))
                data.summary.selesaiEvaluasi = selesaiEvaluasi.reduce( (a,b) => a+b )

                 data.isLoading = false
            }

        )

        const belumMengisi = async () => {
            data.isLoading = true
            const response = await fetch(process.env.VUE_APP_ROOT_API +'/evkinja/belum-mengisi', {
                headers :  { 'Content-Type': 'application/json' },
                credentials: 'include'
                })
            const dataBelumMengisi = await response.json()
            data.details.belumMengisi = dataBelumMengisi
            data.isBelumMengisi = !data.isBelumMengisi
            data.isLoading = false
        }

        const prosesMengisi = async () => {
            data.isLoading = true
            const response = await fetch(process.env.VUE_APP_ROOT_API +'/evkinja/proses-mengisi', {
                headers :  { 'Content-Type': 'application/json' },
                credentials: 'include'
                })
            const dataProsesMengisi = await response.json()
            data.details.prosesMengisi = dataProsesMengisi
            data.isProsesMengisi = !data.isProsesMengisi
            data.isLoading = false
        }

        const selesaiMengisi = async () => {
            data.isLoading = true
            const response = await fetch(process.env.VUE_APP_ROOT_API +'/evkinja/selesai-mengisi', {
                headers :  { 'Content-Type': 'application/json' },
                credentials: 'include'
                })
            const dataSelesaiMengisi = await response.json()
            data.details.selesaiMengisi = dataSelesaiMengisi
            data.isSelesaiMengisi = !data.isSelesaiMengisi
            data.isLoading = false
        }

        const siapEvaluasi = async () => {
            data.isLoading = true
            const response = await fetch(process.env.VUE_APP_ROOT_API +'/evkinja/siap-evaluasi', {
                headers :  { 'Content-Type': 'application/json' },
                credentials: 'include'
                })
            const dataSiapEvaluasi = await response.json()
            data.details.siapEvaluasi = dataSiapEvaluasi
            data.isSiapEvaluasi = !data.isSiapEvaluasi
            data.isLoading = false
        }

        const prosesEvaluasi = async () => {
            data.isLoading = true
            const response = await fetch(process.env.VUE_APP_ROOT_API +'/evkinja/proses-evaluasi', {
                headers :  { 'Content-Type': 'application/json' },
                credentials: 'include'
                })
            const dataProsesEvaluasi = await response.json()
            data.details.prosesEvaluasi = dataProsesEvaluasi
            data.isProsesEvaluasi = !data.isProsesEvaluasi
            data.isLoading = false
        }
 
        const selesaiEvaluasi = async () => {
            data.isLoading = true
            const response = await fetch(process.env.VUE_APP_ROOT_API +'/evkinja/selesai-evaluasi', {
                headers :  { 'Content-Type': 'application/json' },
                credentials: 'include'
                })
            const dataSelesaiEvaluasi = await response.json()
            data.details.selesaiEvaluasi = dataSelesaiEvaluasi
            data.isSelesaiEvaluasi = !data.isSelesaiEvaluasi
            data.isLoading = false
        }

        return {
            authenticated, user, data, belumMengisi, prosesMengisi, selesaiMengisi,siapEvaluasi, prosesEvaluasi, selesaiEvaluasi
        }
    }

} 
</script>


