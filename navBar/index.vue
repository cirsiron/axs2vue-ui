<template>
    <div class="comp-nav-bar-wrapper" :style="styles">
        <i class="comp-nav-bar-icon-left-arrow">&lt;</i>
        <slot name="left">
            <div class="comp-nav-bar-left" @click="onClickLeft">{{leftText}}</div>
        </slot>
        <slot name="title">
            <div class="comp-nav-bar-title">
                {{title}}
            </div>
        </slot>
        <slot name="right" v-if="rightText">
            <div class="comp-nav-bar-right" @click="onClickRight">{{rightText}}</div>
        </slot>
    </div>
</template>

<script>
    export default {
        name: 'index',
        props: {
            title: String,
            leftText: {
                type: String,
                default: '返回'
            },
            rightText: String,
            leftArrow: {
                type: Boolean,
                default: true
            },
            fixed: {
                type: Boolean,
                default: true
            },
            zIndex: {
                type: [String, Number],
                default: 10
            }
        },
        computed: {
            styles() {
                let style = {};
                if (this.fixed) {
                    style.position = 'fixed';
                    style.top = 0;
                    style.left = 0;
                }
                if (this.zIndex) {
                    style.zIndex = this.zIndex;
                }
                return style;
            }
        },
        methods: {
            onClickLeft() {
                this.$emit('click-left')
            },
            onClickRight() {
                this.$emit('click-right')
            }
        }
    }
</script>

<style scoped>
    .comp-nav-bar-wrapper {
        display: flex;
        height: 92px;
        line-height: 92px;
        color: deepskyblue;
        background: #f2f2f2;
        width: 100%;
        z-index: 10;
    }
    .comp-nav-bar-icon-left-arrow {
        flex: 1;
        text-align: center;
    }
    .comp-nav-bar-title {
        flex: 10;
        color: #453d3f;
        text-align: center;
    }
    .comp-nav-bar-left {
        flex: 3;
        text-align: left;
    }
    .comp-nav-bar-right {
        flex: 4;
        text-align: center;
    }
</style>
