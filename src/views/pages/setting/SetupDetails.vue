<template>
    <div> 
        <spinner :isLoading="data.isLoading" />
    </div>
    <div class="wrapper">
        <div class="title d-flex">
            <h3>Setup {{ data.setting.job_title }} Lokasi {{ data.setting.location }} Triwulan {{ data.setting.quarter }} Tahun {{ data.setting.year }}</h3>
            <button @click="save"><i class="bi bi-save-fill"></i></button>
                <button  @click="copy">Copy dari Setting sebelumnya</button>
        </div>
        <div class="height-350">
           <table class="table">
               <thead>
                   <tr>
                       <th>No.</th>
                       <th>Aspek</th>
                       <th>
                            Aksi
                            <i class="bi bi-plus-square-fill link" @click="openModalCriteria"></i> 
                       </th>
                   </tr>
               </thead>
               <tbody v-for="(criteria, i) in data.setting.aspects" :key="criteria.criteria">
                   <tr class="highlight">
                       <td>{{ i+1 }}</td>
                       <td>{{ criteria.criteria }}</td>
                       <td>
                            <div class="icon-group width-100">
                                <i class="bi bi-caret-up-square-fill link" @click="upCriteria(i)"></i> 
                                <i class="bi bi-plus-square-fill link" @click="openModalAspect(criteria.id)"></i> 
                                <i class="bi bi-dash-square-fill link" @click="delCriteria(i)"></i> 
                                <i class="bi bi-caret-down-square-fill link" @click="downCriteria(i)"></i>
                            </div>
                       </td>
                   </tr>
                   <tr v-for="(aspect, n) in criteria.aspect" :key="aspect.id">
                       <td class="text-right">{{ n+1 }}</td>
                       <td>{{ aspect.aspect }}</td>
                       <td>
                            <div class="icon-group width-100">
                                <i class="bi bi-caret-up-square-fill link" @click="upAspect(i,n)"></i> 
                                <i class="bi bi-dash-square-fill link" @click="delAspect(i,n)"></i> 
                                <i class="bi bi-caret-down-square-fill link" @click="downAspect(i,n)"></i>
                            </div>
                        </td>
                   </tr>
               </tbody>
           </table> 
        </div>
    </div>

        <div class=" modal" :class="{ hidden:isHiddenCriteria }">
            <div class="modal-header">
                <h4>Tambah Kriteria</h4>
            </div>
            <div class="modal-body">
                <div class="form">
                    <label>Kriteria</label>
                    <select v-model="data.newCriteria">
                        <option :value="criteria" v-for="criteria in data.criteria" :key="criteria.id">{{ criteria.criteria }}</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-sm" @click="addNewCriteria">OK</button>
                <button class="btn btn-sm" @click="closeModalCriteria">Cancel</button>
            </div>
        </div>

        <div class=" modal" :class="{ hidden:isHiddenAspect }">
            <div class="modal-header">
                <h4>Tambah Aspek Penilaian</h4>
            </div>
            <div class="modal-body">
                <div class="form">
                    <label>Aspek</label>
                    <select v-model="data.newAspect">
                        <option :value="aspect" v-for="aspect in data.selectAspects" :key="aspect.id">{{ aspect.aspect }}</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-sm" @click="addNewAspect">OK</button>
                <button class="btn btn-sm" @click="closeModalAspect">Cancel</button>
            </div>
        </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import spinner from '../../../components/Spinner'

const route = useRoute()
const id = route.params.id;
let isHiddenCriteria = ref(true)
let isHiddenAspect = ref(true)

const data = reactive({
    setting: [],
    criteria: [],
    aspects: [],
    selectAspects: [],
    newCriteria: [],
    newAspect: [],
    isLoading: false,
    dataSetting: [],
})

function removeCriteria(i){
    return data.setting.aspects.splice(i,1)
}

function removeAspect(i,n){
    return data.setting.aspects[i].aspect.splice(n,1)
}

function mapSetting(){
        let setting = []
        data.dataSetting.aspects.map( (e) => {
            let aspect = []
            Object.values(e.aspect).map( (i) => {
                aspect.push(i)
            })
            e.aspect = aspect
            setting.push(e)
        })

        data.setting = data.dataSetting
}

