let count = 0;
const viewCount = (req,res,next) =>{
    count++
    console.log(count)
    // res.send('tools founds')

    // akhane next ke call kora mane er pore je middleware ta ache seta ke call kora
    next();
}

module.exports = viewCount;