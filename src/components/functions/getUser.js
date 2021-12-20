import { useStore } from "vuex";

export default function(){
    const store = useStore();

    const setUser = async () => {
        const response = await fetch(process.env.VUE_APP_ROOT_API + "/me", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const content = await response.json();
        store.commit("setUser", Object.values(content)[0]);

    }
    return { setUser }
}

