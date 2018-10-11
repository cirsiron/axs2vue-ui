<template>
    <div class="comp-hairline--top-bottom">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'cell-group',
        props: {
            type: Boolean,
            default: true
        }
    }
</script>

<style scoped>

</style>
