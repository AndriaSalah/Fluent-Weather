export const useFormatAddress = (address:string) : string => {
    const split = address.split(", ")
    console.log(split)
    console.log(split[0] + ", " + split[split.length-1])
    if(split.length > 1) {
        return split[0] + ", " + split[split.length-1]
    }
    // else if (split.length === 2){
    //     return split[0]+ "," + split[1]
    // }
    else if(split.length === 1){
        return split[0]
    }

    return ""
}