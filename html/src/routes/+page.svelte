<script lang="ts">
    import { onMount } from "svelte";
    import createGlobe from "cobe";
    import TimeCountUp from '../components/timeCountUp.svelte';
  //   import profile from 'images/profile.jpg';
  
    const startPhi = 0;
    const startTheta = 0.5;
    const doublePi = Math.PI * 2;
  
    const personal_projects = [
      {
        title: 'Workout Tracker',
        logo: 'images/workout-tracker-path.svg',
        description: 'Application to track workouts over time and do analysis of improvement.',
        link: 'https://workout.bozp.dev/'
      },
      {
        title: 'Open Rarity',
        logo: 'images/open-rarity-path.svg',
        description: 'Application to create a rarity score on NFT collections.',
        link: 'https://rarity.bozp.dev/'
      },
      {
        title: 'Bozp Profile',
        logo: 'images/bozp-profile-path.svg',
        description: 'Application to create a profile based on wallets from the Ethereum Blockchain.',
        link: 'https://bozp.dev/'
      },
    ]
  
    const experience = [ 
      { title: 'Fortem Technologies',
        job: 'Senior Software Engineer',
        dates: '(October 2021 - Present)',
        bullets: [ 
          { point: 'Architected a new Video Streaming platform using Gstreamer with WebRTC.' },
          { point: 'Improved Video Streaming platform video FPS from 1 to 30/60 FPS.' },
          { point: 'Worked on algortihms to improve camera PTZ calculations.'}
        ] 
      },
      { title: 'MiiM Inc.',
        job: 'Full Stack Engineer',
        dates: '(August 2019 - October 2021)',
        bullets: [ 
          { point: 'Created unique UI experiences for the main application in Vue.js and Express.js like framework.' },
          { point: 'Created a WebRTC application to stream video to a web client to meet the required latency needs for a live platform.'},
          { point: 'Worked with AWS to deploy all services' }
        ] 
      },
      { title: 'Dish Network',
        job: 'Software Engineer 1-2 ',
        dates: '(July 2017 - July 2019)',
        bullets: [
          { point: 'Developed in Python to automate the backend REST API calls to the STB.' },
          { point: 'Created a web application for testers to deploy test suites to test the software for the STB everyday.' },
          { point: 'Certified in Scaled Agile Framework 4.0' }
        ]
      }
    ];
  
    let globe: any;
  
    let currentPhi = startPhi;
    let currentTheta = startTheta;
    let locationSelected = false;
    let location : any = [0,0];
    let slcLocation : any = [40.7608, -111.8910];
    let laramieLocation : any = [41.3114, -105.5911]
    let denverLocation : any = [39.7392, -104.9903]
  
    const selectLocation = (position: any) => {
      location = locationToAngles(position[0], position[1]);
      locationSelected = true;
      setTimeout(()=>{
        locationSelected = false;
      }, 5000)
    }
    
    const locationToAngles = (lat: any, long: any) => {
      return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
    }
  
    const drawGlobe = () => {
      let canvas = document.getElementById("canvas") as HTMLCanvasElement;
      let globeContainer = document.getElementById("globe__container") as HTMLElement;
  
      let width = globeContainer.clientWidth as number;
      let height = globeContainer.clientHeight as number;
  
      let targetSize = Math.min(width, height) as number;
      let devicePixelRatio = 2 as number;
  
      canvas.height = targetSize / devicePixelRatio;
      canvas.width = targetSize / devicePixelRatio;
  
      if ( ! globe ) {
        globe = createGlobe(canvas, {
          devicePixelRatio: devicePixelRatio,
          width: targetSize,
          height: targetSize,
          phi: currentPhi,
          theta: currentTheta,
          dark: 1,
          diffuse: 1.2,
          mapSamples: 8000,
          mapBrightness: 2,
          baseColor: [0.3, 0.5, 0.4],
          markerColor: [0.0, 1, 0.0],
          glowColor: [0, 0, 0],
          opacity: 0.8,
          markers: [
            { location: slcLocation, size: 0.02 },
            { location: laramieLocation, size: 0.02 },
            { location: denverLocation, size: 0.02 }
          ],
          onRender: state => {
            let canvas = document.getElementById("canvas") as HTMLCanvasElement;
            let globeContainer = document.getElementById("globe__container") as HTMLElement;
  
            let width = globeContainer.clientWidth as number;
            let height = globeContainer.clientHeight as number;
  
            let targetSize = Math.min(width, height) as number;
            let devicePixelRatio = 2 as number;
  
            canvas.height = targetSize;
            canvas.width = targetSize;
  
            state.height = targetSize;
            state.width = targetSize;
  
            if (! locationSelected) {
              state.phi = currentPhi;
              currentPhi += 0.0025;
            }
            else {
              state.phi = currentPhi
              state.theta = currentTheta
              const [focusPhi, focusTheta] = location
              const distPositive = (focusPhi - currentPhi + doublePi) % doublePi
              const distNegative = (currentPhi - focusPhi + doublePi) % doublePi
              // Control the speed
              if (distPositive < distNegative) {
                currentPhi += distPositive * 0.08
              } else {
                currentPhi -= distNegative * 0.08
              }
              currentTheta = currentTheta * 0.92 + focusTheta * 0.08
              // state.width = width * 2
              // state.height = width * 2
            }
          }
        });
      }
    }
  
    onMount(() => {
      drawGlobe();
      
      window.onresize = () => {
        drawGlobe();
      };
    });
  </script>
  
  <div class="app">
    <div class="main__container">
      <div class="left__container">
        <div class="experience card__container">
          <div class="card_title__container">
            Experience
          </div>
          {#each experience as exp}
          <div class="card_details__container">
            <div class="card_details_title__container">
              <div style="display: flex;">
                <div class="card_details_company">
                  {exp.title}
                </div>
                <div class="experience-dash">&nbsp{" - "}&nbsp</div>
                <div class="card_details_title experience_details_title">
                  {exp.job}
                </div>
              </div>
              <div class="card_details_dates">
                {exp.dates}
              </div>
            </div>
            <div class="card_details_bullets__container">
            {#each exp.bullets as bullet}
            <ul class="card_details_bullet">
              <li class="bullets">{bullet.point}</li>
            </ul>
            {/each}
            </div>
          </div>
          {/each}
        </div>
        <div class="education card__container">
          <div class="card_title__container">
            Education
          </div>
          <div class="card_details__container">
            <div class="card_details_school__container">
              <div class="card_details_school_logo"><img class="school__img" src="images/wyoming_logo.png" alt="University Of Wyoming"></div>
              <div class="card_details_school_details">
                <div class="card_details_school_name">University Of Wyoming</div>
                <div class="card_details_school_dash">&nbsp{" - "}&nbsp</div>
                <div class="card_details_degree">Bachelor of Computer Science</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="globe" id="globe__container">
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
                            <a class="linkedin header_widget" href="https://www.linkedin.com/in/brant-dolling-0a7b91132/#experience-section" target="_blank">
                              <div class="header_widget__icon">
                                <span class="linkedin_icon material-symbols-rounded"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 464"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg></span>
                              </div>
                            </a>  
                            <div class="age header_widget">
                              <div class="header_widget__icon">
                                  <span class="material-symbols-rounded">work</span>
                              </div>
                              <div class="header_widget__text_container">
                                <div class="header_widget__text"><TimeCountUp/></div>
                                <div class="header_widget__subtext">Years of Experience</div>
                              </div>
                            </div>
                            <div class="education_widget header_widget" on:click="{() => {selectLocation(laramieLocation)}}" on:keypress="{() => {selectLocation(laramieLocation)}}">
                                <div class="header_widget__icon">
                                    <span class="material-symbols-rounded">school</span>
                                </div>
                                <div class="header_widget__text_container">
                                  <div class="header_widget__text">University of Wyoming</div>
                                  <div class="header_widget__subtext">Bachelor of Computer Science</div>
                                </div>
                            </div>
                            <div class="location header_widget" on:click="{() => {selectLocation(slcLocation)}}" on:keypress="{() => {selectLocation(slcLocation)}}">
                                <div class="header_widget__icon">
                                    <span class="material-symbols-rounded">location_on</span>
                                </div>
                                <div class="header_widget__text_container">
                                  <div class="header_widget__text">SLC, UT</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <canvas id="canvas" class="globe__canvas" width="0" height="0"/>
      </div>
      <div class="right__container">
        <div class="personal_projects card__container">
          <div class="card_title__container">
            Personal Projects
          </div>
          <div class="card_details__container">
            <div class="card_details_personal_projects__container">
              {#each personal_projects as project}
              <div class="card_details_personal_projects">
                <a class="card_details_project_logo" target="_blank" rel="noopener noreferrer" href="{project.link}"><img class="project__img" src="{project.logo}" alt="{project.title}"></a>
                <div class="card_details_project_details">
                  <div class="card_details_project_name">{project.title}</div>
                  <div class="card_details_project_description">{project.description}</div>
                </div>
              </div>
              {/each}
            </div>
          </div>
        </div>
        <div class="hobbies card__container">
          <div class="card_title__container">
            Hobbies
          </div>
          <div class="card_details__container">
            <div class="card_details_hobbies__container">
              <div class="card_details_hobbies">
                <div class="card_details_image">
                  <img class="hobbie__img camping__img" src="images/camping-icon.png" alt="Camping">
                </div>
                <div class="card_details_title">
                  Camping
                </div>
              </div>
              <div class="card_details_hobbies">
                <div class="card_details_image">
                  <img class="hobbie__img camping__img" src="images/frolfing-icon.png" alt="Dogs">
                </div>
                <div class="card_details_title">
                  Frisbee Golf
                </div>
              </div>
              <div class="card_details_hobbies">
                <div class="card_details_image">
                  <img class="hobbie__img camping__img" src="images/hiking-icon.png" alt="Dogs">
                </div>
                <div class="card_details_title">
                  Hiking
                </div>
              </div>
              <div class="card_details_hobbies">
                <div class="card_details_image">
                  <img class="hobbie__img camping__img" src="images/iot-icon.png" alt="Dogs">
                </div>
                <div class="card_details_title">
                  IOT Devices
                </div>
              </div>
              <div class="card_details_hobbies">
                <div class="card_details_image">
                  <img class="hobbie__img camping__img" src="images/skiing-icon.png" alt="Dogs">
                </div>
                <div class="card_details_title">
                  Skiing
                </div>
              </div>
              <div class="card_details_hobbies">
                <div class="card_details_image">
                  <img class="hobbie__img camping__img" src="images/strategy-icon.png" alt="Dogs">
                </div>
                <div class="card_details_title">
                  Strategy Games
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main_footer">
        <div class="main_footer__divider"/>
        <div class="main_footer__container">
            <div class="main_footer__title">
                brantdolling.com
            </div>
            <img class="main_footer__img" src="images/brant.svg" alt="logo">
        </div>
      </div>
    </div>
  </div>
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
      width: 100%;
      max-width: 650px;
      background: rgba(12, 14, 12, 0.95);
      box-shadow: 0 0 25px #111;
      user-select: none;
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
      justify-content: center;
      align-items: center;
      font-size: 1.5em;
    }
    .header_widgets {
      height: 100%;
      display: flex;
    }
    .header_widget:hover {
      background: rgba(255, 255, 255, 0.15);
    }
    .header_widget {
      height: calc( 100% - 8px );
      display: flex;
      align-items: center;
      font-size: 0.5em;
      padding-left: 1em;
      padding-right: 1em;
      cursor: pointer;
    }
    .header_widget__icon {
      color: rgba(255,255,255,0.8);
    }
    .header_widget__text_container {
      padding-left: 0.5em;
      display: flex;
      flex-direction: column;
    }
    .header_widget__text {
      color: rgba(255,255,255,0.8);
    }
    .header_widget__subtext {
      color: rgba(255,255,255,0.6);
      font-size: 0.85em;
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
    .linkedin_icon  {
      filter: invert(87%) sepia(0%) saturate(0%) hue-rotate(234deg) brightness(97%) contrast(90%);
    }
    .education, .age {
      box-shadow: inset 1px 0 0 rgba(255,255,255,0.1);
    }
    .education_widget {
      box-shadow: inset 1px 0 0 rgba(255,255,255,0.1);
    }
    .location {
      padding-left: 1em;
      padding-right: 1em;
      box-shadow: inset 1px 0 0 rgba(255,255,255,0.1);
    }
    /* .header_widget__icon {
      
    } */
    .main__container {
      display: flex;
      height: calc(100vh - 16px);
    }
    .right__container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      /* height: calc(100vh - 3em ); */
      width: 30%;
      min-width: 30%;
      padding: 1em;
    }
    .left__container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      /* height: calc(100vh - 3em ); */
      width: 30%;
      min-width: 30%;
      padding: 1em;
    }
    .card__container {
      width: 100%;
      border-radius: 1em;
      background: rgba(12, 14, 12, 0.95);
      box-shadow: 0 0 25px #111;
      margin-top: 1em;
    }
    .card_title__container {
      color: rgba(255,255,255,0.8);
      font-size: 1.2em;
      font-weight: 600;
      padding: 0.75em;
    }
    .card_details__container {
      color: rgba(255,255,255, 1);
      padding: 1em;
    }
    .card_details_title__container {
      display: flex;
      align-items: end;
      justify-content: space-between;
    }
    .card_details_company {
      color: rgba(255,255,255,1);
      font-size: 1em;
      font-weight: 500;
    }
    .experience_details_title {
      margin-top: 0.25em;
    }
    .card_details_title {
      color: rgba(255,255,255,0.8);
      font-size: 0.9em;
      font-weight: 500;
      white-space: nowrap;
    }
    .card_details_dates {
      color: rgba(255,255,255,0.8);
      font-size: 0.8em;
      font-weight: 500;
      padding-bottom: 2px;
    }
    .card_details_bullet {
      color: rgba(255,255,255,0.7);
      font-size: 0.8em;
      font-weight: 500;
    }
    .school__img {
      height: 100px;
      padding-right: 2em;
      filter: invert(0%) sepia(4%) saturate(0%) hue-rotate(324deg) brightness(95%) contrast(105%);
    }
    .card_details_school__container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .card_details_school_details {
      display: flex;
      flex-direction: row;
    }
    .card_details_school_name {
      color: rgba(255,255,255,1);
      font-size: 1.1em;
      font-weight: 500;
    }
    .card_details_degree {
      color: rgba(255,255,255,0.8);
      font-size: 1em;
      font-weight: 500;
    }
    .hobbie__img {
      width: 4em;
      height: 4em;
      user-select: none;
    }
    .card_details_title {
      color: rgba(255,255,255,0.7);
      font-size: 0.8em;
      font-weight: 500;
    }
    .card_details_hobbies__container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card_details_hobbies {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.75em;
    }
    .card_details_personal_projects__container {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: start;
    }
    .card_details_personal_projects {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0.75em;
    }
    .card_details_project_details {
      padding: 0.75em;
    }
    .card_details_project_name {
      color: rgba(255,255,255,0.75);
      font-size: 1.2em;
      font-weight: 800;
    }
    .card_details_project_description {
      padding-top: 0.5em;
      color: rgba(255,255,255,0.6);
      font-size: 0.9em;
      font-weight: 400;
    }
    .globe {
      height: calc( 100vh - 200px );
      width: 40%;
    }
    .project__img {
      width: 100px;
    }
    .main_footer {
        position: fixed;
        padding: 0px 8px 6px 8px;
        width: calc( 100% - 32px );
        background-color: transparent;
        bottom: 0;
        z-index: 4;
    }
    .main_footer__title {
        padding-left: 8px;
        font-size: 1em;
        color: rgba(255,255,255,0.7);
    }
    .main_footer__divider{
        border: none;
        padding-bottom: 6px;
        height: 1px;
        width: 100%;
            /* border-bottom: 0.5px solid white;
        box-shadow: 0px -5px 2px #fff; */
            /* margin-top: 0; */
        border-top: 1px solid rgba(255,255,255,0.4);
    }
    .main_footer__container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .main_footer__img {
        height: 30px;
    }

    @media (max-width: 1700px) {
        .hobbie__img {
            width: 3em;
            height: 3em;
        }
        .card_details_title {
            font-size: 0.7em;
        }
        .header_widget__text_container {
            padding-top: 0.5em;
        }
        .card_details_school_details {
            flex-direction: column;
        }
        .card_details_school_dash {
            display: none;
        }
        .card_details_school_name {
            padding-bottom: 0.5em;
        }
        .card_details_hobbies__container { 
            flex-wrap: wrap;
        }
    }

    @media (max-width: 1600px) {
        .education_widget {
            display: none;
        }
        .header_widget__text_container {
            padding-top: 0em;
        }
        .name_text {
            font-size: 0.65em;
            font-weight: 600;
        }
        .occupation_text {
            font-size: 0.45em;
            font-weight: 200;
            color: rgba(255,255,255,0.7);
        }
        .header {
            min-width: 350px;
        }
        .card_details_title__container {
            flex-direction: column;
            align-items: start;
            justify-content: space-between;
        }
        .card_details__container {
            padding: 0.1em 1em;
        }
        .card_details_dates {
            display: flex;
            align-self: self-start;
            font-size: 0.75em;
            padding-top: 0.5em;
        }
    }
    
    @media (max-width: 1200px) {
        .education_widget {
            display: inherit;
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
        .globe__canvas {
            width: 50vw;
            height: 50vw;
        }
        .globe {
            order: 0;
            width: 100%;
            height: 100%;
        }
        .left__container {
            order: 1;
            width: calc(100% - 32px);
            padding: 0px 16px;
        }
        .right__container {
            order: 2;
            width: calc(100% - 32px);
            padding: 0px 16px;
        }
        .main_footer {
            position:inherit;
            order: 3;
            padding: 16px 8px 6px 8px;
            width: calc( 100% - 16px );
        }
    }

    @media (max-width: 800px) {
        .main__container {
            flex-direction: column;
            width: 100%;
            height: 100%;
        }
        .education_widget {
            display: none;
        }
        .header_widget__text_container {
            padding-top: 0em;
        }
        .name_text {
            font-size: 0.65em;
            font-weight: 600;
        }
        .occupation_text {
            font-size: 0.45em;
            font-weight: 200;
            color: rgba(255,255,255,0.7);
        }
        .header__container {
            padding: 8px;
            width: calc(100% - 16px);
            height: 125px;
        }
        .header {
            box-shadow: 0 0 10px #111;
        }
        .globe {
            order: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .globe__canvas {
            width: 100vw;
            height: 100vw;
            max-width: 500px;
            max-height: 500px;
        }
        .left__container {
            order: 1;
            width: calc(100% - 32px);
            padding: 0px 16px;
        }
        .right__container {
            order: 2;
            width: calc(100% - 32px);
            padding: 0px 16px;
        }
        .main_footer {
            position:inherit;
            order: 3;
            padding: 16px 8px 6px 8px;
            width: calc( 100% - 16px );
        }
    }
    
    @media (max-width: 400px) {
        .occupation_text {
            display: none;
        }
        .header_widget__subtext {
            font-size: 0.7em;
        }
        .header_widget {
            padding: 4px 8px 0;
        }
    }
  </style>