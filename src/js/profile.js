function onLoad() {
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }

    var account = accounts[0];
    // console.log(account);

    findCourses(account);
  });
}

async function findCourses(account) {

  let GyanChainInstance = await App.contracts.GyanChain.deployed();

  // for testing purpose (create new course)
  // var res = await GyanChainInstance.addCourse("ICT", 10, "Cyber", 1, "video_url", {from: account});
  // console.log(res);
  // var res = await GyanChainInstance.addCourse("Law", 30, "Crypto-Currency", 1, "video_url", {from: account});
  // console.log(res);

  // for testing purpose (enrol course)
  // var res = await GyanChainInstance.buyCourse(1, {from: account, value: 30});
  // console.log(res);

  // get all courses
  let totalCourses = await GyanChainInstance.numberOfCourses.call();
  let course = {};
  let allCourses = [];
  for (let i=0; i<totalCourses; i++) {
    course = await GyanChainInstance.allCourses.call(i);
    course[1] = course[1].toNumber();
    course[5] = course[5].toNumber();
    allCourses.push(course);
  }
  console.log(allCourses);

  // get all students
  let totalStudents = await GyanChainInstance.numberOfStudents.call();
  let student = {};
  let studentId = 0;
  let studentCourses = [];
  for (let i=0; i<totalStudents; i++) {
    student = await GyanChainInstance.allStudents.call(i);
    // find the student Id (by comparing her account address)
    if (student === account) {
      studentId = i;
      // get all courses enrolled by student
      studentCourses = await GyanChainInstance.studentCourses.call(studentId);
      break;
    }
  }
  for (let i=0; i<studentCourses.length; i++) {
    studentCourses[i] = studentCourses[i].toNumber();
  }
  console.log(studentCourses);

  // display courses enrolled by student
  for (let i=0; i<allCourses.length; i++) {
    if (studentCourses.indexOf(allCourses[i][5]) >= 0) {
      $("#mycourses").append("<div class='columns'><ul class='price'><li class='header'>" + allCourses[i][2] + "</li><li class='grey'>" + allCourses[i][0] + "</li><li>20% Complete</li><li class='grey'><a href='#' class='button'>View Course</a></li></ul></div>");
    }
  }
}
