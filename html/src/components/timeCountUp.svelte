<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    const professionalStartDate: any = new Date('2017-07-01T12:00:00Z');
    let currentDate: any = new Date();
    
    let diff = 0;
    let years: any = 0;
    let intervalTimeUpdate: any = null;

    onMount(() => {
        diff = currentDate - professionalStartDate

        intervalTimeUpdate = setInterval(() => {
            currentDate = new Date();
            diff = currentDate - professionalStartDate;
            years = (diff / (1000 * 60 * 60 * 24 * 365)).toFixed(8);
        }, 100);
    });

    onDestroy(() => {
        clearInterval(intervalTimeUpdate);
    })


  </script>
  
  <div class="time_count_up">
    {years}
  </div>
  <style>
  </style>