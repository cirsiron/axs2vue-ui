<template>
    <div class="c-swipe-container clear" :class="className">
        <div class="c-swipe-item-wrapper"
            :style="trackStyle"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
            @transitionend="$emit('change', activeIndicator)"
        >
            <slot/>
            <swipe-item v-for="(item,index) in typeList" :key="index">
                <a class="c-img-link" href="javascrit:void(0)">
                    <img class="c-img-item" v-if="type === 'img'" :src="item">
                </a>
            </swipe-item>
        </div>

        <swipeCell v-if="showIndicators" :count="count" :activeIndicator="activeIndicator"/>
    </div>
</template>

<script>
    // 轮播图整体
    import swipeItem from './swipeItem';
    import swipeCell from './swipeCell';
    import mixins from '~/mixins';
    import utils from '~/utils';
    const { on, off } = utils.event;
    const { touch } = mixins;

    const MOVE_DISTANCE = 50;
    export default {
        name: 'swipe',
        mixins: [
            touch
        ],
        props: {
            autoplay: {
                type: Number,
                default: 3000
            },
            loop: {
                type: Boolean,
                default: true
            },
            showIndicators: {
                type: Boolean,
                default: true
            },
            touchable: {
                type: Boolean,
                default: true
            },
            duration: {
                type: Number,
                default: 500
            },
            className: {
                type: String
            },
            list: {
                type: Array
            },
            type: {
                type: String,
                default: 'img'
            },
            lazy: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                computedWidth: 0,
                computedHeight: 0,
                offset: 0,
                active: 0,
                deltaX: 0,
                deltaY: 0,
                swipes: [],
                swiping: false
            };
        },
        components: {
            swipeItem,
            swipeCell
        },
        mounted() {
            this.initialize();
            if (!this.$isServer) {
                on(window, 'resize', this.onResize, true);
            }
        },
        destroyed() {
            this.clear();
            if (!this.$isServer) {
                off(window, 'resize', this.onResize, true)
            }
        },
        computed: {
            activeIndicator() {
                let indicator = (this.active + this.count) % this.count;
                if (String(indicator) === 'NaN') {
                    return 0;
                }
                return indicator;
            },
            count() {
                return this.swipes.length;
            },
            delta() {
                return this.deltaX;
            },
            size() {
                return this['computedWidth'];
            },
            trackSize() {
                return this.count * this.size;
            },
            trackStyle() {
                return {
                    width: `${this.trackSize}px`,
                    transitionDuration: `${this.swiping ? 0 : this.duration}ms`,
                    transform: `translateX(${this.offset}px)`
                }
            },
            cacheList() {
                const length = this.list.length;
                return new Array(length);
            },
            lazyList() {
                const activeIndicator = this.activeIndicator;
                const delta = this.delta;
                const DISTANCE = 20;
                const length = this.list.length;
                let newList = this.cacheList;
                if (activeIndicator === 0 && !newList[0]) {
                    newList[0] = this.list[0];
                }
                if (delta > DISTANCE) {
                    if (activeIndicator === 0) {
                        newList[0] = this.list[0];
                        newList[length - 1] = this.list[length - 1];
                    } else {
                        newList[activeIndicator] = this.list[activeIndicator];
                        newList[activeIndicator - 1] = this.list[activeIndicator - 1];
                    }
                    return newList;
                } else if (delta < -DISTANCE) {
                    newList[activeIndicator] = this.list[activeIndicator];
                    if (activeIndicator < length - 1) {
                        newList[activeIndicator + 1] = this.list[activeIndicator + 1];
                    }
                } else if (delta === 0) {
                    newList[activeIndicator] = this.list[activeIndicator];
                    if (activeIndicator < length - 1) {
                        newList[activeIndicator + 1] = this.list[activeIndicator + 1];
                    }
                }
                return newList;
            },
            typeList() {
                if (!this.lazy) {
                    return this.list;
                }
                if (this.lazy || this.type === 'img') {
                    return this.lazyList
                } else {
                    return this.list;
                }
            }
        },
        watch: {
            swipes() {
                this.initialize();
            },
            autoplay(autoplay) {
                if (!autoplay) {
                    this.clear();
                } else {
                    this.autoPlay();
                }
            }
        },
        methods: {
            initialize(active = 0) {
                this.clear();
                if (this.$el) {
                    const rect = this.$el.getBoundingClientRect();
                    this.computedWidth = this.width || rect.width;
                    this.computedHeight = this.height || rect.height;
                }
                this.swiping = true;
                this.active = active;
                this.offset = this.count > 1 ? -this.size * this.active : 0;
                this.swipes.forEach((item) => {
                    item.offset = 0;
                });
                this.autoPlay();
            },
            onResize() {
                this.initialize(this.activeIndicator);
            },
            clear() {
                clearTimeout(this.timer)
            },
            // 位置修正
            correctPosition() {
                if (this.active <= -1) {
                    this.move(this.count);
                }
                if (this.active >= this.count) {
                    this.move(-this.count);
                }
            },
            move(move = 0, offset = 0) {
                const { delta, active, count, swipes, trackSize } = this;
                const atFirst = active === 0;
                const atLast = active === count - 1;
                const outOfBounds = !this.loop && ((atFirst && (offset > 0 || move < 0)) || (atLast && (offset < 0 || move > 0)));
                if (outOfBounds || count <= 1) {
                    return;
                }
                swipes[0].offset = (atLast && (delta < 0 || move > 0)) ? trackSize : 0;
                swipes[count - 1].offset = (atFirst && (delta > 0 || move < 0)) ? -trackSize : 0;
                if (move && active + move >= -1 && active + move <= count) {
                    this.active += move;
                }
                this.offset = offset - this.active * this.size;
            },
            autoPlay() {
                const { autoplay } = this;
                if (!autoplay) {
                    return;
                }
                if (this.count > 1) {
                    this.clear();
                    this.timer = setTimeout(() => {
                        this.swiping = true;
                        this.resetTouchStatus();
                        this.correctPosition();

                        setTimeout(() => {
                            this.swiping = false;
                            this.move(1);
                            this.autoPlay();
                        }, 50)
                    }, autoplay);
                }
            },
            onTouchStart(e) {
                if (!this.touchable) {
                    return;
                }
                this.clear();
                this.swiping = true;
                this.touchStart(e);
                this.correctPosition();
            },
            onTouchMove(e) {
                if (!this.touchable) {
                    return;
                }

                this.touchMove(e);
                if (this.direction === 'horizontal') {
                    e.preventDefault();
                    e.stopPropagation();
                    this.move(0, Math.min(Math.max(this.delta, -this.size), this.size));
                }
            },
            onTouchEnd(e) {
                if (!this.touchable) {
                    return;
                }
                if (this.delta) {
                    const offset = this.offsetX;
                    this.move(offset > MOVE_DISTANCE ? (this.delta > 0 ? -1 : 1) : 0);
                    this.swiping = false;
                }
                this.autoPlay();
            }
        }
    }
</script>

<style scoped>
    .c-swipe-container {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
    }
    .c-swipe-item-wrapper {
        height: 100%;
    }
</style>
