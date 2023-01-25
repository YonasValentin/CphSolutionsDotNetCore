<script setup lang="ts">
import { computed, defineProps } from '@vue/runtime-core';

const props = defineProps<{
  title: string;
  name: string;
  email: string;
  phoneNumber: string;
}>();

const cleanPhoneNumber = computed(() => props.phoneNumber.replace(/\s/g, ''));

const personsInfo = [
  {
    name: 'sine porsborg børsen',
    imgSrc:
      'https://cdn.novicell.com/media/media/p3phmjg2/sine-porsborg-boersen-novicell-dk-spb.jpg?rxy=0.5,0.5&format=webp',
    email: '',
  },
  {
    name: 'kim steen vangskjær',
  },
  {
    name: 'niels odgaard',
  },
];

const slackInfo = [
  {
    name: 'sine porsborg børsen',
    slackLink: 'https://novicell.slack.com/archives/D04HJ6J9K2R',
  },
  {
    name: 'niels odgaard',
    slackLink: 'https://novicell.slack.com/archives/D0455E9HP7Z',
  },
];
</script>

<template>
  <q-card flat class="flex items-center q-mt-md">
    <q-avatar
      class="q-mr-sm"
      size="xl"
      style="border-radius: 50%"
      color="grey-2"
    >
      <!-- <template v-for="personInfo in personsInfo" :key="personInfo.name">
        <q-img
          v-if="name.toLowerCase().includes(personInfo.name)"
          :src="personInfo.imgSrc"
        ></q-img>
        <q-icon size="sm" v-else name="person"></q-icon>
      </template> -->
      <q-img
        v-if="name.toLowerCase().includes(`sine porsborg børsen`)"
        src="https://cdn.novicell.com/media/media/p3phmjg2/sine-porsborg-boersen-novicell-dk-spb.jpg?rxy=0.5,0.5&format=webp"
      ></q-img>
      <q-img
        v-if="name.toLowerCase().includes(`simon k.`)"
        src="https://cdn.novicell.com/media/media/mythvvu4/simon-kjaergaard-kristiansen-novicell-dk-skk.jpg?rxy=0.5,0.5&format=webp"
      ></q-img>
      <q-img
        v-if="name.toLowerCase().includes(`kim steen vangskjær`)"
        src="https://cdn.novicell.com/media/media/euud2nbx/kim-steen-vangskjaer-novicell-dk-ksv.jpg?rxy=0.5,0.5&format=webp"
      ></q-img>
      <q-img
        v-if="name.toLowerCase().includes(`søren gregersen`)"
        src="https://cdn.novicell.com/media/media/hzmf2rls/soeren-kirketerp-gregersen-novicell-dk-skg.jpg?rxy=0.5,0.5&format=webp"
      ></q-img>
      <q-img
        v-if="name.toLowerCase().includes(`jesper hauge`)"
        src="https://cdn.novicell.com/media/media/404l1ld0/jesper-hauge-jhu.png?rxy=0.5,0.5&format=webp"
      ></q-img>
      <q-img
        v-if="name.toLowerCase().includes(`jan birgit hjørdie`)"
        src="https://cdn.novicell.com/media/media/o0zbgxto/jan-hjoerdie-novicell-dk-jhj.jpg?rxy=0.5,0.5&format=webp"
      ></q-img>
      <q-img
        v-if="name.toLowerCase().includes(`asger nordstrøm`)"
        src="https://cdn.novicell.com/media/media/iwongunt/asger-nordstroem-novicell-dk-ano.jpg?rxy=0.5,0.5&format=webp"
      ></q-img>
      <q-img
        v-if="name.toLowerCase().includes(`morten hartvig`)"
        src="https://cdn.novicell.com/media/media/145fzwjx/moh.jpg?rxy=0.5,0.5&format=webp"
      ></q-img>
      <q-img
        v-if="name.toLowerCase().includes(`mads krohn`)"
        src="https://cdn.novicell.com/media/media/hnpnm0wg/mads-levring-krohn-novicell-dk-mkd.jpg?rxy=0.5,0.5&format=webp"
      ></q-img>
      <q-img
        v-if="name.toLowerCase().includes(`christine danesø`)"
        src="https://cdn.novicell.com/media/media/ogvb45mj/cda-christine-dansesoe.png?rxy=0.5,0.5&format=webp"
      ></q-img>
      <q-img
        v-if="name.toLowerCase().includes(`niels odgaard`)"
        src="https://cdn.novicell.com/media/media/gwypy4de/niels-odgaard-novicell-dk-nod.jpg?rxy=0.5,0.5&format=webp"
      ></q-img>
      <q-icon size="sm" v-else name="person"></q-icon>
    </q-avatar>

    <div class="flex">
      <div class="flex column">
        <div class="flex items-center">
          <div class="q-mr-sm text-weight-medium">
            {{ name }}
          </div>
          <div
            class="text-weight-medium text-grey-6"
            v-if="title.toLowerCase().includes(`tech contact`)"
          >
            {{ title[0] + title[5] }}
          </div>
          <div
            class="text-weight-medium text-grey-6"
            v-if="title.toLowerCase().includes(`project manager`)"
          >
            {{ title[0] + title[8] }}
          </div>

          <div
            class="text-weight-medium text-grey-6"
            v-if="title.toLowerCase().includes(`customer contact`)"
          >
            {{ title[0] + title[9] }}
          </div>
        </div>

        <!-- <template v-for="personInfo in personsInfo" :key="personInfo.name"
          ><q-btn
            v-if="name.toLowerCase().includes(personInfo.name)"
            icon="fa-brands fa-slack"
            href="https://novicell.slack.com/archives/D0455E9HP7Z"
            target="_blank"
          ></q-btn>
        </template> -->

        <a
          v-if="name.toLowerCase().includes(`sine porsborg børsen`)"
          target="_blank"
          href="https://novicell.slack.com/archives/D04HJ6J9K2R"
          class="text-black flex items-center"
          style="text-decoration: none"
        >
          <q-icon class="q-mr-xs" name="fa-brands fa-slack"></q-icon>
          Contact via Slack
        </a>

        <a
          v-if="name.toLowerCase().includes(`kim steen vangskjær`)"
          target="_blank"
          href="https://novicell.slack.com/archives/D04AUP472KA"
          class="text-black flex items-center"
          style="text-decoration: none"
        >
          <q-icon class="q-mr-xs" name="fa-brands fa-slack"></q-icon>
          Contact via Slack
        </a>

        <a
          v-if="name.toLowerCase().includes(`søren gregersen`)"
          target="_blank"
          href="https://novicell.slack.com/archives/D047KSKAMPB"
          class="text-black flex items-center"
          style="text-decoration: none"
        >
          <q-icon class="q-mr-xs" name="fa-brands fa-slack"></q-icon>
          Contact via Slack
        </a>

        <a
          v-if="name.toLowerCase().includes(`jesper hauge`)"
          target="_blank"
          href="https://novicell.slack.com/archives/D03TF02319N"
          class="text-black flex items-center"
          style="text-decoration: none"
        >
          <q-icon class="q-mr-xs" name="fa-brands fa-slack"></q-icon>
          Contact via Slack
        </a>

        <a
          v-if="name.toLowerCase().includes(`jan birgit hjørdie`)"
          target="_blank"
          href="https://novicell.slack.com/archives/D04AHM2D125"
          class="text-black flex items-center"
          style="text-decoration: none"
        >
          <q-icon class="q-mr-xs" name="fa-brands fa-slack"></q-icon>
          Contact via Slack
        </a>

        <a
          v-if="name.toLowerCase().includes(`asger nordstrøm`)"
          target="_blank"
          href="https://novicell.slack.com/archives/D03RVDET9RT"
          class="text-black flex items-center"
          style="text-decoration: none"
        >
          <q-icon class="q-mr-xs" name="fa-brands fa-slack"></q-icon>
          Contact via Slack
        </a>

        <a
          v-if="name.toLowerCase().includes(`morten hartvig`)"
          target="_blank"
          href="https://novicell.slack.com/archives/D04HJGD0BT7"
          class="text-black flex items-center"
          style="text-decoration: none"
        >
          <q-icon class="q-mr-xs" name="fa-brands fa-slack"></q-icon>
          Contact via Slack
        </a>

        <a
          v-if="name.toLowerCase().includes(`mads krohn`)"
          target="_blank"
          href="https://novicell.slack.com/archives/D04424STF6F"
          class="text-black flex items-center"
          style="text-decoration: none"
        >
          <q-icon class="q-mr-xs" name="fa-brands fa-slack"></q-icon>
          Contact via Slack
        </a>

        <a
          v-if="name.toLowerCase().includes(`christine danesø`)"
          target="_blank"
          href="https://novicell.slack.com/archives/D04H70918F9"
          class="text-black flex items-center"
          style="text-decoration: none"
        >
          <q-icon class="q-mr-xs" name="fa-brands fa-slack"></q-icon>
          Contact via Slack
        </a>

        <a
          v-if="name.toLowerCase().includes(`niels odgaard`)"
          target="_blank"
          href="https://novicell.slack.com/archives/D0455E9HP7Z"
          class="text-black flex items-center"
          style="text-decoration: none"
        >
          <q-icon class="q-mr-xs" name="fa-brands fa-slack"></q-icon>
          Contact via Slack
        </a>

        <a
          v-if="name.toLowerCase().includes(`simon k.`)"
          target="_blank"
          href="https://novicell.slack.com/archives/D03SNLE483F"
          class="text-black flex items-center"
          style="text-decoration: none"
        >
          <q-icon class="q-mr-xs" name="fa-brands fa-slack"></q-icon>
          Contact via Slack
        </a>

        <a
          v-if="title.toLowerCase().includes(`customer contact`)"
          target="_blank"
          :href="`tel:${cleanPhoneNumber}`"
          class="text-black flex items-center"
          style="text-decoration: none"
        >
          <q-icon class="q-mr-xs" name="phone"></q-icon>
          Contact via Phone
        </a>

        <a
          v-if="title.toLowerCase().includes(`customer contact`)"
          target="_blank"
          class="text-black flex items-center"
          style="text-decoration: none"
          :href="`mailto:${email}`"
        >
          <q-icon class="q-mr-xs" name="mail"></q-icon>
          Contact via Mail
        </a>
      </div>
    </div>
  </q-card>
</template>

<style scoped lang="scss"></style>
