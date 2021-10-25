<template>

    <div class="spinner" :class="{extent: extent}" v-if="isLoading">
        <img src="/images/animations/loading-21.gif" />
    </div>

</template>

<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    props:  {
        isLoading:  {
            type: Boolean,
            default:  false
        }
    },
    setup(){
        const store = useStore()
        const extent = reactive(computed( () => store.state.extent))

        return { 
            extent
        }
    }
}
</script>
