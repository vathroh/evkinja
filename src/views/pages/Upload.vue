<template>
    <div>

    <spinner :isLoading="data.isLoading" />

    <div class="page card">
        <div class="page-card-header">
            <div class="title">
                <h3>Upload Bukti Kinerja</h3>
            </div>
            <h3>Triwulan Tahun  </h3>
        </div> 
        <div class="card-body">
            <div class="card-body-box">
                <form @submit.prevent="uploadFile">
                    <div class="form-control">
                        <label for="criteriaSelect">Kriteria</label>
                        <select id="criteriaSelect" v-model="data.main.criteria_id" @change="mainCriteria">
                           <option v-for="criteria in data.thisContent" :key="criteria.criteria_id" :value="criteria.criteria_id">{{ criteria.criteria }}</option> 
                        </select>
                    </div>
                    <div class="form-control">
                        <label for="criteriaSelect">Aspek</label>
                        <select id="criteriaSelect">
                            <option v-for="aspect in data.select" :key="aspect.aspect_id">{{ aspect.aspect }}</option> 
                        </select>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-sm">upload</button>
                        <input type="file" @change="handleFile" />
                    </div>
                </form>

            </div>
                <div class="card-body-box" v-for="(criteria,index) in data.thisContent" :key="criteria.criteria_id">
                    <div class="card-body-box-item-head">
                        <div class="card-body-box-item-head-cell" style="flex:1">
                            {{ index+1 }}.
                        </div>
                        <div class="card-body-box-item-head-cell text-center" style="flex:10">
                            {{ criteria.criteria }}
                        </div>
                        <div class="card-body-box-item-head-cell text-center" style="flex:10">
                            File
                        </div>
                    </div>

                    <div class="card-body-box-item" v-for="(aspect,i) in criteria.aspects" :key="aspect.aspect_id">
                        <div class="card-body-box-item-cell text-center" style="flex:1">
                            {{ index+1}}.{{ i+1 }}.
                        </div>
                        <div class="card-body-box-item-cell" style="flex:10">
                            {{ aspect.aspect }}
                        </div>
                        <div class="card-body-box-item-cell" style="flex:10">
                            <div>
                                <button class="btn btn-sm">upload</button>
                                <input type="file">
                            </div>
                            <div>
                                <p>File yang sudah diupload:</p>                    
                            </div>
                        </div>
                    </div>

            </div>
        </div>
    </div>
</div>
</template>

<script setup>

import { reactive, onMounted } from 'vue'
import spinner from '../../components/Spinner'
import getContent from '../../components/functions/getContent.js'
import uploadFiles from '../../components/functions/uploadFiles.js'

const { content } = getContent()
const { uploadFile, handleFile } = uploadFiles()

const data = reactive({
    isLoading: false,
    thisContent: [],
    files: [],
    select: [],
    main: {
        criteria_id: '',
        aspect_id: ''
    }
})

onMounted(
    async () => {
        let thisContent = await content()
        data.thisContent = await thisContent.json()
    }
)

function mainCriteria(){
    data.thisContent.map( (item) => {
        if(item.criteria_id == data.main.criteria_id){
            item.aspects.map((i) => {
                data.select.push(i)
            })
        }
    })
    console.log(data.thisContent)
}



</script>
