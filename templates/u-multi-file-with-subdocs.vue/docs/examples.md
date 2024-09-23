### Basic Form

The basic form is this, Balabala.

``` html
<u-sample some-prop></u-sample>
```

### Complex Example

``` vue
<template>
<u-sample v-model="value">
    <div>Something</div>
</u-sample>
</template>

<script>
export default {
    data() {
        return {
            value: 3,
        };
    },
};
</script>
```
