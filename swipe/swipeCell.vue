<template>
    <div class="indicator" v-if="count > 1">
        <i
            v-for="(item, index) in count"
            :class="{ active: index === activeIndicator }"
            :key="index"
        >
        </i>
    </div>
</template>

<script>
    // 轮播图的页码
    export default {
        name: 'swipe-cell',
        props: ['count', 'activeIndicator']
    }
</script>

<style scoped>
    .indicator {
        position: absolute;
        color: #fff;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
    }
    .indicator > i {
        border-radius: 50%;
        background-color: #fff;
        display: inline-block;
        width: 12px;
        height: 12px;
        margin: 0 10px;
    }
    .indicator > i.active {
        background-color: #f85;
    }
</style>
