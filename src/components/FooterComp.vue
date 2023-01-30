<template>
    <footer v-if="$route.name !== 'login'">
        <div>
            <p>PlatziShop</p>
        </div>
        
    </footer>
</template>

<style scoped>
footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;

}

div{
    width: 100%;
    height: 50px;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>