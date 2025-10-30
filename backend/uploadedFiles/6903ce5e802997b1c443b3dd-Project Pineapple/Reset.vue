<!--Ferreira, u24581802-->
<template>
    <button @click = "this.reset()">Reset</button>
</template>

<script>
    import { useVenueStore } from '@/stores/VenueStore';
    
    export default {
            setup() {
                const venueStore = useVenueStore();
                return {venueStore};
            },
            
            methods: {
                reset(){
                    this.venueStore.reset();
                },
            }
        }

</script>

<style scoped>

button{
    margin-left: 10px;
    color: #FFFAFF;
    border: 0;
    font-family: "Lexend";
    padding: 10px;
    width: 100px;
    font-size: 1.1em;
    background-color: #D8315B;
    border-radius: 10px;
    transition: all 0.3s ease;
}

button:hover{
    background-color: #b5284c;
}

</style>