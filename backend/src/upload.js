import Course from './models/course.js'

const init_data = [
    {
        course_id : 'CS1108',
        course_name : 'DSA',
        course_dayofweek : [2],
        course_time : [6,7,8]
    },
    {
        course_id : 'CS2234',
        course_name : 'DSDL',
        course_dayofweek : [1],
        course_time : [6,7,8]
    },
    {
        course_id : 'EE2252',
        course_name : 'WP',
        course_dayofweek : [2],
        course_time : [2,3,4]
    },
    {
        course_id : 'CS2456',
        course_name : '數學之美',
        course_dayofweek : [5],
        course_time : [7,8,9]
    },
    {
        course_id : 'MATH1173',
        course_name : '微積分下',
        course_dayofweek : [3,5],
        course_time : [6,7]
    },
    {
        course_id : 'PHYS2012',
        course_name : '普通物理學甲下',
        course_dayofweek : [3,5],
        course_time : [3,4]
    }, 
    {
        course_id : 'CS3314',
        course_name : 'SP',
        course_dayofweek : [3],
        course_time : [5,6,7]
    }
]


const dataInit = async () => {
    const checkData = await Course.find()
    if (checkData.length !== 6) {
      await Course.remove({})
      await Course.insertMany(init_data)
    }
  }
  
  export { dataInit }