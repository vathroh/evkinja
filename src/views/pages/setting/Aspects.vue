<template>
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

    const data = reactive({
        jobTitles: []
    })

    onMounted(
        async() => {
            const jobTitleResponse = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/current-job-title', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })

            data.jobTitles = await jobTitleResponse.json();
        }
    )

</script>

<style>
.wrapper {
    position:  relative;
    display: flex;
    flex-wrap:  wrap;
    border:  2px solid var(--primary5);
    justify-content:  space-between;
    border-radius: 10px;
    padding:  20px;
    width:  100%;
}

.wrapper .box {
    padding:  3px;
    width:  230px;
}

.wrapper .title {
    position: absolute;
    padding: 5px;
    transform: translateY(-120%);
    border:  2px solid var(--primary5);
    border-radius: 5px;
    background: var(--primary2);
}

.wrapper .box label {
    margin-left: 8px;
}

</style>
