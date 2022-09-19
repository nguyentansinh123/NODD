const Product = require('../model/schema')

const getCoolProduct = async (req,res)=>{
    const {featured, company , name , sort , fields, limit , numbericFilter } = req.query
    let objectProduct = {}

    if(featured){
        objectProduct.featured = featured === 'true' ? true : false
    }
    if(company){
        objectProduct.company = company
    }
    if(name){
        objectProduct.name = { $regex: name, $options: 'i' }
    }

    if(numbericFilter){
        const operaterMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)|b/g
        let filters = numbericFilter.replace(regEx, (match)=>`-${operaterMap[match]}-`)
        const options = ['price','rating']
        filters.split(',').forEach((item)=>{
         const [field , operater , value] = item.split('-')
         if(options.includes(field)){
            objectProduct[field] = {[operater]:Number(value)}
         }
        })
       }
       console.log(objectProduct);


    let get = Product.find(objectProduct)
    if(sort){
        let sortList = sort.split(',').join(' ')
        get = get.sort(sortList)
    }
    if(fields){
        let fieldsList = sort.split(',').join(' ')
        get = get.select(fieldsList)
    }

    let Itemlimit = parseInt(limit) ||7
    let page = parseInt(req.query.page) ||1
    let Iskip = (page - 1) * Itemlimit

    get =get.limit(Itemlimit).skip(Iskip)
   

 let getReturn = await get

    res.json({getReturn , nbHits : getReturn.length})
}

module.exports = getCoolProduct