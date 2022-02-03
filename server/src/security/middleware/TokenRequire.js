module.exports = async (req, res, next) => {
    const access_token = req.header('access_token') || req.body['access_token'] || req.params['access_token'];
    const token_type = req.header('token_type') || req.body['token_type'] || req.params['token_type'];
    if(access_token && token_type){
        req.token = `${token_type} ${access_token}`;
    }
    if (!req.token) {
        res.status(401).json({
            error: {
                message: 'Unauthorized'
            },
        });
    }else{
        next();
    }
}