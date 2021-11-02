<template>
            <ul> 
                <li>
                    <a href="#">
                        <span class="icon"><i class="bi bi-apple"></i></span>
                        <span class="title">OSP 1 Jawa Tengah 1</span>
                    </a>
                </li>
                <li>
                    <a href="http://osp1.my.id/dashboard">
                        <span class="icon"><i class="bi bi-speedometer"></i></span>
                        <span class="title">Dashboard</span>
                    </a>
                </li>
                <li>
                    <router-link to="/">
                        <span class="icon"><i class="bi bi-clipboard-data"></i></span>
                        <span class="title">Evkinja</span>
                    </router-link>
                </li>
                <hr>
                <li>
                    <router-link to="/myEvaluation">
                        <span class="icon"><i class="bi bi-card-list"></i></span>
                        <span class="title">Evaluasi Saya</span>
                    </router-link>
                </li>
                <li v-if="data.user.isHrm">
                    <router-link to="/settings">
                        <span class="icon"><i class="bi bi-sliders"></i></span>
                        <span class="title">Setting</span>
                    </router-link>
                </li>
                <li v-if="data.user.isHrm || data.user.isAssessor">
                    <router-link to="/request-edit">
                        <span class="icon"><i class="bi bi-file-earmark-check"></i></span>
                        <span class="title">Permintaan Edit</span>
                    </router-link>
                </li>
                <li v-if="data.user.isHrm">
                    <router-link to="/request-edit-by-assessor">
                        <span class="icon"><i class="bi bi-file-earmark-check-fill"></i></span>
                        <span class="title">Permintaan Edit Penilai</span>
                    </router-link>
                </li>
                <li v-if="data.user.isHrm || data.user.isAssessor">
                    <router-link to="/recap">
                        <span class="icon"><i class="bi bi-card-checklist"></i></span>
                        <span class="title">Rekap</span>
                    </router-link>
                </li>
                <li v-if="data.user.isHrm || data.user.isAssessor">
                    <router-link to="/print">
                        <span class="icon"><i class="bi bi-printer"></i></span>
                        <span class="title">Cetak</span>
                    </router-link>
                </li>

                <hr>
                <li>
                    <a href="#" @click.prevent = "getLogout">
                        <span class="icon"><i class="bi bi-box-arrow-right"></i></span>
                        <span class="title">Sign Out</span>
                    </a>
                </li>
            </ul>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, computed } from 'vue'

export default {

    setup(){

        const router = useRouter();
        const store = useStore();
        const data = reactive({ 
            isLoading: false,
            user: {
                isHrm: false
            }
        });

        data.user.isHrm = reactive(computed( () => store.state.user.isHrm))

        const getLogout = async () => {
            data.isLoading = true
            await fetch('http://localhost:8000/api/logout', {
                method:  'POST',
                headers:  {'Content-Type' :  'application/json'},
                credentials :  'include'
            })
            .then( () => {
                store.commit('setAuth', false)
                localStorage.removeItem('authenticated')
                localStorage.removeItem('isAssessed')
                localStorage.removeItem('isAssessor')
                localStorage.removeItem('isHrm')
                router.push('/login')
            })
            data.isLoading = false
        }

        return {
            getLogout, data
        }

    }
}
</script>


