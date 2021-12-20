import { useRoute } from 'vue-router'
import { ref } from 'vue'
//import axios from 'axios'

export default function(){
    const route = useRoute();
    const id = route.params.id;
 
    let file = ref('')

    /*
    const json = JSON.stringify({
            description: this.description,
            productId: this.productId,
    });
    data.append('data', json);
*/
    function handleFile(event){
        if(event.target.files.length === 0){
            return
        }

        console.log(event)
        file = event.target.files[0]
        console.log(file)
    }

    const uploadFile = async () => {
        const data = new FormData();
        data.append('file', file);

        /*
        await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/attachment/upload/' + id, {
            method : 'post',
            credentials : 'include',
            body: data
        })

        axios.post(process.env.VUE_APP_ROOT_API + '/evkinja/attachment/upload/' + id, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin' : '*'
            },
            withCredentials: true,
            onDownloadProgress: e => {
                let progress = (e.loaded / e.total) * 100
                console.log(progress)
            }
        })
        */

        
        const xhr = new XMLHttpRequest()

        xhr.open("POST", process.env.VUE_APP_ROOT_API + '/evkinja/attachment/upload/' + id)
        xhr.upload.addEventListener("progress", e => {
            console.log(e)
        })

        xhr.setRequestHeader("Content-Type", "multipart/form-data")
        xhr.withCredentials = true
        xhr.send(data)
    }

    return { uploadFile, handleFile }
}
