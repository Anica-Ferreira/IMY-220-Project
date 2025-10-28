<!--Anica Ferreira u24581802-->

<template>

    <div v-if="popup.visible" class="overlay">
        <div class="popup">

            <h3>{{ popup.title }}</h3>
            <p>{{ popup.message }}</p>

            <!--check message type-->
            <div v-if="popup.isConfirmation" class="buttons">
                <button @click="popup.confirm">Yes</button>
                <button @click="popup.cancel">No</button>
            </div>

            <div v-else class="buttons">
                <button @click="popup.closePopup" >OK</button>
            </div>

        </div>
    </div>

</template>

<script setup>
    import { usePopupStore } from '@/stores/PopupStore';
    const popup = usePopupStore();
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');

    .overlay{
        background: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .popup{
        background-color: #fcfcfc;
        padding: 25px;
        border-radius: 5px;
        position: fixed;
        max-width: 55%;
        min-width: 20%;
    }

    .popup p {
        white-space: normal;
        word-break: break-word;
    }

    .buttons{
        display: flex;
        justify-content: flex-end;
    }

    button{
        background-color: #324a69;
        color: #fcfcfc;
        border: none;
        padding: 10px;
        padding-left: 20px ;
        padding-right: 20px;
        font-size: 1rem;
        border-radius: 5px;
        margin-left: 15px;   
    }

    h3{
        font-family: "Manrope";
        font-weight: 500;
        font-size: 1.2em;
    }
    
</style>