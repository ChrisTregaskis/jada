exports.failed_res = (status, message) => {
    return {
        status: status,
        success: false,
        message: message
    }
}
