<template>
    <div>
        
    <spinner :isLoading="data.isLoading" />
    </div>
    <div class="page card">
        <div class="card-header">
           <div class="title">
               <h3>Request Edit</h3>
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
                       <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(personil, index) in data.requestEdit" :key="personil.user_id">
                       <td class="text-center">{{ index + 1 }}</td>
                       <td>{{ personil.name }}</td>
                       <td>{{ personil.jobTitle }}</td>
                       <td>{{ personil.district }}</td>
                       <td class="text-center">
                           <button class="btn btn-success btn-sm">terima</button>
                           <button class="btn btn-warning btn-sm">tolak</button>
                       </td>
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
        requesEdit: [],
        isLoading: false
    })

    onMounted(
        async () => {
            data.isLoading = true
            const response = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/request-edit-by-assessor', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })

            let requestEdit = await response.json()

            let dataRequestEdit = [];
            Object.values(requestEdit).map((item) => {
                    dataRequestEdit.push(item);
            });
            data.requestEdit = dataRequestEdit

            data.isLoading= false
        }
    )

</script>
