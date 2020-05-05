function roles() {
    const roles = [{
        nom:'ADMIN',
        value: '["ADMIN"]'
    },{
        nom:'USER',
        value:'[\"USER\"]'
    }]
    return roles
};
function maperr(hopital, nombre, position) {
         return (<> <Marker icon={greyIcon} position={position}>
            <Popup>
              {hopital}
              <br/><b>{nombre} infectés</b>
            </Popup>
          </Marker>
          </>)
}

 export default {
     roles,
     maperr
 }