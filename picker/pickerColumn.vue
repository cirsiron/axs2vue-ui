<template>
    <div
        class="comp-picker-column"
        :class="className"
        :style="columnStyle"
        @touchstart="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
    >
        <ul
            :style="wrapperStyle"
        >
            <li
                v-for="(option, index) in options"
                :key="index"
                :style="optionStyle"
                class="comp-picker-item"
                :class="{
                    'comp-pick-selected': index === currentIndex
                }"
                @click="setIndex(index, true)"
            >
                {{option}}
            </li>
        </ul>
    </div>
</template>

<script>
    import tools from '~/utils/tools';
    const DEFAULT_DURATION = 200;
    const { range, deepClone, isObj } = tools;
    export default {
        name: 'picker-column',
        props: {
            valueKey: String,
            className: String,
            itemHeight: Number,
            visibleItemCount: Number,
            initOptions: {
                type: Array,
                default: () => []
            },
            defaultIndex: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                options: deepClone(this.initOptions),
                currentIndex: this.defaultIndex,
                startY: 0,
                offset: 0,
                duration: 0,
                startOffset: 0
            }
        },
        created() {
            this.$parent.children && this.$parent.children.push(this);
            this.setIndex(this.currentIndex);
        },
        destroyed() {
            const { children } = this.$parent;
            children && children.slice(children.indexOf(this), 1);
        },
        watch: {
            defaultIndex() {
                this.setIndex(this.defaultIndex);
            }
        },
        computed: {
            count() {
                return this.options.length;
            },
            baseOffset() { // 初始时偏移量用来 显示 留白位置
                return this.itemHeight * (this.visibleItemCount - 1) / 2;
            },
            columnStyle() {
                return {
                    height: this.itemHeight * this.visibleItemCount + 'px'
                };
            },
            wrapperStyle() {
                return {
                    transition: `${this.duration}ms`,
                    transform: `translate3d(0, ${this.offset + this.baseOffset}px, 0)`,
                    lineHeight: this.itemHeight + 'px'
                };
            },
            optionStyle() {
                return {
                    height: this.itemHeight + 'px'
                };
            }
        },
        methods: {
            onTouchStart(e) {
                this.startY = e.touches[0].clientY;
                this.startOffset = this.offset;
                this.duration = 0;
            },
            onTouchMove(e) {
                const deltaY = e.touches[0].clientY - this.startY;
                const minHei = -(this.count * this.itemHeight);
                const maxHei = this.itemHeight;
                this.offset = range(
                    this.startOffset + deltaY,
                    minHei,
                    maxHei
                );
            },
            onTouchEnd(e) {
                if (this.offset !== this.startOffset) {
                    this.duration = DEFAULT_DURATION;
                    const minIndex = 0;
                    const maxIndex = this.count - 1;
                    const index = range(
                        Math.round(-this.offset / this.itemHeight),
                        minIndex,
                        maxIndex
                    );
                    this.setIndex(index, true);
                }
            },
            isDisabled(option) {
                return isObj(option) && option.disabled;
            },
            adjustIndex(index) {
                index = range(index, 0, this.count);
                return index;
            },
            setIndex(index, userAction) {
                index = this.adjustIndex(index) || 0;
                this.offset = -index * this.itemHeight;
                if (index !== this.currentIndex) {
                    this.currentIndex = index;
                    userAction && this.$emit('change', index);
                }
            },
            getValue() {
                return this.options[this.currentIndex];
            },
            setValue(value) {
                const { options } = this;
                for (let i = 0; i < options.length; i++) {
                    if (options[i] === value) {
                        return this.setIndex(i);
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .comp-picker-column {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        overflow: hidden;
        font-size: 16px;
        text-align: center;
    }

    .comp-picker-item {
        color: #999;
    }
    .comp-picker-item.comp-pick-selected {
        color: #333;
    }
</style>
