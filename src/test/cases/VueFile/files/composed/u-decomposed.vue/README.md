<!-- This README.md is automatically generated based on api.yaml and docs/*.md for easy reference on GitHub and NPM. If you need to modify it, please view the source file -->

# USidebar Sidebar

**Route Links**, **Block Level Display**

Typically used for Navigation Bars on the left side of a page.

## Example
### Basic Usage

#### Routing Mode

``` html
<u-sidebar style="width: 200px;">
    <u-sidebar-item>Guidelines</u-sidebar-item>
    <u-sidebar-item>Concept</u-sidebar-item>
    <u-sidebar-item to="/cloud-ui">Component</u-sidebar-item>
</u-sidebar>
```

#### Value Mode

``` html
<u-sidebar value="3" :router="false" style="width: 200px;">
    <u-sidebar-item value="1">Guidelines</u-sidebar-item>
    <u-sidebar-item value="2">Concept</u-sidebar-item>
    <u-sidebar-item value="3">Component</u-sidebar-item>
</u-sidebar>
```

### Read-Only, Disable, Disable an Item

``` html
<u-grid-layout>
    <u-grid-layout-column :span="4">
        <u-sidebar disabled>
            <u-sidebar-item>Guidelines</u-sidebar-item>
            <u-sidebar-item>Concept</u-sidebar-item>
            <u-sidebar-item to="/cloud-ui">Component</u-sidebar-item>
        </u-sidebar>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <u-sidebar>
            <u-sidebar-item>Guidelines</u-sidebar-item>
            <u-sidebar-item disabled>Concept</u-sidebar-item>
            <u-sidebar-item to="/cloud-ui">Component</u-sidebar-item>
        </u-sidebar>
    </u-grid-layout-column>
</u-grid-layout>
```

### Separator

``` html
<u-sidebar style="width: 200px;">
    <u-sidebar-item>Guidelines</u-sidebar-item>
    <u-sidebar-item>Concept</u-sidebar-item>
    <u-sidebar-item>Configuration</u-sidebar-item>
    <u-sidebar-divider></u-sidebar-divider>
    <u-sidebar-item to="/cloud-ui">Component</u-sidebar-item>
    <u-sidebar-item to="/libraries">Component Library</u-sidebar-item>
</u-sidebar>
```

### Grouping

``` html
<u-grid-layout>
    <u-grid-layout-row>
        <u-grid-layout-column :span="4">
            <p>Default, No Folding Function</p>
            <u-sidebar>
                <u-sidebar-group title="Basic">
                    <u-sidebar-item>Links</u-sidebar-item>
                    <u-sidebar-item>Button</u-sidebar-item>
                    <u-sidebar-item>Tag</u-sidebar-item>
                </u-sidebar-group>
                <u-sidebar-group title="Navigation">
                    <u-sidebar-item>Navigation Bar</u-sidebar-item>
                    <u-sidebar-item to="/cloud-ui/u-sidebar">Sidebar</u-sidebar-item>
                    <u-sidebar-item>Tab Page</u-sidebar-item>
                </u-sidebar-group>
                <u-sidebar-group title="Form">
                    <u-sidebar-item>Single-Line Input</u-sidebar-item>
                    <u-sidebar-item>Multi-Line Input</u-sidebar-item>
                    <u-sidebar-item>Selection Box</u-sidebar-item>
                    <u-sidebar-item>Form</u-sidebar-item>
                </u-sidebar-group>
            </u-sidebar>
        </u-grid-layout-column>
        <u-grid-layout-column :span="4">
            <p>Turn on the Folding Function</p>
            <u-sidebar collapsible>
                <u-sidebar-group title="Basic">
                    <u-sidebar-item>Links</u-sidebar-item>
                    <u-sidebar-item>Button</u-sidebar-item>
                    <u-sidebar-item>Tag</u-sidebar-item>
                </u-sidebar-group>
                <u-sidebar-group title="Navigation" expanded disabled>
                    <u-sidebar-item>Navigation Bar</u-sidebar-item>
                    <u-sidebar-item to="/cloud-ui/u-sidebar">Sidebar</u-sidebar-item>
                    <u-sidebar-item>Tab Page</u-sidebar-item>
                </u-sidebar-group>
                <u-sidebar-group title="Form" :collapsible="false">
                    <u-sidebar-item>Single-Line Input</u-sidebar-item>
                    <u-sidebar-item>Multi-Line Input</u-sidebar-item>
                    <u-sidebar-item>Selection Box</u-sidebar-item>
                    <u-sidebar-item>Form</u-sidebar-item>
                </u-sidebar-group>
            </u-sidebar>
        </u-grid-layout-column>
        <u-grid-layout-column :span="4">
            <p>Accordion Mode</p>
            <u-sidebar collapsible accordion>
                <u-sidebar-group title="Basic">
                    <u-sidebar-item>Links</u-sidebar-item>
                    <u-sidebar-item>Button</u-sidebar-item>
                    <u-sidebar-item>Tag</u-sidebar-item>
                </u-sidebar-group>
                <u-sidebar-group title="Navigation">
                    <u-sidebar-item>Navigation Bar</u-sidebar-item>
                    <u-sidebar-item to="/cloud-ui/u-sidebar">Sidebar</u-sidebar-item>
                    <u-sidebar-item>Tab Page</u-sidebar-item>
                </u-sidebar-group>
                <u-sidebar-group title="Form">
                    <u-sidebar-item>Single-Line Input</u-sidebar-item>
                    <u-sidebar-item>Multi-Line Input</u-sidebar-item>
                    <u-sidebar-item>Selection Box</u-sidebar-item>
                    <u-sidebar-item>Form</u-sidebar-item>
                </u-sidebar-group>
            </u-sidebar>
        </u-grid-layout-column>
    </u-grid-layout-row>
    <u-grid-layout-row>
        <u-grid-layout-column :span="4">
            <p>Trigger Method: Clicking the Entire Row can Trigger (default)</p>
            <u-sidebar collapsible expand-trigger="click">
                <u-sidebar-group title="Basic">
                    <u-sidebar-item>Links</u-sidebar-item>
                    <u-sidebar-item>Button</u-sidebar-item>
                    <u-sidebar-item>Tag</u-sidebar-item>
                </u-sidebar-group>
                <u-sidebar-group title="Navigation">
                    <u-sidebar-item>Navigation Bar</u-sidebar-item>
                    <u-sidebar-item to="/cloud-ui/u-sidebar">Sidebar</u-sidebar-item>
                    <u-sidebar-item>Tab Page</u-sidebar-item>
                </u-sidebar-group>
            </u-sidebar>
        </u-grid-layout-column>
        <u-grid-layout-column :span="4">
            <p>Trigger Method: Trigger Only when Clicking the Small Arrow</p>
            <u-sidebar collapsible expand-trigger="click-expander">
                <u-sidebar-group title="Basic">
                    <u-sidebar-item>Links</u-sidebar-item>
                    <u-sidebar-item>Button</u-sidebar-item>
                    <u-sidebar-item>Tag</u-sidebar-item>
                </u-sidebar-group>
                <u-sidebar-group title="Navigation">
                    <u-sidebar-item>Navigation Bar</u-sidebar-item>
                    <u-sidebar-item to="/cloud-ui/u-sidebar">Sidebar</u-sidebar-item>
                    <u-sidebar-item>Tab Page</u-sidebar-item>
                </u-sidebar-group>
            </u-sidebar>
        </u-grid-layout-column>
    </u-grid-layout-row>
</u-grid-layout>
```

### Color Extensions

``` html
<u-grid-layout>
    <u-grid-layout-row>
        <u-grid-layout-column :span="4">
            <u-sidebar style="width: 200px;">
                <u-sidebar-item>Guidelines</u-sidebar-item>
                <u-sidebar-item>Concept</u-sidebar-item>
                <u-sidebar-item>Configuration</u-sidebar-item>
                <u-sidebar-divider></u-sidebar-divider>
                <u-sidebar-item to="/cloud-ui">Component</u-sidebar-item>
                <u-sidebar-item to="/libraries">Component Library</u-sidebar-item>
            </u-sidebar>
        </u-grid-layout-column>
        <u-grid-layout-column :span="4">
            <u-sidebar style="width: 200px;" color="inverse">
                <u-sidebar-item>Guidelines</u-sidebar-item>
                <u-sidebar-item>Concept</u-sidebar-item>
                <u-sidebar-item>Configuration</u-sidebar-item>
                <u-sidebar-divider></u-sidebar-divider>
                <u-sidebar-item to="/cloud-ui">Component</u-sidebar-item>
                <u-sidebar-item to="/libraries">Component Library</u-sidebar-item>
            </u-sidebar>
        </u-grid-layout-column>
    </u-grid-layout-row>
</u-grid-layout>
```

## USidebar API
Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| router | boolean | | `true` | Whether to control which item is selected according to vue-router |
| value.sync, v-model | any | | | The currently selected value |
| collapsible | boolean | | `false` | Whether the group can be collapsed |
| accordion | boolean | | `false` | Whether to expand only one group at a time |
| expand-trigger | string | | `'click'` | Trigger method for expansion/collapse. Optional values: `'click'` means that the entire row can be triggered, `'click-expander'` means that it is triggered only when the small arrow is clicked |
| readonly | boolean | | `false` | Read-only |
| disabled | boolean | | `false` | Disabled |

### Slots

#### (default)

Insert a `<u-sidebar-item>`, `<u-sidebar-divider>`, or `<u-sidebar-group>` child component.

### Events

#### @click

Fired when this item is clicked. Unlike the native click event, it will only fire when it is not read-only and disabled.

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | MouseEvent | Mouse event object |
| senderVM | Vue | Send event instance |

#### @before-select

Triggered before an item is selected

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | any | The value of the selected item |
| $event.oldValue | any | Old value |
| $event.item | object | Select item related object |
| $event.itemVM | USidebarItem | Select item subcomponent |
| $event.preventDefault | Function | Prevent the selection process |
| senderVM | Vue | Send event instance |

#### @input

Triggered when an item is selected

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | any | Value of the selection |
| senderVM | Vue | Send event instance |

#### @select

Triggered when an item is selected

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | any | Changed value |
| $event.oldValue | any | Old value |
| $event.item | object | Select item related object |
| $event.oldItem | object | Old selection item related object |
| $event.itemVM | USidebarItem | Select item subcomponent |
| $event.oldVM | USidebarItem | Old selection item subcomponent |
| senderVM | USidebar | SendEventInstance |

#### @toggle

Triggered when a group is expanded/collapsed

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.expanded | boolean | Expanded/collapsed state |
| $event.groupVM | USidebarGroup | Grouping components |
| senderVM | Vue | Send event instance |

### Methods

#### toggleAll(expanded)

Expand/Collapse All Groups

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| expanded | boolean | | Expand/collapse |

## USidebarItem API
Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value | any | | | The value of this item |
| disabled | boolean | | `false` | Disable this item |
| item | object | | | Related object. When this option is selected, the thrown event will pass this object, which is convenient for development.
| href | string | | | Link address |
| target | string | | | Open method |
| to | string, Location | | | Requires vue-router, same as `to` property of `<router-link>`. Can be a string or an object describing the target location. |
| replace | boolean | | `false` | Requires vue-router, same as `replace` property of `<router-link>`. If `true`, when clicked, `router.replace()` will be called instead of `router.push()`, so no `history` record will be left after navigation. |
| exact | boolean | | `false` | Requires vue-router, same as `exact` property of `<router-link>`. Highlights only when it is exactly the same as the route. |

### Slots

#### (default)

Insert text or HTML.

### Events

#### @before-select

Triggered before selecting this item

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | any | The value of this item |
| $event.item | object | The object associated with this item |
| $event.itemVM | USidebarItem | This component |
| $event.preventDefault | Function | Prevent the selection process |
| senderVM | Vue | Send event instance |

#### @before-navigate

Triggered before switching routes using router related attributes

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.to | string, Location | The value of the `to` property |
| $event.replace | boolean | The value of the `replace` property |
| $event.exact | boolean | The value of the `exact` property |
| $event.preventDefault | Function | Prevent switching process |
| senderVM | Vue | Send event instance |

#### @navigate

Triggered when switching routes using router related attributes

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.to | string, Location | The value of the `to` property |
| $event.replace | boolean | The value of the `replace` property |
| $event.exact | boolean | The value of the `exact` property |
| senderVM | Vue | Send event instance |

## USidebarGroup API
Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| title | string | | | Displayed title |
| collapsible | boolean | | | `false` |
| expanded.sync | boolean | | `false` | Expanded/collapsed state |
| disabled | boolean | | `false` | Whether to disable. Cannot expand/collapse when disabled |

### Slots

#### (default)

Insert a `<u-sidebar-item>` or `<u-sidebar-divider>` child component.

#### Title

Customize the title text.

#### Extra

Additional content can be added on the right.

### Events

#### @before-toggle

Triggered before expanding/collapse this group

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.expanded | boolean | Expanded/collapsed state |
| $event.groupVM | USidebarGroup | Grouping components |
| $event.preventDefault | Function | Prevent the expand/collapse process |
| senderVM | Vue | Send event instance |

#### @toggle

Triggered when a group is expanded/collapsed

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.expanded | boolean | Expanded/collapsed state |
| $event.groupVM | USidebarGroup | Grouping components |
| senderVM | Vue | Send event instance |

## USidebarDivider API

None