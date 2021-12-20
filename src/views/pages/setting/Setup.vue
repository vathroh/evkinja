<template>
    <div>
  <spinner :isLoading="data.isLoading" />
    </div>
    <div>
        <div class="wrapper">
            <div>
            <div class="title">
                <p>Triwulan & Tahun</p>
            </div>
            <div class="box d-flex text-center">
                <div class="d-flex">
                    <label for="quarter">Triwulan:</label>
                    <select id="quarter" v-model="data.quarter" class="width-200">
                        <option :value="n" v-for="n in [1,2,3,4]" :key="n">{{ n }}</option>
                    </select>
                </div>
                <div class="d-flex">
                    <label for="year">Tahun:</label>
                    <select id="year" v-model="data.year" class="width-200">
                        <option :value="n" v-for="n in [data.year - 3, data.year-2, data.year-1, data.year, data.year+1]" :key="n">{{ n }}</option>
                    </select>
                </div>
                <div>
                    <button @click="getSettings" class="btn btn-primary btn-sm">Go</button>
                </div>
            </div>
                <div>
                    <button class="btn btn-primary btn-sm" v-if="data.settings.length" @click="openModal">Buat setting baru</button>
                </div>
           </div>
        </div>

        <div class="wrapper mt-20 height-300" v-if="data.settings.length">
            <table class="table">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>Triwulan</th>
                        <th>Tahun</th>
                        <th>Posisi</th>
                        <th>Lokasi</th>
                        <th>Aktif</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(setting,index) in data.settings" :key="setting.id">
                        <td class="text-center">{{ index + 1 }}</td>
                        <td class="text-center">{{ setting.quarter }}</td>
                        <td class="text-center">{{ setting.year }}</td>
                        <td>{{ setting.posisi }}</td>
                        <td class="text-center">{{ setting.location }}</td>
                        <td class="text-center">{{ setting.isActive }}</td>
                        <td class="text-center"><router-link :to="`/setup-details/${setting.id}`"><i class="bi bi-pencil-square link" @click="getSettingDetails"></i></router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal" :class="{ hidden:isHidden }">
            <div class="modal-header">
                <h4>Input Data</h4>
            </div>
            <div class="modal-body">
                <div class="form">
                    <label>Posisi</label>
                    <select v-model="data.job_title_id">
                        <option :value="jobTitle.id" v-for="jobTitle in data.jobTitles" :key="jobTitle.id">{{ jobTitle.job_title }}</option>
                    </select>
                </div>
                <div class="form">
                    <label>Lokasi</label>
                    <select v-model="data.zone_location_id">
                        <option value="0">0</option>
                        <option :value="location.id" v-for="location in data.locations" :key="location.id">{{ location.location_type }}</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-sm" @click="createNewSetting">OK</button>
                <button class="btn btn-sm" @click="openModal">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, reactive, ref } from 'vue'
    import spinner from "../../../components/Spinner";
    import getTimKorkotJobTitles from "../../../components/functions/getTimKorkotJobTitles";
    import getTimFaskelJobTitles from "../../../components/functions/getTimFaskelJobTitles";
    import getTimAskotMandiriJobTitles from "../../../components/functions/getTimAskotMandiriJobTitles";

    const { getTimKorkot } = getTimKorkotJobTitles();
    const { getTimFaskel } = getTimFaskelJobTitles();
    const { getTimAskotMandiri } = getTimAskotMandiriJobTitles();
    let isHidden = ref(true)

    const data = reactive({
        quarter: 0,
        year: 0,
        job_title_id: '',
        zone_location_id: 0,
        settings: [],
        isLoading: false,
        jobTitles: [],
        locations: []
    })

    onMounted(
        async() => {
            data.isLoading = true
            const quarter = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/this-quarter', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })

            const year = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/this-year', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })

            data.quarter = await quarter.json()
            data.year = await year.json()
            data.isLoading = false
        }
    )

    const getSettings = async () => {
        data.isLoading = true
        const settings = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/setting/' + data.quarter + '/' + data.year, {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })

        data.settings = await settings.json()
        data.isLoading = false
    }

    const openModal = async () => {
        isHidden.value = !isHidden.value
        data.isLoading = true
        let timKorkot = await getTimKorkot();
        let timFaskel = await getTimFaskel();
        let timAskotMandiri = await getTimAskotMandiri();
        data.jobTitles = [];

        timKorkot.map( (e) => {
          data.jobTitles.push(e)
        })

        timFaskel.map( (e) => {
          data.jobTitles.push(e)
        })

        timAskotMandiri.map( (e) => {
          data.jobTitles.push(e)
        })

        const locationRes = await fetch(process.env.VUE_APP_ROOT_API + '/this-location', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({ 'year': data.year })
        })
        data.locations = await locationRes.json()
        data.isLoading = false
    }

    const createNewSetting = async () => {
        data.isLoading = true
        const request = {
            'year': data.year,
            'quarter': data.quarter,
            'job_title_id': data.job_title_id,
            'zone_location_id': data.zone_location_id
        }

        const newSettingRes = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/setting/create', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(request)
        })
        const newSetting = await newSettingRes.json()
        data.settings.unshift(await newSetting)
        console.log(newSetting)
        isHidden.value = !isHidden.value
        data.isLoading = false
    }

</script>

<style>

</style>
