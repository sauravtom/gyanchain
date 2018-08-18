//using the infura.io node, otherwise ipfs requires you to run a //daemon on your own computer/server.
//const IPFS = require('ipfs-api');

const ipfs = IpfsApi({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
let spinner = document.getElementById("spinner");

function uploadToIPFS(hash,price,name,category,description) {
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }

    var account = accounts[0];

    App.contracts.GyanChain.deployed().then(function(instance) {
      gyanChainInstance = instance;

      return gyanChainInstance.addCourse(category,price*100,name,true,hash);
    }).then(function(result) {
      return 0;
    }).catch(function(err) {
      console.log(err.message);
    });
  });

}

function uploadContent() {

  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let category = document.getElementById("category").value;
  let description = document.getElementById("description").value;
  let file = document.getElementById("exampleInputFile").files[0];
  let reader = new window.FileReader()
  reader.readAsArrayBuffer(file)

  spinner.style.visibility = "visible";

  reader.onloadend = () => this.convertToBufferAndStoreToSmartContact(reader, name, price, category, description)
}

function convertToBufferAndStoreToSmartContact(reader, name, price, category, description) {
  //file is converted to a buffer for upload to IPFS
  const bufferObject = buffer.Buffer.from(reader.result);
  //set this buffer -using es6 syntax
  console.log(bufferObject)
  ipfs.add(bufferObject, (err, ipfsHash) => {
    spinner.style.visibility = "hidden";
    console.log("hash : ", ipfsHash[0].hash);
    console.log("price : ", price);
    console.log("name : ", name);
    console.log("category : ", category);
    console.log("description : ", description);
    console.log("isLive : ", true);
    uploadToIPFS(ipfsHash[0].hash,price,name,category,description)
  })
};

function retrieveContent() {

}

function loadVideo(src) {
  let quiz = document.getElementById('quiz');
  let video = document.getElementById('video');
  let mp4 = document.getElementById('mp4');
  d = new Date();

  video.style.display = "inline";
  quiz.style.display = "none";

  if(src != mp4.src) {
    mp4.src = src

    video.load();
    //video.play();
  }
}

function loadQuiz() {
  let quiz = document.getElementById('quiz');
  let video = document.getElementById('video');

  video.style.display = "none";
  quiz.style.display = "inline";
}