<script lang="ts">
  import { onMount } from "svelte";
  import createGlobe from "cobe";
//   import profile from 'images/profile.jpg';

  let phi = 0;

  onMount(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const globeContainer = document.getElementById("globe__container") as HTMLElement;
    
    const width = globeContainer.clientWidth as number;
    const height = globeContainer.clientHeight as number;

    let targetSize = Math.min(width, height) as number;
    let devicePixelRatio = 2 as number;

    canvas.height = targetSize / devicePixelRatio;
    canvas.width = targetSize / devicePixelRatio;

    const globe = createGlobe(canvas, {
      devicePixelRatio: devicePixelRatio,
      width: targetSize,
      height: targetSize,
      phi: phi,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.5, 0.4],
      markerColor: [0.1, 0.8, 0.4],
      glowColor: [0, 0, 0],
      opacity: 0.8,
      markers: [
        { location: [40.7608, -111.8910], size: 0.05 },
      ],
      onRender: state => {
        state.phi = phi;
        phi += 0.0025;
      }
    });
  });
</script>

<style>
  :global(body) {
    font-family: 'Roboto';
    background: rgb(28, 33, 28);
    color: #fff;
  }
  .header__container {
    display: grid;
    place-items: center;
    place-content: center;
    /* font-size: 3em; */
    height: 200px;
    width: 100%;
  }
  .header {
    display: flex;
    align-items: stretch;
    height: 100px;
    border-radius: 5em;
    width: 50vw;
    background: rgba(12, 14, 12, 0.95);
    box-shadow: 0 0 25px #111;
  }
  .profile {
    padding: 0.5em;
  }
  .profile__img {
    object-fit: cover;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    aspect-ratio: 1 / 1;
  }
  .header_details {
    padding-right: 1em;
    padding-left: 0.5em;
    flex: 1;
  }
  .header_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50%;
    font-size: 1.75em;
    box-shadow: inset 0 -1px 0 0 rgba(255,255,255,0.1);
  }
  .header_widgets_container {
    height: 50%;
    display: flex;
    align-items: center;
    font-size: 1.5em;
  }
  .header_widgets {
    height: 100%;
    display: flex;
  }
  .header_widget {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 0.5em;
    padding-left: 1em;
    padding-right: 1em;
  }
  .header_widget__icon {
    padding-right: 0.5em;
    color: rgba(255,255,255,0.8);
  }
  .header_widget__text {
    color: rgba(255,255,255,0.8);
  }
  .name_text {
    font-size: 0.75em;
    font-weight: 600;
  }
  .occupation_text {
    font-size: 0.6em;
    font-weight: 100;
    padding-right: 1.5em;
    color: rgba(255,255,255,0.8);
  }
  .education {
    box-shadow: inset 1px 0 0 rgba(255,255,255,0.1);
  }
  .location {
    padding-left: 1em;
    padding-right: 1em;
    box-shadow: inset 1px 0 0 rgba(255,255,255,0.1);
  }
  /* .header_widget__icon {
    
  } */
  .globe {
    display: grid;
    place-items: center;
    place-content: center;
    height: calc( 100vh - 216px );
  }
</style>
<div class="app">
    <div class="header__container">
        <div class="header">
            <div class="profile">
                <img class="profile__img" src="images/profile.jpg" alt="Profile">
            </div>
            <div class="header_details">
                <div class="header_title">
                    <div class="name_text">Brant Dolling</div>
                    <div class="occupation_text">Senior Software Engineer</div>
                </div>
                <div class="header_widgets_container">
                    <div class="header_widgets">
                        <div class="age header_widget">
                            <div class="header_widget__text">27 years</div>
                        </div>
                        <div class="education header_widget">
                            <div class="header_widget__icon">
                                <span class="material-symbols-rounded">school</span>
                            </div>
                            <div class="header_widget__text">University of Wyoming</div>
                        </div>
                        <div class="location header_widget">
                            <div class="header_widget__icon">
                                <span class="material-symbols-rounded">location_on</span>
                            </div>
                            <div class="header_widget__text">SLC, UT</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="globe" id="globe__container">
        <canvas id="canvas" class="globe__canvas" width="0" height="0"/>
    </div>
</div>