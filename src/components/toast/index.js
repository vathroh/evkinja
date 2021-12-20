import store from "../../store";

let uuid = 0;
class ToastMessage{
    constructor(type, msg, duration){
        this.type = type;
        this.msg = msg;
        this.duration = duration || 3000;
        this.uuid = uuid++;

        this.timer = setTimeout( () => {
            this.remove();
        }, this.duration);
    }

    remove(){
        store.commit("remove", this);
    }
}

store.registerModule('toast', {
    state: () => ({
        messages: []
    }),
    mutations: {
        push(state, msg){
            state.messages.push(msg);
        },
        remove(state, msg){
            const index = state.messages.findIndex( (t) => t.uuid === msg.uuid );
            state.messages.splice(index, 1);
        },
    },
})

const register = (type, msg, duration) => store.commit('push', new ToastMessage(type, msg, duration));
const info = (message, duration) => register("info", message, duration);
const error = (message, duration) => register("error", message, duration);
const success = (message, duration) => register("success", message, duration);
const warning = (message, duration) => register("warning", message, duration);

export default { info, error, success, warning }
