<template functional>
    <div :class="$style.root">
        <u-text style="font-size:64px;">500</u-text>
        <br>
        <u-text size="large" color="error">Sorry, there was a service error. </u-text>
        <br><br>
        <u-button to="/overview" color="primary">Return to Homepage</u-button>
    </div>
</template>

<style module>
.root {
    margin-top: 200px;
    text-align: center;
}
</style>
