<template>
    <div class="c-swipe-item-container" :class="className" :style="style">
        <slot />
    </div>
</template>

<script>
    // 轮播图轮播页面
    export default {
        name: 'swipe-item',
        props: {
            className: {
                type: String
            },
            item: {
                type: String
            }
        },
        data() {
            return {
                offset: 0
            }
        },
        computed: {
            style() {
                const { computedWidth } = this.$parent;
                // offset在父级元素进行修改
                return {
                    width: computedWidth + 'px',
                    transform: `translateX(${this.offset}px)`
                }
            }
        },
        beforeCreate() {
            this.$parent.swipes.push(this);
        },
        beforeDestroy() {
            this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1)
        }
    }
</script>

<style scoped>
    .c-swipe-item-container {
        color: #fff;
        float: left;
        text-align: center;
        height: 100%;
    }
    .c-swipe-item-container img.c-img-item {
        width: 100%;
        height: 100%;
    }
    .c-swipe-item-container  a.c-img-link {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
</style>
