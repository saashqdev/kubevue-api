<template>
    <u-article :class="$style.root">
        <h1>Former Chibi Fu</h1>
        <p>Su Shi 1082 AD</p>
        <p>In the autumn of Renxu, in the seventh month, Su Zi and his guests went boating under Red Cliff. The breeze comes slowly and the water waves are calm. Lifting wine to the guests, reciting poems about the bright moon, and singing graceful chapters. After a while, the moon rose above the east mountain, wandering among the bullfights. White dew flows across the river, and the water reaches the sky. Even though a reed is like this, thousands of hectares are at a loss. The vastness is like Feng Xu riding the wind without knowing where it stops; the flutteringness is like being left alone in the world, becoming immortal and ascending to immortality. </p>
        <p>Then he drank and enjoyed himself very much, and he buckled the boat and sang. The song goes: "The osmanthus sticks are covered with orchid oars, hitting the sky is bright and tracing the stream of light. It is dim and vague, and I look forward to the beauty in the sky." There is a guest who plays the cave flute, and he sings along with it. His voice was whining, like resentment, admiration, weeping, complaining, and the lingering sound was lingering like a wisp. The lurking dragon dances in the secluded ravine, and the concubine weeps in the lonely boat. </p>
        <p>Su Zi was stunned, sitting upright, and asked the guest: "Why is this so?" The guest said: "'The moon and stars are sparse, and the black magpie flies south.' Is this not a poem by Cao Mengde? Looking west to Xiakou, Looking east to Wuchang, the mountains and rivers are looming, and the sky is green. Isn't this what Meng De was trapped in Zhou Lang? , Hengshu wrote poems, and he was a hero for a lifetime. How are they now? Kuangwu and his son fished and wooded on the river, accompanied by fish and shrimps, and friends with elk. They rode a small boat and sent mayflies to each other. In the sky and the earth, I mourn for a moment, and I envy the infiniteness of the Yangtze River. I carry the flying immortals to swim, and I don’t know how sudden it is, and I leave it in the sad wind."</p>
        <p>Su Zi said: "Do you know that water is like the moon? Those who have passed away are like this, but they have not yet gone; those who are full and empty are like that, but there is no growth and decline of soldiers. If you look at the changes in Gaijiang, then the world will be like this. It cannot be seen in a moment; from the perspective of its unchanging nature, things and I are endless, and how can I envy it! In the world, everything has its own owner, and even if it is not my property, I can't take any of it. But the cool breeze on the river and the bright moon in the mountains can be heard by the ears and become sounds, and the eyes can encounter them and form colors. They can be taken without restraint and used inexhaustibly. They are the endless treasures of the Creator, and I and my son are in harmony with each other. ”</p>
        <p>The guests are happy and smile, wash their cups and drink more. The core of the food is gone, and the cups and plates are in a mess. The couple and their pillows were spread out in the boat, unaware of the whiteness of the east. </p>
    </u-article>
</template>
<script>
import noticeService from '../service';
export default {
    data() {
        return {
            detail: {},
        };
    },
    created() {
        this.loadDetail();
    },
    methods: {
        loadDetail() {
            noticeService.loadDetail({
                query: {
                    channelname: this.$route.query.id,
                },
            }).then((res) => {
                this.detail = res.result;
            });
        },
    },
};
</script>
<style module>
.root {
    margin: 20px;
}
</style>
