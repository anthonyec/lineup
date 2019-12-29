<script>
  import { onMount, afterUpdate } from 'svelte';

  import Canvas from './canvas.svelte';

  let canvas;

  let events = [
    {
      title: 'Plotting: The Joy of Analogue',
      subtitle: 'James Carruthers',
      time: '19:15'
    },
    {
      title: 'The Non-Human Dances: An Exploration into Computational Performers',
      subtitle: 'Amy Cartwright',
      time: '19:45'
    },
    {
      title: 'Drawing with Code\n- An Architectural Wandering',
      subtitle: 'Jessica In',
      time: '20:15'
    },
    {
      title: 'Pub!',
      subtitle: '@ The Phoenix - W1G 0PP',
      time: '20:45'
    }
  ];

  let position = 1;

</script>

<div class="app">
  <div class="view canvas-view">
    <Canvas
      events={events}
      eventsPosition={position}
    />
  </div>

  <div class="view settings-view">
    {#each events as { title, subtitle, time }, i}
      <section class="setting-group">
        <div class="field">
          <label for="field-title-{i}">Title</label>
          <input type="text" class="textfield field__input" id="field-title-{i}" value="{title}" bind:value={title}>
        </div>

        <div class="field">
          <label for="field-subtitle-{i}">Subtitle</label>
          <input type="text" class="textfield field__input" id="field-subtitle-{i}" value="{subtitle}" bind:value={subtitle}>
        </div>

        <div class="field">
          <label for="field-time-{i}">Time</label>
          <input type="time" class="textfield field__input" id="field-time-{i}" value="{time}" bind:value={time}>
        </div>
      </section>
    {/each}
  </div>
</div>

<style>
  .app {
    height: 100%;
    display: flex;
  }

  .view {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }

  .canvas-view {
    background: gray;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .settings-view {
    width: 400px;
    padding: 25px 15px;
    flex-shrink: 0;
    -webkit-overflow-scrolling: touch;
  }

  .setting-group {
    margin-bottom: 25px;
  }

  .setting-group:last-child {
    margin-bottom: 0px;
  }

  .field {
    margin-bottom: 12px;
  }

  .field:last-child {
    margin-bottom: 12px;
  }

  label {
    color: #122741;
    display: block;
    font-weight: 500;
    padding: 5px 0;
  }

  input {
    border: 1px solid #677E97;
    border-radius: 6px;
    color: #2B3E55;
    padding: 8px 10px;
    width: 100%;
  }

  input[type="time"] {
    padding: 5px 10px;
  }

  input:focus {
    border-color: #4a98ff;
    box-shadow: 0 0 0 1px #4a98ff;
    outline: none;
  }

  @media (max-width: 800px) {
    .app {
      flex-direction: column;
    }

    .canvas-view {
      flex-shrink: 0;
      height: auto;
      position: fixed;
    }

    .settings-view {
      margin-top: 56.4%;
      width: auto;
      overflow: visible;
      flex-shrink: 0;
    }
  }
</style>
