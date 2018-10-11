import toast from './index.vue';
import Vue from 'vue';
let queue = [];
const createInstance = () => {
    if (queue.length === 0) {
        const ToastComp = new (Vue.extend(toast))({
            el: document.createElement('div')
        });
        document.body.appendChild(ToastComp.$el);
        queue.push(ToastComp);
    }
    return queue[0];
};

const Toast = (options = {}) => {
    const toast = createInstance();

    Object.assign(toast, {
        ...options,
        clear() {
            toast.message = '';
        }
    });

    toast.timer && clearTimeout(toast.timer);
    options.timeout = options.timeout === undefined ? 3000 : options.timeout;
    if (options.timeout > 0) {
        toast.timer = setTimeout(() => {
            toast.clear();
        }, options.timeout)
    }
    return toast;
};


export default Toast;
