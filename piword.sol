pragma solidity ^0.4.20;

contract piword {
 address owner;
 uint256 points_inside = 0; //number point inside circle radiuos 1
 uint256 points_total = 0; //number point totals


 function piword() public{ 
	owner = msg.sender; 
 }
 
 function addPoint (uint256 _points_total,uint256 _inside) external {  
  require(_points_total>0);
  require(_points_total>=_inside);
  points_inside=points_inside+_inside;
  points_total=points_total+_points_total;
 }
 
 function pi() external view returns(uint256,uint256) { //decreases counter by 1
  
  return (points_inside,points_total);
 }
 
 function changeOwner(address _newOwner) external {
	require(msg.sender == owner);
    owner = _newOwner;
  }
 
} 



