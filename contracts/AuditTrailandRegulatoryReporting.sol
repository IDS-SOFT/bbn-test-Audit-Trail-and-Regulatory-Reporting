//SPDX-License-Identifier:GPL-3.0
pragma solidity ^0.8.0;

contract AuditTrail {
    // Define the terms of the contract
    string public documentName;
    string public documentHash;
    uint public timestamp;

    // Define the parties involved
    address public auditor;
    address public regulator;

    // Define the constructor function
    constructor(string memory _documentName, string memory _documentHash, address _auditor, address _regulator) {
        documentName = _documentName;
        documentHash = _documentHash;
        auditor = _auditor;
        regulator = _regulator;
        timestamp = block.timestamp;
    }

    // Define the function for updating the document hash
    function updateDocumentHash(string memory _newDocumentHash) public {
        require(msg.sender == auditor, "Only the auditor can update the document hash");
        documentHash = _newDocumentHash;
        timestamp = block.timestamp;
    }

    // Define the function for checking the document status
    function checkDocumentStatus() public view returns (string memory, string memory, uint) {
        return (documentName, documentHash, timestamp);
    }
}
