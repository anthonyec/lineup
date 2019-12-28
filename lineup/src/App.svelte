<script>
  import { onMount, afterUpdate } from 'svelte';

  import Canvas from './canvas.svelte';

  let canvas;

  let events = [
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
    }
  ];
</script>

<Canvas
  events={events}
/>

{#each events as { title, subtitle, time }, i}
  <section class="setting-group">
    <div class="field">
      <label class="field__label" for="field-title-{i}">Title</label>
      <input type="text" class="textfield field__input" id="field-title-{i}" value="{title}" bind:value={title}>
    </div>

    <div class="field">
      <label class="field__label" for="field-subtitle-{i}">Subtitle</label>
      <input type="text" class="textfield field__input" id="field-subtitle-{i}" value="{subtitle}" bind:value={subtitle}>
    </div>

    <div class="field">
      <label class="field__label" for="field-time-{i}">Time</label>
      <input type="time" class="textfield field__input" id="field-time-{i}" value="{time}" bind:value={time}>
    </div>
  </section>
{/each}

{JSON.stringify(events)}

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  label {
    color: #122741;
    font-weight: 500;
    padding: 12px 0;
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

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
