<template>
    <div>
        
    <spinner :isLoading="data.isLoading" />
    </div>
    <div class="page card">
        <div class="card-header">
           <div class="title">
               <h3>Rekap Evaluasi Kinerja</h3>
           </div> 
       </div>
       <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                       <th>No.</th>
                       <th>Nama</th>
                       <th>Posisi/Jabatan</th>
                       <th>Kabupaten</th>
                       <th>Skor</th>
                       <th>Status</th>
                       <th>Isu</th>
                       <th>Rekomendasi</th>
                    </tr>
                </thead>
                <tbody v-for="(jobTitle, i) in data.recap" :key="jobTitle.job_title">
                    <tr style="padding: 20px 0; background:blue;">
                        <td>{{ i+1 }}</td>
                        <td colspan="7">{{ jobTitle.job_title }}</td>
                    </tr>
                    <tr v-for="(personil, index) in jobTitle.user" :key="personil.user_id">
                       <td class="text-center">{{ index + 1}}</td>
                       <td>{{ personil.name }}</td>
                       <td>{{ personil.jobTitle }}</td>
                       <td>{{ personil.district }}</td>
                       <td>{{ personil.totalScore }}</td>
                       <td>{{ personil.finalResult }}</td>
                       <td>{{ personil.issue }}</td>
                       <td>{{ personil.recommendation }}</td>
                   </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import spinner from "../../components/Spinner";
    import { reactive, onMounted } from 'vue'

    const data = reactive({
        recap: [],
        isLoading: false
    })

    onMounted(
        async () => {
            data.isLoading = true
            const response = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/recap', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })

            let recap = await response.json()

            let dataRecapUser = [];

            Object.values(recap).map((item) => {
                let user = [];
                Object.values(item.user).map( (el) => {
                    user.push(el)
                })
                dataRecapUser.push( {'job_title': item.job_title, 'user': user} ) 
            });

            data.recap = dataRecapUser

            data.isLoading= false
        }
    )

</script>
