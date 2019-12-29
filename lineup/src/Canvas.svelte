<style>
  canvas {
    border: 1px solid black;
    width: 100%;
  }
</style>

<script>
  import { onMount, afterUpdate } from 'svelte';
  import { Stage, Shape, Text, Container } from "@createjs/easeljs";

  export let events;

  let canvas;
  let stage;

  const SETTINGS = {
    titleSizeSmall: 33,
    titleSizeBig: 35,
    titleSubtitleGap: 15,
    eventGap: 30,
    titleTimeGap: 35,
    eventsHorizontalPosition: 520,
    border: 60,
    textColor: '#174EB4',
    backgroundColor: 'white'
  };

  // https://github.com/wonderbit/sketch-distribute-layers/blob/master/Distribute.sketchplugin/Contents/Sketch/script.cocoascript
  function distributeContainersVertically(containers) {
    const objects = [...containers];

    objects.sort((a, b) => {
      const aBounds = a.getBounds();
      const bBounds = a.getBounds();

      return aBounds.y - bBounds.y;
    });

    const totalHeight = objects[objects.length - 1].y + objects[objects.length - 1].getBounds().height - objects[0].y;

    const heights = objects.reduce((mem, object) => {
      return mem + object.getBounds().height;
    }, 0);

    const remainingHeight = totalHeight - heights;
    const space = remainingHeight / (objects.length - 1);

    let y = 0;
    let left = objects[0].y;

    for(let i=0; i < objects.length; i++) {
      objects[i].y = y + left;
      left = objects[i].y + objects[i].getBounds().height + space;
      objects[i].y = Math.floor(objects[i].y);
    }
  };

  function drawEvent({ x, y, title, subtitle, time }) {
    const titleSize = title.length > 25 ? SETTINGS.titleSizeSmall : SETTINGS.titleSizeBig;

    const container = new Container();
    const titleText = new Text(title, `bold ${titleSize}px Avenir LT Std`, SETTINGS.textColor);
    const subtitleText = new Text(subtitle, '35px Avenir LT Std', SETTINGS.textColor);
    const timeText = new Text(time, 'normal 30px Avenir LT Std', SETTINGS.textColor);

    container.x = x;
    container.y = y;

    titleText.x = 0;
    titleText.y = 0;
    titleText.lineHeight = 44;
    titleText.lineWidth = 635;

    timeText.x = - timeText.getBounds().width - SETTINGS.titleTimeGap;
    timeText.y = 2;

    const titleBounds = titleText.getBounds();
    const titleSubtitleGap = titleBounds ? titleBounds.height + SETTINGS.titleSubtitleGap : 0;

    subtitleText.x = titleText.x;
    subtitleText.y = titleText.y + titleSubtitleGap;

    container.addChild(titleText);
    container.addChild(subtitleText);
    container.addChild(timeText);
    stage.addChild(container);

    return container
  }

  function draw() {
    const background = new Shape();
      background.graphics.beginFill(SETTINGS.backgroundColor);
      background.graphics.drawRect(0, 0, 1280, 720);
      background.graphics.endFill();

    stage.addChild(background);

    const eventContainers = events.map(({ title, subtitle, time }) => {
      return drawEvent({
        x: SETTINGS.eventsHorizontalPosition,
        y: SETTINGS.border,
        title,
        subtitle,
        time
      });
    });

    eventContainers[eventContainers.length - 1].y = 720 - eventContainers[eventContainers.length - 1].getBounds().height - SETTINGS.border;

    distributeContainersVertically(eventContainers);
    stage.update();
  }

  onMount(() => {
    stage = new Stage(canvas);
    stage.update();
  });

  afterUpdate(() => {
    draw();
  });
</script>

<canvas bind:this={canvas} width={1280} height={720}></canvas>
