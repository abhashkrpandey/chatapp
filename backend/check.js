let array=[1,2,3];
let obj1={"qw":132,"efef":555}
array.forEach(function checker(ele)
{
    if(ele!=5)
    {
        array.push(5);
    }
    return array;
})
console.log(obj1.qw);