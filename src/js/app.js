App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load courses
    $.getJSON('../courses.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      $("#address").text("Logged in as " + web3.eth.accounts[0]);
    } else {
      //App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      //alert('Please connect metamask to continue');
      $('#loginModal').modal('toggle');
      setTimeout(10000);
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('GyanChain.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      // artifact is deployed address and ABI(javascript object of contract)
      var GyanChainArtifact = data;
      App.contracts.GyanChain = TruffleContract(GyanChainArtifact);

      // Set the provider for our contract
      App.contracts.GyanChain.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });

    $.getJSON('GyanChain.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      // artifact is deployed address and ABI(javascript object of contract)
      var GyanChainArtifact = data;
      App.contracts.GyanChain = TruffleContract(GyanChainArtifact);

      // Set the provider for our contract
      App.contracts.GyanChain.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;

    App.contracts.GyanChain.deployed().then(function(instance) {
      gyanChainInstance = instance;

      return gyanChainInstance.getCourseLedger();

    }).then(function(courseLedger) {
      for (i = 0; i < courseLedger.length; i++) {
        if (courseLedger[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('View in Library').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var courseId = parseInt($(event.target).data('id'));

    var gyanChainInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.GyanChain.deployed().then(function(instance) {
        gyanChainInstance = instance;

        if (!localStorage.getItem("testData")){
          console.log('adding test data');
          for(i=0;i<10;i++){
            gyanChainInstance.addCourse("category"+i,300,"name"+i,true,"video_url"+i);
          }
        };

        localStorage.setItem("testData", true);
        // Execute adopt as a transaction by sending account
        return gyanChainInstance.buyCourse(courseId, {from: account, value:500});
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
