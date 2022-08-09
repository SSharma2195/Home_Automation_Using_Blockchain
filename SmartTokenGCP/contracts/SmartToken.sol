pragma solidity >=0.4.0;

contract SmartToken {
    mapping(address => uint256) tokens;
    event OnValueChanged(address indexed _from, uint256 _value);

    function depositToken(address recipient, uint256 value)
        public
        returns (bool success)
    {
        tokens[recipient] += value;
        emit OnValueChanged(recipient, tokens[recipient]);
        return true;
    }

    function withdrawToken(address recipient, uint256 value)
        public
        returns (bool success)
    {
        if (int256(tokens[recipient] - value) < 0) {
            tokens[recipient] = 0;
        } else {
            tokens[recipient] -= value;
        }
        emit OnValueChanged(recipient, tokens[recipient]);
        return true;
    }

    function getTokens(address recipient) public view returns (uint256 value) {
        return tokens[recipient];
    }
}
