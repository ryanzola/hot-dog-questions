<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'

export default {
  mounted() {
    window.vuex = this.$store;
    window.addEventListener('popstate', e => {
      let data = {};
      let parent = this.$store.getters.getCurrentState.parent
      let current = this.$store.getters.getCurrentState.child;

      if(parent === 'done') {
        e.preventDefault();
        this.$router.replace('/');
      }

      data[current] = null;
      this.$store.commit('setCurrentState', {event: 'POP', data});
    }, false);

    const TILESIZE = 16;

    let playerSheet = {};
    let player;

    let players = [];

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    const app = new PIXI.Application({
        width: 256,
        height: 256,
        transparent: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true
    });
    // console.clear();

    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);

    document.body.appendChild(app.view);

    let motion = 1;

    function gameLoop(delta) {
    
      players.forEach(p => {
        p.x += (Math.random() + 0.5 * 2) * p.direction;
  
        if(p.x < -20) {
          p.scale.x = 2
          p.direction = 1;
        }
        
        if(p.x > window.innerWidth + 20) {
            p.direction = -1;
            p.scale.x = -2;
        }
      })
    }

    app.loader.add('jumino', '/93155.png');
    app.loader.load(doneLoading)

    function doneLoading(e) {
      createPlayerSheet();
      createPlayers();
      app.ticker.add(gameLoop)
    }

    function createPlayerSheet() {
      let ssheet = new PIXI.BaseTexture.from(app.loader.resources['jumino'].url);

      playerSheet['standSouth'] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * TILESIZE, 0, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * TILESIZE, 0, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * TILESIZE, 0, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * TILESIZE, 0, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * TILESIZE, 0, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(5 * TILESIZE, 0, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(6 * TILESIZE, 0, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(7 * TILESIZE, 0, TILESIZE, TILESIZE)),
      ]

      playerSheet['standEast'] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE, TILESIZE * 2, TILESIZE, TILESIZE))
      ]

      playerSheet['walkEast'] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 0, TILESIZE * 2, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 1, TILESIZE * 2, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 2, TILESIZE * 2, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 3, TILESIZE * 2, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 4, TILESIZE * 2, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 5, TILESIZE * 2, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 6, TILESIZE * 2, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 7, TILESIZE * 2, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 0, TILESIZE * 3, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 1, TILESIZE * 3, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 2, TILESIZE * 3, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 3, TILESIZE * 3, TILESIZE, TILESIZE)),
      ]

      playerSheet['wave'] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 4, TILESIZE * 3, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 5, TILESIZE * 3, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 6, TILESIZE * 3, TILESIZE, TILESIZE)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(TILESIZE * 7, TILESIZE * 3, TILESIZE, TILESIZE)),
      ]


    }

    function createPlayers() {
      for(let i = 0; i < 5; i++) {
        player = new PIXI.AnimatedSprite(playerSheet.walkEast);
        player.anchor.set(0.5);
        player.animationSpeed = i % 3 ? 0.2 : 0.3;
        // player.loop = false;
        player.scale.set(i % 3 ? 2 : -2, 2);
        player.x = Math.random() * 4 * window.innerWidth;
        player.y = (window.innerHeight) - 16;
        player.direction = i % 3 ? 1 : -1;
        players.push(player);
      }

      players.forEach(p => {
        app.stage.addChild(p);
        p.play();
      })

        player = new PIXI.AnimatedSprite(playerSheet.standSouth);
        player.anchor.set(0.5);
        player.animationSpeed = 0.2;
        // player.loop = false;
        player.scale.set(2, 2);
        player.x = window.innerWidth / 4;
        player.y = (window.innerHeight) - 16;
        app.stage.addChild(player);
        player.play();

        player = new PIXI.AnimatedSprite(playerSheet.wave);
        player.anchor.set(0.5);
        player.animationSpeed = 0.1;
        // player.loop = false;
        player.scale.set(2, 2);
        player.x = window.innerWidth / 1.2;
        player.y = 92;
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
}


</style>
