<!--Ferreira, u24581802-->
<template>
    <div>   
        <p id="students">Current students in venue:</p>
        <p id="count">{{ venueStore.count }}</p>
        <p id="capacity">Max Capacity: {{ venueStore.capacity }}</p>

        <!--Display message if venue is full-->
    <p id="full" v-if = "venueStore.count >= venueStore.capacity">The venue is at full capacity!</p>
    <p v-else>&nbsp;</p>
    </div>
    
</template>

<script>
    import { useVenueStore } from '@/stores/VenueStore';
    
    export default {
            setup() {
                const venueStore = useVenueStore();
                return {venueStore};
            },
        }
</script>

<style scoped>

    div{
        margin-top: 60px;
        text-align: center;
        background-color: #93aebfdd;
        border-radius: 5px;
        grid-column-start: 1;
        grid-column-end: 3;
        padding: 20px;
        padding-top: 30px;
    }

    #count{
        font-size: 3em;
        margin: 0;
        font-weight: 500;
        color: #FFFAFF;
    }

    p{
        margin: 0;
    }

    #full{
        color: rgb(204, 25, 25);
        font: 1.1em;
        font-weight: 500;
    }

    #students{
        font-size: 1.25em;
        font-weight: 500 ;
    }

    #capacity{
        color: #05263be1;
        font-weight: 400;
    }

</style>