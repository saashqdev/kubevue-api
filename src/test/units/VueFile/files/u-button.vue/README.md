<!-- The README.md is automatically generated based on api.yaml and docs/*.md for easy viewing on GitHub and NPM. If you need to modify, please view the source file -->

# UButton Button

**Route Link**, **Inline Display**

Used to trigger an immediate action.

## Example
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

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| color | enum | `'default'`, `'primary'`, `'danger'` | `'default'` | Set color. `'primary'` means the main button, and `'danger'` means the danger button. |
| dashed | boolean | | `false` | Whether the border is dashed. |
| size | enum | `'mini'`, `'small'`, `'normal'`, `'large'` | `'normal'` | Set size. |
| shape | enum | `'default'`, `'square'`, `'round'`, `'circle'` | `false` | Set the shape. The options are Default, Rounded Corners, Square, and Circle. |
| disabled | boolean | | `false` | Whether to disable. When disabled it will not respond to click events. |
| display | enum | `'inline'`, `'block'` | `'inline'` | Display mode. `'inline'` means inline display, `'block'` means block-level display, and the width will fill the parent element. |
| icon | string | `'refresh'`, `'create'`, `'success'` | | Set the icon. 【To be expanded】 |
| loading | boolean | | `false` | Whether it is loading. |
| href | string | | | Link address |
| target | string | | | (native attribute). For example, setting `_blank` will open a new blank page. |
| to | string, Location | | | Requires vue-router, same as `to` attribute of `<router-link>`. Can be a string or an object describing the target location. |
| replace | boolean | | `false` | Requires vue-router, the same as the `replace` attribute of `<router-link>`. If `true`, when clicked, `router.replace()` will be called instead of `router.push()`, so no `history` record will be left after navigation. |
| append | boolean | | `false` | Requires vue-router, the same as the `append` attribute of `<router-link>`. If `true`, append the path of `to` after the current path. |

### Slots

#### (default)

Insert text or HTML.

### Events

#### @$listeners

Listen for events on all `<a>` elements.

| Param | Type | Description |
| ----- | ---- | ----------- |

#### @before-navigate

Triggered before switching routes using router related attributes

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.to | string, Location | The value of the `to` attribute |
| $event.replace | boolean | The value of the `replace` attribute |
| $event.append | boolean | The value of the `append` attribute |
| $event.preventDefault | Function | Prevent switching process |
| senderVM | UButton | Send event instance |

#### @navigate

Triggered when switching routes using router related attributes

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.to | string, Location | The value of the `to` attribute |
| $event.replace | boolean | The value of the `replace` attribute |
| $event.append | boolean | The value of the `append` attribute |
| senderVM | UButton | Send event instance |
