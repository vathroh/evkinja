<template>
    <div class="container">
        <div class="navigation" :class="{ tight:isTightenth }">
            <sidebar />
        </div>

        <!-- Main -->
        <div class="main" :class="{extent:isExtent}">
            <div class="topbar">
               <div class="toggle" @click="{ isTightenth=!isTightenth; isExtent = !isExtent}">
                    <i class="bi bi-list" @click="wide"></i>
                </div>
                <div class="search">
                    <label>
                        <input type="text" placeholder="Cari di sini ...."/>
                        <i class="bi bi-search"></i>
                    </label>
                </div>
                <div class="user">                
                    <p>Hai, {{ user.name }}</p>
                    <div class="image">
                        <img src="/images/profiles/user.jpg" alt=""/>
                    </div>
                </div>
            </div> 
            
            <router-view />

        </div>
    </div>


</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'

    const isTightenth = ref(false)
    const isExtent =  ref(false)
    const store = useStore()
    const user = reactive(computed( () => store.state.user))

    const wide = function(){
        store.commit('setExtent', isExtent)
    }

</script>
