// 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
// 链接：https://leetcode-cn.com/problems/3sum
// 例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]
//[-13,5,13,12,-2,-11,-1,12,-3,0,-3,-7,-7,-5,-3,-15,-2,14,14,13,6,-11,-11,5,-15,-14,5,-5,-2,0,3,-8,-10,-7,11,-5,-10,-5,-7,-6,2,5,3,2,7,7,3,-10,-2,2,-12,-11,-1,14,10,-9,-15,-8,-7,-9,7,3,-2,5,11,-13,-15,8,-3,-7,-12,7,5,-2,-6,-3,-10,4,2,-5,14,-3,-1,-10,-3,-14,-4,-3,-7,-4,3,8,14,9,-2,10,11,-10,-4,-15,-9,-1,-1,3,4,1,8,1]
rtn=[]
arr=[1,2,3,4,5,6]
select=[0,1,2]
// 递归
// function carry(arr,select,sum,pos=0){
// 	let len=arr.length-pos-1
// 	let N = select.length-pos-1
// 	if(N<0) return
// 	if(select[N]+1<=len){
// 		select[N]++
// 		for(i=1;i<pos+1;i++){
// 			select[N+i]=select[N]+i
// 		}
// 		let transArr = select.map(item=>arr[item])
// 		if(transArr.reduce((a,b)=>a+b)===sum)
// 			rtn.push(transArr)
// 		carry(arr,select,sum)
// 	}else{
// 		carry(arr,select,sum,++pos)
// 	}
// }


//迭代
var threeSum = function(nums) {
    let rtn = []
    let select=[0,1],sum=0
    nums.sort((a,b)=>a-b)
    nums = filterArr(nums)
	len=nums.length-1
	N = select.length-1
	while(true){
		if(nums[select[0]]>0) {return rtn}
		tsum = sum-nums[select[0]]-nums[select[1]]
		if(nums.slice(select[N]+1,len+1).includes(tsum)){
			rtn.push([...select.map(item=>nums[item]),tsum])
		}
		if(!carry(nums,select)) return rtn
	}
};
function carry(nums,select){
	len=nums.length-1
	N = select.length-1
	pos=0
	while(true){
		if(N<pos) return false
		while(nums[select[N-pos]]===nums[select[N-pos]+1]){
			select[N-pos]++
		}
		select[N-pos]++
		if(select[N-pos]>=len-pos) {
			pos++
		}else{
			for(i=1;i<pos+1;i++){
				select[N-pos+i]=select[N-pos]+i
			}
			return true
		}
	}
}
function filterArr(arr){
	let ar=[]
	let N=3
	for(let i=0,len=arr.length;i<len;i++){
		if(canPush(arr[i],ar,N)){
			ar.push(arr[i])
        }
	}
	return ar
}
function canPush(val,ar,N){
	let arlen=ar.length
	for(let j=1;j<N+1;j++){
		if(val!==ar[arlen-j]){
			return true
		}
	}
	return false
}