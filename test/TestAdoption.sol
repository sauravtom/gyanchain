pragma solidity ^0.4.17;

//for various assertions https://github.com/trufflesuite/truffle-core/blob/master/lib/testing/Assert.sol
import "truffle/Assert.sol";
// get the address of the deployed contract
import "truffle/DeployedAddresses.sol";
// the smart contract we want to test 
import "../contracts/Adoption.sol";

contract TestAdoption {
	Adoption adoption = Adoption(DeployedAddresses.Adoption());

	function testUserCanAdoptPet() public {
		uint returnedId = adoption.adopt(8);
		uint expected = 8;
		Assert.equal(returnedId, expected, "Adoption of pet ID * should be recorded");
	}

	function testGetAdopterAddressByPetId() public {
		// owner of this contract
		address expected = this;
		address adopter = adoption.adopters(8);
		Assert.equal(adopter, expected, 'Owner = assertion');
	}

	function testGetAdopterAddressByPetIdInArray() public {
		//owner of this contract
		address expected = this;

		address[16] memory adopters = adoption.getAdopters();

		Assert.equal(adopters[8], expected, 'Foo');
	}
}