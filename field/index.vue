<template>
    <cell
        :icon="leftIcon"
        :title="label"
        :required="required"
        class="comp-field-wrapper"
    >
        <slot slot="title" name="label"/>
        <div class="comp-field-content">
            <i class="c-icon-search">Q</i>
            <textarea
                v-if="type === 'textarea'"
                :readonly="readonly"
                v-bind="$attrs"
                v-on="listeners"
                ref="input"
                :class="className"
                :value="value"
            ></textarea>
            <input
                v-else
                v-bind="$attrs"
                v-on="listeners"
                ref="input"
                class="comp-field-input"
                :class="className"
                :type="type"
                :value="value"
                :readonly="readonly"
            >
            <i class="comp-icon-clear" v-if="showClear"
               @touchstart.prevent="$emit('input', '')"></i>
        </div>
    </cell>
</template>

<script>
    import CellWrapper from '~/components/cell';
    import Icon from '~/components/icon';
    const { cell } = CellWrapper;
    export default {
        name: 'field',
        inheritAttrs: false,
        props: {
            leftIcon: String,
            value: [ Number, String ],
            icon: String,
            error: Boolean,
            label: String,
            readonly: Boolean,
            required: Boolean,
            clearable: Boolean,
            type: {
                type: String,
                default: 'text'
            },
            labelAlign: String,
            inputAlign: String
        },
        data() {
            return {
                focused: false
            }
        },
        computed: {
            className() {
                return {
                    'text-error': this.error
                }
            },
            showClear() {
                return this.clearable && this.value !== '' && !this.readonly;
            },
            listeners() {
                return {
                    ...this.$listeners,
                    input: this.onInput,
                    keypress: this.onKeypress,
                    focus: this.onFocus,
                    blur: this.onBlur
                }
            }
        },
        methods: {
            blur() {
                this.$refs.input && this.$refs.input.blur();
            },
            onInput(e) {
                this.$emit('input', e.target.value);
            },
            onKeypress(e) {
                if (this.type === 'number') {
                    const { keyCode } = e;
                    const allowPoint = String(this.value).indexOf('.') === -1;
                    const isValidKey = (keyCode >= 48 && keyCode <= 57) || (keyCode === 46 && allowPoint) || keyCode === 45;
                    if (!isValidKey) {
                        e.preventDefault();
                    }
                } else if (this.type === 'search' && e.keyCode === 13) {
                    this.blur();
                }
                this.$emit('keypress', e);
            },
            onFocus(e) {
                this.focused = true;
                this.$emit('focus', e);
                if (this.readonly) {
                    this.blur();
                }
            },
            onBlur(e) {
                this.focused = false;
                this.$emit('blur', e);
            }
        },
        components: {
            cell,
            Icon
        }
    }
</script>

<style scoped>
    .comp-field-content {
        flex: 1;
        position: relative;
    }
    .text-error {
        color: #FF470E;
    }
    .comp-field-input {
        padding-left: 5px;
        width: 100%;
        height: 100%;
    }
    .comp-icon-clear::after {
        content: 'x';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 12px;
        font-size: 14px;
        color: #fff;
        top: -15px;
    }
    .comp-icon-clear {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        right: 32px;
        transform: translateY(-50%);
        background: #ddd;
    }
    .comp-field-wrapper input {
        background: #fff;
        padding-left: 48px;
    }
    .comp-field-wrapper .c-icon-search {
        position: absolute;
        left: 0;
        top: 0;
        background: #e0e0e0;
    }
</style>
