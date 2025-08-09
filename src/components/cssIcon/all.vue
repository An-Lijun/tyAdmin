<template>
  <div class="ty-cssIcon" :class="icon"></div>
</template>
<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
.ty-cssIcon {
  display: inline-block;
  height: 1em;
  width: 1em;
  font-size: 20px;
  box-sizing: border-box;
  text-indent: -9999px;
  vertical-align: middle;
  position: relative;
  &::before,
  &::after {
    content: "";
    box-sizing: inherit;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &.arrow-up::before {
    height: 0.65em;
    width: 0.65em;
    border-style: solid;
    border-width: 2px 0 0 2px;
    transform: translate(-50%, -25%) rotate(45deg);
  }
  &.arrow-right::before {
    height: 0.65em;
    width: 0.65em;
    border-style: solid;
    border-width: 2px 0 0 2px;
    transform: translate(-75%, -50%) rotate(135deg);
  }
  &.arrow-down::before {
    height: 0.65em;
    width: 0.65em;
    border-style: solid;
    border-width: 2px 0 0 2px;
    transform: translate(-50%, -75%) rotate(225deg);
  }
  &.arrow-left::before {
    height: 0.65em;
    width: 0.65em;
    border-style: solid;
    border-width: 2px 0 0 2px;
    transform: translate(-25%, -50%) rotate(-45deg);
  }

  &.upward::before {
    height: 0.65em;
    width: 0.65em;
    border-style: solid;
    border-width: 2px 0 0 2px;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &.upward::after {
    height: 0.8em;
    border-left: 2px solid;
    top: 55%;
  }

  &.forward::before {
    height: 0.65em;
    width: 0.65em;
    border-style: solid;
    border-width: 2px 0 0 2px;
    transform: translate(-50%, -50%) rotate(135deg);
  }
  &.forward::after {
    width: 0.8em;
    border-top: 2px solid;
    left: 45%;
  }

  &.downward::before {
    height: 0.65em;
    width: 0.65em;
    border-style: solid;
    border-width: 2px 0 0 2px;
    transform: translate(-50%, -50%) rotate(-135deg);
  }
  &.downward::after {
    height: 0.8em;
    border-left: 2px solid;
    top: 45%;
  }

  &.back::before {
    height: 0.65em;
    width: 0.65em;
    border-style: solid;
    border-width: 2px 0 0 2px;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &.back::after {
    width: 0.8em;
    border-top: 2px solid;
    left: 55%;
  }
  &.caret::before {
    border: 0.3em solid transparent;
    border-top-color: currentColor;
    transform: translate(-50%, -25%);
  }
  &.menu::before {
    box-shadow: 0 -0.35em, 0 0.35em;
    border-top: 2px solid;
    width: 100%;
  }
  &.apps::before {
    height: 0.15em;
    width: 0.15em;
    background: currentColor;
    box-shadow: -0.35em -0.35em, -0.35em 0, -0.35em 0.35em, 0 -0.35em, 0 0.35em,
      0.35em -0.35em, 0.35em 0, 0.35em 0.35em;
  }
  &.more-horiz::before {
    height: 0.2em;
    width: 0.2em;
    background: currentColor;
    border-radius: 50%;
    box-shadow: -0.4em 0, 0.4em 0;
  }

  &.more-vert::before {
    height: 0.2em;
    width: 0.2em;
    background: currentColor;
    border-radius: 50%;
    box-shadow: 0 -0.4em, 0 0.4em;
  }

  &.resize-horiz::before,
  &.resize-horiz::after {
    height: 0.4em;
    width: 0.4em;
    border-style: solid;
    border-width: 2px 0 0 2px;
  }
  &.resize-horiz::before {
    transform: translate(-90%, -50%) rotate(-45deg);
  }
  &.resize-horiz::after {
    transform: translate(-10%, -50%) rotate(135deg);
  }

  &.resize-vert::before,
  &.resize-vert::after {
    height: 0.4em;
    width: 0.4em;
    border-style: solid;
    border-width: 2px 0 0 2px;
  }
  &.resize-vert::before {
    transform: translate(-50%, -90%) rotate(45deg);
  }
  &.resize-vert::after {
    transform: translate(-50%, -10%) rotate(225deg);
  }

  &.plus::before {
    width: 90%;
    border-top: 2px solid;
  }
  &.plus::after {
    height: 90%;
    border-left: 2px solid;
  }
  &.minus::before {
    width: 90%;
    border-top: 2px solid;
  }

  &.close::before {
    width: 90%;
    border-top: 2px solid;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &.close::after {
    height: 90%;
    border-left: 2px solid;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &.check::before {
    border-style: solid;
    border-width: 0 0 2px 2px;
    height: 0.5em;
    width: 0.9em;
    transform: translate(-50%, -0.375em) rotate(-45deg);
  }

  &.stop::before {
    width: 0.9em;
    border-top: 2px solid;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &.stop::after {
    width: 0.9em;
    height: 0.9em;
    border: 2px solid;
    border-radius: 50%;
  }

  &.shutdown::before {
    height: 0.5em;
    border-left: 2px solid;
    top: 0.2em;
  }
  &.shutdown::after {
    width: 0.9em;
    height: 0.9em;
    border: 2px solid;
    border-top-color: transparent;
    border-radius: 50%;
  }

  &.refresh::before {
    width: 0.9em;
    height: 0.9em;
    border: 2px solid;
    border-right-color: transparent;
    border-radius: 50%;
  }
  &.refresh::after {
    border: 0.2em solid;
    border-left-color: transparent;
    border-top-color: transparent;
    left: 75%;
    top: 20%;
  }
  &.search::before {
    width: 0.75em;
    height: 0.75em;
    border: 2px solid;
    border-radius: 50%;
    left: 5%;
    top: 5%;
    transform: translate(0, 0) rotate(45deg);
  }
  &.search::after {
    width: 0.4em;
    border-top: 2px solid;
    left: 80%;
    top: 80%;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &.flag::before {
    height: 0.9em;
    border-left: 2px solid;
    left: 10%;
  }
  &.flag::after {
    width: 0.85em;
    height: 0.675em;
    border: 2px solid;
    border-bottom-right-radius: 0.1em;
    border-left: 0;
    border-top-right-radius: 0.1em;
    left: 52%;
    top: 35%;
  }

  &.bookmark::before {
    width: 0.85em;
    height: 0.9em;
    border: 2px solid;
    border-bottom: 0;
    border-radius: 0.1rem 0.1em 0 0;
  }
  &.bookmark::after {
    width: 0.5em;
    height: 0.5em;
    border-style: solid;
    border-width: 2px 2px 0 0;
    border-radius: 2px;
    transform: translate(-50%, 0.2em) rotate(-45deg) skew(15deg, 15deg);
  }

  &.edit::before {
    border: 2px solid;
    width: 0.85em;
    height: 0.4em;
    transform: translate(-0.35em, -0.25em) rotate(-45deg);
  }
  &.edit::after {
    border: 0.15em solid;
    border-right-color: transparent;
    border-top-color: transparent;
    left: 5%;
    top: 95%;
    transform: translate(0, -100%);
  }

  &.delete::before {
    width: 0.75em;
    height: 0.6em;
    border: 2px solid;
    border-top: 0;
    border-radius: 0 0 2px 2px;
    top: 70%;
  }
  &.delete::after {
    width: 0.5em;
    border-top: 2px solid;
    box-shadow: -0.2em 0.2em, 0.2em 0.2em;
    top: 1px;
  }
  &.download {
    border: solid transparent;
    border-width: 0 1px;
    box-shadow: inset 0 -2px;
  }
  &.download::before {
    width: 0.5em;
    height: 0.5em;
    border-style: solid;
    border-width: 2px 0 0 2px;
    transform: translate(-50%, -0.3em) rotate(-135deg);
  }
  &.download::after {
    height: 0.6em;
    border-left: 2px solid;
    top: 40%;
  }

  &.upload {
    border: solid transparent;
    border-width: 0 1px;
    box-shadow: inset 0 -2px;
  }
  &.upload::before {
    width: 0.5em;
    height: 0.5em;
    border-style: solid;
    border-width: 2px 0 0 2px;
    transform: translate(-50%, -60%) rotate(45deg);
  }
  &.upload::after {
    height: 0.6em;
    border-left: 2px solid;
  }

  &.copy::before {
    width: 0.7em;
    height: 0.8em;
    border: 2px solid;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-radius: 0.1em;
    left: 40%;
    top: 40%;
  }
  &.copy::after {
    width: 0.7em;
    height: 0.8em;
    border: 2px solid;
    border-radius: 0.1em;
    left: 60%;
    top: 60%;
  }

  &.info::before {
    width: 0.9em;
    height: 0.9em;
    border: 2px solid;
    border-radius: 50%;
  }
  &.info::after {
    width: 2px;
    height: 0.5em;
    border-top: 0.3em solid;
    border-bottom: 0.1em solid;
  }

  &.audio {
    border: solid transparent;
    border-width: 0.2em 0.3em;
    border-radius: 45%;
    box-shadow: inset 0 2px, inset 2px 0, inset -2px 0, inset 0 -2px;
    transform: translateY(-0.2em);
  }
  &.audio::before {
    height: 0.15em;
    border-left: 2px solid;
    transform: translate(-50%, 0.5em);
  }
  &.audio::after {
    width: 0.7em;
    height: 0.7em;
    border: 2px solid;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-radius: 50%;
    transform: translate(-50%, -25%) rotate(-135deg);
  }
  &.mail::before {
    width: 0.9em;
    height: 0.75em;
    border: 2px solid;
    border-radius: 2px;
  }
  &.mail::after {
    width: 0.4em;
    height: 0.4em;
    border-style: solid;
    border-width: 0 0 2px 2px;
    transform: translate(-50%, -0.35em) rotate(-45deg) skew(10deg, 10deg);
  }
  &.person::before {
    width: 0.45em;
    height: 0.45em;
    border: 2px solid;
    border-radius: 50%;
    top: 25%;
  }
  &.person::after {
    width: 0.9em;
    height: 0.4em;
    border: 2px solid;
    border-radius: 50% 50% 0 0;
    top: 75%;
  }

  &.message {
    border: solid transparent;
    border-width: 0.05em 0.05em 0.3em;
    border-radius: 3px;
    box-shadow: inset 0 2px, inset -2px 0, inset 2px 0;
  }
  &.message::before {
    width: 0.85em;
    height: 2px;
    border-left: calc(2px + 0.1em) solid;
    border-right: calc(0.5em - 2px) solid;
    top: 100%;
  }
  &.message::after {
    width: 0.3em;
    height: 0.3em;
    border-style: solid;
    border-width: 0 0 2px 2px;
    left: calc(2px + 0.1em);
    top: calc(100% - 0.1242em);
    transform: skewY(-45deg);
  }
  &.photo {
    border: solid transparent;
    border-width: 0.1em 0.05em;
    box-shadow: inset 0 2px, inset 2px 0, inset -2px 0, inset 0 -2px;
    border-radius: 0.2em;
  }
  &.photo::before {
    width: 0.3em;
    height: 0.3em;
    border: 2px solid;
    border-radius: 50%;
    left: 35%;
    top: 35%;
  }
  &.photo::after {
    width: 0.5em;
    height: 0.5em;
    border-style: solid;
    border-width: 2px 2px 0 0;
    left: 60%;
    transform: translate(-45%, 20%) rotate(-45deg);
  }

  &.time {
    border: 0.05em solid transparent;
    box-shadow: inset 0 2px, inset 2px 0, inset -2px 0, inset 0 -2px;
    border-radius: 50%;
  }
  &.time::before {
    height: 0.4em;
    border-left: 2px solid;
    transform: translate(-50%, -75%);
  }
  &.time::after {
    height: 0.25em;
    border-left: 2px solid;
    transform: translate(-50%, -75%) rotate(125deg);
    transform-origin: 50% 100%;
  }

  &.location::before {
    width: 0.8em;
    height: 0.8em;
    border: 2px solid;
    border-radius: 50% 50% 50% 0;
    transform: translate(-50%, -60%) rotate(-45deg);
  }
  &.location::after {
    width: 0.3em;
    height: 0.3em;
    border: 2px solid;
    border-radius: 50%;
    transform: translate(-50%, -0.25em);
  }

  &.link::before,
  &.link::after {
    width: 0.75em;
    height: 0.5em;
    border: 2px solid;
    border-right: 0;
    border-radius: 5em 0 0 5em;
  }
  &.link::before {
    transform: translate(-70%, -45%) rotate(-45deg);
  }
  &.link::after {
    transform: translate(-30%, -55%) rotate(135deg);
  }

  &.emoji {
    border: 0.05em solid transparent;
    box-shadow: inset 0 2px, inset 2px 0, inset -2px 0, inset 0 -2px;
    border-radius: 50%;
  }
  &.emoji::before {
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 50%;
    box-shadow: -0.17em -0.1em, 0.17em -0.1em;
  }
  &.emoji::after {
    width: 0.5em;
    height: 0.5em;
    border: 2px solid;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-radius: 50%;
    transform: translate(-50%, -0.2em) rotate(-135deg);
  }

  &.eye::before {
    width: 0.9em;
    height: 0.9em;
    border: 2px solid;
    border-radius: 70% 15%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &.eye::after {
    width: 0.5em;
    height: 0.5em;
    border: 2px solid;
    border-radius: 50%;
  }

  &.share {
    border: solid transparent;
    border-width: 2px 2px 0 0;
    box-shadow: inset 0 -2px, inset 2px 0;
  }
  &.share::before {
    width: 0.4em;
    height: 0.4em;
    border-style: solid;
    border-width: 0 2px 2px 0;
    left: 100%;
    top: 0.2em;
    transform: translate(-125%, -50%) rotate(-45deg);
  }
  &.share::after {
    width: 0.6em;
    height: 0.6em;
    border-style: solid;
    border-width: 2px 0 0 2px;
    border-radius: 75% 15%;
  }
}
</style>
  