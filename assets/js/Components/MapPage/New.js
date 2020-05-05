import hospitalsAPI from "../Services/hospitalsAPI";
import { toast } from "react-toastify";
import { useState } from "react";

const tab = [];

const fe = () => {
    const [show, setshow] = useState();
}
function test() {
    // console.log(id)
    hospitalsAPI.findAllMap()
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error.response.data)
            toast(error + "",{
            className: 'bg-red',
        });
    });
        // if(checked == false){
        //     tab.push(id)
        // }
        // if(checked == true){
        //     tab.pop(id)
        // }
        // setshow(!show);
        console.log(tab)
}
export default {test};