pragma solidity ^0.4.17;

// adopting a pet
contract BuyCourse {
  address[16] public students;
  
  //importing the UploadCourse contract
  UploadCourse courseContract;
  Profile studentContract;
  uint coursePrice;
  
  struct StudentDetails {
    address myAddress;
    uint[] myCourses;
  }
    
    StudentDetails[] public allStudents;
  
  function buy(uint courseId) public returns (uint) {
      
    
    require(courseId >= 0 && courseId <= 15);
    
    CourseDetails memory course = courseContract.allCourses[courseId];
    
    // for(uint i=0; i<courseContract.allCourses.length; i++){
    //     if i['']
    // }
    //for i in course.allCourses;
    // if i.id == courseId
    // coursePrice = i.price
    //require (msg.value >= coursePrice);
    //for i in studentContract.allStudents;
    //if msg.address == i.myAddress: //set i.myCourses.push(courseId)
    // else (finally) 
    // StudentDetails(msg.sender, courseId)
    //allStudents.push()
    students[courseId] = msg.sender;

    return courseId;
  }

  function getStudents() public view returns (address[16]) {
    return students;
  }
}

//Only for instructor
contract UploadCourse {

    struct CourseDetails {
        string courseGenre;
        string coursePrice;
        string courseName;
        bool publishStatus; // 1 -> ready for sales , 0 -> not ready for sales
    }
    
    mapping(address => CourseDetails[]) public courseRegistry;
    
    mapping(string=>CourseDetails) public courseMap;
    
    CourseDetails[] public allCourses;
    
    struct VideoList {
        uint64 courseDuration;
        string videoData;
    }
    
    struct QuizList {
        string quizQues; 
        string quizAns;
    }
    
    address public instructorAcc;
    CourseDetails public courseDetails;
    VideoList[] public videoList;
    QuizList[] public quizList;
    
    constructor() public {
        instructorAcc = msg.sender;
    }

    function setCourseDetails(string mCourseGenre,string mCoursePrice,string mCourseName,bool mPublishStatus) public restricted {
        courseDetails = CourseDetails(mCourseGenre,mCoursePrice,mCourseName,mPublishStatus);
        courseId = allCourses.push(courseDetails);
        allCourses[courseId-1].Id = courseId-1;
    }
    
    function setVideo(string mVideoData,uint64 mDuration) public {
        videoList.push(VideoList(mDuration,mVideoData));
    }
    
    function setQuiz(string ques,string ans) public {
        quizList.push(QuizList(ques,ans));
    }
    
    function getVideoListSize() public view returns(uint256 size) {
        return videoList.length;
    } 
    
    function getQuizListSize() public view returns(uint256 size) {
        return quizList.length;
    }
    
    modifier restricted() {
        require(msg.sender == instructorAcc);
        _;
    }
}

//Share for both student & instructor
contract Profile {
    
    address userAddress;
    string public username;
    bool public userType; // 0-> student, 1 -> instructor
    uint8 public rating; // 1 (worst) until 5 (best)
    uint8 public progress = 100; // range fro 0 to 100 
    
    constructor (bool mUserType) {
        userAddress = msg.sender;
        userType = mUserType;
    }
    
    function getRating() public view returns (uint8) {
        return rating;
    }

    //from the account which smart contract is deployed
    function getCert() public view student returns (address) {
        return userAddress;
    }
    
    modifier instructor() {
        require(userType == true);
        _;
    }
    
    modifier student() {
        require(userType == false);
        require(progress == 100);
        _;
    }
}
