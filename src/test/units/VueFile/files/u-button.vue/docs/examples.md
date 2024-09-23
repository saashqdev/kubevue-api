### Basic Usage

There are four types of buttons: primary button, secondary button, dashed button, and danger button. The main button can appear at most once in the same operating area.

``` html
<u-linear-layout>
    <u-button color="primary">Primary</u-button>
    <u-button>Default</u-button>
    <u-button dashed>Dashed</u-button>
    <u-button color="danger">Danger</u-button>
</u-linear-layout>
```

### Set Shape

Buttons have four shapes: default, rounded corners, square, and circle, which are set using the `shape` attribute.

``` html
<u-linear-layout gap="small">
    <u-button color="primary">Primary</u-button>
    <u-button color="primary" shape="round">Round</u-button>
    <u-button color="primary" shape="square" icon="refresh"></u-button>
    <u-button color="primary" shape="circle" icon="refresh"></u-button>
    <u-button>Default</u-button>
    <u-button shape="round">Round</u-button>
    <u-button shape="square" icon="refresh"></u-button>
    <u-button shape="circle" icon="refresh"></u-button>
</u-linear-layout>
```

### Disabled State

When the button is disabled, it will not respond to click events.

``` html
<u-linear-layout>
    <u-button color="primary" disabled>Primary</u-button>
    <u-button disabled>Default</u-button>
    <u-button dashed disabled>Dashed</u-button>
    <u-button color="danger" disabled>Danger</u-button>
</u-linear-layout>
```

### Set Size

Buttons have four sizes: minimum, small, normal, and large, which are set through the `size` attribute.

``` html
<u-linear-layout direction="vertical">
    <u-linear-layout gap="small">
        <u-button size="mini" color="primary">Primary</u-button>
        <u-button size="mini" color="primary" shape="round">Round</u-button>
        <u-button size="mini" shape="square" icon="refresh"></u-button>
        <u-button size="mini" shape="circle" icon="refresh"></u-button>
    </u-linear-layout>
    <u-linear-layout gap="small">
        <u-button size="small" color="primary">Primary</u-button>
        <u-button size="small" color="primary" shape="round">Round</u-button>
        <u-button size="small" shape="square" icon="refresh"></u-button>
        <u-button size="small" shape="circle" icon="refresh"></u-button>
    </u-linear-layout>
    <u-linear-layout gap="small">
        <u-button size="normal" color="primary">Primary</u-button>
        <u-button size="normal" color="primary" shape="round">Round</u-button>
        <u-button size="normal" shape="square" icon="refresh"></u-button>
        <u-button size="normal" shape="circle" icon="refresh"></u-button>
    </u-linear-layout>
    <u-linear-layout gap="small">
        <u-button size="large" color="primary">Primary</u-button>
        <u-button size="large" color="primary" shape="round">Round</u-button>
        <u-button size="large" shape="square" icon="refresh"></u-button>
        <u-button size="large" shape="circle" icon="refresh"></u-button>
    </u-linear-layout>
</u-linear-layout>
```

<!-- <u-linear-layout gap="small">
    <u-button size="huge" color="primary">Primary</u-button>
    <u-button size="huge" color="primary" shape="round">Round</u-button>
    <u-button size="huge" shape="square" icon="refresh"></u-button>
    <u-button size="huge" shape="circle" icon="refresh"></u-button>
</u-linear-layout> -->

### Block Level Display

Use `display="block"` to quickly fill the width of the button to fill the entire row.

``` html
<u-linear-layout direction="vertical" gap="small">
    <u-button display="block">Default</u-button>
    <u-button display="block" color="primary">Primary</u-button>
    <u-button display="block" dashed>Dashed</u-button>
    <u-button display="block" color="danger">Danger</u-button>
</u-linear-layout>
```

### Icon

Add an icon using the `icon` property.

``` html
<u-linear-layout>
    <u-button color="primary" icon="create">Create Instance</u-button>
    <u-button color="primary" icon="create" disabled>Create Instance</u-button>
    <u-button color="primary" icon="success">Created Successfully</u-button>
    <u-button shape="square" icon="refresh"></u-button>
</u-linear-layout>
```

### Loading

Put the button in the loading state by setting the `loading` attribute.

``` vue
<template>
<u-linear-layout>
    <u-button color="primary" loading>Create Instance</u-button>
    <u-button color="primary" icon="create" loading disabled>Create Instance</u-button>
    <u-button color="primary" shape="square" icon="refresh"
        :loading="loading" :disabled="loading"
        @click="loading = true">
    </u-button>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
        };
    },
};
</script>
```

### Link

You can easily add links or routes on the button, similar to `<router-link>`. Has href, target, to and other attributes.

``` html
<u-linear-layout>
    <u-button color="primary" href="https://kubevue.github.io" target="_blank">Open New Window</u-button>
    <u-button to="/cloud-ui/components/u-link">Route Jump</u-button>
    <u-button color="primary" href="https://kubevue.github.io" disabled>Disable Link</u-button>
</u-linear-layout>
```
