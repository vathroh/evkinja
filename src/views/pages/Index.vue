<template>
    <!-- Card -->
    <spinner :isLoading="data.isLoading" />

            <div class="card-box" v-if="user.isAssessor || user.isHrm">
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
    <div class="card-box">
       <h1 v-if="user.isAssessed"></h1> 
       <h1 v-if="user.isAssessor"></h1> 
       <h1 v-if="user.isHrm">HRM</h1>
    </div>
           <!-- Details -->
            <div class="details" v-if="user.isHrm || user.isAssessor">
                <div class="primary-card">
                    <div class="card-header">
                        <h2>Summary</h2>
                    </div>
                    <table v-if="user.zone_level_id==1">
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
                                <td class="text-center highlight">{{ Object.values(jobTitle.count).length }}</td>
                                <td class="text-center">{{ Object.values(jobTitle.belumMengisi).length }}</td>
                                <td class="text-center">{{ Object.values(jobTitle.prosesMengisi).length }}</td>
                                <td class="text-center">{{ Object.values(jobTitle.selesaiMengisi).length }}</td>
                                <td class="text-center highlight">{{ Object.values(jobTitle.siapEvaluasi).length }}</td>
                                <td class="text-center highlight">{{ Object.values(jobTitle.prosesEvaluasi).length }}</td>
                                <td class="text-center highlight">{{ Object.values(jobTitle.selesaiEvaluasi).length }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table v-if="user.zone_level_id == 2 || user.zone_level_id == 3">
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
                        <tbody v-for="district in data.districts" :key="district.id">
                            <tr>
                                <td colspan="9" style="background:blue;">{{ district.nama_kab }}</td>
                            </tr>
                            <tr v-for="(jobTitle, index) in data.jobTitles" :key="jobTitle.id">
                                <td>{{ index + 1}}</td>
                                <td>{{ jobTitle.job_title }}</td>
                                <td class="text-center highlight">{{ Object.values(jobTitle.count).filter( e => e.district == district.nama_kab).length }}</td>
                                <td class="text-center">{{ Object.values(jobTitle.belumMengisi).filter( e => e.district == district.nama_kab).length }}</td>
                                <td class="text-center">{{ Object.values(jobTitle.prosesMengisi).filter( e => e.district == district.nama_kab ).length }}</td>
                                <td class="text-center">{{ Object.values(jobTitle.selesaiMengisi).filter( e => e.district == district.nama_kab ).length }}</td>
                                <td class="text-center highlight">{{ Object.values(jobTitle.siapEvaluasi).filter( e => e.district == district.nama_kab).length }}</td>
                                <td class="text-center highlight">{{ Object.values(jobTitle.prosesEvaluasi).filter( e => e.district == district.nama_kab).length }}</td>
                                <td class="text-center highlight">{{ Object.values(jobTitle.selesaiEvaluasi).filter( e => e.district == district.nama_kab).length }}</td>
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
        const role = reactive(computed( () => store.state.user.role))
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
                    const response = await fetch(process.env.VUE_APP_ROOT_API +'/me', {
                    headers :  { 'Content-Type': 'application/json' },
                    credentials: 'include'
                    })

                    const roleResponse = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/role', {
                        headers: { 'Content-Type': 'application/json'},
                        credentials:  'include'
                    })

                    const jobTitleResponse = await fetch(process.env.VUE_APP_ROOT_API +'/evkinja/current-job-title', {
                        headers :  { 'Content-Type': 'application/json' },
                        credentials: 'include'
                    })

                    const content = await response.json()
                    store.commit('setAuth', true)
                    store.commit('setUser', Object.values(content)[0])

                    const role = await roleResponse.json()
                    if(role.assessed){
                        store.commit('setAssessed', true)
                        localStorage.setItem('isAssessed', true)
                    }
                    if(role.assessor){
                        store.commit('setAssessor', true)
                        localStorage.setItem('isAssessor', true)
                    }
                    if(role.hrm){
                        store.commit('setHrm', true)
                        localStorage.setItem('isHrm', true)
                    }

                    const dataresponse = await jobTitleResponse.json()
                    data.jobTitles = Object.values(dataresponse).filter( j => j.count.length > 0 )
                    store.commit('setRecapitulation', data.jobTitles)

                    let jumlahPersonil = []
                    data.jobTitles.map( (item) => jumlahPersonil.push(Object.values(item.count).length))
                    data.summary.jumlahPersonil = jumlahPersonil.reduce( (a,b) => { return a+b },0 )

                    let belumMengisi = [];
                    let databelumMengisi = [];
                    data.jobTitles.map( (item) => belumMengisi.push(Object.values(item.belumMengisi).length))
                    data.summary.belumMengisi = belumMengisi.reduce( (a,b) => { return a+b },0 )
                    data.jobTitles.map( (item) => {
                        if(item.belumMengisi.length > 0 ){
                            databelumMengisi.push(Object.values(item.belumMengisi))
                        }
                    })
                    databelumMengisi.map( (item) => data.details.belumMengisi.push(item[0]))

                    let prosesMengisi = []
                    let dataprosesMengisi = []
                    data.jobTitles.map( (item) => prosesMengisi.push(Object.values(item.prosesMengisi).length))
                    data.summary.prosesMengisi = prosesMengisi.reduce( (a,b) => { return a+b },0 )
                    data.jobTitles.map( (item) => {
                        if(Object.values(item.prosesMengisi).length > 0 ){
                            dataprosesMengisi.push(Object.values(item.prosesMengisi))
                        }
                    })
                    dataprosesMengisi.map( (item) => data.details.prosesMengisi.push( item[0] ))
                    

                    let selesaiMengisi = []
                    let dataselesaiMengisi = []
                    data.jobTitles.map( (item) => selesaiMengisi.push(Object.values(item.selesaiMengisi).length))
                    data.summary.selesaiMengisi = selesaiMengisi.reduce( (a,b) => { return a+b },0 )
                    data.jobTitles.map( (item) => {
                        if(Object.values( item.selesaiMengisi ).length > 0 ) {
                            dataselesaiMengisi.push(Object.values(item.selesaiMengisi))
                        }
                    })
                    dataselesaiMengisi.map( (item) => data.details.selesaiMengisi.push( item[0] ))

                    let siapEvaluasi = []
                    let datasiapEvaluasi = []
                    data.jobTitles.map( (item) => siapEvaluasi.push(Object.values(item.siapEvaluasi).length))
                    data.summary.siapEvaluasi = siapEvaluasi.reduce( (a,b) => { return a+b },0 )
                    data.jobTitles.map( (item) => {
                        if(Object.values(item.siapEvaluasi).length > 0 ) {
                            datasiapEvaluasi.push(Object.values(item.siapEvaluasi))
                        }
                    })
                    datasiapEvaluasi.map( (item) => data.details.siapEvaluasi.push( item[0] ))

                    let prosesEvaluasi = []
                    let dataprosesEvaluasi = []
                    data.jobTitles.map( (item) => prosesEvaluasi.push(Object.values(item.prosesEvaluasi).length))
                    data.summary.prosesEvaluasi = prosesEvaluasi.reduce( (a,b) => { return a+b },0 )
                    data.jobTitles.map( (item) => {
                        if(Object.values(item.prosesEvaluasi).length > 0 ) {
                            dataprosesEvaluasi.push(Object.values(item.prosesEvaluasi))
                        }
                    })
                    dataprosesEvaluasi.map( (item) => data.details.prosesEvaluasi.push( item[0] ))

                    let selesaiEvaluasi = []
                    let dataselesaiEvaluasi = []
                    data.jobTitles.map( (item) => selesaiEvaluasi.push(Object.values(item.selesaiEvaluasi).length))
                    data.summary.selesaiEvaluasi = selesaiEvaluasi.reduce( (a,b) => { return a+b },0)
                    data.jobTitles.map( (item) => {
                        if(Object.values(item.selesaiEvaluasi).length > 0 ) {
                            dataselesaiEvaluasi.push(Object.values(item.selesaiEvaluasi))
                        }
                    })
                    dataselesaiEvaluasi.map( (item) => data.details.selesaiEvaluasi.push( item[0] ))

                    const districtsResponse = await fetch(process.env.VUE_APP_ROOT_API + '/zone/districts', {
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include'
                    })
                    data.districts = await districtsResponse.json();
                
                } catch(e) {
                    store.commit('setAuth', false)
                    localStorage.removeItem('authenticated')
                    localStorage.removeItem('isAssessed')
                    localStorage.removeItem('isAssessor')
                    localStorage.removeItem('isHrm')
                    router.push('/login')
                }

                 data.isLoading = false
            }
        )

        const belumMengisi = () => data.isBelumMengisi = !data.isBelumMengisi
        const prosesMengisi = () => data.isProsesMengisi = !data.isProsesMengisi
        const selesaiMengisi = () => data.isSelesaiMengisi = !data.isSelesaiMengisi
        const siapEvaluasi = () => data.isSiapEvaluasi = !data.isSiapEvaluasi
        const prosesEvaluasi = () => data.isProsesEvaluasi = !data.isProsesEvaluasi
        const selesaiEvaluasi = () => data.isSelesaiEvaluasi = !data.isSelesaiEvaluasi

        return {
            authenticated, user, data, belumMengisi, prosesMengisi, selesaiMengisi,siapEvaluasi, prosesEvaluasi, selesaiEvaluasi, role
        }
    }

} 
</script>


