const ErrorCodes = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    ERROR: 500
};

const successCodes = {
    OK: 200,
    CREATED: 201
};

const errorMessages = {
    User_not_found: "User not found",
    User_exist: "Email is already registered",
    Access_Denied: "Access denied",
    Invalid_req: "Invalid request",
    Internal_error: "Internal Server Error",
    Username_Password_wrong: "Given username or password is wrong"
};

const successMessages = {
    admin_registration: "Admin Registered successfully",
    user_registration: "User Registered successfully",
    login_success: "Login successfully",
    created_success: "Created successfully",
    update_success: "Updated Successfully",
    delete_Success: "Deleted successfully"
};



module.exports = {
    ErrorCodes,
    successCodes,
    errorMessages,
    successMessages,

};
