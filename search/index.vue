<template>
    <div class="comp-search-wrapper" :style="{ background }">
        <field
            v-bind="$attrs"
            v-on="listeners"
            :value="value"
            leftIcon="search"
        />
        <div v-if="showAction" class="comp-search-icon">
            <slot name="action">
                <div @click="onBack">取消</div>
            </slot>
        </div>
    </div>
</template>

<script>
    import Field from '../field/index.vue';
    export default {
        name: 'index',
        inheritAttrs: false,
        props: {
            value: String,
            showAction: Boolean,
            background: {
                type: String
            }
        },
        computed: {
            listeners() {
                return {
                    ...this.$listeners,
                    input: this.onInput,
                    keypress: this.onKeypress
                }
            }
        },
        methods: {
            onKeypress(e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    this.$emit('search', this.value);
                }
                this.$emit('keypress', e);
            },
            onInput(val) {
                this.$emit('input', val);
            },
            onBack() {
                this.$emit('input', '');
                this.$emit('cancel');
            }
        },
        components: {
            Field
        }
    }
</script>

<style scoped>
    .comp-search-wrapper {
        background: #f2f2f2;
        display: flex;
    }
    .comp-search-wrapper .comp-field-wrapper {
        background: #f2f2f2;
    }
    .comp-search-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 100px;
    }
</style>
