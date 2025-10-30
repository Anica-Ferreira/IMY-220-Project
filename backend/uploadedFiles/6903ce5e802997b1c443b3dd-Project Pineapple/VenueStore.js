//Ferreira, u24581802
import { defineStore } from "pinia";

export const useVenueStore = defineStore("venueStore", {
    state: () =>({
        count: 0,
        capacity: 10,
    }),

    getters:{
        getCount(state){
            return state.count;
        },

        getCapacity(state){
            return state.capacity;
        }
    },

    actions:{
        increment(){
            this.count++;
        },
        decrement(){
            this.count--;
        },
        reset(){
            this.count = 0;
            this.capacity = 10;
        },
        setCapacity(value){
            this.capacity = value;
        }

    }
})