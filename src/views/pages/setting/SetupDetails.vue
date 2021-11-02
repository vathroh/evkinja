<template>
    <div>
        <spinner :isLoading="data.isLoading" />
    </div>
    <div class="wrapper">
        <div class="title">
            <h3>Setup {{ data.setting.job_title }} Lokasi {{ data.setting.location }} Triwulan {{ data.setting.quarter }} Tahun {{ data.setting.year }}</h3>
        </div>
        <div class="height-400">
           <table class="table">
               <thead>
                   <tr>
                       <th>No.</th>
                       <th>Aspek</th>
                       <th>
                            Aksi
                            <i class="bi bi-plus-square-fill"></i> 
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
                                <i class="bi bi-plus-square-fill link"></i> 
                                <i class="bi bi-dash-square-fill link" @click="delCriteria(i)"></i> 
                                <i class="bi bi-caret-down-square-fill link"></i>
                            </div>
                       </td>
                   </tr>
                   <tr v-for="(aspect, n) in criteria.aspect" :key="aspect.aspect">
                       <td class="text-right">{{ n+1 }}</td>
                       <td>{{ aspect }}</td>
                       <td>
                            <div class="icon-group width-100">
                                <i class="bi bi-caret-up-square-fill link"></i> 
                                <i class="bi bi-dash-square-fill link" @click="delAspect(i,n)"></i> 
                                <i class="bi bi-caret-down-square-fill link"></i>
                            </div>
                        </td>
                   </tr>
               </tbody>
           </table> 
        </div>
    </div>

</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import spinner from '../../../components/Spinner'

const route = useRoute()
const id = route.params.id;

const data = reactive({
    setting: [],
    criteria: [],
    aspects: [],
    isLoading: false
})

onMounted(
    async () => {
        data.isLoading = true
        const settingRes = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/setting/show', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({'id': id})
        })
        data.setting = await settingRes.json()
        data.isLoading = false
    }
)

function removeCriteria(i){
    return data.setting.aspects.splice(i,1)
}

function removeAspect(i,n){
    return data.setting.aspects[i].aspect.splice(n,1)
}

const upCriteria = (i)=>{
    console.log(removeCriteria(i))
}

const delCriteria = (i)=>{
    removeCriteria(i)
}

const delAspect = (i,n)=>{
    console.log(removeAspect(i,n))
}
</script>

<style>
.icon-group {
    display:  flex;
    justify-content:  space-around;
}
</style>
