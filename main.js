const $canvas = document.querySelector('.js-canvas');
const context = $canvas.getContext('2d');
const stage = new createjs.Stage('stage');

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

const state = {
  events: [
    {
      title: 'Creating a New Framework for Algorithmic Art',
      subtitle: 'James Porter',
      time: '19:15'
    },
    {
      title: 'Live Video Performances:\nWhere to Begin',
      subtitle: 'Masha Rozhnova',
      time: '19:45'
    },
    {
      title: 'Scroll up! Scroll up! Adventures in accessible storytelling',
      subtitle: 'Becky Rush',
      time: '20:15'
    },
    {
      title: 'Pub!',
      subtitle: '@ The Phoenix - W1G 0PP',
      time: '20:45'
    },
  ]
};

$canvas.width = 1280 * 3;
$canvas.height = 720 * 3;

stage.scaleX = 3;
stage.scaleY = 3;

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

  const container = new createjs.Container();
  const titleText = new createjs.Text(title, `bold ${titleSize}px Avenir LT Std`, SETTINGS.textColor);
  const subtitleText = new createjs.Text(subtitle, '35px Avenir LT Std', SETTINGS.textColor);
  const timeText = new createjs.Text(time, 'normal 30px Avenir LT Std', SETTINGS.textColor);

  container.x = x;
  container.y = y;

  titleText.x = 0;
  titleText.y = 0;
  titleText.lineHeight = 44;
  titleText.lineWidth = 635;

  timeText.x = - timeText.getBounds().width - SETTINGS.titleTimeGap;
  timeText.y = 2;

  const titleBounds = titleText.getBounds();
  const subtitleTextBounds = titleText.getBounds();

  subtitleText.x = titleText.x;
  subtitleText.y = titleText.y + titleBounds.height + SETTINGS.titleSubtitleGap;

  container.addChild(titleText);
  container.addChild(subtitleText);
  container.addChild(timeText);
  stage.addChild(container);

  return container
}

function renderSettingsGroup({ title, subtitle, time }) {
  return `
    <section class="setting-group">
      <div class="field">
        <label class="field__label" or="">Title</label>
        <input type="text" class="textfield field__input" value="${title}">
      </div>

      <div class="field">
        <label class="field__label" or="">Subtitle</label>
        <input type="text" class="textfield field__input" value="${subtitle}">
      </div>

      <div class="field">
        <label class="field__label" or="">Time</label>
        <input type="text" class="textfield field__input" value="${time}">
      </div>
    </section>
  `;
}

function draw() {
  const background = new createjs.Shape();
      background.graphics.beginFill(SETTINGS.backgroundColor);
      background.graphics.drawRect(0, 0, 1280, 720);
      background.graphics.endFill();

  stage.addChild(background);

  const events = state.events.map(({ title, subtitle, time }) => {
    return drawEvent({
      x: SETTINGS.eventsHorizontalPosition,
      y: SETTINGS.border,
      title,
      subtitle,
      time
    });
  });

  events[events.length - 1].y = 720 - events[events.length - 1].getBounds().height - SETTINGS.border;

  distributeContainersVertically(events);

  stage.update();
}

draw();
