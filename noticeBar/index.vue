<template>
    <div class="comp-notice-bar"
         :style="barStyle"
         v-if="showNoticebar"
         @click="$emit('click')"
    >
        <i v-if="leftIcon" class="icon comp-notice-bar__left-icon">
            <img :src="leftIcon" >
        </i>
        <div class="comp-notice-bar__wrap" ref="wrap">
            <div class="comp-notice-bar__content" ref="content"
                 :class="animationClass"
                 :style="contentStyle"
                 @animationend="onAnimationEnd"
                 @webkitAnimationEnd="onAnimationEnd"
            >
                <slot>{{message}}</slot>
            </div>
            <i v-if="mode" class="icon comp-notice-bar__right-icon"
               :class="iconClass"
                @click="onClickIcon"
            ></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'notice-bar',
        props: {
            message: String,
            mode: String,
            color: {
                type: String
            },
            leftIcon: String,
            background: {
                type: String
            },
            delay: {
                type: [String, Number],
                default: 1
            },
            scrollable: {
                type: Boolean,
                default: true
            },
            speed: {
                type: Number,
                default: 50
            }
        },
        data() {
            return {
                wrapWidth: 0,
                firstRound: true,
                duration: 0,
                offsetWidth: 0,
                showNoticebar: true,
                animationClass: ''
            }
        },
        computed: {
            barStyle() {
                return {
                    color: this.color || '',
                    background: this.background || ''
                }
            },
            iconClass() {
                return this.mode ? `comp-notice-bar_icon-${this.mode}` : '';
            },
            contentStyle() {
                return {
                    paddingLeft: this.firstRound ? 0 : this.wrapWidth + 'px',
                    animationDelay: this.delay + 's',
                    animationDuration: this.duration + 's'
                }
            }
        },
        watch: {
            message: {
                handler() {
                    this.$nextTick(() => {
                        const { wrap, content } = this.$refs;
                        if (!wrap || !content) {
                            return;
                        }
                        const wrapWidth = wrap.getBoundingClientRect().width;
                        const offsetWidth = content.getBoundingClientRect().width;
                        if (this.scrollable && offsetWidth > wrapWidth) {
                            this.wrapWidth = wrapWidth;
                            this.offsetWidth = offsetWidth;
                            this.duration = offsetWidth / this.speed;
                            this.animationClass = 'comp-notice-bar__play--infinite';
                        }
                    })
                },
                immediate: true
            }
        },
        methods: {
            onClickIcon(e) {
                e.stopPropagation();
                this.showNoticebar = this.mode !== 'closeable'
            },
            onAnimationEnd() {
                this.firstRound = false;
                this.$nextTick(() => {
                    this.duration = (this.offsetWidth + this.wrapWidth) / this.speed;
                    this.animationClass = 'comp-notice-bar__play--infinite';
                })
            }
        }
    }
</script>

<style scoped>
    .comp-notice-bar {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        color: #f85;
        padding: 18px 30px;
        font-size: 24px;
        position: relative;
        background-color: #fff7cc;
    }
    .comp-notice-bar__left-icon {
        height: 36px;
        min-width: 40px;
        padding-top: 2px;
        line-height: 36px;
        box-sizing: border-box;
    }
    .comp-notice-bar__left-icon img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
    }
    .comp-notice-bar__wrap {
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        height: 36px;
        line-height: 36px;
        overflow: hidden;
        position: relative;
    }
    .comp-notice-bar__content {
        white-space: nowrap;
    }
    @keyframes notice-bar-play--infinite {
        100% {
            transform: translate3d(-100%, 0, 0);
        }
    }
    .comp-notice-bar__play--infinite {
        animation: notice-bar-play--infinite  linear infinite both;
    }
    .comp-notice-bar__right-icon {
        position: absolute;
        right: 0;
        top: 0;
    }
    .comp-notice-bar_icon-closeable {
        background: url("//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png") no-repeat center;
        background-color: #fff7cc;
        background-size: 32px 32px;
    }
    .comp-notice-bar_icon-link {
        background: url("//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png") no-repeat center;
        background-color: #fff7cc;
        background-size: 32px 32px;

    }
    .icon {
        width: 36px;
        height: 36px;
    }
</style>
