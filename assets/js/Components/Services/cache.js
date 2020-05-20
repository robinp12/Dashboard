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
            cache[key] && cache[key].cachedAt + 10 * 60 *100 > new Date().getTime() 
            ? cache[key].data
            : null
        );
    });   
}
function lastUpdate(key){
    return <i> {"Dernière mise à jour à " + new Date(cache[key].cachedAt).toLocaleTimeString()}</i>;
}
function invalidate(key){
    delete cache[key];
}

export default {
    set, get, lastUpdate, invalidate
}