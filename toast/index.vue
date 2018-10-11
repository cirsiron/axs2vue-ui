<template>
    <transition name="comp-fade">
        <div v-show="message" class="comp-toast" :class="className">
            {{message}}
        </div>
    </transition>
</template>

<script>
    const POSITION_LIST = ['top', 'bottom', 'left', 'right'];
    export default {
        name: 'toast',
        props: {
            message: String,
            position: {
                type: String,
                default: 'top'
            }
        },
        computed: {
            className() {
                return {
                    [`comp-toast--${this.position}`]: POSITION_LIST.indexOf(this.position) !== -1
                }
            }
        }
    }
</script>

<style scoped>
    .comp-toast {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        width: 300px;
        height: 64px;
        background-color: rgba(0, 0, 0, 0.5);
        text-align: center;
        line-height: 64px;
        color: #eeeeee;
        border-radius: 10px;
    }
    .comp-toast--top {
        top: 20%;
    }
    .comp-toast--bottom {
        bottom: 20%;
    }
    .comp-toast--left {
        left: 10%;
    }
    .comp-toast--right {
        right: 10%;
    }
</style>
