<template>
    <div class="comp-picker-wrapper">
        <div v-if="showToolbar" class="comp-picker-toolbar comp-hairline--top-bottom">
            <slot>
                <div class="comp-picker-toolbar-cancel"
                    @click="emit('cancel')"
                >{{cancelButtonText}}</div>
                <div class="comp-picker-toolbar-title comp-ellipsis"
                     v-if="title"
                     v-text="title"
                ></div>
                <div class="comp-picker-toolbar-confirm"
                     @click="emit('confirm')"
                >{{confirmButtonText}}</div>
            </slot>
        </div>
        <div :style="columnsStyle" @touchmove.prevent>
            <picker-column
                    v-for="(item, index) in ([columns])"
                    :key="index"
                    :initOptions="item"
                    :item-height="itemHeight"
                    :visible-item-count="visibleItemCount"
                    @change="onChange(index)"
            >

            </picker-column>
        </div>
        <div class="comp-hairline--top-bottom comp-picker__frame" :style="frameStyle" ></div>
    </div>
</template>

<script>
    import PickerColumn from './pickerColumn';

    export default {
        name: 'picker',
        props: {
            columns: {
                type: Array,
                default: () => []
            },
            itemHeight: {
                type: Number,
                default: 44
            },
            valueKey: {
                type: String,
                default: 'text'
            },
            visibleItemCount: {
                type: Number,
                default: 5
            },
            title: String,
            showToolbar: {
                type: Boolean,
                default: false
            },
            confirmButtonText: {
                type: String,
                default: '确定'
            },
            cancelButtonText: {
                type: String,
                default: '取消'
            }
        },
        data() {
            return {
                children: []
            }
        },
        computed: {
            frameStyle() {
                return {
                    height: this.itemHeight + 'px'
                }
            },
            columnsStyle() {
                return {
                    height: this.itemHeight * this.visibleItemCount + 'px'
                }
            }
        },
        watch: {
            columns() {
                this.setColumns();
            }
        },
        methods: {
            setColumns() {
                const columns = [{ values: this.columns }];
                columns.forEach((item, index) => {
                    this.setColumnValues(index, (item.values))
                })
            },
            setColumnValues(index, value) {
                console.log(value)
            },
            onChange(columnIndex) {
                this.$emit('change', this, this.getColumnValue(0), this.getColumnIndex(0))
            },
            getColumn(index) {
                return this.children[index];
            },
            getColumnValue(index) {
                const column = this.getColumn(index);
                return column && column.getValue();
            },
            getColumnIndex(columnIndex) {
                return (this.getColumn(columnIndex) || {}).currentIndex;
            },
            getValues() {
                return this.children.map(child => child.getValue());
            },
            emit(e) {
                this.$emit(e, this.getColumnValue(0), this.getColumnIndex(0));
            }
        },
        components: {
            PickerColumn
        }
    }
</script>

<style scoped>
    .comp-picker-wrapper {
        overflow: hidden;
        -webkit-user-select: none;
        user-select: none;
        position: relative;
        background-color: #fff;
        -webkit-text-size-adjust: 100%;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }
    .comp-picker__frame {
        top: 50%;
        left: 0;
        width: 100%;
        z-index: 1;
        position: absolute;
        pointer-events: none;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    .comp-picker-toolbar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        height: 80px;
        line-height: 80px;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        background: #fff;
        z-index: 10;
    }
    .comp-picker-toolbar-cancel, comp-picker-toolbar-confirm {
        color: #38f;
        padding: 0 30px;
    }
    .comp-picker-toolbar-title {
        max-width: 50%;
        text-align: center;
    }

</style>
