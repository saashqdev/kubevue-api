# <%= componentName %> <%= title %>

<%= description %>

## Example
### Basic Form

The basic form is this, Balabala.

``` html
<<%= tagName %> some-prop></<%= tagName %>>
```

### Complex Example

``` vue
<template>
<<%= tagName %> v-model="value">
    <div>Something</div>
</<%= tagName %>>
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

## API
### Props/Attrs

| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| v-model, value.sync | Number | `1` | Primary value |
| some | Boolean | `false` | Some |
| other | String | | Other |
| prop | Array | | Properties |
| disabled | Boolean | `false` | Whether to disable |

### Events

#### @before-action

Trigger before operation

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | String | The value passed |
| $event.content | String | Passed content |
| $event.preventDefault | Function | Prevent the shutdown process |
| senderVM | <%= componentName %> | Send event instance |

#### @action

Triggered during operation

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.page | Number | Current page number |
| $event.oldPage | Number | Old page number |
| senderVM | <%= componentName %> | Send event instance |

#### @change

Fires when value changes

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | Number | Current value |
| $event.oldValue | Number | Old value |
| senderVM | <%= componentName %> | Send event instance |

### Methods

#### load()

load.

| Param | Type | Description |
| ----- | ---- | ----------- |

### toggle(expanded)

Switch status.

| Param | Type | Description |
| ----- | ---- | ----------- |
| expanded | Boolean | Expand/collapse |
