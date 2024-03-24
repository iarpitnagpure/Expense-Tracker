const logoutController = (res) => {
    res.cookie('token', '', { maxAge: 0 });
    return { isUserLoggedOut: true };
};

export default logoutController;