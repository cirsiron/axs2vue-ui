<template>
    <div
        class="comp-cell comp-hairline"
        @click="onClick"
    >
        <slot name="icon">
            <icon v-if="icon" :name="icon"/>
        </slot>
        <div v-if="isDef(title)" class="comp-cell-title"
             :class="className">
            <slot name="title">
                <span v-text="title"></span>
            </slot>
        </div>
        <div v-if="isDef(value)" class="comp-cell-value" >
            <slot name="value">
                <span v-text="value"></span>
            </slot>
        </div>
        <slot/>
        <slot name="right-icon"/>
        <slot name="extra"/>
    </div>
</template>

<script>
    import Icon from '~/components/icon';
    import Utils from '~/utils';
    const { tools } = Utils;
    const { isDef } = tools;

    export default {
        name: 'cell',
        props: {
            icon: String,
            label: String,
            title: [String, Number],
            value: [String, Number],
            required: Boolean
        },
        components: {
            Icon
        },
        computed: {
            className() {
                return {
                    'comp-cell-required': this.required
                };
            }
        },
        methods: {
            onClick() {
                this.$emit('click');
            },
            isDef
        }
    }
</script>

<style :lang="postcss" scoped >
    .comp-cell {
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        padding: 10px 15px;
        box-sizing: border-box;
        position: relative;
        line-height: 68px;
        background-color: #fff;
        color: #333;
        font-size: 14px;
        overflow: hidden;
        height: 88px;
    }
    .comp-cell-title {
        flex: 1;
        vertical-align: middle;
    }
    .comp-cell-value {
        flex: 1;
        vertical-align: middle;
        text-align: right;
    }
    .comp-cell:not(:last-child)::after {
        left: 15px;
        right: 0;
        width: auto;
        -webkit-transform: scale(1, .5);
        transform: scale(1, .5);
        border-bottom-width: 1px;
    }
    .comp-field-wrapper .comp-cell-title {
        max-width: 180px;
    }
    .comp-cell-required::before {
        content: '*';
        width: 16px;
        font-size: 14px;
        color: #f44;
    }
</style>
