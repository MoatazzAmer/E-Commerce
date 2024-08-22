


export class ApiFeatures{
    constructor(mongooseQuery , searchQuery){
        this.mongooseQuery = mongooseQuery;
        this.searchQuery = searchQuery
    }

    pagination(){
        let pageNumber = this.searchQuery.page * 1 || 1;
        if(this.searchQuery.page < 1) pageNumber = 1;
        const limit =2 ;
        let skip = (pageNumber -1) * limit
        this.pageNumber = pageNumber
        this.mongooseQuery.skip(skip).limit(limit);
        return this
    }

    filter(){
        let filterObj = structuredClone(this.searchQuery);
        filterObj = JSON.stringify(filterObj);
        filterObj = filterObj.replace(/(lt|lte|gt|gte)/g , val=>`$${val}`);
        filterObj = JSON.parse(filterObj);
    
        let execludeFields = ['page','search','sort','fields'];
        execludeFields.forEach(val=>{
            delete filterObj[val]
        })
        this.mongooseQuery.find(filterObj)
        return this
    }   

    sort(){
        if(this.searchQuery.sort){
            let sortedBy = this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortedBy)
        }
        return this
    }

    fields(){
        if(this.searchQuery.fields){
            let seletcFields = this.searchQuery.fields.split(',').join(' ')
            this.mongooseQuery.select(seletcFields)
        }
        return this
    }
    search(){
        if(this.searchQuery.search){
            this.mongooseQuery.find(
                {
                    $or:[
                        {title : {$regex : this.searchQuery.search , $option :'i'}},
                        {description : {regex : this.searchQuery.search , $option:'i'}}
                    ]
                }
            )
        }
        return this
    }
}