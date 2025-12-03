export const errorHandler = (err, req, res, next) => {
    console.error("ERROR:", err.message);

    res.status(500).send({
        message: "Something went wrong on the server",
        success: false,
        error: err.message
    });
};
