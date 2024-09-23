### Basic Usage

#### Routing Mode

``` html
<u-sidebar style="width: 200px;">
    <u-sidebar-item>Guide</u-sidebar-item>
    <u-sidebar-item>Concept</u-sidebar-item>
    <u-sidebar-item to="/cloud-ui">Components</u-sidebar-item>
</u-sidebar>
```

#### value mode

``` html
<u-sidebar value="3" :router="false" style="width: 200px;">
    <u-sidebar-item value="1">Guide</u-sidebar-item>
    <u-sidebar-item value="2">Concept</u-sidebar-item>
    <u-sidebar-item value="3">Components</u-sidebar-item>
</u-sidebar>
```

### Read-only, Disable, Disable an Item

``` html
<u-grid-layout>
    <u-grid-layout-column :span="4">
        <u-sidebar disabled>
            <u-sidebar-item>Guide</u-sidebar-item>
            <u-sidebar-item>Concept</u-sidebar-item>
            <u-sidebar-item to="/cloud-ui">Components</u-sidebar-item>
        </u-sidebar>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <u-sidebar>
            <u-sidebar-item>Guide</u-sidebar-item>
            <u-sidebar-item disabled>Concept</u-sidebar-item>
            <u-sidebar-item to="/cloud-ui">Components</u-sidebar-item>
        </u-sidebar>
    </u-grid-layout-column>
</u-grid-layout>
```

### Separator

``` html
<u-sidebar style="width: 200px;">
    <u-sidebar-item>Guide</u-sidebar-item>
    <u-sidebar-item>Concept</u-sidebar-item>
    <u-sidebar-item>Configuration</u-sidebar-item>
    <u-sidebar-divider></u-sidebar-divider>
    <u-sidebar-item to="/cloud-ui">Components</u-sidebar-item>
    <u-sidebar-item to="/libraries">Components Library</u-sidebar-item>
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
                    <u-sidebar-item>Link</u-sidebar-item>
                    <u-sidebar-item>Button</u-sidebar-item>
                    <u-sidebar-item>Label</u-sidebar-item>
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
            <p>Turn On the Folding Function</p>
            <u-sidebar collapsible>
                <u-sidebar-group title="Basic">
                    <u-sidebar-item>Link</u-sidebar-item>
                    <u-sidebar-item>Button</u-sidebar-item>
                    <u-sidebar-item>Label</u-sidebar-item>
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
                    <u-sidebar-item>Link</u-sidebar-item>
                    <u-sidebar-item>Button</u-sidebar-item>
                    <u-sidebar-item>Label</u-sidebar-item>
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
                    <u-sidebar-item>Link</u-sidebar-item>
                    <u-sidebar-item>Button</u-sidebar-item>
                    <u-sidebar-item>Label</u-sidebar-item>
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
                    <u-sidebar-item>Link</u-sidebar-item>
                    <u-sidebar-item>Button</u-sidebar-item>
                    <u-sidebar-item>Label</u-sidebar-item>
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
                <u-sidebar-item>Guide</u-sidebar-item>
                <u-sidebar-item>Concept</u-sidebar-item>
                <u-sidebar-item>Configuration</u-sidebar-item>
                <u-sidebar-divider></u-sidebar-divider>
                <u-sidebar-item to="/cloud-ui">Components</u-sidebar-item>
                <u-sidebar-item to="/libraries">Components Library</u-sidebar-item>
            </u-sidebar>
        </u-grid-layout-column>
        <u-grid-layout-column :span="4">
            <u-sidebar style="width: 200px;" color="inverse">
                <u-sidebar-item>Guide</u-sidebar-item>
                <u-sidebar-item>Concept</u-sidebar-item>
                <u-sidebar-item>Configuration</u-sidebar-item>
                <u-sidebar-divider></u-sidebar-divider>
                <u-sidebar-item to="/cloud-ui">Components</u-sidebar-item>
                <u-sidebar-item to="/libraries">Components Library</u-sidebar-item>
            </u-sidebar>
        </u-grid-layout-column>
    </u-grid-layout-row>
</u-grid-layout>
```=\ 
']