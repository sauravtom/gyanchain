pragma solidity ^0.4.17;

//Only for instructor
contract UploadCourse {

    struct CourseDetails {
        string courseGenre;
        string coursePrice;
        string courseName;
        bool publishStatus; // 1 -> ready for sales , 0 -> not ready for sales
    }
    
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