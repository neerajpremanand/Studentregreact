function Validation(values) {
    let error = {}
    const namepattern = /[^a-z]/gi;

    if(values.name === "") {
        error.name = "Name should not be empty"
    } 
    else if(!namepattern.test(values.name)){
        error.name = "Name should contain only alphabets"  
    }

    if(values.dob === "") {
        error.dob = "DOB should not be empty"
    } 
    if(values.classn === "") {
        error.classn = "Class should not be empty"
    } 
    if(values.division === "") {
        error.division = "Class should not be empty"
    }
    if(values.gender === "") {
        error.gender = "Class should not be empty"
    }


    return error;
}

export default Validation;