def JsonResponse(status, message, data=None):
    """
    Create a formatted dictionary

    Parameters
    ----------
    status: bool
        Success status of the response
    message: str
        Message from server
    data: dict
        Extra data from server

    Returns
    -------
    dict
    """
    return {
        "status": status,
        "message": message,
        "data": data
    }