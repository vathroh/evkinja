import toast from "../../components/toast";
import { useRouter } from "vue-router";

export default function(){
  const router = useRouter();
  
  const setOkByAssessor = async (id) => {
    fetch(process.env.VUE_APP_ROOT_API + "/evkinja/ok_by_assessor/" + id, {
      headers: { "Content-Type": "applicaction/json" },
      credentials: "include",
    })
    .then((response) => { 
      if(response.ok){
        toast.info('Data berhasil dikirim.');
        router.push("/");
      }
    })
    .catch( () => {
      toast.error('Data gagal dikirim.');
    });
  }

  return { setOkByAssessor }
}

