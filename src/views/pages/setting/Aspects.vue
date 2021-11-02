<template>
  <spinner :isLoading="data.isLoading" />
    <div>
        <div class="wrapper">
            <div class="title">
                Posisi / Jabatan
            </div>
            <div class="box" v-for="jobTitle in data.jobTitles" :key="jobTitle.id">
                <input type="radio" name="job_title" value="jobTitle.id">
                <label for="html">{{ jobTitle.job_title}}</label>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, reactive } from 'vue'
    import spinner from "../../../components/Spinner";
    

    const data = reactive({
        jobTitles: [],
        isLoading: false
    })

    onMounted(
        async() => {
            data.isLoading = true
            const jobTitleResponse = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/current-job-title', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })

            data.jobTitles = await jobTitleResponse.json();
            data.isLoading = false
        }
    )

</script>

<style>
</style>
