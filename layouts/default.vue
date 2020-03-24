<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'

export default {
  mounted() {
    window.addEventListener('popstate', e => {
      let data = {};
      let current = this.$store.getters.getCurrentState.child;

      data[current] = null;
      this.$store.commit('setCurrentState', {event: 'POP', data});
    }, false);

    const TILESIZE = 8;

    let playerSheet = {};
    let player;

    const app = new PIXI.Application({
        width: 256,
        height: 256,
        transparent: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true
    });
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);

    document.body.appendChild(app.view);

    let motion = 1;

    function gameLoop(delta) {
      player.x += motion;

      if(player.x <= 20) {
        motion = 1;
        player.scale.x = 2
      }

      if(player.x > window.innerWidth - 20) {
          motion = -1;
          player.scale.x = -2
      }
    }

    app.loader.add('jumino', './93155.png');
    app.loader.load(doneLoading)

    function doneLoading(e) {
      createPlayerSheet();
      createPlayer();
      app.ticker.add(gameLoop)
    }

    function createPlayerSheet() {
      let ssheet = new PIXI.BaseTexture.from(app.loader.resources['jumino'].url);
      let w = 16;
      let h = 15.9;

      playerSheet['standSouth'] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0, w, h))
      ]

      playerSheet['standEast'] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(w, h * 2, w, h))
      ]

      playerSheet['walkEast'] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(w * 0, h * 2, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(w * 1, h * 2, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(w * 2, h * 2, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(w * 3, h * 2, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(w * 4, h * 2, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(w * 5, h * 2, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(w * 6, h * 2, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(w * 7, h * 2, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(w * 0, h * 3, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(w * 1, h * 3, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(w * 2, h * 3, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(w * 3, h * 3, w, h)),
      ]


    }

    function createPlayer() {
      player = new PIXI.AnimatedSprite(playerSheet.walkEast);
      player.anchor.set(0.5);
      player.animationSpeed = 0.2;
      // player.loop = false;
      player.scale.set(2, 2);
      player.x = 50;
      player.y = (window.innerHeight) - 16;
      app.stage.addChild(player);

      player.play();
    }



  }, // mounted
  beforeDestroy() {
    window.removeEventListener('popstate', e => {
      let data = {};
      let current = this.$store.getters.getCurrentState.child;

      data[current] = null;
      this.$store.commit('setCurrentState', {event: 'POP', data});
    });
  },
  methods: {
    onPopState: e => {
      this.$store.commit('setCurrentState', 'POP', null);
    }
  }
}
</script>

<style>
html
{
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*, *:before, *:after
{
  box-sizing: border-box;
  margin: 0;
}

body {
  background-color: config('colors.blue-lightest');
}

canvas {
  position: fixed;
  top: 0;
  z-index: -1;
  border: 1px solid red;
}


</style>
