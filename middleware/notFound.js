

//override Not found page to custom
const notFound = (req, res) => res.status(404).send("No Route available for this route. !!!!")


module.exports = notFound
