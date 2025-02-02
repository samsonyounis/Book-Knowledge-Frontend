export interface ItCourse{
    id: String,
    title: String,
    instructor: String,
    duration: String,
    des: String,
    image: String,
    available:String,
    price:string,
    language:String,
    level:String,
    modules:[{id:number, title:String, des:String}],
    learningOutcomes:[],
    reviews:[{studentName:String,comment:String,date:String}];
}