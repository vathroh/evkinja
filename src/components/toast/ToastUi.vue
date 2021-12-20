<template>
    <div class="toast-wrapper">
        <div class="toast" :class="toast.type" v-for="toast in toasts" :key="toast.uuid">
            <i v-if="toast.type === 'info'" class="bi bi-info-circle-fill"></i>
            <i v-if="toast.type === 'warning'" class="bi bi-exclamation-triangle-fill"></i>
            <i v-if="toast.type === 'error'" class="bi bi-dash-circle-fill"></i>
            <i v-if="toast.type === 'success'" class="bi bi-check-circle-fill"></i>
            <h5>{{ toast.msg }}</h5>
            <button @click="deleteToast(toast)"><i class="bi bi-x-circle-fill"></i></button>
        </div>
    </div>
</template>


<script setup>
import { computed } from 'vue'
import { useStore } from "vuex";

const store = useStore();
const toasts = computed( () => store.state.toast.messages )

function deleteToast(toast){
    store.commit('remove', toast);
}
</script>


<style>
.toast-wrapper {
    position:  fixed;
    top:  16px;
    right:  16px;
    z-index: 21;
}

.toast {
    position: relative;
    padding: 8px 16px;
    display: flex;
    column-gap: 8px;
    align-items: center;
    width:  300px;
    min-height: 50px;
    margin-bottom: 10px;
    opacity: 0.7;
    border-radius: 5px;
}

.toast h5 {
    margin: 0;
    font-weight: 400;
    flex: 1 1 auto;
}

.toast button {
    border: 0;
    line-height: 0;
    background-color: transparent;
    padding: 0;
    position: absolute;
    top: -12px;
    right: -12px;   cursor: pointer;
}

.toast i {
    font-size: 28px;
    color: #fff;
}

.toast button i {
    border: 1px solid #fff;
    border-radius: 50%;
    background: #fff;
    font-size: 24px;
}

.toast.info {
    background: #287bff;
}

.toast.info button i {
    color:  #287bff;
}
.toast.warning {
    background:  #f9ca3f;
}

.toast.warning button i {
    color:  #f9ca3f;
}

.toast.error {
    background: #f00;
}

.toast.error button i {
    color:  #f00;
}

.toast.success {
    background:  #8de02c;
}

.toast.success button i {
    color:  #8de02c;
}
</style>

