import Course from './models/course.js'

const init_data = [
    {
        course_id : 'CS_DSA_1092',
        course_name : '資料結構與演算法',
        course_dayofweek : [2],
        course_time : [6,7,8]
    },
    {
        course_id : 'CS_DSDL_1092',
        course_name : '數位系統與實驗',
        course_dayofweek : [1],
        course_time : [6,7,8]
    },
    {
        course_id : 'EE_WP_1092',
        course_name : '網路服務程式設計',
        course_dayofweek : [2],
        course_time : [2,3,4]
    },
    {
        course_id : 'CS_BOM_1092',
        course_name : '數學之美',
        course_dayofweek : [5],
        course_time : [7,8,9]
    },
    {
        course_id : 'CS_CALCULUS_1092',
        course_name : '微積分下',
        course_dayofweek : [3,5],
        course_time : [6,7]
    },
    {
        course_id : 'CS_PHYSICS_1092',
        course_name : '普通物理學甲下',
        course_dayofweek : [3,5],
        course_time : [3,4]
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