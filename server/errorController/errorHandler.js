// handler error method to throw custom error messages

// using the getErrorMessage function exported from this helper file, we will add meaningful error messages when handling errors thrown by Mongoose operations performed for user CRUD.

const getErrorMessage = (err) => {
    let message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err)
                break
            default:
                message = 'Sorry Something Went Wrong 😢 🙁'
        }
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message
            }
        }
        
    }
    return message
}


// getUniqueErrorMessage method to parse the unique constraint related error object and construct an appropriate error message.

const getUniqueErrorMessage = (err) => {
    let outPut
    
    try {
        let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('-1'))
        outPut = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + 'Already Exist'
        
    } catch (ex) {
        outPut = `Unique filed already Exist `
    }
    return outPut;
}

module.exports = {getErrorMessage}