// bugs need to resolved
// 1. when the data is so large then we break it into chunks so 
// every time we wwrite backfile.json file the add it as new array doesnot append
// into same array present in file
// 2. If you carefully observe there is this unecessory symbol '\' there in json file even
// though the data we fetched doesnot contain it so I think it automatically added during file write
// so find where is the error and fix it

// file encryption is remaining