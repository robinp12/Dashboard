const cache = {};

function set(id, data){
    cache[id] = {
        data: data,
        cachedAt : new Date().getTime()
    }
}

function get(id){
    return cache[id]?cache[id].data:null;
}

export default {
    set,get
}