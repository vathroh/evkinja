<template>
    <div>
        <spinner :isLoading="data.isLoading" />

        <div class="page card">
            <div class="card-header">
                <div class="title">
                    Pengaturan
                </div>
            </div>
            <div class="card-body">
                <div class="card-nav">
                    <ul>
                        <li>
                            <router-link to="/criteria">
                                Kriteria
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/aspects">
                                Aspek
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/settings">
                                Setup
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/assessors">
                            Penilai
                            </router-link>
                        </li>
                    </ul>
                </div>
                <router-view /> 
            </div>
        </div>

    </div>
 
</template>

<script setup>
    import { reactive } from 'vue'
    import spinner from '../../components/Spinner'

    const data = reactive({
        user: {
            role: ''
        },
        isLoading:  false
    })
</script>
<style scoped>
.card-nav {
    width:  100%;
    transform: translateY(-130%);
} 

.card-nav ul {
    display: flex;
}

.card-nav ul li {
    list-style: none;
    display:  inline-block;
    padding: 10px;
    cursor: pointer;
}

.card-nav ul li:hover {
    background: var(--primary1);
    color: var(--primary2);
}

.card-nav ul li a {
    width: 100%;
    height: 100%;
    color:  var(--primary1);
}

.card-nav ul li:hover a{
    color: var(--primary2);
}
</style>
