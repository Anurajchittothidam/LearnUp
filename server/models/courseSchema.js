import mongoose from 'mongoose'

const courseSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'categories'
    },
    isFree:{
        type:Boolean,
        default:false
    },
    price:{
        type:Number,

    },
    duration:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    teacherRevenue:{
        type:Number,
        required:true,
    },
    adminRevenue:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    course:[
        {
            chapter:String,
            image:String,
            assignment:{
                type:Object,
            },
            questionsAndAnswers:[
                {
                    question:String,
                    answer:String
                }
            ],
            lessons:[
                {
                    chapterName:String,
                    lessonName:String,
                    videoUrl:String
                }
            ]
        }
    ],
    reviews:[
        {
            user:{
                type:mongoose.Types.ObjectId,
                ref:'users',
                required:true,
            },
            text:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                // required:true,
            }
        }
    ],
    report:[
        {
        user:{
            type:mongoose.Types.ObjectId,
            ref:'users',
            required:true,
        },
        reason:{
            type:String,
            required:true,
        }
        }
    ],
    // entrolled:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:'users'
    //     }
    // ],
    image:{
        type:String,
    },
    block:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
})

const courseModel=mongoose.model('Course',courseSchema)

export default courseModel