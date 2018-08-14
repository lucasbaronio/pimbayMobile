export const convertUserArrayInArrayOfArrays = (userList, numSubArrays) => {
    var newUserList = [];
    var userListLenght = userList.length;
    for (var i = 0; i < userListLenght; i += numSubArrays) {
        const subArray = [];
        for (var j = 0; j < numSubArrays; j++) {
            if (userList[i+j]) {
                subArray.push(userList[i+j]);
            }
        }
        newUserList.push(subArray);
    }
    return newUserList;
}