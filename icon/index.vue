<template>
    <i class="icon" :class="clazz"></i>
</template>

<script>
    export default {
        name: 'icon',
        props: {
            name: String,
            className: String
        },
        computed: {
            clazz() {
                const clazzName = this.className || '';
                return `c-icon-${this.name} ${clazzName}`
            }
        }
    }
</script>

<style scoped>
    .icon {
        position: relative;
        display: inline-block;
        font-size: inherit;
        text-rendering: auto;
        width: 32px;
        height: 32px;
        top: 50%;
        transform: translateY(-50%);
    }
    .c-icon-arrow-top {
        background: #3b8070;
    }
    .c-icon-arrow-right {
        background: #7f828b;
    }
    .c-icon-arrow-down {
        background: #66c6cc;
    }
    .c-icon-arrow-left {
        background: #66c6f2;
    }

    .icon-clear {
        position: absolute;
        right: 10px;
        background: #ccc;
        width: 100px;
    }
</style>