onMounted(
    async () => {
        data.isLoading = true
        const settingRes = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/setting/show', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({'id': id})
        })

        data.dataSetting = await settingRes.json()
        mapSetting()

        const criteriaRes = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/criteria', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        data.criteria = await criteriaRes.json()

        const aspectRes = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/aspects', {
            method: 'post', 
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({ 'job_title_id': data.setting.jobTitleId})
        })

        const dataAspectsRes = await aspectRes.json()

        let dataAspects = []
        Object.values(dataAspectsRes).map( (e) => { 
            dataAspects.push(e) 
        })

        data.isLoading = false

        let dataAspectIds = []
        data.setting.aspects.map( (e) => {
            Object.values(e.aspect).map( (el) => {
                dataAspectIds.push(el.id)
            })
        })

        dataAspects.map( (e) => {
            data.aspects.push(e)
            dataAspectIds.map( (i) => {
                if(e.id == i){
                    data.aspects.pop()
                }
            })
        })

    }
)

const save = async () => {
    let aspects = data.setting.aspects
    const sa = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/setting/store-aspects', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({'id': data.setting.id,'aspects': aspects })
    })

    console.log(await sa.json() ) 
}

const copy = async() => {
    const copyRes = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/setting/copy-before', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({ 'id': data.setting.id, 'job_title_id': data.setting.jobTitleId})
    })

    let res = await copyRes.json()

    data.dataSetting.aspects = res.aspects
    data.dataSetting.aspectID = res.aspectId
    
    mapSetting()
    console.log(data.dataSetting)
}

const openModalCriteria = () => {
    isHiddenCriteria.value = !isHiddenCriteria.value
}

const addNewCriteria = () => {
    let criteria = []
    criteria['id'] = data.newCriteria.id
    criteria['criteria'] = data.newCriteria.criteria
    criteria['aspect'] = []
    data.setting.aspects.push(criteria)
    isHiddenCriteria.value = !isHiddenCriteria.value
}

const closeModalCriteria = () => {
    isHiddenCriteria.value = !isHiddenCriteria.value
}

const openModalAspect = (id) => {
    isHiddenAspect.value = !isHiddenAspect.value
    data.selectAspects = [],
    data.aspects.map( (e) => { 
        if(e.criteria_id == id){
            data.selectAspects.push(e)
        }
    })
}

const addNewAspect = () => {
     data.setting.aspects.map( (e, i) => {
        if(e.id == data.newAspect.criteria_id ){
            data.setting.aspects[i].aspect.push(data.newAspect)

            let newSelectAspects = data.aspects

            newSelectAspects.map( (e, i) => {
                if(e.id == data.newAspect.id){
                    data.aspects.splice(i,1)
                }
            })
        }
    })
    isHiddenAspect.value = !isHiddenAspect.value
}

const closeModalAspect = () => {
    isHiddenAspect.value = !isHiddenAspect.value
}

const delCriteria = (i)=>{
    removeCriteria(i)
}

const upCriteria = (i)=>{
    if(i!=0){
        const el = data.setting.aspects[i]
        data.setting.aspects.splice(i,1)
        data.setting.aspects.splice(i-1,0, el)
        console.log(data.setting.aspects)
    }else{
        console.log('Data sudah yang paling atas')
    }
}

const downCriteria = (i)=>{
    const arr = data.setting.aspects

    if(i!= arr.length-1){
        const el = arr[i]
        arr.splice(i,1)
        arr.splice(i+1,0, el)
    }else{
        console.log('Data sudah yang paling bawah')
    }
}

const upAspect = (i,n)=>{
    if(n!=0){
        const el = data.setting.aspects[i].aspect[n]
        data.setting.aspects[i].aspect.splice(n,1)
        data.setting.aspects[i].aspect.splice(n-1,0, el)
    }else{
        console.log('Data sudah yang paling atas')
    }
}

const downAspect = (i,n)=>{
    const array = data.setting.aspects[i].aspect
    if( n+1 != array.length){
        const el = array[n]
        data.setting.aspects[i].aspect.splice(n,1)
        data.setting.aspects[i].aspect.splice(n+1,0, el)
    }else{
        console.log('data sudah yang paling bawah')
    }
}

const delAspect = (i,n)=>{
    removeAspect(i,n)
}
</script>

<style>
.icon-group {
    display:  flex;
    justify-content:  space-around;
}
</style>
