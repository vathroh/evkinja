<template>
    <div>
        <div class="wrapper">
            <div class="title">
                <div>
                    <input type="text" value="" name="" id=""/>
                    <button>Tambah</button>
                </div>
            </div>
            <div class="body">
                <ul v-for="criteria in data.criteria" :key="criteria.id">
                    <li>{{ criteria.id }}. {{ criteria.criteria}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, reactive } from 'vue'

    const data = reactive({
        criteria: []
    })

    onMounted(
        async() => {
            const criteriaResponse = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/criteria', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })

            data.criteria = await criteriaResponse.json();
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
    display:  flex;
}
.wrapper .box label {
    margin-left: 8px;
}

</style>
