pragma solidity ^0.4.24;

//Share for both student & instructor
contract Profile {
    address userAddress;
    string public username;
    bool public userType; // 0-> student, 1 -> instructor
    uint8 public rating; // 1 (worst) until 5 (best)
    uint8 public progress = 0; // range fro 0 to 100

    constructor() public {
        userAddress = msg.sender;
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
