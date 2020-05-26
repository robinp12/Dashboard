import React, { useState, useEffect } from "react";

const cache = {};

function set(key, data){
    cache[key] = {
        data: data,
        cachedAt : new Date().getTime()
    }
}

function get(key){
    return new Promise(resolve => {
        resolve(
            cache[key] && cache[key]?.cachedAt + 10 * 60 * 1000 > new Date().getTime() 
            ? cache[key].data
            : null
        );
    });   
}
function lastUpdate(key){

    let updatedTime = new Date().getMinutes() - new Date(cache[key].cachedAt).getMinutes();

    if(updatedTime == 0){
        return <i> {"Mise à jour des données à l'instant"}</i>;

    }
    else {
        return <i> {"Dernière mise à jour des données il y a " + updatedTime + " min"}</i>;
    }
}
function invalidate(key){
    delete cache[key];
}

export default {
    set, get, lastUpdate, invalidate
}