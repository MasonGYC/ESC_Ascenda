
function checkInputData(data){
    
    try {
        if (data !== null) {throw ExceptionNotFound()};
        console.log("There is input data here");
        return true;
    } catch (e) {
        console.log("there is no data drawn");
        return false;
    }
    
}

export {checkInputData}