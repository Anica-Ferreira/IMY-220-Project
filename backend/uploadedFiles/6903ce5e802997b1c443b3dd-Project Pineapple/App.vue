<!--Ferreira, u24581802-->
<script setup>
    import CounterButtons from './components/CounterButtons.vue';
    import VenueCapacity from './components/VenueCapacity.vue';
    import Reset from './components/Reset.vue';
    import CounterDisplay from './components/CounterDisplay.vue';

</script> 

<template>
    <h1>Lecture Venue Tracker</h1>
    <div id="main">    
        <CounterDisplay />
        <div>
            <VenueCapacity />
            <Reset />
        </div>
        <CounterButtons />
    </div>
    
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap');

    h1{
        font-family: "Roboto Slab";
        font-weight: 400;
        color: #e9edf3;
        background-color: #05263b;
        text-align: center;
        width: 100vw;
        margin: 0;
        padding: 15px;
        font-size: 1.7em;
    }
    
    body{
        font-family: "Lexend";
        font-size: 1.3em;
        line-height: 1.5;
        font-weight: 500;
        background-color: #e9edf3;
        color: #05263b;
        overflow-x: hidden;
        margin: 0;
    }

    #main{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        width: 50%;
        margin: auto;
    }
    
</style>
