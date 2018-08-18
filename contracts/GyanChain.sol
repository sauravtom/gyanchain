pragma solidity ^0.4.24;

contract GyanChain {

  event CourseAdded(string name, string category, uint ID, uint lenCourse, uint lenStudent);
  event CoursePurchased(uint indexed studentID, uint indexed courseID);
  
  address[20] public courseLedger;

  struct StudentTemplate {
    address myAddress;
    uint[] myCourses;
  }
  mapping(address => uint) public studentMap;
  StudentTemplate[] public allStudents;

  struct CourseTemplate {
    string category;
    uint price;
    string name;
    bool isLive;
    string videoData;
    uint courseId;
    address courseOwner;
  }
  CourseTemplate[] public allCourses;

  function buyCourse(uint courseId) public payable returns (uint) {

    require(courseId <= allCourses.length);

    CourseTemplate memory course = allCourses[courseId];
    require (msg.value >= course.price);

    uint studentNo = studentMap[msg.sender];
    if (studentNo == 0) {
      uint[] memory empty;
      studentNo = allStudents.push(StudentTemplate(msg.sender, empty));
      studentMap[msg.sender] = studentNo;
    }

    StudentTemplate storage student = allStudents[studentNo-1];

    student.myCourses.push(courseId);
    courseLedger[courseId] = msg.sender;
    emit CoursePurchased(studentNo,courseId);
  }

  function addCourse(string category, uint price, string name, bool isLive, string videoData) public {
    CourseTemplate memory CourseG = CourseTemplate(category,price,name,isLive,videoData, allCourses.length, msg.sender);
    uint courseId = allCourses.push(CourseG);
    emit CourseAdded(name, category, courseId, allCourses.length, allStudents.length);
  }
    
  function getCourseLedger() public view returns (address[20]) {
    return courseLedger;
  }

  function numberOfStudents() public view returns (uint) {
    return allStudents.length;
  }

  function numberOfCourses() public view returns (uint) {
    return allCourses.length;
  }

  function studentCourses(uint studentId) public view returns (uint[]) {
    return allStudents[studentId].myCourses;
  }

}
