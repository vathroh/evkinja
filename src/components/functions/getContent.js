import { useRoute } from 'vue-router'

export default function(){
    const route = useRoute();
    const id = route.params.id;

    const content = async () => {
        const response = await fetch(process.env.VUE_APP_ROOT_API +'/evkinja/content/'+id, {
            headers:  { 'Content-Type': 'application/json'},
            credentials:  'include'
        })

        return await response
    }

    return { content }
}

