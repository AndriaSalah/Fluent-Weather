export const FormatAddress = (address:string) : string => {
    const split = address.split(", ")
    if(split.length > 1) {
        return split[0] + ", " + split[split.length-1]
    }
    else if(split.length === 1){
        return split[0]
    }

    return ""
}